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
          <h2 className="text-4xl font-bold mb-6 text-black">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* 各プロジェクトカード */}
            <div className="border border-black rounded-lg shadow-lg p-6 bg-white hover:shadow-xl transition duration-300">
              <h3 className="text-2xl font-bold mb-2">Project 1</h3>
              <p>A brief description of the project.</p>
            </div>
            <div className="border border-black rounded-lg shadow-lg p-6 bg-white hover:shadow-xl transition duration-300">
              <h3 className="text-2xl font-bold mb-2">Project 2</h3>
              <p>A brief description of the project.</p>
            </div>
            <div className="border border-black rounded-lg shadow-lg p-6 bg-white hover:shadow-xl transition duration-300">
              <h3 className="text-2xl font-bold mb-2">Project 3</h3>
              <p>A brief description of the project.</p>
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
