import type { Metadata } from "next";

import { SITE_URL, toSiteUrl } from "./site";

export const SITE_NAME = "Taishi Hamasaki Portfolio";
export const DEFAULT_TITLE = "Taishi Hamasaki | Portfolio";
export const TITLE_TEMPLATE = "%s | Taishi Hamasaki";
export const DEFAULT_DESCRIPTION =
  "Taishi Hamasaki's portfolio showcasing web development projects, skills, and professional experience.";
export const HOME_DESCRIPTION =
  "Discover Taishi Hamasaki's web development projects, technical skills, and professional experience.";
export const DEFAULT_OG_IMAGE = "/portfolio.png";
export const THEME_COLOR = "#facc15";
export const TWITTER_HANDLE = "@OnTAumv5KAoVGN5";

export const DEFAULT_KEYWORDS = [
  "Taishi Hamasaki",
  "web developer",
  "mobile developer",
  "portfolio",
  "frontend engineer",
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
];

type ProjectMetadataInput = {
  slug: string;
  title: string;
  image: string | null;
  description: string[];
  tech: string[];
  skills: string[];
};

export type StructuredData = Record<string, unknown>;

type StructuredDataParams = {
  title: string;
  description: string;
  canonicalUrl: string;
  image: string;
};

const PROJECT_FALLBACK_DESCRIPTION =
  "View project details from Taishi Hamasaki's portfolio.";

const uniqueKeywords = (keywords: string[]) =>
  Array.from(
    new Set(
      keywords
        .map((keyword) => keyword?.trim())
        .filter((keyword): keyword is string => Boolean(keyword)),
    ),
  );

export const absoluteOgImage = (image = DEFAULT_OG_IMAGE) => toSiteUrl(image);

const getProjectOgImage = (image: string | null) => {
  if (!image || image.endsWith(".svg")) {
    return DEFAULT_OG_IMAGE;
  }

  return image;
};

export const createDefaultStructuredData = ({
  title,
  description,
  canonicalUrl,
  image,
}: StructuredDataParams): StructuredData[] => {
  const url = toSiteUrl(canonicalUrl);
  const imageUrl = toSiteUrl(image);

  return [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Taishi Hamasaki",
      jobTitle: "Web Developer",
      url,
      image: imageUrl,
      description,
      sameAs: [
        "https://github.com/hamasaki-code",
        "https://www.linkedin.com/in/taishi-hamasaki-628424350",
        "https://x.com/OnTAumv5KAoVGN5",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: title,
      url,
      description,
      inLanguage: "ja",
      publisher: {
        "@type": "Person",
        name: "Taishi Hamasaki",
      },
      potentialAction: {
        "@type": "SearchAction",
        target: `${SITE_URL}/?s={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
  ];
};

export const createSiteStructuredData = () =>
  createDefaultStructuredData({
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    canonicalUrl: SITE_URL,
    image: DEFAULT_OG_IMAGE,
  });

export const createHomeStructuredData = () =>
  createDefaultStructuredData({
    title: DEFAULT_TITLE,
    description: HOME_DESCRIPTION,
    canonicalUrl: SITE_URL,
    image: DEFAULT_OG_IMAGE,
  });

export const createProjectStructuredData = (project: ProjectMetadataInput) => {
  const image = getProjectOgImage(project.image);

  return createDefaultStructuredData({
    title: `${project.title} | Taishi Hamasaki`,
    description: project.description[0] ?? PROJECT_FALLBACK_DESCRIPTION,
    canonicalUrl: `/projects/${project.slug}`,
    image,
  });
};

const JSON_LD_ESCAPE_REGEX = /[<>&'\/\u2028\u2029]/g;
const JSON_LD_ESCAPE_MAP: Record<string, string> = {
  "<": "\\u003c",
  ">": "\\u003e",
  "&": "\\u0026",
  "'": "\\u0027",
  "/": "\\/",
  [String.fromCharCode(0x2028)]: "\\u2028",
  [String.fromCharCode(0x2029)]: "\\u2029",
};

const escapeJsonForHtml = (value: string) =>
  value.replace(JSON_LD_ESCAPE_REGEX, (character) => {
    const mapped = JSON_LD_ESCAPE_MAP[character];

    if (mapped) {
      return mapped;
    }

    const codePoint = character.charCodeAt(0).toString(16).padStart(4, "0");

    return `\\u${codePoint}`;
  });

export const serializeJsonLd = (payload: StructuredData) => {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return null;
  }

  try {
    const serialized = JSON.stringify(payload);

    if (typeof serialized !== "string" || serialized.length === 0) {
      return null;
    }

    return escapeJsonForHtml(serialized);
  } catch {
    return null;
  }
};

export const createHomeMetadata = (): Metadata => {
  const image = absoluteOgImage();

  return {
    title: {
      absolute: DEFAULT_TITLE,
    },
    description: HOME_DESCRIPTION,
    keywords: DEFAULT_KEYWORDS,
    alternates: {
      canonical: SITE_URL,
    },
    openGraph: {
      type: "website",
      url: SITE_URL,
      locale: "ja_JP",
      siteName: SITE_NAME,
      title: DEFAULT_TITLE,
      description: HOME_DESCRIPTION,
      images: [
        {
          url: image,
          alt: DEFAULT_TITLE,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: DEFAULT_TITLE,
      description: HOME_DESCRIPTION,
      images: [image],
      creator: TWITTER_HANDLE,
      site: TWITTER_HANDLE,
    },
  };
};

export const createProjectMetadata = (
  project: ProjectMetadataInput,
): Metadata => {
  const canonicalPath = `/projects/${project.slug}`;
  const url = toSiteUrl(canonicalPath);
  const socialTitle = `${project.title} | Taishi Hamasaki`;
  const description = project.description[0] ?? PROJECT_FALLBACK_DESCRIPTION;
  const image = absoluteOgImage(getProjectOgImage(project.image));
  const keywords = uniqueKeywords([
    ...DEFAULT_KEYWORDS,
    project.title,
    SITE_NAME,
    ...project.tech,
    ...project.skills,
  ]);

  return {
    title: project.title,
    description,
    keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "article",
      url,
      locale: "ja_JP",
      siteName: SITE_NAME,
      title: socialTitle,
      description,
      images: [
        {
          url: image,
          alt: socialTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [image],
      creator: TWITTER_HANDLE,
      site: TWITTER_HANDLE,
    },
  };
};
