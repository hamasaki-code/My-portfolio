import { FaGithub, FaXTwitter, FaLinkedin } from "react-icons/fa6";
import { SiWantedly } from "react-icons/si";
import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="my-16 text-center">
      <h2 className="text-4xl font-bold mb-6 text-black dark:text-white">About Me</h2>
      <div className="mb-6">
        <Image
          src="/profile.jpg"
          alt="Taishi Hamasaki - Web Engineer Profile Picture"
          width={300}
          height={300}
          className="rounded-full shadow-lg mx-auto"
          sizes="(max-width: 768px) 100vw, 300px"
          priority={true}
        />
      </div>
      <h3 className="text-3xl font-extrabold text-gray-900 dark:text-gray-200">Taishi Hamasaki</h3>
      <p className="text-xl font-medium text-gray-700 dark:text-gray-400 mt-2 mb-6">Web Engineer</p>
      <p className="text-lg leading-relaxed text-gray-800 dark:text-gray-200 max-w-3xl mx-auto">
        大阪府出身のエンジニア。大学では情報理工学部を卒業し、その後Webアプリケーションエンジニアとして
        キャリアをスタートしました。現在は主にモバイルアプリ開発の保守を担当しており、開発環境としてFlutterを
        使用しています。これらの経験を通じて、モバイル開発に対する知識とスキルを日々磨いています。加えて、Web系の
        開発にも強い興味があり、ReactやNext.jsを中心に新しい技術の習得に取り組んでいます。
      </p>

      {/* SNSリンク */}
      <div className="mt-8">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Social Links</h3>
        <div className="flex justify-center space-x-4">
          {/* GitHub */}
          <a
            href="https://github.com/hamasaki-code"
            className="w-12 h-12 flex items-center justify-center rounded-full bg-yellow-400 text-black dark:bg-black dark:text-yellow-400 shadow-lg transition transform hover:scale-110 hover:bg-black hover:text-yellow-400 dark:hover:bg-yellow-400 dark:hover:text-black"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className="w-6 h-6" />
          </a>

          {/* X (Twitter) */}
          <a
            href="https://x.com/OnTAumv5KAoVGN5"
            className="w-12 h-12 flex items-center justify-center rounded-full bg-yellow-400 text-black dark:bg-black dark:text-yellow-400 shadow-lg transition transform hover:scale-110 hover:bg-black hover:text-yellow-400 dark:hover:bg-yellow-400 dark:hover:text-black"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaXTwitter className="w-6 h-6" />
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/taishi-hamasaki-628424350/"
            className="w-12 h-12 flex items-center justify-center rounded-full bg-yellow-400 text-black dark:bg-black dark:text-yellow-400 shadow-lg transition transform hover:scale-110 hover:bg-black hover:text-yellow-400 dark:hover:bg-yellow-400 dark:hover:text-black"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="w-6 h-6" />
          </a>

          {/* Wantedly */}
          <a
            href="https://www.wantedly.com/id/develop_hama"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 flex items-center justify-center rounded-full bg-yellow-400 text-black 
                        dark:bg-black dark:text-yellow-400 shadow-lg transition transform hover:scale-110 
                        hover:bg-black hover:text-yellow-400 dark:hover:bg-yellow-400 dark:hover:text-black"
          >
            <SiWantedly className="w-6 h-6" />
          </a>
        </div>
      </div>
    </section>
  );
}
