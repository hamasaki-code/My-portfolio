export default function Projects() {
  return (
    <section id="projects" className="my-16">
      <h2 className="text-4xl font-bold mb-6 text-black dark:text-white">Works</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* タスク管理アプリ */}
        <div className="border border-black dark:border-white rounded-lg shadow-lg p-6 bg-white dark:bg-gray-800 hover:shadow-xl transition duration-300">
          <h3 className="text-2xl font-bold mb-2 text-black dark:text-white">タスク管理アプリ（Next.js）</h3>
          <p className="text-gray-800 dark:text-gray-200">
            タスク作成、完了、削除機能を持ち、詳細閲覧が可能なタスク管理アプリです。Next.jsを使用して開発され、効率的なタスク管理をサポートします。
          </p>
        </div>
        {/* Bookers */}
        <div className="border border-black dark:border-white rounded-lg shadow-lg p-6 bg-white dark:bg-gray-800 hover:shadow-xl transition duration-300">
          <h3 className="text-2xl font-bold mb-2 text-black dark:text-white">Bookers (Ruby on Rails)</h3>
          <p className="text-gray-800 dark:text-gray-200">
            本の投稿、編集、削除、コメント、いいね機能を提供するWebアプリケーションです。Ruby on Railsを使用して開発され、ユーザーが読書体験を共有し、他のユーザーと交流できます。
          </p>
        </div>
        {/* Portfolio */}
        <div className="border border-black dark:border-white rounded-lg shadow-lg p-6 bg-white dark:bg-gray-800 hover:shadow-xl transition duration-300">
          <h3 className="text-2xl font-bold mb-2 text-black dark:text-white">Portfolio（Next.js）</h3>
          <p className="text-gray-800 dark:text-gray-200">
            このポートフォリオは、私のスキルやプロジェクトを視覚的かつ簡潔に紹介するために構築しました。モダンなデザインとシンプルなナビゲーションを重視し、レスポンシブ対応で様々なデバイスでの閲覧が可能です。使用技術としては、Next.jsをベースに、Tailwind CSSを用いたスタイルを採用しています。
          </p>
        </div>
        {/* 卒業研究 */}
        <div className="border border-black dark:border-white rounded-lg shadow-lg p-6 bg-white dark:bg-gray-800 hover:shadow-xl transition duration-300">
          <h3 className="text-2xl font-bold mb-2 text-black dark:text-white">モーションキャプチャーとVRを用いたスポーツトレーニング支援システムの研究 (Unity)</h3>
          <p className="text-gray-800 dark:text-gray-200">
          テニスコートをVR空間で再現し、モーションキャプチャーカメラやMotionBuilderなどを用いて、フォームの改善を行うフィードバックシステムを作成する卒業研究を行いました。
          </p>
        </div>
      </div>
    </section>
  );
}
