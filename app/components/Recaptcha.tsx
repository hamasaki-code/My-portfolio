"use client"

import { useEffect, useRef } from "react"

interface RecaptchaAPI {
    ready?: (cb: () => void) => void
    render?: (
        container: HTMLElement,
        options: { sitekey: string | undefined; callback: (token: string) => void }
    ) => void
    reset?: () => void
    enterprise?: RecaptchaAPI
}

declare global {
    interface Window {
        grecaptcha: RecaptchaAPI
    }
}

export default function Recaptcha({ onChange }: { onChange: (token: string) => void }) {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const scriptId = "recaptcha-script"

        function render() {
            if (!ref.current) return
            const g = window.grecaptcha
            const api = g?.render ? g : g?.enterprise
            const ready = api?.ready || g?.ready
            const renderFn = api?.render

            if (typeof renderFn === "function") {
                const exec = () =>
                    renderFn(ref.current!, {
                        sitekey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
                        callback: onChange,
                    })
                ready ? ready(exec) : exec()
            }
        }

        if (!document.getElementById(scriptId)) {
            const script = document.createElement("script")
            script.id = scriptId
            script.src = "https://www.google.com/recaptcha/api.js?render=explicit"
            script.async = true
            script.defer = true
            script.onload = render
            document.body.appendChild(script)
        } else {
            render()
        }
    }, [onChange])

    return <div ref={ref} />
}
