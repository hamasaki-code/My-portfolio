export default function Career() {
  return (
    <section id="Career" className="my-16">
      <h2 className="text-4xl font-bold mb-6 text-black dark:text-white">Career</h2>

      <div className="relative border-l-4 border-gray-300 dark:border-gray-700 ml-4">
        {/* 現在の職務 */}
        <div className="mb-10 ml-8">
          <div className="absolute w-6 h-6 bg-indigo-500 dark:bg-indigo-400 rounded-full -left-3 ring-4 ring-white dark:ring-gray-900"></div>
          <time className="inline-block text-xs font-semibold tracking-wide uppercase text-neutral-700 bg-neutral-100 dark:text-neutral-100 dark:bg-neutral-700 px-3 py-0.5 rounded-full mb-2">
            2024年4月 - 現在
          </time>
          <h3 className="text-2xl font-bold text-black dark:text-white">人材・広告会社</h3>
          <p className="text-base font-semibold text-neutral-600 dark:text-neutral-400 mt-1">
            Webアプリケーションエンジニア
            <span className="ml-2 inline-block text-xs font-medium px-2 py-0.5 border border-sky-400 text-sky-600 dark:text-sky-300 dark:border-sky-500 rounded-full">
              正社員
            </span>
          </p>
          <p className="text-lg leading-relaxed text-gray-800 dark:text-gray-300 mt-2">
            Webアプリケーションエンジニアとして、モバイルアプリケーションの保守を担当し、Flutterを使用した求人検索アプリの開発を行っています。<br />
            Clashlyticsの対応をはじめ、細かなバグ修正やUI改善、リリース作業などを通じて、プロジェクトに貢献しています。
          </p>
        </div>

        {/* 2つ目の経験 */}
        <div className="mb-10 ml-8">
          <div className="absolute w-6 h-6 bg-gray-400 dark:bg-gray-600 rounded-full -left-3"></div>
          <time className="inline-block text-xs font-semibold tracking-wide uppercase text-neutral-700 bg-neutral-100 dark:text-neutral-100 dark:bg-neutral-700 px-3 py-0.5 rounded-full mb-2">
            2025年5月 - 2025年7月
          </time>
          <h3 className="text-2xl font-bold text-black dark:text-white">Webサービス開発・運営会社</h3>
          <p className="text-base font-semibold text-neutral-600 dark:text-neutral-400 mt-1">
            システム設計担当
            <span className="ml-2 inline-block text-xs font-medium px-2 py-0.5 border border-amber-400 text-amber-600 dark:text-amber-300 dark:border-amber-500 rounded-full">
              副業
            </span>
          </p>
          <p className="text-lg leading-relaxed text-gray-800 dark:text-gray-300 mt-2">
            ブログ記事自動生成システムの設計を担当しました。<br />
            記事執筆の自動化を前提に、必要な機能やフローを整理し、Notionを用いた画面設計書の作成、仕様レビュー、改善提案を推進。<br />
            また、「キーワード選定 → 記事生成 → 投稿 → リライト」までを見据えた拡張性のあるシステム設計を検討し、プロジェクト基盤の整備に貢献しました。
          </p>
        </div>

        {/* 学生時代 */}
        <div className="mb-10 ml-8">
          <div className="absolute w-6 h-6 bg-gray-400 dark:bg-gray-600 rounded-full -left-3"></div>
          <time className="inline-block text-xs font-semibold tracking-wide uppercase text-neutral-700 bg-neutral-100 dark:text-neutral-100 dark:bg-neutral-700 px-3 py-0.5 rounded-full mb-2">
            2020年4月 - 2024年3月
          </time>
          <h3 className="text-2xl font-bold text-black dark:text-white">京都産業大学</h3>
          <p className="text-base font-semibold text-neutral-600 dark:text-neutral-400 mt-1">情報理工学部 情報理工学科</p>
          <p className="text-lg leading-relaxed text-gray-800 dark:text-gray-300 mt-2">
            情報理工学部にてプログラミングやシステム開発を学び、在学中にはWebアプリケーション開発への関心からインターンシップにも取り組みました。<br />
            卒業研究では、Unity・MotionBuilder・Viconなどを活用し、モーションキャプチャーとVRを組み合わせたスポーツトレーニング支援システムを開発。<br />
            具体的には、モーションキャプチャーカメラでテニスのフォームを計測し、VR空間に再現したテニスコート内でフォームを可視化・フィードバックする仕組みを構築しました。<br />
            この研究を通じて、VR開発やモーションデータの扱い、外部デバイスとの連携といった技術的知見に加え、システム設計から実装・評価までの一連の流れを経験しました。
          </p>

          <div className="relative ml-6 mt-6 before:content-[''] before:absolute before:left-0 before:top-4 before:bottom-0 before:border-l-2 before:border-gray-200 dark:before:border-gray-700 before:z-0 after:content-[''] after:absolute after:top-0 after:-left-[3.5rem] after:w-[3.75rem] after:h-4 after:border-l-1 after:border-b-2 after:rounded-bl-2xl after:border-gray-200 dark:after:border-gray-700">
            {/* 株式会社LITALICO */}
            <div className="mb-8 pl-8 relative">
              <div className="absolute w-4 h-4 bg-gray-400 dark:bg-gray-600 rounded-full -left-2 top-1 z-10"></div>
              <time className="inline-block text-xs font-semibold tracking-wide uppercase text-neutral-700 bg-neutral-100 dark:text-neutral-100 dark:bg-neutral-700 px-3 py-0.5 rounded-full mb-2">
                2023年6月 - 2024年3月
              </time>
              <h4 className="text-xl font-bold text-black dark:text-white">株式会社LITALICO</h4>
              <p className="text-base font-semibold text-neutral-600 dark:text-neutral-400 mt-1">
                LITALICOワンダー・セールス
                <span className="ml-2 inline-block text-xs font-medium px-2 py-0.5 border border-rose-400 text-rose-600 dark:text-rose-300 dark:border-rose-500 rounded-full">
                  アルバイト
                </span>
              </p>
              <p className="text-base leading-relaxed text-gray-800 dark:text-gray-300 mt-2">
                子ども向けのオンラインIT×ものづくり（Scratch、Minecraft、Unity）の体験授業や入塾案内を担当しました。<br />
                事前ヒアリングから授業、教室の説明までを一貫して行い、授業後のご案内や電話対応も担当しました。<br />
                合計172件のクロージングを含めた体験授業を行い、そのうち44件の成約を取り、子どもたちがLITALICOワンダーオンラインに入塾しました。
              </p>
            </div>

            {/* 株式会社インフラトップ */}
            <div className="pl-8 relative">
              <div className="absolute w-4 h-4 bg-gray-400 dark:bg-gray-600 rounded-full -left-2 top-1 z-10"></div>
              <time className="inline-block text-xs font-semibold tracking-wide uppercase text-neutral-700 bg-neutral-100 dark:text-neutral-100 dark:bg-neutral-700 px-3 py-0.5 rounded-full mb-2">
                2021年4月 - 2023年11月
              </time>
              <h4 className="text-xl font-bold text-black dark:text-white">株式会社インフラトップ</h4>
              <p className="text-base font-semibold text-neutral-600 dark:text-neutral-400 mt-1">
                DMM WEBCAMP・メンター
                <span className="ml-2 inline-block text-xs font-medium px-2 py-0.5 border border-emerald-400 text-emerald-600 dark:text-emerald-300 dark:border-emerald-500 rounded-full">
                  インターン
                </span>
              </p>
              <p className="text-base leading-relaxed text-gray-800 dark:text-gray-300 mt-2">
                プログラミングスクール「DMM WEBCAMP」にて、受講生へのオンライン質問対応を担当しました。<br />
                HTML/CSS、Bootstrap、JavaScriptなどのフロントエンド技術や、Ruby on Railsを用いたWebアプリケーション開発、Gitを利用したバージョン管理に関するサポートを行いました。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}