import Image from 'next/image';
import { FaGithub, FaTwitter } from 'react-icons/fa';

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
        <p className="text-xl font-bold text-gray-900 dark:text-white mb-4">Connect with me:</p>
        <div className="flex justify-center space-x-6">
          {/* GitHub Icon */}
          <a href="https://github.com/hamasaki-code" aria-label="GitHub profile" className="text-gray-800 dark:text-gray-200 hover:text-yellow-500 dark:hover:text-yellow-300 transition duration-300 transform hover:scale-110" target="_blank" rel="noopener noreferrer">
            <FaGithub className="inline-block w-6 h-6 mr-2" />
            GitHub
          </a>

          {/* Twitter Icon */}
          <a href="https://x.com/OnTAumv5KAoVGN5" aria-label="Twitter profile" className="text-gray-800 dark:text-gray-200 hover:text-yellow-500 dark:hover:text-yellow-300 transition duration-300 transform hover:scale-110" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="inline-block w-6 h-6 mr-2" />
            X (Twitter)
          </a>

          {/* Wantedly Icon */}
          <a href="https://www.wantedly.com/id/develop_hama" aria-label="Wantedly profile" className="text-gray-800 dark:text-gray-200 hover:text-yellow-500 dark:hover:text-yellow-300 transition duration-300 transform hover:scale-110" target="_blank" rel="noopener noreferrer">
            <Image
              src="/Wantedly_Mark_LightBG.png"
              alt="Wantedly"
              width={24}
              height={24}
              className="inline-block mr-2"
            />
            Wantedly
          </a>

          {/* YOUTRUST Icon */}
          <a
            href="https://youtrust.jp/users/develop_hama"
            aria-label="YOUTRUST profile"
            className="text-gray-800 dark:text-gray-200 hover:text-yellow-500 dark:hover:text-yellow-300 transition duration-300 transform hover:scale-110"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/YOUTRUST.png"
              alt="YOUTRUST"
              width={24}
              height={24}
              className="inline-block mr-2"
            />
            YOUTRUST
          </a>

          {/* LinkedIn Icon */}
          <a
            href="https://www.linkedin.com/in/taishi-hamasaki-628424350/"
            aria-label="LinkedIn profile"
            className="text-gray-800 dark:text-gray-200 hover:text-yellow-500 dark:hover:text-yellow-300 transition duration-300 transform hover:scale-110"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/LinkedIn.png"
              alt="LinkedIn"
              width={24}
              height={24}
              className="inline-block mr-2"
            />
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
