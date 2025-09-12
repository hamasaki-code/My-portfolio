import { FaStar } from 'react-icons/fa';

export default function SkillCard({ icon, name, description, level, lang, translations }) {
    const levelLabel = translations[lang]?.levels[level - 1] || '';

    return (
        <div
            title={name}
            className="w-full h-full bg-yellow-50 dark:bg-black border border-yellow-400 rounded-lg shadow-md p-6 flex flex-col items-center justify-between"
        >
            <div className="mb-4">{icon}</div>
            <h4 className="text-lg font-bold text-black dark:text-yellow-300 text-center mt-1">{name}</h4>
            <p className="text-sm text-black dark:text-yellow-100 text-center mt-1">{description}</p>
            <div className="flex justify-center mt-3">
                {[...Array(5)].map((_, i) => (
                    <FaStar
                        key={i}
                        className={`w-4 h-4 ${i < level ? 'text-yellow-400' : 'text-gray-300'}`}
                    />
                ))}
            </div>
            <p className="text-xs text-yellow-700 dark:text-yellow-400 mt-1">{levelLabel}</p>
        </div>
    );
}
