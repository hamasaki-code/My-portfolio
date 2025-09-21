import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MdSportsTennis } from "react-icons/md";
import { GiTennisCourt, GiCctvCamera } from "react-icons/gi";
import { BsBadgeVr } from "react-icons/bs";
import Header from "../../components/Header";
import { projects } from "../../data/projects";

type ProjectLinks = {
  site?: string;
  github?: string;
};

type Project = {
  slug: string;
  title: string;
  image: string | null;
  description: string[];
  tech: string[];
  links?: ProjectLinks;
};

type ProjectPageProps = {
  params: {
    slug: string;
  };
};

const projectList = projects as Project[];

export function generateStaticParams() {
  return projectList.map((project) => ({ slug: project.slug }));
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = projectList.find((item) => item.slug === params.slug);

  if (!project) {
    notFound();
  }

  const links = project.links;
  const isSvgImage = project.image?.endsWith(".svg") ?? false;
  const imageWidth = isSvgImage ? 320 : 960;
  const imageHeight = isSvgImage ? 320 : 600;
  const imageClassName = isSvgImage
    ? "relative z-10 h-64 w-auto"
    : "relative z-10 w-full rounded-2xl object-cover shadow-2xl shadow-black/50";
  const renderProjectVisual = () => {
    if (project.slug === "vr-sports-training") {
      return (
        <div className="relative overflow-hidden rounded-[2.5rem] border border-yellow-500/30 bg-white p-10 shadow-[0_45px_90px_-45px_rgba(253,224,71,0.45)] transition-colors dark:bg-white">
          <div className="relative mx-auto flex h-full max-h-[420px] w-full items-center justify-center">
            <div className="flex flex-wrap items-center justify-center gap-6 text-yellow-700">
              <span className="grid h-20 w-20 place-items-center rounded-full border border-yellow-400/40 bg-white shadow-sm">
                <MdSportsTennis className="h-11 w-11" aria-hidden />
              </span>
              <span className="grid h-24 w-24 place-items-center rounded-full border border-yellow-400/40 bg-white shadow-sm">
                <GiTennisCourt className="h-12 w-12" aria-hidden />
              </span>
              <span className="grid h-20 w-20 place-items-center rounded-full border border-yellow-400/40 bg-white shadow-sm">
                <GiCctvCamera className="h-11 w-11" aria-hidden />
              </span>
              <span className="grid h-20 w-20 place-items-center rounded-full border border-yellow-400/40 bg-white shadow-sm">
                <BsBadgeVr className="h-11 w-11" aria-hidden />
              </span>
            </div>
          </div>
        </div>
      );
    }

    if (!project.image) {
      return null;
    }

    return (
      <div className="relative overflow-hidden rounded-[2.5rem] border border-yellow-500/30 bg-white p-6 shadow-[0_45px_90px_-45px_rgba(253,224,71,0.45)] transition-colors dark:bg-white">
        <div className="relative mx-auto flex h-full max-h-[480px] items-center justify-center">
          <Image
            src={project.image}
            alt={`${project.title} のスクリーンショット`}
            width={imageWidth}
            height={imageHeight}
            className={imageClassName}
          />
        </div>
      </div>
    );
  };
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#fef9c3] via-white to-[#fefce8] text-gray-900 transition-colors duration-500 dark:from-black dark:via-[#0f0f0f] dark:to-[#050505] dark:text-white">
      <Header />
      <div id="top" className="absolute left-0 top-0 h-0 w-0 overflow-hidden" aria-hidden />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(250,204,21,0.2),_transparent_55%)] opacity-80 dark:bg-[radial-gradient(circle_at_top,_rgba(253,224,71,0.18),_transparent_55%)]" />
      <div className="pointer-events-none absolute inset-y-0 right-[-20%] w-[60%] rounded-full bg-[radial-gradient(circle,_rgba(250,204,21,0.25)_0%,_rgba(255,255,255,0)_70%)] blur-3xl dark:bg-[radial-gradient(circle,_rgba(202,138,4,0.22)_0%,_rgba(0,0,0,0)_70%)]" />
      <main className="relative z-10 mx-auto flex max-w-6xl flex-col gap-16 px-6 pb-20 pt-32 transition-colors duration-500 lg:px-12">
        <div className="flex items-center justify-between gap-6">
          <Link
            href={{ pathname: "/", hash: "projects" }}
            scroll={false}
            className="inline-flex items-center gap-2 rounded-full border border-yellow-500/60 bg-yellow-400/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-yellow-700 transition hover:border-yellow-600 hover:bg-yellow-400/30 hover:text-black dark:border-yellow-300/40 dark:bg-yellow-400/10 dark:text-yellow-200 dark:hover:border-yellow-200/60 dark:hover:bg-yellow-400/15 dark:hover:text-white"
          >
            ← Works
          </Link>
          {links && (links.site || links.github) && (
            <div className="flex flex-wrap items-center gap-3">
              {links.site && (
                <Link
                  href={links.site}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-transparent bg-yellow-500 px-5 py-2 text-sm font-semibold text-black shadow-[0_20px_45px_-25px_rgba(253,224,71,0.9)] transition hover:-translate-y-0.5 hover:bg-yellow-400 hover:text-black dark:bg-yellow-400 dark:hover:bg-yellow-300"
                >
                  Visit Site
                </Link>
              )}
              {links.github && (
                <Link
                  href={links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-yellow-500/60 bg-white/80 px-5 py-2 text-sm font-semibold text-yellow-700 shadow-[0_18px_35px_-25px_rgba(253,224,71,0.8)] transition hover:-translate-y-0.5 hover:bg-white hover:text-yellow-800 dark:border-yellow-300/60 dark:bg-black/60 dark:text-yellow-200 dark:hover:bg-black/80 dark:hover:text-yellow-100"
                >
                  View Code
                </Link>
              )}
            </div>
          )}
        </div>

        <section className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-yellow-500/50 bg-yellow-400/20 px-4 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-yellow-700 dark:border-yellow-300/30 dark:bg-yellow-400/10 dark:text-yellow-200">
              Featured Work
            </span>
            <div className="space-y-4">
              <h1 className="text-4xl font-semibold leading-tight tracking-tight text-gray-900 sm:text-5xl dark:text-white">
                {project.title}
              </h1>
              <div className="h-1 w-28 rounded-full bg-gradient-to-r from-yellow-500 via-yellow-400 to-amber-300" />
              <div className="space-y-4 text-base leading-relaxed text-gray-700 dark:text-slate-200">
                {project.description.map((description, index) => (
                  <p key={`${project.slug}-description-${index}`}>{description}</p>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center rounded-full border border-yellow-500/40 bg-white/70 px-3 py-1 text-xs font-medium uppercase tracking-wide text-yellow-700 backdrop-blur transition-colors dark:border-yellow-400/30 dark:bg-black/60 dark:text-yellow-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {renderProjectVisual()}
        </section>

        <section className="grid gap-8 rounded-[2.5rem] border border-yellow-500/30 bg-white/70 p-10 shadow-[0_45px_90px_-55px_rgba(253,224,71,0.4)] backdrop-blur-2xl transition-colors dark:border-yellow-500/20 dark:bg-black/50 dark:shadow-[0_45px_90px_-55px_rgba(253,224,71,0.5)] lg:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Project Highlights</h2>
            <p className="text-base leading-relaxed text-gray-700 dark:text-slate-200">
              {project.description[0]}
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-yellow-700 dark:text-yellow-200">
              Stack &amp; Focus
            </h3>
            <ul className="grid gap-3 text-sm text-gray-700 dark:text-slate-200 sm:grid-cols-2">
              {project.tech.map((tech) => (
                <li
                  key={`${tech}-detail`}
                  className="rounded-2xl border border-yellow-500/40 bg-white/80 px-4 py-3 shadow-sm shadow-yellow-500/10 transition hover:-translate-y-0.5 hover:border-yellow-500/60 hover:shadow-yellow-500/20 dark:border-yellow-500/30 dark:bg-black/60 dark:hover:border-yellow-400/60"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}
