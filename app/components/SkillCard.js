import { FaStar } from 'react-icons/fa';

export default function SkillCard({ icon, name, description, level, lang, translations }) {
    const levelLabel = translations[lang]?.levels[level - 1] || '';

    return (
        <div
            title={name}
            className="w-full h-full bg-slate-100 dark:bg-slate-800 rounded-lg shadow-md p-6
            flex flex-col items-center justify-between hover:scale-105 transition-transform duration-300"
        >
            <div className="mb-4">{icon}</div>
            <h4 className="text-lg font-bold text-black dark:text-white text-center mt-1">{name}</h4>
            <p className="text-sm text-gray-700 dark:text-gray-300 text-center mt-1">{description}</p>
            <div className="flex justify-center mt-3">
                {[...Array(5)].map((_, i) => (
                    <FaStar
                        key={i}
                        className={`w-4 h-4 ${i < level ? 'text-yellow-400' : 'text-gray-300'}`}
                    />
                ))}
            </div>
            <p className="text-xs text-gray-500 mt-1">{levelLabel}</p>
        </div>
    );
}
