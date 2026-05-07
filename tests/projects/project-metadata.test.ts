import { describe, expect, it } from "vitest";

import { projects } from "../../app/data/projects";
import { createProjectMetadata } from "../../lib/seo";
import { SITE_URL } from "../../lib/site";

type Project = {
  slug: string;
  title: string;
  image: string | null;
  description: string[];
  tech: string[];
  skills: string[];
};

const projectList = projects as Project[];

describe("project detail metadata", () => {
  it("has project data for every detail page slug", () => {
    expect(projectList.map((project) => project.slug)).toEqual([
      "portfolio",
      "hamayan-dev",
      "vr-sports-training",
      "bookers",
    ]);
  });

  it("generates project-specific metadata for a project detail page", () => {
    const project = projectList.find((item) => item.slug === "portfolio");

    expect(project).toBeDefined();

    const metadata = createProjectMetadata(project!);

    expect(metadata.title).toBe(project?.title);
    expect(metadata.description).toBe(project?.description[0]);
    expect(metadata.alternates?.canonical).toBe(`${SITE_URL}/projects/portfolio`);
    expect(metadata.openGraph?.type).toBe("article");
    expect(metadata.openGraph?.url).toBe(`${SITE_URL}/projects/portfolio`);
    expect(metadata.twitter?.card).toBe("summary_large_image");
  });

  it("falls back to the portfolio image for SVG project OGP images", () => {
    const project = projectList.find((item) => item.slug === "bookers");

    expect(project).toBeDefined();

    const metadata = createProjectMetadata(project!);

    expect(metadata.openGraph?.images).toEqual([
      {
        url: `${SITE_URL}/portfolio.png`,
        alt: "Bookers | Taishi Hamasaki",
      },
    ]);
    expect(metadata.twitter?.images).toEqual([`${SITE_URL}/portfolio.png`]);
  });
});
