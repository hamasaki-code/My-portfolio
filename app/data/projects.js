export const projects = [
    {
        slug: "portfolio",
        title: "Portfolio（Next.js）",
        image: null,
        description: [
            "私のスキルやプロジェクトを視覚的かつ簡潔に紹介するために構築。",
            "モダンなデザインとレスポンシブ対応を重視。",
        ],
        tech: ["Next.js", "Tailwind CSS"],
        links: {
            site: "/",
            github: "https://github.com/hamayand/My-portfolio",
        },
    },
    {
        slug: "hamayan-dev",
        title: "Hamayan.dev（技術ブログ）",
        image: "/hamayan-dev.png",
        description: [
            "技術に関する記事や学習のアウトプットをまとめている個人ブログ。",
            "Next.jsを用いた構築でカテゴリーやタグ検索が可能。",
        ],
        tech: ["Next.js", "Tailwind CSS"],
        links: {
            site: "https://hamayan.dev",
            github: "https://github.com/hamayand/hamayan.dev",
        },
    },
    {
        slug: "vr-sports-training",
        title: "モーションキャプチャーとVRを用いたスポーツトレーニング支援システムの研究 (Unity)",
        image: null,
        description: [
            "VR空間のテニスコートでフォームを可視化しフィードバックを実施。",
            "Unity・MotionBuilder・Viconを連携させたモーション計測システム。",
        ],
        tech: ["Unity", "MotionBuilder", "Vicon"],
        links: {},
    },
];