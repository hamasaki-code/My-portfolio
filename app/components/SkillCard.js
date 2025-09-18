import { FaStar } from 'react-icons/fa';

export default function SkillCard({ icon, name, description, level, lang, translations }) {
    const levelLabel = translations[lang]?.levels[level - 1] || '';

    return (
        <div
            title={name}
            className="group flex w-full items-start gap-4 rounded-3xl border-l-4 border-yellow-400/60 bg-transparent px-5 py-4 transition-all duration-300 hover:-translate-y-1 hover:border-yellow-400 dark:border-yellow-400/40"
        >
            <div className="mt-1 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-yellow-400/15 text-2xl text-yellow-500 transition-transform duration-300 group-hover:scale-110 dark:bg-yellow-400/10 dark:text-yellow-300">
                {icon}
            </div>
            <div className="flex-1 space-y-3">
                <div>
                    <h4 className="text-lg font-semibold text-black dark:text-yellow-200">{name}</h4>
                    <p className="mt-1 text-sm text-gray-700 dark:text-gray-200">{description}</p>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-yellow-700 dark:text-yellow-300">
                    <span className="flex items-center gap-1 tracking-normal text-yellow-500 dark:text-yellow-200">
                        {[...Array(5)].map((_, i) => (
                            <FaStar
                                key={i}
                                className={`h-4 w-4 ${i < level ? 'text-yellow-400' : 'text-yellow-200/60 dark:text-yellow-200/30'}`}
                            />
                        ))}
                    </span>
                    <span>{levelLabel}</span>
                </div>
            </div>
        </div>
    );
}