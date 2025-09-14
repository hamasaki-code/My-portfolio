import { FaGithub, FaXTwitter, FaLinkedin } from "react-icons/fa6";
import { SiWantedly } from "react-icons/si";
import Image from "next/image";

export default function About(): JSX.Element {
  return (
    <section
      id="about"
      className="my-24 scroll-mt-24 bg-gradient-to-b from-yellow-50 to-white dark:from-black dark:to-gray-900"
    >
      <div className="max-w-4xl mx-auto px-6 text-center">
        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-yellow-400 animate-fade-in">
          About Me
        </h2>
        <div className="w-20 h-1 bg-yellow-400 mx-auto mt-4 mb-12 rounded-full animate-fade-in" />

        {/* Profile Section */}
        <div className="flex flex-col md:flex-row items-center gap-10 text-left animate-slide-up">
          {/* Profile Image */}
          <div className="flex-shrink-0 transform transition-transform duration-300 hover:scale-105">
            <Image
              src="/profile.jpg"
              alt="Taishi Hamasaki"
              width={180}
              height={180}
              className="rounded-full shadow-xl border-4 border-yellow-400"
              priority
            />
          </div>

          {/* Text Info */}
          <div className="flex-1 space-y-4">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-yellow-300">
              Taishi Hamasaki
            </h3>
            <p className="text-base font-medium text-gray-600 dark:text-yellow-400">
              Web Engineer / Flutter Developer
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base">
              大阪府出身のエンジニア。大学で情報理工学部を卒業後、Webエンジニアとしてキャリアをスタート。
              現在はFlutterを用いたモバイルアプリの保守開発を担当しながら、日々技術を磨いています。
              <br />
              <br />
              Web技術にも強い関心があり、ReactやNext.jsを用いた開発を通じて、UI/UXの向上や新しいフレームワークの習得に取り組んでいます。
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="w-16 h-1 bg-yellow-300 mx-auto my-10 rounded-full animate-fade-in" />

        {/* Social links */}
        <div className="mt-8 animate-fade-in">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Social Links</h3>
          <div className="flex justify-center space-x-4">
            {/* GitHub */}
            <a
              href="https://github.com/hamasaki-code"
              aria-label="GitHub"
              className="w-12 h-12 flex items-center justify-center rounded-full bg-yellow-400 text-black dark:bg-black dark:text-yellow-400 shadow-lg transition transform hover:scale-110 hover:bg-black hover:text-yellow-400 dark:hover:bg-yellow-400 dark:hover:text-black"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub className="w-6 h-6" />
            </a>

            {/* X (Twitter) */}
            <a
              href="https://x.com/OnTAumv5KAoVGN5"
              aria-label="X (Twitter)"
              className="w-12 h-12 flex items-center justify-center rounded-full bg-yellow-400 text-black dark:bg-black dark:text-yellow-400 shadow-lg transition transform hover:scale-110 hover:bg-black hover:text-yellow-400 dark:hover:bg-yellow-400 dark:hover:text-black"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaXTwitter className="w-6 h-6" />
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/taishi-hamasaki-628424350/"
              aria-label="LinkedIn"
              className="w-12 h-12 flex items-center justify-center rounded-full bg-yellow-400 text-black dark:bg-black dark:text-yellow-400 shadow-lg transition transform hover:scale-110 hover:bg-black hover:text-yellow-400 dark:hover:bg-yellow-400 dark:hover:text-black"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="w-6 h-6" />
            </a>

            {/* Wantedly */}
            <a
              href="https://www.wantedly.com/id/develop_hama"
              aria-label="Wantedly"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center rounded-full bg-yellow-400 text-black dark:bg-black dark:text-yellow-400 shadow-lg transition transform hover:scale-110 hover:bg-black hover:text-yellow-400 dark:hover:bg-yellow-400 dark:hover:text-black"
            >
              <SiWantedly className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
