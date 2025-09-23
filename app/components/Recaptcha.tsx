"use client"

import Script from "next/script"
import {
    forwardRef,
    useCallback,
    useEffect,
    useImperativeHandle,
    useMemo,
    useRef,
    useState,
} from "react"

type RecaptchaSize = "compact" | "normal" | "invisible"
type RecaptchaBadge = "bottomright" | "bottomleft" | "inline"

interface RecaptchaRenderOptions {
    sitekey: string
    size?: RecaptchaSize
    badge?: RecaptchaBadge
    callback: (token: string) => void
    "expired-callback"?: () => void
    "error-callback"?: () => void
}

interface RecaptchaAPI {
    ready?: (cb: () => void) => void
    render?: (container: HTMLElement, options: RecaptchaRenderOptions) => number
    reset?: (widgetId?: number) => void
    execute?: (widgetId?: number) => PromiseLike<string> | string | void
    enterprise?: RecaptchaAPI
}

export interface RecaptchaHandle {
    execute: () => Promise<string>
    reset: () => void
}

declare global {
    interface Window {
        grecaptcha: RecaptchaAPI
    }
}

const RECAPTCHA_SCRIPT_ID = "google-recaptcha"
const RECAPTCHA_SCRIPT_SRC = "https://www.google.com/recaptcha/api.js?render=explicit"

type WidgetState = "idle" | "loading" | "ready" | "error"

const rawSize = process.env.NEXT_PUBLIC_RECAPTCHA_SIZE
const RECAPTCHA_SIZE: RecaptchaSize = rawSize === "compact" || rawSize === "invisible" ? rawSize : "normal"
const rawBadge = process.env.NEXT_PUBLIC_RECAPTCHA_BADGE
const RECAPTCHA_BADGE: RecaptchaBadge | undefined =
    rawBadge === "bottomleft" || rawBadge === "inline" ? rawBadge : rawBadge === "bottomright" ? "bottomright" : undefined

