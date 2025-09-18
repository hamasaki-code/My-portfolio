import {
  FaBriefcase,
  FaBuilding,
  FaChalkboardTeacher,
  FaLaptopCode,
} from "react-icons/fa";
import { IoIosSchool } from "react-icons/io";

const typeStyles = {
  fullTime: {
    nodeClass:
      "w-12 h-12 bg-yellow-300 text-black ring-4 ring-yellow-400 dark:ring-yellow-300 shadow-[0_1px_4px_rgba(0,0,0,0.18)]",
    iconClass: "w-6 h-6",
    badgeClass:
      "bg-black text-yellow-200 border border-yellow-400 shadow-[0_1px_3px_rgba(0,0,0,0.25)]",
    badgeIconClass: "h-3 w-3",
  },
  sideJob: {
    nodeClass:
      "w-11 h-11 bg-black text-yellow-100 ring-4 ring-yellow-300 dark:ring-yellow-800 shadow-[0_1px_4px_rgba(0,0,0,0.28)]",
    iconClass: "w-5 h-5",
    badgeClass:
      "bg-yellow-300 text-black border border-black/60 shadow-[0_1px_3px_rgba(0,0,0,0.2)]",
    badgeIconClass: "h-3 w-3",
  },
  education: {
    nodeClass:
      "w-11 h-11 bg-yellow-200 text-black ring-4 ring-yellow-400 dark:ring-yellow-700 shadow-[0_1px_3px_rgba(0,0,0,0.18)]",
    iconClass: "w-5 h-5",
  },
  partTime: {
    nodeClass:
      "w-10 h-10 bg-yellow-100 text-black ring-4 ring-yellow-300 dark:ring-yellow-700 shadow-[0_1px_3px_rgba(0,0,0,0.16)]",
    iconClass: "w-4 h-4",
    badgeClass:
      "bg-yellow-200 text-black border border-black/40 shadow-[0_1px_3px_rgba(0,0,0,0.16)]",
    badgeIconClass: "h-3 w-3",
  },
  internship: {
    nodeClass:
      "w-10 h-10 bg-black text-yellow-200 ring-4 ring-yellow-300 dark:ring-yellow-700 shadow-[0_1px_3px_rgba(0,0,0,0.24)]",
    iconClass: "w-4 h-4",
    badgeClass:
      "bg-black text-yellow-200 border border-yellow-400 shadow-[0_1px_3px_rgba(0,0,0,0.25)]",
    badgeIconClass: "h-3 w-3",
  },
};

const nodeIcons = {
  fullTime: FaBuilding,
  sideJob: FaLaptopCode,
  education: IoIosSchool,
  partTime: FaBriefcase,
  internship: FaChalkboardTeacher,
};

const timelineItems = [
  {
    id: "full-time-2024",
    type: "fullTime",
    period: (
      <>
        2024年4月 - {" "}
        <span className="text-yellow-600 dark:text-yellow-300 font-extrabold">現在</span>
      </>
    ),
    title: "人材・広告会社",
    role: "Webアプリケーションエンジニア",
    badge: {
      label: "正社員",
      icon: FaBuilding,
    },
    description: (
      <>
        Webアプリケーションエンジニアとして、モバイルアプリの保守開発を担当。<br />
        Flutterを使用し、求人検索アプリの開発、Crashlytics対応、UI改善、バグ修正、リリース作業などに従事。<br />
        また、週1回程度のモバイルアプリ勉強会の運営も担当しており、Flutterなどに関する輪読会の発表内容の選定や自身による発表も
        行っています。
      </>
    ),
  },
  {
    id: "side-job-2025",
    type: "sideJob",
    period: "2025年5月 - 2025年7月",
    title: "Webサービス開発・運営会社",
    role: "システム設計担当",
    badge: {
      label: "副業",
      icon: FaLaptopCode,
    },
    description: (
      <>
        ブログ記事自動生成システムの設計を担当。<br />
        Notionを用いた設計資料の作成や、記事生成～リライトまで見据えた機能要件整理、仕様レビュー、改善提案を実施。
      </>
    ),
  },
  {
    id: "education-2020",
    type: "education",
    period: "2020年4月 - 2024年3月",
    title: "京都産業大学",
    role: "情報理工学部 情報理工学科",
    description: (
      <>
        プログラミングやシステム開発を学び、インターンにも参加。<br />
        卒業研究ではモーションキャプチャーとVRを用いたスポーツトレーニング支援システムを構築し、Unity・MotionBuilder・Viconを
        活用。
      </>
    ),
  },
  {
    id: "part-time-2023",
    type: "partTime",
    period: "2023年6月 - 2024年3月",
    title: "株式会社LITALICO",
    role: "LITALICOワンダー・セールス",
    badge: {
      label: "アルバイト",
      icon: FaBriefcase,
    },
    description: (
      <>
        子ども向けのオンラインIT×ものづくり（Scratch、Minecraft、Unity）の体験授業や入塾案内を担当。<br />
        事前ヒアリングから授業、教室の説明までを一貫して行い、授業後のご案内や電話対応も行う。<br />
        合計172件のクロージングを含めた体験授業を行い、そのうち44件の成約を獲得。
      </>
    ),
  },
  {
    id: "internship-2021",
    type: "internship",
    period: "2021年4月 - 2023年11月",
    title: "株式会社インフラトップ",
    role: "DMM WEBCAMP・メンター",
    badge: {
      label: "インターン",
      icon: FaChalkboardTeacher,
    },
    description: (
      <>
        プログラミングスクール「DMM WEBCAMP」にて、受講生のオンライン質問対応を担当。<br />
        HTML/CSS・JavaScript・Ruby on Rails・Gitなどの技術サポートを行いました。
      </>
    ),
  },
];

export default function Career() {
  return (
    <section id="career" className="my-16 scroll-mt-24 px-4">
      <h2 className="text-3xl md:text-4xl font-bold mb-10 text-black dark:text-yellow-100 text-left">Career</h2>

      <div className="relative border-l-4 border-yellow-200 dark:border-yellow-600 ml-6">
        {timelineItems.map((item) => {
          const style = typeStyles[item.type];
          const NodeIcon = nodeIcons[item.type];

          return (
            <div key={item.id} className="relative mb-12 pl-16">
              <div
                className={`absolute left-0 top-1 -translate-x-1/2 flex items-center justify-center rounded-full ${style.nodeClass}`}
                aria-hidden
              >
                <NodeIcon className={style.iconClass} />
              </div>

              <time className="text-[11px] md:text-[12px] font-semibold uppercase text-black bg-yellow-100 border border-yellow-400 dark:text-yellow-100 dark:bg-black dark:border-yellow-500 px-2 py-0.5 rounded-full mb-2 inline-block">
                {item.period}
              </time>

              <h3 className="text-xl md:text-2xl font-bold text-black dark:text-yellow-100">{item.title}</h3>

              <p className="text-sm md:text-base font-semibold text-gray-700 dark:text-yellow-200 mt-1">
                {item.role}
                {item.badge ? (
                  <span
                    className={`ml-2 inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                      style.badgeClass ?? ""
                    }`}
                  >
                    <item.badge.icon className={style.badgeIconClass ?? "h-3 w-3"} />
                    {item.badge.label}
                  </span>
                ) : null}
              </p>

              <p className="text-base md:text-lg leading-relaxed text-gray-800 dark:text-gray-200 mt-2">{item.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
