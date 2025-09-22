"use client"

import { useEffect, useRef, useState } from "react"

interface RecaptchaRenderOptions {
    sitekey: string
    callback: (token: string) => void
    "expired-callback"?: () => void
    "error-callback"?: () => void
}

interface RecaptchaAPI {
    ready?: (cb: () => void) => void
    render?: (container: HTMLElement, options: RecaptchaRenderOptions) => number
    reset?: (widgetId?: number) => void
    enterprise?: RecaptchaAPI
}

declare global {
    interface Window {
        grecaptcha: RecaptchaAPI
    }
}

const RECAPTCHA_SCRIPT_ID = "google-recaptcha-script"
const RECAPTCHA_SCRIPT_SRC = "https://www.google.com/recaptcha/api.js?render=explicit"

let scriptPromise: Promise<void> | null = null

function loadRecaptchaScript() {
    if (scriptPromise) {
        return scriptPromise
    }

    if (typeof window === "undefined") {
        return Promise.reject(new Error("reCAPTCHA can only be loaded in the browser."))
    }

    if (window.grecaptcha?.render || window.grecaptcha?.enterprise?.render) {
        return Promise.resolve()
    }

    scriptPromise = new Promise<void>((resolve, reject) => {
        const existing = document.getElementById(RECAPTCHA_SCRIPT_ID) as HTMLScriptElement | null

        if (existing) {
            if (existing.dataset.loaded === "true" || existing.readyState === "complete") {
                existing.dataset.loaded = "true"
                resolve()
                return
            }

            const handleLoad = () => {
                existing.dataset.loaded = "true"
                resolve()
            }

            const handleError = () => {
                scriptPromise = null
                reject(new Error("Failed to load the reCAPTCHA script."))
            }

            existing.addEventListener("load", handleLoad, { once: true })
            existing.addEventListener("error", handleError, { once: true })
            return
        }

        const script = document.createElement("script")
        script.id = RECAPTCHA_SCRIPT_ID
        script.src = RECAPTCHA_SCRIPT_SRC
        script.async = true
        script.defer = true
        script.dataset.loaded = "false"

        script.addEventListener("load", () => {
            script.dataset.loaded = "true"
            resolve()
        })

        script.addEventListener("error", () => {
            scriptPromise = null
            script.remove()
            reject(new Error("Failed to load the reCAPTCHA script."))
        })

        const parent = document.head || document.body

        if (!parent) {
            scriptPromise = null
            reject(new Error("Failed to find a place to attach the reCAPTCHA script."))
            return
        }

        parent.appendChild(script)
    })

    return scriptPromise
}

export default function Recaptcha({ onChange }: { onChange: (token: string | null) => void }) {
    const ref = useRef<HTMLDivElement>(null)
    const widgetId = useRef<number | null>(null)
    const [error, setError] = useState<string | null>(null)
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY

    useEffect(() => {
        let cancelled = false

        const mount = async () => {
            if (!ref.current) {
                return
            }

            if (!siteKey) {
                setError("reCAPTCHA site key is not configured.")
                onChange(null)
                return
            }

            setError(null)

            try {
                await loadRecaptchaScript()
            } catch (err) {
                if (cancelled) return
                setError("Failed to load reCAPTCHA. Please reload the page.")
                onChange(null)
                return
            }

            if (cancelled || !ref.current) {
                return
            }

            if (widgetId.current !== null) {
                return
            }

            const g = window.grecaptcha
            const api = g?.render ? g : g?.enterprise
            const ready = api?.ready || g?.ready
            const renderFn = api?.render

            if (typeof renderFn !== "function") {
                setError("Failed to initialise reCAPTCHA widget.")
                onChange(null)
                return
            }

            const exec = () => {
                if (!ref.current || cancelled) {
                    return
                }

                widgetId.current = renderFn(ref.current, {
                    sitekey: siteKey,
                    callback: (token: string) => {
                        setError(null)
                        onChange(token)
                    },
                    "expired-callback": () => {
                        setError("reCAPTCHA expired. Please try again.")
                        onChange(null)
                    },
                    "error-callback": () => {
                        setError("reCAPTCHA failed. Please retry.")
                        onChange(null)
                    },
                })
            }

            ready ? ready(exec) : exec()
        }

        mount()

        return () => {
            cancelled = true

            if (widgetId.current !== null) {
                const api = window.grecaptcha?.reset ? window.grecaptcha : window.grecaptcha?.enterprise
                api?.reset?.(widgetId.current)
                widgetId.current = null
            }

            onChange(null)
        }
    }, [onChange, siteKey])

    return (
        <>
            <div ref={ref} />
            {error && (
                <p className="mt-3 text-sm text-center text-red-600 dark:text-red-400">{error}</p>
            )}
        </>
    )
}
