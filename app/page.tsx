"use client";

import Head from 'next/head';
import Image from 'next/image';
import { FaNodeJs, FaGitAlt, FaHtml5, FaCss3Alt, FaJsSquare } from 'react-icons/fa';
import { SiFlutter, SiUnity } from 'react-icons/si'; 
import { useState, useEffect } from 'react';
import { FaReact } from 'react-icons/fa';
import { SiRuby } from 'react-icons/si'; 
import { EnvelopeIcon } from '@heroicons/react/24/outline';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const darkModePreference = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (darkModePreference) {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDarkMode(false);
    }

    const timer = setTimeout(() => {
      setLoading(false);  // ローディングを解除
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-yellow-400 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-black dark:border-white"></div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-yellow-400 dark:bg-gray-900">
        {/* ローディングアニメーション */}
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-black dark:border-white"></div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      {/* SEOやタイトル設定 */}
      <Head>
        <title>My Portfolio</title>
        <meta name="description" content="Welcome to my personal portfolio. Showcasing my skills and projects in web development, including React, Node.js, Flutter, and more." />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />

        {/* Viewport for responsive design */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Open Graph (OG) tags for social sharing */}
        <meta property="og:title" content="My Portfolio" />
        <meta property="og:description" content="Showcasing my skills and projects in web development, including React, Node.js, Flutter, and more." />
        <meta property="og:image" content="/profile.jpg" />
        <meta property="og:url" content="https://my-portfolio.com" />
        <meta property="og:type" content="website" />

        {/* Twitter Card tags for better social sharing */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="My Portfolio" />
        <meta name="twitter:description" content="Showcasing my skills and projects in web development, including React, Node.js, Flutter, and more." />
        <meta name="twitter:image" content="/profile.jpg" />
        <meta name="twitter:site" content="@yourtwitterhandle" />

        {/* Robots meta tag */}
        <meta name="robots" content="index, follow" />
      </Head>


      {/* ヘッダーセクション */}
      <header className="bg-yellow-400 dark:bg-gray-800 text-black dark:text-white p-6 border-b-4 border-black dark:border-white shadow-lg">
        <nav className="container mx-auto flex justify-between items-center">
          <h1 className="text-4xl font-extrabold tracking-wider">My Portfolio</h1>

          {/* ハンバーガーメニュー用ボタン */}
          <button
            className="block md:hidden text-black dark:text-white focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)} 
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>

          {/* ナビゲーションメニュー */}
          <ul className={`${menuOpen ? 'block' : 'hidden'} md:flex space-x-6`} id="menu">
            <li><a href="#about" className="hover:text-gray-700 dark:hover:text-gray-400 font-semibold">About Me</a></li>
            <li><a href="#projects" className="hover:text-gray-700 dark:hover:text-gray-400 font-semibold">Projects</a></li>
            <li><a href="#contact" className="hover:text-gray-700 dark:hover:text-gray-400 font-semibold">Contact</a></li>
            {/* ダークモード切り替えボタンをメニュー内に追加 */}
            <li>
              <button
                onClick={toggleDarkMode}
                className="hover:text-gray-700 dark:hover:text-gray-400 font-semibold"
              >
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
              </button>
            </li>
          </ul>
        </nav>
      </header>

      {/* メインセクション */}
      <main className="container mx-auto p-6 bg-white dark:bg-gray-900">
        {/* 自己紹介セクション */}
        <section id="about" className="my-16 text-center">
          <h2 className="text-4xl font-bold mb-6 text-black dark:text-white">About Me</h2>
          
          {/* 丸いアイコン画像を追加 */}
          <div className="mb-6">
            <Image 
              src="/profile.jpg" 
              alt="Profile Picture" 
              width={300} 
              height={300} 
              className="rounded-full shadow-lg mx-auto"
              sizes="(max-width: 768px) 100vw, 300px" 
              priority={true}  
            />
          </div>

          {/* 名前と職種を表示 */}
          <h3 className="text-3xl font-extrabold text-gray-900 dark:text-gray-200">Taishi Hamasaki</h3>
          <p className="text-xl font-medium text-gray-700 dark:text-gray-400 mt-2 mb-6">Web Engineer</p>

          {/* 自己紹介文 */}
          <p className="text-lg leading-relaxed text-gray-800 dark:text-gray-200 max-w-3xl mx-auto">
            大阪府出身のエンジニア。大学では情報理工学部を卒業し、その後Webアプリケーションエンジニアとしてキャリアをスタートしました。現在は主にモバイルアプリ開発の保守を担当しており、開発環境としてFlutterを使用しています。これらの経験を通じて、モバイル開発に対する知識とスキルを日々磨いています。
          </p>

          {/* SNSリンク */}
          <div className="mt-8">
            <p className="text-xl font-bold text-gray-900 dark:text-white mb-4">Connect with me:</p>
            <div className="flex justify-center space-x-6">
              <a href="https://github.com/hamasaki-code" className="text-gray-800 dark:text-gray-200 hover:text-yellow-500 dark:hover:text-yellow-300 transition duration-300 transform hover:scale-110" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              <a href="https://x.com/OnTAumv5KAoVGN5" className="text-gray-800 dark:text-gray-200 hover:text-yellow-500 dark:hover:text-yellow-300 transition duration-300 transform hover:scale-110" target="_blank" rel="noopener noreferrer">
                X (Twitter)
              </a>
              <a href="https://www.wantedly.com/id/develop_hama" className="text-gray-800 dark:text-gray-200 hover:text-yellow-500 dark:hover:text-yellow-300 transition duration-300 transform hover:scale-110" target="_blank" rel="noopener noreferrer">
                Wantedly
              </a>
            </div>
          </div>
        </section>


        {/* プロジェクトセクション */}
        <section id="projects" className="my-16">
          <h2 className="text-4xl font-bold mb-6 text-black dark:text-white">Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* タスク管理アプリ */}
            <div className="border border-black dark:border-white rounded-lg shadow-lg p-6 bg-white dark:bg-gray-800 hover:shadow-xl transition duration-300">
              <h3 className="text-2xl font-bold mb-2 text-black dark:text-white">タスク管理アプリ（Next.js）</h3>
              <p className="text-gray-800 dark:text-gray-200">
                タスク作成、完了、削除機能を持ち、詳細閲覧が可能なタスク管理アプリです。Next.jsを使用して開発され、効率的なタスク管理をサポートします。
              </p>
            </div>
            {/* Bookers */}
            <div className="border border-black dark:border-white rounded-lg shadow-lg p-6 bg-white dark:bg-gray-800 hover:shadow-xl transition duration-300">
              <h3 className="text-2xl font-bold mb-2 text-black dark:text-white">Bookers (Ruby on Rails)</h3>
              <p className="text-gray-800 dark:text-gray-200">
                本の投稿、編集、削除、コメント、いいね機能を提供するWebアプリケーションです。Ruby on Railsを使用して開発され、ユーザーが読書体験を共有し、他のユーザーと交流できます。
              </p>
            </div>
            {/* Portfolio */}
            <div className="border border-black dark:border-white rounded-lg shadow-lg p-6 bg-white dark:bg-gray-800 hover:shadow-xl transition duration-300">
              <h3 className="text-2xl font-bold mb-2 text-black dark:text-white">Portfolio（Next.js）</h3>
              <p className="text-gray-800 dark:text-gray-200">
                このポートフォリオは、私のスキルやプロジェクトを視覚的かつ簡潔に紹介するために構築しました。モダンなデザインとシンプルなナビゲーションを重視し、レスポンシブ対応で様々なデバイスでの閲覧が可能です。使用技術としては、Next.jsをベースに、Tailwind CSSを用いたスタイルを採用しています。
              </p>
            </div>
          </div>
        </section>

        <section id="skills" className="my-16">
          <h2 className="text-4xl font-bold mb-6 text-black dark:text-white">Skills & Technologies</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 text-center">
            {/* 技術スキルセクション */}
            <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md hover:bg-gray-200 dark:hover:bg-gray-600 transition">
              <SiRuby className="text-red-500 w-16 h-16 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-black dark:text-white">Ruby on Rails</h3>
              <p className="text-gray-700 dark:text-gray-300">MVC, RESTful API</p>
            </div>
            <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md hover:bg-gray-200 dark:hover:bg-gray-600 transition">
              <FaJsSquare className="text-yellow-500 w-16 h-16 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-black dark:text-white">JavaScript</h3>
              <p className="text-gray-700 dark:text-gray-300">ES6, TypeScript</p>
            </div>
            <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md hover:bg-gray-200 dark:hover:bg-gray-600 transition">
              <FaReact className="text-blue-500 w-16 h-16 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-black dark:text-white">React</h3>
              <p className="text-gray-700 dark:text-gray-300">Hooks, Context API</p>
            </div>
            <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md hover:bg-gray-200 dark:hover:bg-gray-600 transition">
              <FaNodeJs className="text-green-500 w-16 h-16 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-black dark:text-white">Node.js</h3>
              <p className="text-gray-700 dark:text-gray-300">Express.js, REST APIs</p>
            </div>
            <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md hover:bg-gray-200 dark:hover:bg-gray-600 transition">
              <FaGitAlt className="text-orange-500 w-16 h-16 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-black dark:text-white">Git & GitHub</h3>
              <p className="text-gray-700 dark:text-gray-300">Version Control</p>
            </div>
            <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md hover:bg-gray-200 dark:hover:bg-gray-600 transition">
              <FaHtml5 className="text-orange-600 w-16 h-16 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-black dark:text-white">HTML5</h3>
              <p className="text-gray-700 dark:text-gray-300">Semantic HTML</p>
            </div>
            <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md hover:bg-gray-200 dark:hover:bg-gray-600 transition">
              <FaCss3Alt className="text-blue-500 w-16 h-16 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-black dark:text-white">CSS3</h3>
              <p className="text-gray-700 dark:text-gray-300">Responsive Design</p>
            </div>
            <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md hover:bg-gray-200 dark:hover:bg-gray-600 transition">
              <SiFlutter className="text-blue-400 w-16 h-16 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-black dark:text-white">Flutter</h3>
              <p className="text-gray-700 dark:text-gray-300">Cross-platform</p>
            </div>
            <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md hover:bg-gray-200 dark:hover:bg-gray-600 transition">
              <SiUnity className="text-gray-800 w-16 h-16 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-black dark:text-white">Unity</h3>
              <p className="text-gray-700 dark:text-gray-300">Game Development</p>
            </div>
          </div>
        </section>

         {/* 経歴セクション */}
        <section id="experience" className="my-16">
          <h2 className="text-4xl font-bold mb-6 text-black dark:text-white">Experience</h2>

          <div className="relative border-l-4 border-black dark:border-white ml-4">
            {/* 1つ目の経験 */}
            <div className="mb-10 ml-8">
              <div className="absolute w-6 h-6 bg-black dark:bg-white rounded-full -left-3"></div>
              <time className="text-xl font-semibold text-gray-700 dark:text-gray-300">2024年4月 - 現在</time>
              <h3 className="text-2xl font-bold mt-1 text-black dark:text-white">株式会社マイナビ - Webアプリケーションエンジニア</h3>
              <p className="text-lg leading-relaxed text-gray-800 dark:text-gray-300 mt-2">
                Webアプリケーションエンジニアとして、モバイルアプリケーションの保守を担当し、Flutterを使用した開発を行っています。また、プロジェクト管理やコードレビューに加え、PBI（プロダクトバックログアイテム）の管理および一部担当を行い、チーム内のスプリント計画にも貢献しています。
              </p>
            </div>

            {/* 2つ目の経験 */}
            <div className="mb-10 ml-8">
              <div className="absolute w-6 h-6 bg-black dark:bg-white rounded-full -left-3"></div>
              <time className="text-xl font-semibold text-gray-700 dark:text-gray-300">2023年6月 - 2024年3月</time>
              <h3 className="text-2xl font-bold mt-1 text-black dark:text-white">株式会社LITALICO - LITALICOワンダー・セールス（アルバイト）</h3>
              <p className="text-lg leading-relaxed text-gray-800 dark:text-gray-300 mt-2">
                子供たちに向けたオンラインで行うIT×ものづくり（Scratch, Minecraft, Unity）の体験授業や入塾案内を担当しました。合計172件のクロージングを含めた体験授業を行い、そのうち44件の成約を取り、子供たちがLITALICOワンダーオンラインに入塾しました。
              </p>
            </div>

            {/* 3つ目の経験 */}
            <div className="mb-10 ml-8">
              <div className="absolute w-6 h-6 bg-black dark:bg-white rounded-full -left-3"></div>
              <time className="text-xl font-semibold text-gray-700 dark:text-gray-300">2021年4月 - 2023年3月</time>
              <h3 className="text-2xl font-bold mt-1 text-black dark:text-white">株式会社インフラトップ - DMMWEBCAMP・メンター（インターン）</h3>
              <p className="text-lg leading-relaxed text-gray-800 dark:text-gray-300 mt-2">
                プログラミングスクール「DMM WEBCAMP」でメンターを務め、フロントエンドとバックエンドの技術指導を担当しました。主なフロントエンド技術として、HTML & CSS、Bootstrap、JavaScriptを指導し、バックエンドではRuby on Railsの基礎を教えました。また、バージョン管理にはGitを使用し、オンラインでの開発をサポートしました。
              </p>
            </div>

            {/* 4つ目の経験 */}
            <div className="mb-10 ml-8">
              <div className="absolute w-6 h-6 bg-black dark:bg-white rounded-full -left-3"></div>
              <time className="text-xl font-semibold text-gray-700 dark:text-gray-300">2020年4月 - 2024年3月</time>
              <h3 className="text-2xl font-bold mt-1 text-black dark:text-white">京都産業大学 - 情報理工学部 情報理工学科</h3>
              <p className="text-lg leading-relaxed text-gray-800 dark:text-gray-300 mt-2">
                情報理工学部でプログラミングやシステム開発について学びました。この期間中に、Webアプリケーション開発に興味を持ち、インターンシップに取り組みました。卒業研究では、モーションキャプチャーとVRを用いたスポーツトレーニング支援システムの研究を行い、テニスコートをVR空間で再現し、モーションキャプチャーカメラを使用してフォームの改善を支援するフィードバックシステムを開発しました。研究では、Unity、MotionBuilder、Viconといった技術を活用しました。
              </p>
            </div>
          </div>
        </section>


        {/* コンテクトセクション */}
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
              className="inline-flex items-center px-8 py-4 bg-black text-white font-bold rounded-lg shadow-lg hover:bg-gray-900 transition duration-300 transform hover:scale-105"
            >
              {/* メールアイコン */}
              <EnvelopeIcon className="w-6 h-6 mr-2 text-yellow-400 hover:text-yellow-300 transition duration-300" />
              Send Email
            </a>
          </div>
        </section>

      </main>

      {/* フッター */}
      <footer className="bg-black dark:bg-gray-800 text-white p-6 text-center">
        <p className="text-sm">&copy; 2024 My Portfolio. All rights reserved.</p>
      </footer>
    </div>
  );
}
