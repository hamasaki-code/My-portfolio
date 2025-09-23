"use client";

import { useEffect, useState, useRef } from "react";
import {
    FiUser,
    FiMail,
    FiMessageSquare,
    FiSend,
    FiLoader,
    FiCheck,
    FiGithub,
} from "react-icons/fi";
import { RiTwitterXLine, RiAccountCircleLine } from "react-icons/ri";
import { SiWantedly, SiLinkedin } from "react-icons/si";
import Recaptcha, { RecaptchaHandle } from "./Recaptcha";

export default function ContactForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [message, setMessage] = useState("");
    const [captcha, setCaptcha] = useState<string | null>(null);
    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    const recaptchaEnabled = !!recaptchaSiteKey;
    const isRecaptchaInvisible = process.env.NEXT_PUBLIC_RECAPTCHA_SIZE === "invisible";
    const recaptchaMisconfiguredMessage =
        "reCAPTCHA is not configured correctly. Please contact the site administrator.";
    const modalRef = useRef<HTMLDivElement>(null);
    const recaptchaRef = useRef<RecaptchaHandle | null>(null);

    useEffect(() => {
        if (status === "success" || status === "error") {
            const timer = setTimeout(() => setStatus("idle"), 4000);
            if (status === "success") {
                modalRef.current?.focus();
            }
            return () => clearTimeout(timer);
        }
    }, [status]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!recaptchaEnabled) {
            return;
        }

        setStatus("sending");
        setErrorMessage(null);

        try {
            let token: string | null = captcha;

            if (recaptchaEnabled) {
                if (isRecaptchaInvisible) {
                    try {
                        const instance = recaptchaRef.current;
                        if (!instance) {
                            setStatus("error");
                            setErrorMessage(
                                "reCAPTCHA is not ready yet. Please reload the page and try again."
                            );
                            return;
                        }

                        const nextToken = await instance.execute();
                        setCaptcha(nextToken);
                        token = nextToken;

                        if (!nextToken) {
                            setStatus("error");
                            setErrorMessage(
                                "reCAPTCHA challenge was not completed. Please try again."
                            );
                            return;
                        }
                    } catch {
                        setStatus("error");
                        setErrorMessage(
                            "Failed to execute reCAPTCHA. Please reload the page and try again."
                        );
                        return;
                    }
                } else if (!token) {
                    setStatus("error");
                    setErrorMessage(
                        "Please complete the reCAPTCHA challenge before submitting the form."
                    );
                    return;
                }
            }

            const res = await fetch("/api/email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, message, captcha: token }),
            });

            const data = await res.json();

            if (res.ok) {
                setStatus("success");
                setErrorMessage(null);
                setName("");
                setEmail("");
                setMessage("");
                setCaptcha(null);

                if (recaptchaEnabled) {
                    recaptchaRef.current?.reset();
                }

                if (typeof window !== "undefined") {
                    const g = window.grecaptcha;
                    const api = g?.reset ? g : g?.enterprise;
                    api?.reset?.();
                }
            } else {
                setStatus("error");
                setErrorMessage(
                    typeof data?.message === "string"
                        ? data.message
                        : "Something went wrong. Please try again."
                );
                if (recaptchaEnabled) {
                    recaptchaRef.current?.reset();
                }
            }
        } catch (err) {
            setStatus("error");
            setErrorMessage("Something went wrong. Please try again.");
            if (recaptchaEnabled) {
                recaptchaRef.current?.reset();
            }
        }
    };

    return (
        <section id="contact" className="scroll-mt-28 py-20">
            <div className="mx-auto max-w-3xl space-y-10 px-6 text-black transition-colors duration-500 dark:text-yellow-200 sm:px-10">
                <div className="text-center">
                    <h2 className="text-4xl font-bold text-black dark:text-yellow-100">Contact Me</h2>
                    <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
                        お仕事のご相談やカジュアルなご連絡もお気軽にどうぞ。<br />
                        以下のフォームまたはSNSからメッセージをお送りください。
                    </p>
                </div>

                {/* ステータス */}
                {status === "error" && (
                    <div className="bg-red-600 text-white text-center py-3 px-4 rounded-md">
                        {errorMessage ?? "Something went wrong. Please try again."}
                    </div>
                )}
                {status === "success" && (
                    <div
                        ref={modalRef}
                        tabIndex={-1}
                        className="bg-green-600 text-white text-center py-4 px-6 rounded-lg"
                    >
                        <FiCheck className="mx-auto mb-2 text-2xl" />
                        <p>Thanks! I&apos;ll reply to you soon.</p>
                    </div>
                )}

                {!recaptchaEnabled && (
                    <div className="rounded-md border border-yellow-400 bg-yellow-50 px-4 py-3 text-center text-sm text-yellow-800 dark:border-yellow-500/60 dark:bg-yellow-500/10 dark:text-yellow-200">
                        {recaptchaMisconfiguredMessage}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name & Email */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="name" className="block mb-2 font-semibold">
                                Name
                            </label>
                            <div className="relative">
                                <FiUser className="absolute left-3 top-3 text-yellow-400" />
                                <input
                                    id="name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Your name"
                                    required
                                    className="w-full rounded-xl border border-yellow-500/30 bg-white/70 px-10 py-3 text-black placeholder-gray-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-1 focus:ring-offset-yellow-100 dark:border-yellow-500/30 dark:bg-white/10 dark:text-yellow-200 dark:placeholder-yellow-200 dark:focus:ring-yellow-400 dark:focus:ring-offset-0"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block mb-2 font-semibold">
                                Email
                            </label>
                            <div className="relative">
                                <FiMail className="absolute left-3 top-3 text-yellow-400" />
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        setEmail(val);
                                        setEmailError(/^\S+@\S+\.\S+$/.test(val) ? "" : "Invalid email format");
                                    }}
                                    placeholder="you@example.com"
                                    required
                                    className="w-full rounded-xl border border-yellow-500/30 bg-white/70 px-10 py-3 text-black placeholder-gray-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-1 focus:ring-offset-yellow-100 dark:border-yellow-500/30 dark:bg-white/10 dark:text-yellow-200 dark:placeholder-yellow-200 dark:focus:ring-yellow-400 dark:focus:ring-offset-0"
                                />
                            </div>
                            {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
                        </div>
                    </div>

                    {/* Message */}
                    <div>
                        <label htmlFor="message" className="block mb-2 font-semibold">
                            Message
                        </label>
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
                                className="w-full rounded-xl border border-yellow-500/30 bg-white/70 px-10 py-3 text-black placeholder-gray-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-1 focus:ring-offset-yellow-100 dark:border-yellow-500/30 dark:bg-white/10 dark:text-yellow-200 dark:placeholder-yellow-200 dark:focus:ring-yellow-400 dark:focus:ring-offset-0"
                            />
                        </div>
                        <p className="text-sm text-right text-gray-600 dark:text-yellow-200">
                            {message.length}/500
                        </p>
                    </div>

                    {/* reCAPTCHA */}
                    {recaptchaEnabled && (
                        <div className="flex justify-center">
                            <Recaptcha ref={recaptchaRef} onChange={setCaptcha} />
                        </div>
                    )}

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={
                            status === "sending" ||
                            !!emailError ||
                            !recaptchaEnabled ||
                            (recaptchaEnabled && !isRecaptchaInvisible && !captcha)
                        }
                        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 py-3 font-bold text-black transition-transform duration-200 hover:scale-[1.01] hover:shadow-[0_18px_45px_-28px_rgba(250,204,21,0.6)] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {status === "sending" && <FiLoader className="animate-spin" />}
                        {status === "idle" && <FiSend />}
                        {status === "sending" ? "Sending..." : "Send"}
                    </button>
                </form>

                {/* Contact Info Section */}
                <div className="border-t border-yellow-500/30 pt-8 dark:border-yellow-500/40">
                    <h3 className="text-2xl font-bold mb-4 text-black dark:text-yellow-100">Other Contact Options</h3>
                    <ul className="grid grid-cols-1 gap-x-6 gap-y-3 text-[15px] md:grid-cols-2 md:text-base">
                        <li className="flex items-center gap-3 text-gray-700 transition-colors hover:text-black dark:text-yellow-200 dark:hover:text-yellow-50">
                            <FiGithub />
                            <a
                                href="https://github.com/hamasaki-code"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="GitHub"
                                className="hover:underline"
                            >
                                GitHub
                            </a>
                        </li>
                        <li className="flex items-center gap-3 text-gray-700 transition-colors hover:text-black dark:text-yellow-200 dark:hover:text-yellow-50">
                            <RiTwitterXLine />
                            <a
                                href="https://x.com/OnTAumv5KAoVGN5"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="X (Twitter)"
                                className="hover:underline"
                            >
                                X（旧Twitter）
                            </a>
                        </li>
                        <li className="flex items-center gap-3 text-gray-700 transition-colors hover:text-black dark:text-yellow-200 dark:hover:text-yellow-50">
                            <SiLinkedin />
                            <a
                                href="https://www.linkedin.com/in/taishi-hamasaki-628424350"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="LinkedIn"
                                className="hover:underline"
                            >
                                LinkedIn
                            </a>
                        </li>
                        <li className="flex items-center gap-3 text-gray-700 transition-colors hover:text-black dark:text-yellow-200 dark:hover:text-yellow-50">
                            <SiWantedly />
                            <a
                                href="https://www.wantedly.com/id/develop_hama"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Wantedly"
                                className="hover:underline"
                            >
                                Wantedly
                            </a>
                        </li>
                        <li className="flex items-center gap-3 text-gray-700 transition-colors hover:text-black dark:text-yellow-200 dark:hover:text-yellow-50">
                            <RiAccountCircleLine />
                            <a
                                href="https://youtrust.jp/users/develop_hama"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="YOUTRUST"
                                className="hover:underline"
                            >
                                YOUTRUST
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
}