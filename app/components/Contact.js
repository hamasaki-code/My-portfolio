"use client";
import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setStatus(data.message);
      if (res.ok) {
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (error) {
      setStatus('Failed to send message.');
    }
  };

  return (
    <section id="contact" className="my-16 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 dark:from-gray-700 dark:via-gray-600 dark:to-gray-500 p-8 rounded-lg shadow-md">
      <h2 className="text-4xl font-bold mb-6 text-black dark:text-white text-center">Contact Me</h2>
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          className="w-full p-3 mb-4 border rounded"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your Email"
          className="w-full p-3 mb-4 border rounded"
          required
        />
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Your Message"
          className="w-full p-3 mb-4 border rounded h-32"
          required
        />
        <button
          type="submit"
          className="w-full px-8 py-4 bg-black text-white font-bold rounded-lg shadow-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-300"
        >
          Send
        </button>
      </form>
      {status && <p className="text-center mt-4 text-black dark:text-white">{status}</p>}
    </section>
  );
}