import { FaGithub, FaXTwitter, FaLinkedin } from "react-icons/fa6";
import { SiWantedly } from "react-icons/si";
import { FiMapPin } from "react-icons/fi";
import Image from "next/image";

export default function About(): JSX.Element {
  return (
    <section id="about" className="relative scroll-mt-28 py-20">
      <div className="pointer-events-none absolute inset-x-0 top-14 flex justify-center">
        <span className="h-px w-11/12 max-w-4xl bg-gradient-to-r from-transparent via-yellow-500/20 to-transparent" />
      </div>
      <div className="pointer-events-none absolute -top-40 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-yellow-300/12 blur-3xl dark:bg-yellow-500/10" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-60 w-60 rounded-full bg-yellow-200/10 blur-3xl dark:bg-yellow-500/10" />

      <div className="relative mx-auto max-w-5xl px-6 sm:px-10">
        <header className="text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-yellow-600/80 dark:text-yellow-300">Introduction</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-black/90 dark:text-yellow-200 md:text-5xl">
            About Me
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-gray-700 dark:text-gray-300">
            大阪府出身のエンジニアです。大学で情報系を専攻し、現在はモバイルアプリの保守開発を担当しながら日々学び続けています。
            Flutter を中心に、Next.js や Ruby on Rails などの Web 技術にも強い関心を持ち、個人開発などで学習に励んでいます。
          </p>
        </header>

        <div className="mt-14 grid gap-12 md:grid-cols-[minmax(0,220px)_1fr] md:items-start">
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-yellow-400/30 blur-2xl" aria-hidden />
              <Image
                src="/profile.jpg"
                alt="Taishi Hamasaki"
                width={200}
                height={200}
                className="relative rounded-full border-4 border-yellow-200 object-cover shadow-[0_18px_45px_-28px_rgba(0,0,0,0.4)] dark:border-yellow-400"
                priority
              />
            </div>
            <div className="space-y-1">
              <h3 className="text-2xl font-semibold text-black/90 dark:text-yellow-100">Taishi Hamasaki</h3>
              <p className="text-sm uppercase tracking-[0.2em] text-yellow-600 dark:text-yellow-300">Web Engineer</p>
            </div>
          </div>

          <div className="space-y-6 text-left">
            <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-gray-600 dark:text-yellow-300">
              <span className="text-xs uppercase tracking-[0.3em] text-yellow-700/90 dark:text-yellow-400">Based in</span>
              <span className="flex items-center gap-2 rounded-full bg-yellow-500/10 px-3 py-1 text-gray-700 dark:bg-yellow-500/20 dark:text-yellow-200">
                <FiMapPin className="text-base" />
                <span>Kanagawa, Japan</span>
              </span>
            </div>
            <p className="text-base leading-relaxed text-gray-700 dark:text-gray-200">
              Webアプリケーションの開発経験を軸に、Flutter を用いたモバイルアプリ開発、UI 改善、Crashlytics 対応など幅広く担当しています。
              チームでの勉強会運営や輪読会での発表も行い、知見の共有と継続的な学習を大切にしています。
            </p>
            <p className="text-base leading-relaxed text-gray-700 dark:text-gray-200">
              新しい技術に積極的に取り組みながら、ユーザー体験を高める設計と開発に注力。Next.js や Ruby on Rails を活かしたサービスづくりに挑戦しています。
            </p>

            <div>
              <h4 className="text-sm font-semibold uppercase tracking-[0.3em] text-yellow-700/80 dark:text-yellow-400">
                Social Links
              </h4>
              <div className="mt-4 flex flex-wrap gap-4">
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

                {/* Twitter / X */}
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
        </div>
      </div>
    </section>
  );
}
