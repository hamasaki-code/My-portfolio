import Head from 'next/head';

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
        <section id="about" className="my-16">
          <h2 className="text-4xl font-bold mb-6 text-black">About Me</h2>
          <p className="text-lg leading-relaxed text-gray-800">
            大阪府出身のエンジニア。大学では情報理工学部を卒業し、その後Webアプリケーションエンジニアとしてキャリアをスタートしました。現在は主にモバイルアプリ開発の保守を担当しており、開発環境としてFlutterを使用しています。これらの経験を通じて、モバイル開発に対する知識とスキルを日々磨いています。
          </p>

          {/* 経歴セクション */}
          <section id="experience" className="my-16">
            <h2 className="text-4xl font-bold mb-6 text-black">Experience</h2>
            
            <div className="relative border-l-4 border-black ml-4">
              {/* 1つ目の経験 */}
              <div className="mb-10 ml-8">
                <div className="absolute w-6 h-6 bg-black rounded-full -left-3"></div>
                <time className="text-xl font-semibold text-gray-700">2024 - Present</time>
                <h3 className="text-2xl font-bold mt-1">Webアプリケーションエンジニア - 〇〇株式会社</h3>
                <p className="text-lg leading-relaxed text-gray-800 mt-2">
                  Webアプリケーションエンジニアとして、モバイルアプリケーションの保守を担当し、Flutterを使用した開発を行っています。また、プロジェクト管理やコードレビューも担当しています。
                </p>
              </div>

              {/* 2つ目の経験 */}
              <div className="mb-10 ml-8">
                <div className="absolute w-6 h-6 bg-black rounded-full -left-3"></div>
                <time className="text-xl font-semibold text-gray-700">2020 - 2022</time>
                <h3 className="text-2xl font-bold mt-1">フリーランスエンジニア</h3>
                <p className="text-lg leading-relaxed text-gray-800 mt-2">
                  フリーランスとして、Webアプリケーションやモバイルアプリの保守・新規開発を経験。クライアントのニーズに応じて、ReactやNext.js、Flutterを使用した開発を行いました。
                </p>
              </div>

              {/* 3つ目の経験 */}
              <div className="mb-10 ml-8">
                <div className="absolute w-6 h-6 bg-black rounded-full -left-3"></div>
                <time className="text-xl font-semibold text-gray-700">2020 - 202</time>
                <h3 className="text-2xl font-bold mt-1">学生 - 情報理工学部</h3>
                <p className="text-lg leading-relaxed text-gray-800 mt-2">
                  情報理工学部でプログラミングやシステム開発について学びました。この期間中に、Webアプリケーション開発に興味を持ち、実際のプロジェクトに取り組みました。
                </p>
              </div>
            </div>
          </section>


          {/* GitHubとXのリンクを追加 */}
          <p className="mt-6">
            <strong className="text-xl text-black">Connect with me:</strong><br />
            <a href="https://github.com/hamasaki-code" className="text-black font-bold hover:text-yellow-600 transition duration-300" target="_blank" rel="noopener noreferrer">
              GitHub
            </a> | 
            <a href="https://x.com/OnTAumv5KAoVGN5" className="text-black font-bold hover:text-yellow-600 transition duration-300 ml-2" target="_blank" rel="noopener noreferrer">
              X (Twitter)
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
          </div>
        </section>


        {/* コンテクトセクション */}
        <section id="contact" className="my-16">
          <h2 className="text-4xl font-bold mb-6 text-black">Contact</h2>
          <p className="text-lg leading-relaxed">
            If you'd like to reach out, feel free to send me an email at <a href="mailto:dazhibinqi@gmail.com" className="text-black font-bold hover:text-yellow-600 transition duration-300">dazhibinqi@gmail.com</a>.
          </p>
        </section>
      </main>

      {/* フッター */}
      <footer className="bg-black text-white p-6 text-center">
        <p className="text-sm">&copy; 2024 My Portfolio. All rights reserved.</p>
      </footer>
    </div>
  );
}
