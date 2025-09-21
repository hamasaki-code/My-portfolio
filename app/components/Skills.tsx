'use client';

import { useState } from 'react';
import {
  SiAutodesk,
  SiCsharp,
  SiCss3,
  SiDart,
  SiFlutter,
  SiGit,
  SiGithub,
  SiHtml5,
  SiMysql,
  SiNextdotjs,
  SiReact,
  SiRubyonrails,
  SiRuby,
  SiSqlite,
  SiTypescript,
  SiUnity,
  SiVercel,
} from 'react-icons/si';
import { FaJsSquare } from 'react-icons/fa';

import SkillCard, {
  type CategoryName,
  type Language,
  type Skill,
  type Translations,
} from './SkillCard';
import { translations } from '../i18n/translations';

interface Category {
  name: CategoryName;
  id: string;
  items: Skill[];
}

type CategoryFilter = 'All' | CategoryName;

const translationsData = translations as Translations;

const allCategories: Category[] = [
  {
    name: 'Languages',
    id: 'languages',
    items: [
      {
        name: 'HTML & CSS',
        icon: (
          <div className="flex justify-center space-x-2">
            <SiHtml5 className="h-8 w-8 text-orange-500" />
            <SiCss3 className="h-8 w-8 text-blue-500" />
          </div>
        ),
        description: 'Markup & Styling',
        level: 3,
      },
      {
        name: 'JavaScript',
        icon: <FaJsSquare className="h-8 w-8 text-yellow-500" />,
        description: 'ES6+',
        level: 3,
      },
      {
        name: 'TypeScript',
        icon: <SiTypescript className="h-8 w-8 text-blue-600" />,
        description: 'Static Typing',
        level: 3,
      },
      {
        name: 'Dart',
        icon: <SiDart className="h-8 w-8 text-blue-400" />,
        description: 'Flutter Language',
        level: 4,
      },
      {
        name: 'Ruby',
        icon: <SiRuby className="h-8 w-8 text-red-500" />,
        description: 'Web Development',
        level: 4,
      },
      {
        name: 'C#',
        icon: <SiCsharp className="h-8 w-8 text-green-600" />,
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
        icon: <SiRubyonrails className="h-8 w-8 text-red-600" />,
        description: 'MVC',
        level: 4,
      },
      {
        name: 'Flutter',
        icon: <SiFlutter className="h-8 w-8 text-blue-400" />,
        description: 'Cross-platform',
        level: 4,
      },
      {
        name: 'Next.js',
        icon: <SiNextdotjs className="h-8 w-8 text-black dark:text-yellow-400" />,
        description: 'React Framework',
        level: 3,
      },
      {
        name: 'React',
        icon: <SiReact className="h-8 w-8 text-blue-500" />,
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
        icon: <SiUnity className="h-8 w-8 text-gray-800" />,
        description: 'Game Engine',
        level: 3,
      },
      {
        name: 'MotionBuilder',
        icon: <SiAutodesk className="h-8 w-8 text-green-600" />,
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
            <SiGit className="h-8 w-8 text-orange-500" />
            <SiGithub className="h-8 w-8 text-black dark:text-yellow-400" />
          </div>
        ),
        description: 'Version Control',
        level: 4,
      },
      {
        name: 'Vercel',
        icon: <SiVercel className="h-8 w-8 text-black dark:text-yellow-400" />,
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
        icon: <SiMysql className="h-8 w-8 text-blue-700" />,
        description: 'Relational DB',
        level: 1,
      },
      {
        name: 'SQLite',
        icon: <SiSqlite className="h-8 w-8 text-blue-500" />,
        description: 'Lightweight DB',
        level: 1,
      },
    ],
  },
];

const categoryNames: CategoryFilter[] = ['All', ...allCategories.map((category) => category.name)];

const filteredCategories = (activeCategory: CategoryFilter): Category[] =>
  activeCategory === 'All'
    ? allCategories
    : allCategories.filter((category) => category.name === activeCategory);

interface SkillsProps {
  lang?: Language;
}

export default function Skills({ lang = 'en' }: SkillsProps): JSX.Element {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('All');

  const categoriesToDisplay = filteredCategories(activeCategory);

  return (
    <section id="skills" className="scroll-mt-28 py-20">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-yellow-600 dark:text-yellow-300">Skills</p>
            <h2 className="mt-2 text-4xl font-semibold text-black dark:text-yellow-100">Skills & Technologies</h2>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 sm:max-w-md">
            実務と個人開発で磨いた技術スタックをカテゴリーごとに整理。知りたい分野を絞ってご覧ください。
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="mt-8 flex flex-wrap justify-start gap-3">
          {categoryNames.map((categoryName) => {
            const isActive = activeCategory === categoryName;
            const label =
              categoryName === 'All'
                ? categoryName
                : translationsData[lang].categories[categoryName];

            return (
              <button
                key={categoryName}
                onClick={() => setActiveCategory(categoryName)}
                className={`rounded-full border px-5 py-2 text-sm font-semibold transition-all duration-200 ${isActive
                    ? 'border-yellow-500 bg-yellow-400/80 text-black shadow-sm dark:bg-yellow-400 dark:text-black'
                    : 'border-yellow-500/30 bg-transparent text-black hover:-translate-y-0.5 hover:border-yellow-500 hover:bg-white/60 dark:border-yellow-500/30 dark:bg-transparent dark:text-yellow-100 dark:hover:bg-yellow-500/10'
                  }`}
                type="button"
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Skills Grid */}
        {categoriesToDisplay.map((category) => (
          <div key={category.name} id={category.id} className="mt-12">
            <h3 className="text-2xl font-semibold text-black dark:text-yellow-50">
              {translationsData[lang].categories[category.name]}
            </h3>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {category.items.map((skill) => (
                <SkillCard key={skill.name} {...skill} lang={lang} translations={translationsData} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
