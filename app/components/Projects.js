"use client";
import Image from "next/image";
import Link from "next/link";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef } from "react";

import { projects } from "../data/projects";

export default function Projects() {
  const cardRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("opacity-0", "translate-y-4");
            entry.target.classList.add("opacity-100", "translate-y-0");
          }
        });
      },
      { threshold: 0.1 }
    );

    const refs = cardRefs.current;
    refs.forEach((ref) => ref && observer.observe(ref));
    return () => refs.forEach((ref) => ref && observer.unobserve(ref));
  }, []);

  return (
    <section id="projects" className="scroll-mt-28 py-20">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-yellow-600 dark:text-yellow-300">Works</p>
            <h2 className="mt-2 text-4xl font-semibold text-black dark:text-yellow-100">Selected Projects</h2>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 sm:max-w-sm">
            個人・チームで取り組んだ制作物の中から、スキルの幅やデザインアプローチが伝わるものをピックアップしています。
          </p>
        </div>

        <div className="mt-12 space-y-12">
          {projects.map((project, index) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              ref={(el) => (cardRefs.current[index] = el)}
              className="group block translate-y-4 border-l-[6px] border-yellow-400/50 pl-6 opacity-0 transition-all duration-500 hover:border-yellow-500 dark:border-yellow-400/40"
            >
              <article className="flex flex-col gap-8 md:flex-row md:items-center">
                <div className="md:w-64 md:flex-shrink-0">
                  {project.image ? (
                    <div className="relative flex h-44 w-full items-center justify-center overflow-hidden rounded-2xl bg-white/70 p-6 shadow-[0_12px_28px_-28px_rgba(0,0,0,0.45)] ring-1 ring-yellow-500/20 transition-transform duration-300 group-hover:scale-[1.01] dark:bg-white/10 dark:ring-yellow-500/30">
                      <Image
                        src={project.image}
                        alt={`${project.title} のスクリーンショット`}
                        width={project.image.endsWith('.svg') ? 160 : 640}
                        height={project.image.endsWith('.svg') ? 160 : 360}
                        className="h-full w-auto object-contain"
                      />
                    </div>
                  ) : (
                    <div className="flex h-44 w-full items-center justify-center rounded-2xl bg-white/60 ring-1 ring-yellow-500/20 dark:bg-white/10 dark:ring-yellow-500/30">
                      <PhotoIcon className="h-16 w-16 text-yellow-500" />
                    </div>
                  )}
                </div>

                <div className="flex-1 space-y-4">
                  <h3 className="text-2xl font-semibold text-black transition-colors duration-200 group-hover:text-yellow-700 dark:text-yellow-100 dark:group-hover:text-yellow-200">
                    {project.title}
                  </h3>
                  {project.description?.[0] && (
                    <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                      {project.description[0]}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-yellow-500/40 px-3 py-1 text-xs font-semibold text-black transition-colors duration-200 group-hover:border-yellow-500 group-hover:text-yellow-700 dark:border-yellow-500/40 dark:text-yellow-100 dark:group-hover:border-yellow-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
