import { EnvelopeIcon } from '@heroicons/react/24/outline';

export default function Contact() {
  return (
    <section id="contact" className="my-16 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 dark:from-gray-700 dark:via-gray-600 dark:to-gray-500 p-8 rounded-lg shadow-md">
      <h2 className="text-4xl font-bold mb-6 text-black dark:text-white text-center">Contact Me</h2>
      <p className="text-lg leading-relaxed text-gray-800 dark:text-gray-200 mb-4 text-center">
        If you'd like to reach out, feel free to send me an email.
      </p>
      <p className="text-lg text-center text-gray-800 dark:text-gray-200 mb-8">
        Send an email to me: <a href="mailto:dazhibinqi@gmail.com" className="text-blue-500 dark:text-yellow-300 font-semibold hover:underline">dazhibinqi@gmail.com</a>
      </p>
      <div className="flex justify-center">
        <a
          href="mailto:dazhibinqi@gmail.com"
          aria-label="Send an email to Taishi Hamasaki"
          className="inline-flex items-center px-8 py-4 bg-black text-white font-bold rounded-lg shadow-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-300 transform hover:scale-105"
        >
          <EnvelopeIcon className="w-6 h-6 mr-2 text-yellow-400 hover:text-yellow-300 transition duration-300" />
          Send Email
        </a>
      </div>
    </section>
  );
}