const Recaptcha = forwardRef<RecaptchaHandle, { onChange: (token: string | null) => void }>(
    ({ onChange }, ref) => {
        const containerRef = useRef<HTMLDivElement>(null)
        const widgetIdRef = useRef<number | null>(null)
        const pendingExecuteRef = useRef<{
            resolve: (token: string) => void
            reject: (error: Error) => void
        } | null>(null)
        const lastTokenRef = useRef<string | null>(null)
        const renderRetryCountRef = useRef(0)
        const renderTimeoutRef = useRef<number | null>(null)
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

        const getApi = useCallback(() => {
            const g = window.grecaptcha
            return g?.render || g?.execute ? g : g?.enterprise
        }, [])

        const resolvePending = useCallback(
            (token: string | null, errorMessage?: string) => {
                if (token) {
                    pendingExecuteRef.current?.resolve(token)
                } else if (errorMessage) {
                    pendingExecuteRef.current?.reject(new Error(errorMessage))
                }
                pendingExecuteRef.current = null
            },
            []
        )

        const resetWidget = useCallback(() => {
            if (widgetIdRef.current === null) {
                return
            }

            const api = getApi()
            api?.reset?.(widgetIdRef.current)
            lastTokenRef.current = null
        }, [getApi])

        const clearRenderTimeout = useCallback(() => {
            if (renderTimeoutRef.current !== null) {
                window.clearTimeout(renderTimeoutRef.current)
                renderTimeoutRef.current = null
            }
        }, [])

        const renderWidget = useCallback(() => {
            if (!containerRef.current || !siteKey) {
                return
            }

            const g = window.grecaptcha
            const api = g?.render ? g : g?.enterprise
            const ready = api?.ready || g?.ready
            renderRetryCountRef.current = 0

            const exec = () => {
                if (!containerRef.current || widgetIdRef.current !== null) {
                    return
                }

                const nextG = window.grecaptcha
                const nextApi = nextG?.render ? nextG : nextG?.enterprise
                const renderFn = nextApi?.render

                if (typeof renderFn !== "function") {
                    if (renderRetryCountRef.current < 5) {
                        renderRetryCountRef.current += 1
                        clearRenderTimeout()
                        renderTimeoutRef.current = window.setTimeout(exec, 200)
                        return
                    }

                    clearRenderTimeout()
                    setError("Failed to initialise reCAPTCHA widget.")
                    setState("error")
                    onChange(null)
                    resolvePending(null, "Failed to initialise reCAPTCHA widget.")
                    return
                }

                clearRenderTimeout()
                renderRetryCountRef.current = 0
                const options: RecaptchaRenderOptions = {
                    sitekey: siteKey,
                    size: RECAPTCHA_SIZE,
                    callback: (token: string) => {
                        setError(null)
                        setState("ready")
                        lastTokenRef.current = token
                        onChange(token)
                        resolvePending(token)
                    },
                    "expired-callback": () => {
                        setError("reCAPTCHA expired. Please try again.")
                        setState("error")
                        lastTokenRef.current = null
                        onChange(null)
                        resolvePending(null, "reCAPTCHA expired. Please try again.")
                    },
                    "error-callback": () => {
                        setError("reCAPTCHA failed. Please retry.")
                        setState("error")
                        lastTokenRef.current = null
                        onChange(null)
                        resolvePending(null, "reCAPTCHA failed. Please retry.")
                    },
                }

                if (RECAPTCHA_SIZE === "invisible" && RECAPTCHA_BADGE) {
                    options.badge = RECAPTCHA_BADGE
                }

                widgetIdRef.current = renderFn(containerRef.current, options)
            }

            setState("loading")
            ready ? ready(exec) : exec()
        }, [clearRenderTimeout, onChange, resolvePending, siteKey])

        useEffect(() => {
            if (!siteKey) {
                setError("reCAPTCHA site key is not configured.")
                setState("error")
                onChange(null)
                resolvePending(null, "reCAPTCHA site key is not configured.")
                return
            }

            if (scriptLoaded) {
                renderWidget()
            }
        }, [clearRenderTimeout, onChange, renderWidget, resolvePending, scriptLoaded, siteKey])

        useEffect(
            () => () => {
                clearRenderTimeout()
                resolvePending(null)
                resetWidget()
                onChange(null)
            },
            [clearRenderTimeout, onChange, resetWidget, resolvePending]
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
            resolvePending(null, "Failed to load reCAPTCHA. Please reload the page.")
        }, [onChange, resolvePending])

        const execute = useCallback(() => {
            return new Promise<string>((resolve, reject) => {
                if (!siteKey) {
                    reject(new Error("reCAPTCHA site key is not configured."))
                    return
                }

                const api = getApi()

                if (RECAPTCHA_SIZE === "invisible") {
                    if (typeof api?.execute !== "function" || widgetIdRef.current === null) {
                        reject(new Error("reCAPTCHA is not ready yet."))
                        return
                    }

                    pendingExecuteRef.current = { resolve, reject }
                    const result = api.execute(widgetIdRef.current)

                    // For implementations returning a token synchronously
                    if (typeof result === "string") {
                        lastTokenRef.current = result
                        onChange(result)
                        resolve(result)
                        pendingExecuteRef.current = null
                    }
                    return
                }

                if (lastTokenRef.current) {
                    resolve(lastTokenRef.current)
                    return
                }

                reject(new Error("Please complete the reCAPTCHA challenge."))
            })
        }, [getApi, onChange, siteKey])

        const reset = useCallback(() => {
            resolvePending(null)
            resetWidget()
            onChange(null)
        }, [onChange, resetWidget, resolvePending])

        useImperativeHandle(
            ref,
            () => ({
                execute,
                reset,
            }),
            [execute, reset]
        )

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
)

Recaptcha.displayName = "Recaptcha"

export default Recaptcha
