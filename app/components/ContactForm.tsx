"use client"

import { useEffect, useState, useRef } from "react"
import {
    FiUser,
    FiMail,
    FiMessageSquare,
    FiSend,
    FiLoader,
    FiCheck,
    FiGithub,
    FiMapPin,
} from "react-icons/fi"
import { RiTwitterXLine } from "react-icons/ri";
import Recaptcha from "./Recaptcha"

export default function ContactForm() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [emailError, setEmailError] = useState("")
    const [message, setMessage] = useState("")
    const [captcha, setCaptcha] = useState<string | null>(null)
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
    const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
    const recaptchaEnabled = !!recaptchaSiteKey
    const modalRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (status === 'success' || status === 'error') {
            const timer = setTimeout(() => setStatus('idle'), 4000)
            if (status === 'success') {
                modalRef.current?.focus()
            }
            return () => clearTimeout(timer)
        }
    }, [status])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setStatus('sending')

        try {
            const res = await fetch("/api/email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, message, captcha })
            })

            await res.json()

            if (res.ok) {
                setStatus('success')
                setName("")
                setEmail("")
                setMessage("")
                setCaptcha(null)

                if (typeof window !== 'undefined') {
                    const g = window.grecaptcha
                    const api = g?.reset ? g : g?.enterprise
                    api?.reset?.()
                }
            } else {
                setStatus('error')
            }

        } catch (err) {
            setStatus('error')
        }
    }

    return (
        <section id="contact" className="my-16 px-4">
            <div className="max-w-3xl mx-auto bg-gray-50 dark:bg-black text-black dark:text-yellow-400 rounded-xl shadow-2xl p-10 space-y-10 transition-colors duration-500">
                <h2 className="text-4xl font-bold text-center mb-4">Contact Me</h2>

                {/* ステータス */}
                {status === 'error' && (
                    <div className="bg-red-600 text-white text-center py-3 px-4 rounded-md">
                        Something went wrong. Please try again.
                    </div>
                )}
                {status === 'success' && (
                    <div
                        ref={modalRef}
                        tabIndex={-1}
                        className="bg-green-600 text-white text-center py-4 px-6 rounded-lg"
                    >
                        <FiCheck className="mx-auto mb-2 text-2xl" />
                        <p>Thanks! I&apos;ll reply to you soon.</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name & Email */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="name" className="block mb-2 font-semibold">Name</label>
                            <div className="relative">
                                <FiUser className="absolute left-3 top-3 text-yellow-400" />
                                <input
                                    id="name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Your name"
                                    required
                                    className="w-full bg-white dark:bg-black border border-yellow-500 text-black dark:text-yellow-400 placeholder-gray-500 dark:placeholder-yellow-200 rounded px-10 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block mb-2 font-semibold">Email</label>
                            <div className="relative">
                                <FiMail className="absolute left-3 top-3 text-yellow-400" />
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => {
                                        const val = e.target.value
                                        setEmail(val)
                                        setEmailError(/^\S+@\S+\.\S+$/.test(val) ? "" : "Invalid email format")
                                    }}
                                    placeholder="you@example.com"
                                    required
                                    className="w-full bg-white dark:bg-black border border-yellow-500 text-black dark:text-yellow-400 placeholder-gray-500 dark:placeholder-yellow-200 rounded px-10 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                                />
                            </div>
                            {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
                        </div>
                    </div>

                    {/* Message */}
                    <div>
                        <label htmlFor="message" className="block mb-2 font-semibold">Message</label>
                        <div className="relative">
                            <FiMessageSquare className="absolute left-3 top-4 text-yellow-400" />
                            <textarea
                                id="message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Your message"
                                rows={5}
                                maxLength={500}
                                required
                                className="w-full bg-white dark:bg-black border border-yellow-500 text-black dark:text-yellow-400 placeholder-gray-500 dark:placeholder-yellow-200 rounded px-10 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                            />
                        </div>
                        <p className="text-sm text-right text-gray-600 dark:text-yellow-200">{message.length}/500</p>
                    </div>

                    {/* reCAPTCHA */}
                    {recaptchaEnabled && (
                        <div className="flex justify-center">
                            <Recaptcha onChange={setCaptcha} />
                        </div>
                    )}

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={status === 'sending' || !!emailError || (recaptchaEnabled && !captcha)}
                        className="w-full bg-yellow-400 text-black font-bold py-3 rounded-lg hover:bg-yellow-300 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        {status === 'sending' && <FiLoader className="animate-spin" />}
                        {status === 'idle' && <FiSend />}
                        {status === 'sending' ? 'Sending...' : 'Send'}
                    </button>
                </form>

                {/* Contact Info Section */}
                <div className="pt-8 border-t border-yellow-200 dark:border-yellow-800">
                    <h3 className="text-2xl font-bold mb-4">Other Contact Options</h3>
                    <ul className="space-y-3">
                        <li className="flex items-center gap-3">
                            <FiGithub />
                            <a href="https://github.com/hamasaki-code" target="_blank" rel="noopener noreferrer" className="hover:underline">
                                github.com/hamasaki-code
                            </a>
                        </li>
                        <li className="flex items-center gap-3">
                            <RiTwitterXLine />
                            <a href="https://x.com/OnTAumv5KAoVGN5" target="_blank" rel="noopener noreferrer" className="hover:underline">
                                @OnTAumv5KAoVGN5
                            </a>
                        </li>
                        <li className="flex items-center gap-3">
                            <FiMapPin />
                            Kanagawa, Japan
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    )
}
