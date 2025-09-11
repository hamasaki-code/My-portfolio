import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { projects } from "../../data/projects";

export function generateStaticParams() {
    return projects.map((p) => ({ slug: p.slug }));
}

export default function ProjectPage({ params }) {
    const project = projects.find((p) => p.slug === params.slug);
    if (!project) {
        notFound();
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-4xl font-bold mb-4 text-black dark:text-yellow-100">
                {project.title}
            </h1>
            {project.image && (
                <div className="relative flex items-center justify-center w-full h-64 mb-6 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
                    <Image
                        src={project.image}
                        alt={`${project.title} のスクリーンショット`}
                        width={project.image.endsWith(".svg") ? 200 : 800}
                        height={project.image.endsWith(".svg") ? 200 : 450}
                        className="object-contain h-full w-auto"
                    />
                </div>
            )}
            <div className="space-y-4 mb-6 text-black dark:text-yellow-100">
                {project.description.map((d, i) => (
                    <p key={i}>{d}</p>
                ))}
            </div>
            <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((t) => (
                    <span
                        key={t}
                        className="bg-yellow-300 text-black dark:bg-gray-700 dark:text-yellow-100 text-xs px-2 py-1 rounded"
                    >
                        {t}
                    </span>
                ))}
            </div>
            {project.links && (
                <div className="flex gap-4 mb-6">
                    {project.links.site && (
                        <Link
                            href={project.links.site}
                            className="text-blue-600 hover:underline dark:text-blue-400"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Site
                        </Link>
                    )}
                    {project.links.github && (
                        <Link
                            href={project.links.github}
                            className="text-blue-600 hover:underline dark:text-blue-400"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            GitHub
                        </Link>
                    )}
                </div>
            )}
            <Link
                href="/#projects"
                className="text-yellow-600 hover:underline dark:text-yellow-400"
            >
                ← Back to Works
            </Link>
        </div>
    );
}
