// Project metadata for Works section

export const projects = [
    {
        slug: "portfolio",
        title: "My Portfolio",
        image: "/portfolio.png",
        description: [
            "私のスキルやプロジェクトを視覚的かつ簡潔に紹介するために構築。",
            "モダンなデザインとレスポンシブ対応を重視。",
        ],
        tech: ["Next.js", "Tailwind CSS"],
        links: {
            site: "https://taishi-hamasaki-portfolio.vercel.app",
            github: "https://github.com/hamasaki-code/My-portfolio",
        },
    },
    {
        slug: "hamayan-dev",
        title: "Hamayan.dev",
        image: "/hamayan-dev.png",
        description: [
            "技術記事や学習アウトプットを体系的に整理して発信する個人ブログ。",
            "Next.jsとTailwind CSSで構築し、カテゴリー・タグ検索から目的の記事へ素早くアクセスできる。",
        ],
        tech: ["Next.js", "Tailwind CSS"],
        links: {
            site: "https://hamayan-dev.vercel.app",
            github: "https://github.com/hamasaki-code/Tech-blogs",
        },
    },
    {
        slug: "vr-sports-training",
        title: "卒業研究",
        image: "/mocap-camera-icon.svg",
        description: [
            "「モーションキャプチャーとVRを用いたスポーツトレーニング支援システムの研究」",
            "VR空間内にテニスコートを構築し、被験者が実際にラケットを持って飛んでくるボールを打つことで実践的なトレーニングを再現。",
            "フォームはモーションキャプチャーで計測し、終了後はPC画面上でVR空間内の自分の動きをリプレイ形式で可視化しフィードバック。",
            "その後、再度VR内でトレーニングを実施し、動作改善の効果を検証。",
            "Unity・MotionBuilder・Viconを連携させたリアルタイムモーション分析・フィードバックシステムを構築。",
        ],
        tech: ["Unity", "MotionBuilder", "Vicon"],
        links: {},
    },
    {
        slug: "bookers",
        title: "Bookers",
        image: "/bookers-icon.svg",
        description: [
            "読了した本のレビューを投稿し、タグやキーワードで検索しながらコミュニティで共有できるブックシェアサービス。",
            "投稿に対するいいね・コメント・通知を実装し、ユーザー間のコミュニケーションを促進。",
            "DeviseとRSpecで認証とテストを整備し、メール認証やパスワードリセットなどのセキュリティ機能をサポート。",
            "Active StorageとAmazon S3を利用した画像アップロード、BootstrapによるレスポンシブUIで快適な閲覧体験を提供。",
            "CRUDと権限管理に加え、N+1対策やインデックス設計でパフォーマンスと保守性を両立。"
        ],
        tech: ["Ruby on Rails", "Bootstrap"],
        links: {},
    }
];
