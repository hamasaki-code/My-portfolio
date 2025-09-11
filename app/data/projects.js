// Project metadata for Works section

export const projects = [
    {
        slug: "portfolio",
        title: "My Portfolio",
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
        title: "Hamayan.dev",
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
        title: "卒業研究",
        image: "/mocap-camera-icon.svg",
        description: [
            "「モーションキャプチャーとVRを用いたスポーツトレーニング支援システムの研究」",
            "VR空間のテニスコートでフォームを可視化しフィードバックを実施。",
            "Unity・MotionBuilder・Viconを連携させたモーション計測システム。",
        ],
        tech: ["Unity", "MotionBuilder", "Vicon"],
        links: {},
    },
    {
        slug: "bookers",
        title: "Bookers",
        image: "/bookers-icon.svg",
        description: [
            "本を投稿してユーザー間で共有できるアプリ。",
            "いいねやコメント機能を搭載。",
            "Deviseでサインアップ・ログインを実装。",
            "投稿した本は編集・削除が可能。",
        ],
        tech: ["Ruby on Rails", "Bootstrap"],
        links: {},
    },
];
