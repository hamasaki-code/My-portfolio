"use client";

import { useEffect, useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
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

import { sendContactEmail } from "@/app/server/contact";

const DEFAULT_FORM = {
    name: "",
    email: "",
    message: "",
};

const EMAIL_PATTERN = /^\S+@\S+\.\S+$/;

const FIELD_LABELS = {
    name: "Name",
    email: "Email",
    message: "Message",
} as const;

type ContactFormValues = typeof DEFAULT_FORM;
type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;

function validateForm(values: ContactFormValues): ContactFormErrors {
    const errors: ContactFormErrors = {};

    if (!values.name.trim()) {
        errors.name = `${FIELD_LABELS.name} is required.`;
    }

    if (!values.email.trim()) {
        errors.email = `${FIELD_LABELS.email} is required.`;
    } else if (!EMAIL_PATTERN.test(values.email)) {
        errors.email = "Invalid email format.";
    }

    if (!values.message.trim()) {
        errors.message = `${FIELD_LABELS.message} is required.`;
    }

    return errors;
}

export default function ContactForm() {
    const [form, setForm] = useState(DEFAULT_FORM);
    const [errors, setErrors] = useState<ContactFormErrors>({});
    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (status === "success" || status === "error") {
            const timer = setTimeout(() => setStatus("idle"), 4000);
            if (status === "success") {
                modalRef.current?.focus();
            }
            return () => clearTimeout(timer);
        }
    }, [status]);

    const handleFieldChange = (field: keyof ContactFormValues) =>
        (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const value = event.target.value;
            const nextForm = {
                ...form,
                [field]: value,
            } as ContactFormValues;

            setForm(nextForm);

            setErrors((prev) => {
                const nextErrors = { ...prev } as ContactFormErrors;

                if (field === "email") {
                    if (!value.trim()) {
                        delete nextErrors.email;
                    } else if (!EMAIL_PATTERN.test(value)) {
                        nextErrors.email = "Invalid email format.";
                    } else {
                        delete nextErrors.email;
                    }
                } else if (prev[field]) {
                    if (value.trim()) {
                        delete nextErrors[field];
                    }
                }

                return nextErrors;
            });

            if (status === "error") {
                setStatus("idle");
                setErrorMessage(null);
            }
        };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const validationErrors = validateForm(form);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setStatus("error");
            setErrorMessage("Please correct the highlighted fields and try again.");
            return;
        }

        setStatus("sending");
        setErrorMessage(null);

        try {
            await sendContactEmail({
                from: form.email,
                subject: `Contact from ${form.name || "Visitor"}`,
                message: `${form.message}\n\nName: ${form.name}\nEmail: ${form.email}`,
            });

            setStatus("success");
            setForm(DEFAULT_FORM);
            setErrors({});
        } catch (error) {
            console.error(error);
            setStatus("error");
            setErrorMessage(
                error instanceof Error && error.message
                    ? error.message
                    : "Something went wrong. Please try again."
            );
        }
    };

    const hasErrors = Object.keys(errors).length > 0;
    const isSubmitDisabled =
        status === "sending" ||
        hasErrors ||
        !form.name.trim() ||
        !form.email.trim() ||
        !form.message.trim();

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

                <form onSubmit={handleSubmit} className="space-y-6">
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
                                    value={form.name}
                                    onChange={handleFieldChange("name")}
                                    placeholder="Your name"
                                    required
                                    className="w-full rounded-xl border border-yellow-500/30 bg-white/70 px-10 py-3 text-black placeholder-gray-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-1 focus:ring-offset-yellow-100 dark:border-yellow-500/30 dark:bg-white/10 dark:text-yellow-200 dark:placeholder-yellow-200 dark:focus:ring-yellow-400 dark:focus:ring-offset-0"
                                />
                            </div>
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
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
                                    value={form.email}
                                    onChange={handleFieldChange("email")}
                                    placeholder="you@example.com"
                                    required
                                    className="w-full rounded-xl border border-yellow-500/30 bg-white/70 px-10 py-3 text-black placeholder-gray-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-1 focus:ring-offset-yellow-100 dark:border-yellow-500/30 dark:bg-white/10 dark:text-yellow-200 dark:placeholder-yellow-200 dark:focus:ring-yellow-400 dark:focus:ring-offset-0"
                                />
                            </div>
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="message" className="block mb-2 font-semibold">
                            Message
                        </label>
                        <div className="relative">
                            <FiMessageSquare className="absolute left-3 top-4 text-yellow-400" />
                            <textarea
                                id="message"
                                value={form.message}
                                onChange={handleFieldChange("message")}
                                placeholder="Your message"
                                rows={5}
                                maxLength={500}
                                required
                                className="w-full rounded-xl border border-yellow-500/30 bg-white/70 px-10 py-3 text-black placeholder-gray-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-1 focus:ring-offset-yellow-100 dark:border-yellow-500/30 dark:bg-white/10 dark:text-yellow-200 dark:placeholder-yellow-200 dark:focus:ring-yellow-400 dark:focus:ring-offset-0"
                            />
                        </div>
                        <p className="text-sm text-right text-gray-600 dark:text-yellow-200">
                            {form.message.length}/500
                        </p>
                        {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitDisabled}
                        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 py-3 font-bold text-black transition-transform duration-200 hover:scale-[1.01] hover:shadow-[0_18px_45px_-28px_rgba(250,204,21,0.6)] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {status === "sending" && <FiLoader className="animate-spin" />}
                        {status === "idle" && <FiSend />}
                        {status === "sending" ? "Sending..." : "Send"}
                    </button>
                </form>

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
