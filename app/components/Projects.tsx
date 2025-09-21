"use client";

import Image from "next/image";
import Link from "next/link";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef } from "react";
import { MdSportsTennis } from "react-icons/md";
import { GiTennisCourt, GiCctvCamera } from "react-icons/gi";
import { BsBadgeVr } from "react-icons/bs";

import { projects } from "../data/projects";

type Project = {
  slug: string;
  title: string;
  image: string | null;
  description: string[];
  tech: string[];
};

export default function Projects() {
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);

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

  const renderProjectVisual = (project: Project): JSX.Element => {
    if (project.slug === "vr-sports-training") {
      return (
        <div className="relative flex h-44 w-full items-center justify-center overflow-hidden rounded-2xl bg-white p-6 shadow-[0_12px_28px_-28px_rgba(0,0,0,0.45)] ring-1 ring-yellow-500/20 transition-transform duration-300 group-hover:scale-[1.01] dark:bg-white">
          <div className="relative flex items-center justify-center gap-4 text-yellow-700">
            <span className="grid h-12 w-12 place-items-center rounded-full border border-yellow-400/40 bg-white shadow-sm">
              <MdSportsTennis className="h-7 w-7" aria-hidden />
            </span>
            <span className="grid h-12 w-12 place-items-center rounded-full border border-yellow-400/40 bg-white shadow-sm">
              <GiTennisCourt className="h-8 w-8" aria-hidden />
            </span>
            <span className="grid h-12 w-12 place-items-center rounded-full border border-yellow-400/40 bg-white shadow-sm">
              <GiCctvCamera className="h-7 w-7" aria-hidden />
            </span>
            <span className="grid h-12 w-12 place-items-center rounded-full border border-yellow-400/40 bg-white shadow-sm">
              <BsBadgeVr className="h-7 w-7" aria-hidden />
            </span>
          </div>
        </div>
      );
    }

    if (project.image) {
      const isSvg = project.image.endsWith(".svg");

      return (
        <div className="relative flex h-44 w-full items-center justify-center overflow-hidden rounded-2xl bg-white p-6 shadow-[0_12px_28px_-28px_rgba(0,0,0,0.45)] ring-1 ring-yellow-500/20 transition-transform duration-300 group-hover:scale-[1.01] dark:bg-white">
          <Image
            src={project.image}
            alt={`${project.title} のスクリーンショット`}
            width={isSvg ? 160 : 640}
            height={isSvg ? 160 : 360}
            className="h-full w-auto object-contain"
          />
        </div>
      );
    }

    return (
      <div className="flex h-44 w-full items-center justify-center rounded-2xl bg-white ring-1 ring-yellow-500/20 dark:bg-white">
        <PhotoIcon className="h-16 w-16 text-yellow-500" />
      </div>
    );
  };

  return (
    <section id="projects" className="scroll-mt-28 py-20">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-yellow-600 dark:text-yellow-300">Works</p>
            <h2 className="mt-2 text-4xl font-semibold text-black dark:text-yellow-100">
              Selected Projects
            </h2>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 sm:max-w-sm">
            個人・チームで取り組んだ制作物の中から、スキルの幅やデザインアプローチが伝わるものをピックアップしています。
          </p>
        </div>

        <div className="mt-12 space-y-12">
          {projects.map((project: Project, index: number) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              ref={(el: HTMLAnchorElement | null) => {
                cardRefs.current[index] = el;
              }}
              className="group block translate-y-4 border-l-[6px] border-yellow-400/50 pl-6 opacity-0 transition-all duration-500 hover:border-yellow-500 dark:border-yellow-400/40"
            >
              <article className="flex flex-col gap-8 md:flex-row md:items-center">
                <div className="md:w-64 md:flex-shrink-0">
                  {renderProjectVisual(project)}
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
                        className="rounded-full border border-yellow-500/40 px-3 py-1 text-xs font-semibold text-black transition-colors duration-200 group-hover:border-yellow-500 group-hover:text-yellow-700 dark:border-yellow-500/40 dark:text-yellow-100 dark:group-hover:text-yellow-300"
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
