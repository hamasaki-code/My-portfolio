import {
  FaBuilding,
  FaLaptopCode,
  FaBriefcase,
  FaChalkboardTeacher,
} from "react-icons/fa";
import { IoIosSchool } from "react-icons/io";

export default function Career() {
  return (
    <section id="career" className="my-16 scroll-mt-24">
      <h2 className="text-4xl font-bold mb-6 text-black dark:text-yellow-100">Career</h2>

      <div className="relative border-l-4 border-yellow-200 dark:border-yellow-600 ml-6">
        {/* 現在の職務 */}
        <div className="mb-12 ml-8">
          <div className="absolute flex items-center justify-center w-8 h-8 bg-black text-yellow-300 rounded-full -left-4 ring-4 ring-yellow-100 dark:ring-yellow-900 shadow-lg">
            <FaBuilding className="w-4 h-4" />
          </div>
          <time className="inline-block text-xs font-semibold tracking-wide uppercase text-black bg-yellow-100 border border-yellow-400 dark:text-yellow-100 dark:bg-black dark:border-yellow-500 px-3 py-0.5 rounded-full shadow-sm mb-2">
            2024年4月 - 現在
          </time>
          <h3 className="text-2xl font-bold text-black dark:text-yellow-100">人材・広告会社</h3>
          <p className="text-base font-semibold text-gray-700 dark:text-yellow-200 mt-1">
            Webアプリケーションエンジニア
            <span className="ml-2 inline-block text-xs font-semibold px-2 py-0.5 border border-yellow-500 bg-black text-yellow-300 dark:border-yellow-400 dark:text-yellow-200 rounded-full">
              正社員
            </span>
          </p>
          <p className="text-lg leading-relaxed text-gray-800 dark:text-gray-200 mt-2">
            Webアプリケーションエンジニアとして、モバイルアプリケーションの保守を担当し、Flutterを使用した求人検索アプリの開発を行っています。<br />
            Clashlyticsの対応をはじめ、細かなバグ修正やUI改善、リリース作業などを通じて、プロジェクトに貢献しています。
          </p>
        </div>

        {/* 2つ目の経験 */}
        <div className="mb-12 ml-8">
          <div className="absolute flex items-center justify-center w-8 h-8 bg-yellow-400 text-black rounded-full -left-4 ring-4 ring-black/10 dark:bg-yellow-500 dark:ring-yellow-900 shadow-md">
            <FaLaptopCode className="w-4 h-4" />
          </div>
          <time className="inline-block text-xs font-semibold tracking-wide uppercase text-black bg-yellow-100 border border-yellow-400 dark:text-yellow-100 dark:bg-black dark:border-yellow-500 px-3 py-0.5 rounded-full shadow-sm mb-2">
            2025年5月 - 2025年7月
          </time>
          <h3 className="text-2xl font-bold text-black dark:text-yellow-100">Webサービス開発・運営会社</h3>
          <p className="text-base font-semibold text-gray-700 dark:text-yellow-200 mt-1">
            システム設計担当
            <span className="ml-2 inline-block text-xs font-semibold px-2 py-0.5 border border-black/20 bg-yellow-300 text-black dark:border-yellow-500 dark:bg-yellow-500/20 dark:text-yellow-200 rounded-full">
              副業
            </span>
          </p>
          <p className="text-lg leading-relaxed text-gray-800 dark:text-gray-200 mt-2">
            ブログ記事自動生成システムの設計を担当しました。<br />
            記事執筆の自動化を前提に、必要な機能やフローを整理し、Notionを用いた画面設計書の作成、仕様レビュー、改善提案を推進。<br />
            また、「キーワード選定 → 記事生成 → 投稿 → リライト」までを見据えた拡張性のあるシステム設計を検討し、プロジェクト基盤の整備に貢献しました。
          </p>
        </div>

        {/* 学生時代 */}
        <div className="mb-12 ml-8">
          <div className="absolute flex items-center justify-center w-8 h-8 bg-yellow-300 text-black rounded-full -left-4 ring-4 ring-black/10 dark:bg-yellow-500 dark:ring-yellow-900 shadow-md">
            <IoIosSchool className="w-4 h-4" />
          </div>
          <time className="inline-block text-xs font-semibold tracking-wide uppercase text-black bg-yellow-100 border border-yellow-400 dark:text-yellow-100 dark:bg-black dark:border-yellow-500 px-3 py-0.5 rounded-full shadow-sm mb-2">
            2020年4月 - 2024年3月
          </time>
          <h3 className="text-2xl font-bold text-black dark:text-yellow-100">京都産業大学</h3>
          <p className="text-base font-semibold text-gray-700 dark:text-yellow-200 mt-1">情報理工学部 情報理工学科</p>
          <p className="text-lg leading-relaxed text-gray-800 dark:text-gray-200 mt-2">
            情報理工学部にてプログラミングやシステム開発を学び、在学中にはWebアプリケーション開発への関心からインターンシップにも取り組みました。<br />
            卒業研究では、Unity・MotionBuilder・Viconなどを活用し、モーションキャプチャーとVRを組み合わせたスポーツトレーニング支援システムを開発。<br />
            具体的には、モーションキャプチャーカメラでテニスのフォームを計測し、VR空間に再現したテニスコート内でフォームを可視化・フィードバックする仕組みを構築しました。<br />
            この研究を通じて、VR開発やモーションデータの扱い、外部デバイスとの連携といった技術的知見に加え、システム設計から実装・評価までの一連の流れを経験しました。
          </p>

        </div>

        <div className="mb-12 ml-8">
          <div className="absolute flex items-center justify-center w-6 h-6 bg-black text-yellow-300 rounded-full -left-3 ring-4 ring-yellow-100 dark:ring-yellow-900 shadow">
            <FaBriefcase className="w-3 h-3" />
          </div>
          <time className="inline-block text-xs font-semibold tracking-wide uppercase text-black bg-yellow-100 border border-yellow-400 dark:text-yellow-100 dark:bg-black dark:border-yellow-500 px-3 py-0.5 rounded-full shadow-sm mb-2">
            2023年6月 - 2024年3月
          </time>
          <h3 className="text-2xl font-bold text-black dark:text-yellow-100">株式会社LITALICO</h3>
          <p className="text-base font-semibold text-gray-700 dark:text-yellow-200 mt-1">
            LITALICOワンダー・セールス
            <span className="ml-2 inline-block text-xs font-semibold px-2 py-0.5 border border-yellow-400 bg-yellow-50 text-black dark:border-yellow-500 dark:bg-black dark:text-yellow-200 rounded-full">
              アルバイト
            </span>
          </p>
          <p className="text-base leading-relaxed text-gray-800 dark:text-gray-200 mt-2">
            子ども向けのオンラインIT×ものづくり（Scratch、Minecraft、Unity）の体験授業や入塾案内を担当しました。<br />
            事前ヒアリングから授業、教室の説明までを一貫して行い、授業後のご案内や電話対応も担当しました。<br />
            合計172件のクロージングを含めた体験授業を行い、そのうち44件の成約を取り、子どもたちがLITALICOワンダーオンラインに入塾しました。
          </p>
        </div>

        <div className="mb-12 ml-8">
          <div className="absolute flex items-center justify-center w-6 h-6 bg-black text-yellow-300 rounded-full -left-3 ring-4 ring-yellow-100 dark:ring-yellow-900 shadow">
            <FaChalkboardTeacher className="w-3 h-3" />
          </div>
          <time className="inline-block text-xs font-semibold tracking-wide uppercase text-black bg-yellow-100 border border-yellow-400 dark:text-yellow-100 dark:bg-black dark:border-yellow-500 px-3 py-0.5 rounded-full shadow-sm mb-2">
            2021年4月 - 2023年11月
          </time>
          <h3 className="text-2xl font-bold text-black dark:text-yellow-100">株式会社インフラトップ</h3>
          <p className="text-base font-semibold text-gray-700 dark:text-yellow-200 mt-1">
            DMM WEBCAMP・メンター
            <span className="ml-2 inline-block text-xs font-semibold px-2 py-0.5 border border-yellow-400 bg-yellow-50 text-black dark:border-yellow-500 dark:bg-black dark:text-yellow-200 rounded-full">
              インターン
            </span>
          </p>
          <p className="text-base leading-relaxed text-gray-800 dark:text-gray-200 mt-2">
            プログラミングスクール「DMM WEBCAMP」にて、受講生へのオンライン質問対応を担当しました。<br />
            HTML/CSS、Bootstrap、JavaScriptなどのフロントエンド技術や、Ruby on Railsを用いたWebアプリケーション開発、Gitを利用したバージョン管理に関するサポートを行いました。
          </p>
        </div>

      </div>
    </section>
  );
}
