import { FaBuilding, FaLaptopCode } from "react-icons/fa";
import { IoIosSchool } from "react-icons/io";

export default function Career() {
  return (
    <section id="career" className="my-16 scroll-mt-24 px-4">
      <h2 className="text-3xl md:text-4xl font-bold mb-10 text-black dark:text-yellow-100 text-left">
        Career
      </h2>

      {/* ▼ タイムライン全体の線（一本） */}
      <div className="relative border-l-4 border-yellow-200 dark:border-yellow-600 ml-6">
        {/* 正社員（現在） */}
        <div className="mb-12 ml-8">
          <div className="absolute flex items-center justify-center w-10 h-10 bg-yellow-300 text-black rounded-full -left-5 ring-4 ring-yellow-400 dark:ring-yellow-300 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
            <FaBuilding className="w-5 h-5" />
          </div>
          <time className="text-[11px] md:text-[12px] font-bold uppercase text-black bg-yellow-100 border border-yellow-400 dark:text-yellow-100 dark:bg-black dark:border-yellow-500 px-2 py-0.5 rounded-full mb-2 inline-block">
            2024年4月 - <span className="text-yellow-600 dark:text-yellow-300 font-extrabold">現在</span>
          </time>
          <h3 className="text-xl md:text-2xl font-bold text-black dark:text-yellow-100">
            人材・広告会社
          </h3>
          <p className="text-sm md:text-base font-semibold text-gray-700 dark:text-yellow-200 mt-1">
            Webアプリケーションエンジニア
            <span className="ml-2 inline-block text-xs font-semibold px-2 py-0.5 bg-green-600 text-white rounded-full">
              正社員
            </span>
          </p>
          <p className="text-base md:text-lg leading-relaxed text-gray-800 dark:text-gray-200 mt-2">
            Webアプリケーションエンジニアとして、モバイルアプリの保守開発を担当。<br />
            Flutterを使用し、求人検索アプリの開発、Crashlytics対応、UI改善、バグ修正、リリース作業などに従事。<br />
            また、週1回程度のモバイルアプリ勉強会の運営も担当しており、Flutterなどに関する輪読会の発表内容の選定や自身による発表も行っています。
          </p>
        </div>

        {/* 副業 */}
        <div className="mb-12 ml-8">
          <div className="absolute flex items-center justify-center w-10 h-10 bg-yellow-300 text-black rounded-full -left-5 ring-4 ring-yellow-100 dark:ring-yellow-900 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
            <FaLaptopCode className="w-5 h-5" />
          </div>
          <time className="text-[11px] md:text-[12px] font-semibold uppercase text-black bg-yellow-100 border border-yellow-400 dark:text-yellow-100 dark:bg-black dark:border-yellow-500 px-2 py-0.5 rounded-full mb-2 inline-block">
            2025年5月 - 2025年7月
          </time>
          <h3 className="text-xl md:text-2xl font-bold text-black dark:text-yellow-100">
            Webサービス開発・運営会社
          </h3>
          <p className="text-sm md:text-base font-semibold text-gray-700 dark:text-yellow-200 mt-1">
            システム設計担当
            <span className="ml-2 inline-block text-xs font-semibold px-2 py-0.5 bg-blue-600 text-white rounded-full">
              副業
            </span>
          </p>
          <p className="text-base md:text-lg leading-relaxed text-gray-800 dark:text-gray-200 mt-2">
            ブログ記事自動生成システムの設計を担当。<br />
            Notionを用いた設計資料の作成や、記事生成～リライトまで見据えた機能要件整理、仕様レビュー、改善提案を実施。
          </p>
        </div>

        {/* 大学 */}
        <div className="mb-12 ml-8">
          <div className="absolute flex items-center justify-center w-10 h-10 bg-yellow-300 text-black rounded-full -left-5 ring-4 ring-yellow-100 dark:ring-yellow-900 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
            <IoIosSchool className="w-5 h-5" />
          </div>
          <time className="text-[11px] md:text-[12px] font-semibold uppercase text-black bg-yellow-100 border border-yellow-400 dark:text-yellow-100 dark:bg-black dark:border-yellow-500 px-2 py-0.5 rounded-full mb-2 inline-block">
            2020年4月 - 2024年3月
          </time>
          <h3 className="text-xl md:text-2xl font-bold text-black dark:text-yellow-100">
            京都産業大学
          </h3>
          <p className="text-sm md:text-base font-semibold text-gray-700 dark:text-yellow-200 mt-1">
            情報理工学部 情報理工学科
          </p>
          <p className="text-base md:text-lg leading-relaxed text-gray-800 dark:text-gray-200 mt-2">
            プログラミングやシステム開発を学び、インターンにも参加。<br />
            卒業研究ではモーションキャプチャーとVRを用いたスポーツトレーニング支援システムを構築し、Unity・MotionBuilder・Viconを活用。
          </p>
        </div>

        {/* アルバイト */}
        <div className="mb-12 ml-8">
          <div className="absolute w-3 h-3 bg-yellow-300 rounded-full -left-1.5 ring-4 ring-yellow-100 dark:ring-yellow-900 shadow-[0_1px_2px_rgba(0,0,0,0.05)]" />
          <time className="text-[11px] md:text-[12px] font-medium uppercase text-black bg-yellow-100 border border-yellow-400 dark:text-yellow-100 dark:bg-black dark:border-yellow-500 px-2 py-0.5 rounded-full mb-2 inline-block">
            2023年6月 - 2024年3月
          </time>
          <h3 className="text-base md:text-xl font-semibold text-black dark:text-yellow-100">
            株式会社LITALICO
          </h3>
          <p className="text-sm font-semibold text-gray-700 dark:text-yellow-200 mt-1">
            LITALICOワンダー・セールス
            <span className="ml-2 inline-block text-xs font-semibold px-2 py-0.5 bg-yellow-500 text-white rounded-full">
              アルバイト
            </span>
          </p>
          <p className="text-sm md:text-base leading-relaxed text-gray-800 dark:text-gray-200 mt-2">
            子ども向けのオンラインIT×ものづくり（Scratch、Minecraft、Unity）の体験授業や入塾案内を担当。<br />
            事前ヒアリングから授業、教室の説明までを一貫して行い、授業後のご案内や電話対応も行う。<br />
            合計172件のクロージングを含めた体験授業を行い、そのうち44件の成約を獲得。
          </p>
        </div>

        {/* インターン */}
        <div className="mb-12 ml-8">
          <div className="absolute w-3 h-3 bg-yellow-300 rounded-full -left-1.5 ring-4 ring-yellow-100 dark:ring-yellow-900 shadow-[0_1px_2px_rgba(0,0,0,0.05)]" />
          <time className="text-[11px] md:text-[12px] font-medium uppercase text-black bg-yellow-100 border border-yellow-400 dark:text-yellow-100 dark:bg-black dark:border-yellow-500 px-2 py-0.5 rounded-full mb-2 inline-block">
            2021年4月 - 2023年11月
          </time>
          <h3 className="text-base md:text-xl font-semibold text-black dark:text-yellow-100">
            株式会社インフラトップ
          </h3>
          <p className="text-sm font-semibold text-gray-700 dark:text-yellow-200 mt-1">
            DMM WEBCAMP・メンター
            <span className="ml-2 inline-block text-xs font-semibold px-2 py-0.5 bg-purple-600 text-white rounded-full">
              インターン
            </span>
          </p>
          <p className="text-sm md:text-base leading-relaxed text-gray-800 dark:text-gray-200 mt-2">
            プログラミングスクール「DMM WEBCAMP」にて、受講生のオンライン質問対応を担当。<br />
            HTML/CSS・JavaScript・Ruby on Rails・Gitなどの技術サポートを行いました。
          </p>
        </div>
      </div>
    </section>
  );
}
