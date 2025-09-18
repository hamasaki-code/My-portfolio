'use client';
import {
  SiRuby,
  SiFlutter,
  SiUnity,
  SiNextdotjs,
  SiTypescript,
  SiDart,
  SiCsharp,
  SiRubyonrails,
  SiReact,
  SiGit,
  SiGithub,
  SiVercel,
  SiAutodesk,
  SiMysql,
  SiSqlite,
  SiHtml5,
  SiCss3,
} from 'react-icons/si';
import { FaJsSquare } from 'react-icons/fa';
import { useState } from 'react';
import SkillCard from './SkillCard';
import { translations } from '../i18n/translations';

export default function Skills({ lang = 'en' }) {
  const [activeCategory, setActiveCategory] = useState('All');

  const allCategories = [
    {
      name: 'Languages',
      id: 'languages',
      items: [
        {
          name: 'HTML & CSS',
          icon: (
            <div className="flex justify-center space-x-2">
              <SiHtml5 className="text-orange-500 w-8 h-8" />
              <SiCss3 className="text-blue-500 w-8 h-8" />
            </div>
          ),
          description: 'Markup & Styling',
          level: 3,
        },
        {
          name: 'JavaScript',
          icon: <FaJsSquare className="text-yellow-500 w-8 h-8" />,
          description: 'ES6+',
          level: 3,
        },
        {
          name: 'TypeScript',
          icon: <SiTypescript className="text-blue-600 w-8 h-8" />,
          description: 'Static Typing',
          level: 3,
        },
        {
          name: 'Dart',
          icon: <SiDart className="text-blue-400 w-8 h-8" />,
          description: 'Flutter Language',
          level: 4,
        },
        {
          name: 'Ruby',
          icon: <SiRuby className="text-red-500 w-8 h-8" />,
          description: 'Web Development',
          level: 4,
        },
        {
          name: 'C#',
          icon: <SiCsharp className="text-green-600 w-8 h-8" />,
          description: 'Game Development',
          level: 2,
        },
      ],
    },
    {
      name: 'Frameworks',
      id: 'frameworks',
      items: [
        {
          name: 'Ruby on Rails',
          icon: <SiRubyonrails className="text-red-600 w-8 h-8" />,
          description: 'MVC',
          level: 4,
        },
        {
          name: 'Flutter',
          icon: <SiFlutter className="text-blue-400 w-8 h-8" />,
          description: 'Cross-platform',
          level: 4,
        },
        {
          name: 'Next.js',
          icon: <SiNextdotjs className="text-black dark:text-yellow-400 w-8 h-8" />,
          description: 'React Framework',
          level: 3,
        },
        {
          name: 'React',
          icon: <SiReact className="text-blue-500 w-8 h-8" />,
          description: 'UI Library',
          level: 2,
        },
      ],
    },
    {
      name: 'GameEngine',
      id: 'game-engine',
      items: [
        {
          name: 'Unity',
          icon: <SiUnity className="text-gray-800 w-8 h-8" />,
          description: 'Game Engine',
          level: 3,
        },
        {
          name: 'MotionBuilder',
          icon: <SiAutodesk className="text-green-600 w-8 h-8" />,
          description: 'Mocap Animation',
          level: 2,
        },
      ],
    },
    {
      name: 'Tools',
      id: 'tools',
      items: [
        {
          name: 'Git & GitHub',
          icon: (
            <div className="flex justify-center space-x-2">
              <SiGit className="text-orange-500 w-8 h-8" />
              <SiGithub className="text-black dark:text-yellow-400 w-8 h-8" />
            </div>
          ),
          description: 'Version Control',
          level: 4,
        },
        {
          name: 'Vercel',
          icon: <SiVercel className="text-black dark:text-yellow-400 w-8 h-8" />,
          description: 'Deployment',
          level: 3,
        },
      ],
    },
    {
      name: 'Databases',
      id: 'databases',
      items: [
        {
          name: 'MySQL',
          icon: <SiMysql className="text-blue-700 w-8 h-8" />,
          description: 'Relational DB',
          level: 1,
        },
        {
          name: 'SQLite',
          icon: <SiSqlite className="text-blue-500 w-8 h-8" />,
          description: 'Lightweight DB',
          level: 1,
        },
      ],
    },
  ];

  const filteredCategories = activeCategory === 'All'
    ? allCategories
    : allCategories.filter((c) => c.name === activeCategory);

  const categoryNames = ['All', ...allCategories.map((c) => c.name)];

  return (
    <section id="skills" className="scroll-mt-28 py-20">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-yellow-600 dark:text-yellow-300">Skills</p>
            <h2 className="mt-2 text-4xl font-semibold text-black dark:text-yellow-100">
              Skills & Technologies
            </h2>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 sm:max-w-md">
            実務と個人開発で磨いた技術スタックをカテゴリーごとに整理。知りたい分野を絞ってご覧ください。
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="mt-8 flex flex-wrap justify-start gap-3">
          {categoryNames.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full border px-5 py-2 text-sm font-semibold transition-all duration-200
        ${activeCategory === cat
                  ? 'border-yellow-500 bg-yellow-400/80 text-black shadow-sm dark:bg-yellow-400 dark:text-black'
                  : 'border-yellow-500/30 bg-transparent text-black hover:-translate-y-0.5 hover:border-yellow-500 hover:bg-white/60 dark:border-yellow-500/30 dark:bg-transparent dark:text-yellow-100 dark:hover:bg-yellow-500/10'
                }`}
            >
              {translations[lang]?.categories[cat] || cat}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        {filteredCategories.map((category) => (
          <div key={category.name} id={category.id} className="mt-12">
            <h3 className="text-2xl font-semibold text-black dark:text-yellow-50">
              {translations[lang]?.categories[category.name] || category.name}
            </h3>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {category.items.map((skill) => (
                <SkillCard
                  key={skill.name}
                  {...skill}
                  lang={lang}
                  translations={translations}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
