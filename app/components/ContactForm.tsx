"use client"

import { useState } from "react"

function ContactForm() {
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');

        try {
            const response = await fetch("/api/email", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, message }),
            });

            const data = await response.json();

            if (response.ok) {
                setStatus('success');
                setEmail('');
                setMessage('');
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
    }

    return (
        <section
            id="contact"
            className="my-16 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 dark:from-gray-700 dark:via-gray-600 dark:to-gray-500 p-8 rounded-lg shadow-md"
        >
            <h2 className="text-4xl font-bold mb-6 text-black dark:text-white text-center">
                Contact Us
            </h2>
            <form
                onSubmit={handleSubmit}
                className="max-w-xl mx-auto space-y-6"
            >
                <div>
                    <label className="block mb-2 font-semibold text-black dark:text-white">
                        Email:
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Your Email"
                        className="w-full p-3 border rounded"
                    />
                </div>
                <div>
                    <label className="block mb-2 font-semibold text-black dark:text-white">
                        Message:
                    </label>
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        placeholder="Your Message"
                        className="w-full p-3 border rounded h-32"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full px-8 py-4 bg-black text-white font-bold rounded-lg shadow-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-300"
                >
                    Send
                </button>
            </form>
        </section>
    )
}

export default ContactForm
