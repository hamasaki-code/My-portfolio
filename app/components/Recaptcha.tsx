"use client"

import Script from "next/script"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"

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

const RECAPTCHA_SCRIPT_ID = "google-recaptcha"
const RECAPTCHA_SCRIPT_SRC = "https://www.google.com/recaptcha/api.js?render=explicit"

type WidgetState = "idle" | "loading" | "ready" | "error"

export default function Recaptcha({ onChange }: { onChange: (token: string | null) => void }) {
    const containerRef = useRef<HTMLDivElement>(null)
    const widgetIdRef = useRef<number | null>(null)
    const [state, setState] = useState<WidgetState>("idle")
    const [error, setError] = useState<string | null>(null)
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY

    const scriptLoaded = useMemo(() => {
        if (typeof window === "undefined") {
            return false
        }

        const api = window.grecaptcha
        return Boolean(api?.render || api?.enterprise?.render)
    }, [])

    const resetWidget = useCallback(() => {
        if (widgetIdRef.current === null) {
            return
        }

        const api = window.grecaptcha?.reset ? window.grecaptcha : window.grecaptcha?.enterprise
        api?.reset?.(widgetIdRef.current)
        widgetIdRef.current = null
    }, [])

    const renderWidget = useCallback(() => {
        if (!containerRef.current || !siteKey) {
            return
        }

        const g = window.grecaptcha
        const api = g?.render ? g : g?.enterprise
        const ready = api?.ready || g?.ready
        const renderFn = api?.render

        if (typeof renderFn !== "function") {
            setError("Failed to initialise reCAPTCHA widget.")
            setState("error")
            onChange(null)
            return
        }

        const exec = () => {
            if (!containerRef.current || widgetIdRef.current !== null) {
                return
            }

            widgetIdRef.current = renderFn(containerRef.current, {
                sitekey: siteKey,
                callback: (token: string) => {
                    setError(null)
                    setState("ready")
                    onChange(token)
                },
                "expired-callback": () => {
                    setError("reCAPTCHA expired. Please try again.")
                    setState("error")
                    onChange(null)
                },
                "error-callback": () => {
                    setError("reCAPTCHA failed. Please retry.")
                    setState("error")
                    onChange(null)
                },
            })
        }

        setState("loading")
        ready ? ready(exec) : exec()
    }, [onChange, siteKey])

    useEffect(() => {
        if (!siteKey) {
            setError("reCAPTCHA site key is not configured.")
            setState("error")
            onChange(null)
            return
        }

        if (scriptLoaded) {
            renderWidget()
        }
    }, [onChange, renderWidget, scriptLoaded, siteKey])

    useEffect(
        () => () => {
            resetWidget()
            onChange(null)
        },
        [onChange, resetWidget]
    )

    const handleScriptLoad = useCallback(() => {
        if (!siteKey) {
            return
        }

        renderWidget()
    }, [renderWidget, siteKey])

    const handleScriptError = useCallback(() => {
        setError("Failed to load reCAPTCHA. Please reload the page.")
        setState("error")
        onChange(null)
    }, [onChange])

    return (
        <>
            <Script
                id={RECAPTCHA_SCRIPT_ID}
                src={RECAPTCHA_SCRIPT_SRC}
                strategy="lazyOnload"
                onLoad={handleScriptLoad}
                onError={handleScriptError}
            />
            <div ref={containerRef} aria-busy={state === "loading"} />
            {error && (
                <p className="mt-3 text-center text-sm text-red-600 dark:text-red-400">{error}</p>
            )}
        </>
    )
}
