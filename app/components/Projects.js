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
    <section id="projects" className="my-16">
      <h2 className="text-4xl font-bold mb-6 text-black dark:text-white">Works</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <div
            key={project.slug}
            ref={(el) => (cardRefs.current[index] = el)}
            className="opacity-0 translate-y-4 transition-all duration-500 h-full w-full"
          >
            <Link
              href={`/projects/${project.slug}`}
              className="group relative flex flex-col h-full rounded-xl border border-black/10 dark:border-yellow-600 bg-white dark:bg-black p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-yellow-400 dark:hover:border-yellow-400"
            >
              <span className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-yellow-300 dark:bg-yellow-500" />
              {project.image ? (
                <div className="relative flex items-center justify-center w-full h-48 mb-4 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
                  <Image
                    src={project.image}
                    alt={`${project.title} のスクリーンショット`}
                    width={project.image.endsWith('.svg') ? 120 : 600}
                    height={project.image.endsWith('.svg') ? 120 : 350}
                    className="object-contain h-full w-auto transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center w-full h-48 mb-4 rounded-lg bg-gray-100 dark:bg-gray-800">
                  <PhotoIcon className="w-16 h-16 text-yellow-500" />
                </div>
              )}
              <h3 className="text-2xl font-bold mb-4 text-black dark:text-yellow-100">
                {project.title}
              </h3>
              <div className="mt-auto flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="bg-yellow-300 text-black dark:bg-gray-700 dark:text-yellow-100 text-xs px-2 py-1 rounded"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
