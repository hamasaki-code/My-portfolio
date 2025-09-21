import Head from "next/head";

type StructuredData = Record<string, unknown>;

export type SeoHeadProps = {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  keywords?: string[];
  ogImage?: string;
  ogUrl?: string;
  ogType?: string;
  themeColor?: string;
  twitterHandle?: string;
  twitterSite?: string;
  twitterImage?: string;
  twitterCardType?: string;
  structuredData?: StructuredData | StructuredData[];
};

const SITE_URL = "https://taishi-hamasaki-portfolio.vercel.app";
const DEFAULT_TITLE = "My Portfolio";
const DEFAULT_DESCRIPTION =
  "Taishi Hamasaki's portfolio showcasing web development skills in React, Node.js, Flutter, and more. Explore projects and connect with me for collaboration.";
const DEFAULT_IMAGE = "/profile.jpg";
const DEFAULT_THEME_COLOR = "#facc15";
const DEFAULT_KEYWORDS = [
  "Taishi Hamasaki",
  "portfolio",
  "web developer",
  "React",
  "Node.js",
  "Flutter",
  "frontend",
  "backend",
];

const toAbsoluteUrl = (value: string) => {
  if (value.startsWith("http")) {
    return value;
  }

  return value.startsWith("/") ? `${SITE_URL}${value}` : `${SITE_URL}/${value}`;
};

const createDefaultStructuredData = (
  params: Required<
    Pick<
      SeoHeadProps,
      "title" | "description" | "canonicalUrl" | "ogImage"
    >
  >
) => {
  const personUrl = params.canonicalUrl || SITE_URL;
  const imageUrl = toAbsoluteUrl(params.ogImage);

  return [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Taishi Hamasaki",
      jobTitle: "Web Developer",
      url: personUrl,
      image: imageUrl,
      description: params.description,
      sameAs: [
        "https://github.com/hamasaki-code",
        "https://www.linkedin.com/in/taishi-hamasaki-628424350",
        "https://x.com/OnTAumv5KAoVGN5",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: params.title,
      url: personUrl,
      description: params.description,
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
    const mapped = JSON_LD_ESCAPE_MAP[character as keyof typeof JSON_LD_ESCAPE_MAP];

    if (mapped) {
      return mapped;
    }

    const codePoint = character.charCodeAt(0).toString(16).padStart(4, "0");

    return `\\u${codePoint}`;
  });

const serializeJsonLd = (payload: StructuredData) => {
  if (!payload || typeof payload !== "object") {
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

const normalizeKeywords = (keywords?: string[]) =>
  (keywords ?? DEFAULT_KEYWORDS)
    .map((keyword) => keyword?.trim())
    .filter((keyword): keyword is string => Boolean(keyword));

export default function SeoHead({
  title,
  description,
  canonicalUrl,
  keywords,
  ogImage,
  ogUrl,
  ogType,
  themeColor,
  twitterHandle,
  twitterSite,
  twitterImage,
  twitterCardType,
  structuredData,
}: SeoHeadProps): JSX.Element {
  const resolvedTitle = title ?? DEFAULT_TITLE;
  const resolvedDescription = description ?? DEFAULT_DESCRIPTION;
  const resolvedCanonical = canonicalUrl ? toAbsoluteUrl(canonicalUrl) : SITE_URL;
  const resolvedOgImage = ogImage ?? DEFAULT_IMAGE;
  const absoluteOgImage = toAbsoluteUrl(resolvedOgImage);
  const resolvedOgUrl = ogUrl ? toAbsoluteUrl(ogUrl) : resolvedCanonical;
  const resolvedOgType = ogType ?? "website";
  const resolvedThemeColor = themeColor ?? DEFAULT_THEME_COLOR;
  const resolvedKeywords = normalizeKeywords(keywords);
  const resolvedTwitterImage = twitterImage ?? resolvedOgImage;
  const absoluteTwitterImage = toAbsoluteUrl(resolvedTwitterImage);
  const resolvedTwitterCard = twitterCardType ?? "summary_large_image";
  const rawStructuredData = Array.isArray(structuredData)
    ? structuredData
    : structuredData
      ? [structuredData]
      : createDefaultStructuredData({
        title: resolvedTitle,
        description: resolvedDescription,
        canonicalUrl: resolvedCanonical,
        ogImage: absoluteOgImage,
      });

  const jsonLdPayload = rawStructuredData.filter(
    (schema): schema is StructuredData =>
      Boolean(schema) && typeof schema === "object" && !Array.isArray(schema),
  );

  return (
    <Head>
      <title>{resolvedTitle}</title>
      <meta name="description" content={resolvedDescription} />
      <meta httpEquiv="Content-Language" content="ja" />
      <meta property="og:locale" content="ja_JP" />

      {resolvedKeywords.length > 0 && (
        <meta name="keywords" content={resolvedKeywords.join(", ")} />
      )}
      <meta name="theme-color" content={resolvedThemeColor} />

      <link rel="icon" href="/favicon.ico" />
      <link rel="canonical" href={resolvedCanonical} />

      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <meta property="og:title" content={resolvedTitle} />
      <meta property="og:description" content={resolvedDescription} />
      <meta property="og:image" content={absoluteOgImage} />
      <meta property="og:url" content={resolvedOgUrl} />
      <meta property="og:type" content={resolvedOgType} />

      <meta name="twitter:card" content={resolvedTwitterCard} />
      <meta name="twitter:title" content={resolvedTitle} />
      <meta name="twitter:description" content={resolvedDescription} />
      <meta name="twitter:image" content={absoluteTwitterImage} />
      {twitterHandle && <meta name="twitter:creator" content={twitterHandle} />}
      {(twitterSite ?? twitterHandle) && (
        <meta name="twitter:site" content={twitterSite ?? twitterHandle} />
      )}

      <meta name="robots" content="index, follow" />

      {jsonLdPayload.map((schema, index) => {
        const serialized = serializeJsonLd(schema);

        if (!serialized) {
          return null;
        }

        return (
          <script
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: serialized }}
            key={`jsonld-${index}`}
            type="application/ld+json"
          />
        );
      })}
    </Head>
  );
}
