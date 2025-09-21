import { FaBuilding, FaLaptopCode } from "react-icons/fa";
import { IoIosSchool } from "react-icons/io";

export default function Career() {
  return (
    <section id="career" className="scroll-mt-28 py-24">
      <div className="mx-auto max-w-5xl px-6 sm:px-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.42em] text-yellow-600 dark:text-yellow-300">Career</p>
            <h2 className="mt-2 text-4xl font-semibold text-neutral-900 dark:text-yellow-100">Experience Timeline</h2>
          </div>
          <p className="text-sm text-neutral-700 dark:text-gray-300 sm:max-w-sm">
            実務経験・副業・学業を時系列で整理しました。役割の移り変わりや現在注力している分野をご覧いただけます。
          </p>
        </div>

        <div className="relative mt-12 pl-2">
          <span className="pointer-events-none absolute left-6 top-0 h-full w-px bg-gradient-to-b from-yellow-500/50 via-yellow-500/20 to-transparent dark:from-yellow-500/50 dark:via-yellow-500/20" />

          <div className="space-y-12">
            <article className="relative pl-16">
              <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full 
  bg-yellow-400 text-black shadow-md ring-4 ring-green-400/60 dark:bg-yellow-400 dark:text-black dark:ring-green-400/40">
                <FaBuilding className="h-5 w-5" />
              </div>
              <time className="text-xs font-semibold uppercase tracking-[0.2em] text-yellow-700 dark:text-yellow-300">
                2024年4月 - <span className="font-bold">現在</span>
              </time>
              <h3 className="mt-3 text-2xl font-semibold text-neutral-900 dark:text-yellow-100">人材・広告会社</h3>
              <p className="mt-1 text-sm font-semibold text-neutral-700 dark:text-yellow-200">
                Webアプリケーションエンジニア
                <span className="ml-3 inline-flex items-center rounded-full bg-green-600/90 px-2.5 py-0.5 text-xs font-semibold text-white">正社員</span>
              </p>
              <p className="mt-3 text-sm leading-relaxed text-neutral-700 dark:text-gray-300 md:text-base">
                Flutter を用いた求人検索アプリの保守開発を担当。Crashlytics 対応や UI 改善、バグ修正、リリース作業まで一貫して携わっています。社内勉強会の運営や輪読会での発表を通じてナレッジ共有にも取り組んでいます。
              </p>
            </article>

            <article className="relative pl-16">
              <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-400 text-black shadow-md ring-4 ring-white/50 dark:bg-yellow-400 dark:text-black dark:ring-yellow-500/20">
                <FaLaptopCode className="h-5 w-5" />
              </div>
              <time className="text-xs font-semibold uppercase tracking-[0.2em] text-yellow-700 dark:text-yellow-300">
                2025年5月 - 2025年7月
              </time>
              <h3 className="mt-3 text-2xl font-semibold text-neutral-900 dark:text-yellow-100">Webサービス開発・運営会社</h3>
              <p className="mt-1 text-sm font-semibold text-neutral-700 dark:text-yellow-200">
                システム設計担当
                <span className="ml-3 inline-flex items-center rounded-full bg-blue-600/90 px-2.5 py-0.5 text-xs font-semibold text-white">副業</span>
              </p>
              <p className="mt-3 text-sm leading-relaxed text-neutral-700 dark:text-gray-300 md:text-base">
                ブログ記事自動生成システムの設計を担当。Notion を用いた要件整理や仕様レビューを進め、生成からリライトまでを想定したプロセス設計と改善提案を実施しました。
              </p>
            </article>

            <article className="relative pl-16">
              <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-400 text-black shadow-md ring-4 ring-white/60 dark:bg-yellow-400 dark:text-black dark:ring-yellow-500/20">
                <IoIosSchool className="h-5 w-5" />
              </div>
              <time className="text-xs font-semibold uppercase tracking-[0.2em] text-yellow-700 dark:text-yellow-300">
                2020年4月 - 2024年3月
              </time>
              <h3 className="mt-3 text-2xl font-semibold text-neutral-900 dark:text-yellow-100">京都産業大学</h3>
              <p className="mt-1 text-sm font-semibold text-neutral-700 dark:text-yellow-200">
                情報理工学部 情報理工学科
              </p>
              <p className="mt-3 text-sm leading-relaxed text-neutral-700 dark:text-gray-300 md:text-base">
                プログラミングとシステム開発を学びながら複数のインターンに参加。卒業研究ではモーションキャプチャーと VR を組み合わせたスポーツトレーニング支援システムを構築し、Unity・MotionBuilder・Vicon を連携させたリアルタイム解析を実現しました。
              </p>
            </article>

            <article className="relative pl-16">
              <div className="absolute left-5 top-1.5 h-3 w-3 -translate-x-1/2 rounded-full bg-yellow-400 ring-[6px] ring-white/70 shadow-sm dark:ring-yellow-500/30" />
              <time className="text-xs font-semibold uppercase tracking-[0.2em] text-yellow-700 dark:text-yellow-300">
                2023年6月 - 2024年3月
              </time>
              <h3 className="mt-3 text-xl font-semibold text-neutral-900 dark:text-yellow-100">株式会社LITALICO</h3>
              <p className="mt-1 text-sm font-semibold text-neutral-700 dark:text-yellow-200">
                LITALICOワンダー・セールス
                <span className="ml-3 inline-flex items-center rounded-full bg-yellow-500/90 px-2.5 py-0.5 text-xs font-semibold text-white">アルバイト</span>
              </p>
              <p className="mt-3 text-sm leading-relaxed text-neutral-700 dark:text-gray-300 md:text-base">
                Scratch や Minecraft、Unity を使った体験授業と入塾案内を担当。ヒアリングから授業、アフターフォローまでを一貫して行い、計172件の体験授業で44件の成約を獲得しました。
              </p>
            </article>

            <article className="relative pl-16">
              <div className="absolute left-5 top-1.5 h-3 w-3 -translate-x-1/2 rounded-full bg-yellow-400 ring-[6px] ring-white/70 shadow-sm dark:ring-yellow-500/30" />
              <time className="text-xs font-semibold uppercase tracking-[0.2em] text-yellow-700 dark:text-yellow-300">
                2021年4月 - 2023年11月
              </time>
              <h3 className="mt-3 text-xl font-semibold text-neutral-900 dark:text-yellow-100">株式会社インフラトップ</h3>
              <p className="mt-1 text-sm font-semibold text-neutral-700 dark:text-yellow-200">
                DMM WEBCAMP・メンター
                <span className="ml-3 inline-flex items-center rounded-full bg-purple-600/90 px-2.5 py-0.5 text-xs font-semibold text-white">インターン</span>
              </p>
              <p className="mt-3 text-sm leading-relaxed text-neutral-700 dark:text-gray-300 md:text-base">
                受講生のオンライン質問対応を担当し、HTML/CSS や JavaScript、Ruby on Rails、Git などの技術サポートを実施。学習のつまずきに寄り添いながら自走力の育成を支援しました。
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
