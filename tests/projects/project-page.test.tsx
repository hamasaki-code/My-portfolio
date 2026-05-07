import { describe, expect, it } from "vitest";

import ProjectPage, {
  generateMetadata,
  generateStaticParams,
} from "../../app/projects/[slug]/page";
import { projects } from "../../app/data/projects";
import { SITE_URL } from "../../lib/site";

type Project = {
  slug: string;
  title: string;
};

const projectList = projects as Project[];

describe("project detail page route", () => {
  it("generates static params for every configured project", () => {
    expect(generateStaticParams()).toEqual(
      projectList.map((project) => ({ slug: project.slug })),
    );
  });

  it("generates metadata for a known project slug", () => {
    const project = projectList.find((item) => item.slug === "portfolio");
    const metadata = generateMetadata({ params: { slug: "portfolio" } });

    expect(project).toBeDefined();
    expect(metadata.title).toBe(project?.title);
    expect(metadata.alternates?.canonical).toBe(`${SITE_URL}/projects/portfolio`);
  });

  it("returns a React element for a known project slug", () => {
    const element = ProjectPage({ params: { slug: "portfolio" } });

    expect(element).toBeTruthy();
    expect(element.type).toBe("div");
  });
});
