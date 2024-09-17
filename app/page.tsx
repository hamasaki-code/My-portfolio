import Head from 'next/head';
import Image from 'next/image';

export default function Home() {
  return (
    <div>
      {/* SEOやタイトル設定 */}
      <Head>
        <title>My Portfolio</title>
        <meta name="description" content="Welcome to my personal portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* ヘッダーセクション */}
      <header className="bg-yellow-400 text-black p-6 border-b-4 border-black shadow-lg">
        <nav className="container mx-auto flex justify-between items-center">
          <h1 className="text-4xl font-extrabold tracking-wider">My Portfolio</h1>
          <ul className="flex space-x-6">
            <li><a href="#about" className="hover:text-gray-700 font-semibold">About Me</a></li>
            <li><a href="#projects" className="hover:text-gray-700 font-semibold">Projects</a></li>
            <li><a href="#contact" className="hover:text-gray-700 font-semibold">Contact</a></li>
          </ul>
        </nav>
      </header>

      {/* メインセクション */}
      <main className="container mx-auto p-6">
        {/* 自己紹介セクション */}
        <section id="about" className="my-16 text-center">
          <h2 className="text-4xl font-bold mb-6 text-black">About Me</h2>
          {/* 丸いアイコン画像を追加 */}
          <div className="mb-6">
            <Image 
              src="/profile.jpg" 
              alt="Profile Picture" 
              width={300} 
              height={300} 
              className="rounded-full shadow-lg mx-auto"
            />
          </div>
          <p className="text-lg leading-relaxed text-gray-800">
            大阪府出身のエンジニア。大学では情報理工学部を卒業し、その後Webアプリケーションエンジニアとしてキャリアをスタートしました。現在は主にモバイルアプリ開発の保守を担当しており、開発環境としてFlutterを使用しています。これらの経験を通じて、モバイル開発に対する知識とスキルを日々磨いています。
          </p>

          {/* GitHubとXのリンクを追加 */}
          <p className="mt-6">
            <strong className="text-xl text-black">SNS</strong><br />
            <a href="https://github.com/hamasaki-code" className="text-black font-bold hover:text-yellow-600 transition duration-300" target="_blank" rel="noopener noreferrer">
              GitHub
            </a> | 
            <a href="https://x.com/OnTAumv5KAoVGN5" className="text-black font-bold hover:text-yellow-600 transition duration-300 ml-2" target="_blank" rel="noopener noreferrer">
              X (Twitter)
            </a> | 
            <a href="https://www.wantedly.com/id/develop_hama" className="text-black font-bold hover:text-yellow-600 transition duration-300 ml-2" target="_blank" rel="noopener noreferrer">
              Wantedly
            </a>
          </p>
        </section>

        {/* プロジェクトセクション */}
        <section id="projects" className="my-16">
          <h2 className="text-4xl font-bold mb-6 text-black">Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* タスク管理アプリ */}
            <div className="border border-black rounded-lg shadow-lg p-6 bg-white hover:shadow-xl transition duration-300">
              <h3 className="text-2xl font-bold mb-2">タスク管理アプリ（Next.js）</h3>
              <p>
                タスク作成、完了、削除機能を持ち、詳細閲覧が可能なタスク管理アプリです。Next.jsを使用して開発され、効率的なタスク管理をサポートします。
              </p>
            </div>
            {/* Bookers */}
            <div className="border border-black rounded-lg shadow-lg p-6 bg-white hover:shadow-xl transition duration-300">
              <h3 className="text-2xl font-bold mb-2">Bookers (Ruby on Rails)</h3>
              <p>
                本の投稿、編集、削除、コメント、いいね機能を提供するWebアプリケーションです。Ruby on Railsを使用して開発され、ユーザーが読書体験を共有し、他のユーザーと交流できます。
              </p>
            </div>
            {/* Portfolio */}
            <div className='border border-black rounded-lg shadow-lg p-6 bg-white hover:shadow-xl transition duration-300'>
              <h3 className='text-2xl font-bold mb-2'>Portfolio（Next.js）</h3>
              <p>
                このポートフォリオは、私のスキルやプロジェクトを視覚的かつ簡潔に紹介するために構築しました。モダンなデザインとシンプルなナビゲーションを重視し、レスポンシブ対応で様々なデバイスでの閲覧が可能です。使用技術としては、Next.jsをベースに、Tailwind CSSを用いたスタイルを採用しています。
              </p>
            </div>
          </div>
        </section>

        {/* 経歴セクション */}
        <section id="experience" className="my-16">
          <h2 className="text-4xl font-bold mb-6 text-black">Experience</h2>
          
          <div className="relative border-l-4 border-black ml-4">
            {/* 1つ目の経験 */}
            <div className="mb-10 ml-8">
              <div className="absolute w-6 h-6 bg-black rounded-full -left-3"></div>
              <time className="text-xl font-semibold text-gray-700">2024年4月 - 現在</time>
              <h3 className="text-2xl font-bold mt-1">株式会社マイナビ - Webアプリケーションエンジニア</h3>
              <p className="text-lg leading-relaxed text-gray-800 mt-2">
                Webアプリケーションエンジニアとして、モバイルアプリケーションの保守を担当し、Flutterを使用した開発を行っています。また、プロジェクト管理やコードレビューに加え、PBI（プロダクトバックログアイテム）の管理および一部担当を行い、チーム内のスプリント計画にも貢献しています。
              </p>
            </div>

            {/* 2つ目の経験 */}
            <div className="mb-10 ml-8">
              <div className="absolute w-6 h-6 bg-black rounded-full -left-3"></div>
              <time className="text-xl font-semibold text-gray-700">2023年6月 - 2024年3月</time>
              <h3 className="text-2xl font-bold mt-1">株式会社LITALICO - LITALICOワンダー・セールス（アルバイト）</h3>
              <p className="text-lg leading-relaxed text-gray-800 mt-2">
                子供たちに向けたオンラインで行うIT×ものづくり（Scratch, Minecraft, Unity）の体験授業や入塾案内を担当しました。合計172件のクロージングを含めた体験授業を行い、そのうち44件の成約を取り、子供たちがLITALICOワンダーオンラインに入塾しました。
              </p>
            </div>

            {/* 3つ目の経験 */}
            <div className="mb-10 ml-8">
              <div className="absolute w-6 h-6 bg-black rounded-full -left-3"></div>
              <time className="text-xl font-semibold text-gray-700">2021年4月 - 2023年3月</time>
              <h3 className="text-2xl font-bold mt-1">株式会社インフラトップ - DMMWEBCAMP・メンター（インターン）</h3>
              <p className="text-lg leading-relaxed text-gray-800 mt-2">
                プログラミングスクール「DMM WEBCAMP」でメンターを務め、フロントエンドとバックエンドの技術指導を担当しました。主なフロントエンド技術として、HTML & CSS、Bootstrap、JavaScriptを指導し、バックエンドではRuby on Railsの基礎を教えました。また、バージョン管理にはGitを使用し、オンラインでの開発をサポートしました。
              </p>
            </div>

            {/* 4つ目の経験 */}
            <div className="mb-10 ml-8">
              <div className="absolute w-6 h-6 bg-black rounded-full -left-3"></div>
              <time className="text-xl font-semibold text-gray-700">2020年4月 - 2024年3月</time>
              <h3 className="text-2xl font-bold mt-1">京都産業大学 - 情報理工学部 情報理工学科</h3>
              <p className="text-lg leading-relaxed text-gray-800 mt-2">
                情報理工学部でプログラミングやシステム開発について学びました。この期間中に、Webアプリケーション開発に興味を持ち、実際のプロジェクトに取り組みました。卒業研究では、モーションキャプチャーとVRを用いたスポーツトレーニング支援システムの研究を行い、テニスコートをVR空間で再現し、モーションキャプチャーカメラを使用してフォームの改善を支援するフィードバックシステムを開発しました。研究では、Unity、MotionBuilder、Viconといった技術を活用しました。
              </p>
            </div>
          </div>
        </section>

        

        {/* コンテクトセクション */}
        <section id="contact" className="my-16 bg-gray-100 p-8 rounded-lg shadow-md">
          <h2 className="text-4xl font-bold mb-6 text-black">Contact</h2>
          <p className="text-lg leading-relaxed text-gray-700 mb-6">
            If you'd like to reach out, feel free to send me an email.
          </p>
          
          {/* メールアドレスボタン */}
          <div className="flex justify-center">
            <a 
              href="mailto:dazhibinqi@gmail.com" 
              className="inline-flex items-center px-6 py-3 bg-yellow-400 text-black font-bold rounded-lg shadow-lg hover:bg-yellow-500 transition duration-300"
            >
              {/* メールアイコン */}
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12H8m4 0V4m0 8v8m0-8l-8-8m8 8l8-8" />
              </svg>
              dazhibinqi@gmail.com
            </a>
          </div>
        </section>

      </main>

      {/* フッター */}
      <footer className="bg-black text-white p-6 text-center">
        <p className="text-sm">&copy; 2024 My Portfolio. All rights reserved.</p>
      </footer>
    </div>
  );
}
