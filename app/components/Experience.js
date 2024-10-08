export default function Experience() {
  return (
    <section id="experience" className="my-16">
      <h2 className="text-4xl font-bold mb-6 text-black dark:text-white">Experience</h2>

      <div className="relative border-l-4 border-black dark:border-white ml-4">
        {/* 1つ目の経験 */}
        <div className="mb-10 ml-8">
          <div className="absolute w-6 h-6 bg-black dark:bg-white rounded-full -left-3"></div>
          <time className="text-xl font-semibold text-gray-700 dark:text-gray-300">2024年4月 - 現在</time>
          <h3 className="text-2xl font-bold mt-1 text-black dark:text-white">正社員 - Webアプリケーションエンジニア</h3>
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
  );
}