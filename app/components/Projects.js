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
            className="relative p-[2px] rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-lg overflow-hidden opacity-0 translate-y-4 transition-all duration-300"
          >
            <Link
              href={`/projects/${project.slug}`}
              className="block h-full rounded-xl bg-gray-100 dark:bg-gray-800 p-6 transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {project.image ? (
                <Image
                  src={project.image}
                  alt={`${project.title} のスクリーンショット`}
                  width={600}
                  height={350}
                  className="mb-4 rounded"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-[200px] mb-4 rounded bg-gray-200 dark:bg-gray-700">
                  <PhotoIcon className="w-16 h-16 text-gray-500" />
                </div>
              )}
              <h3 className="text-2xl font-bold mb-4 text-black dark:text-white">
                {project.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="bg-gray-300 dark:bg-gray-600 text-xs px-2 py-1 rounded"
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