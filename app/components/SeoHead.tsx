import Head from 'next/head';

export default function SeoHead(): JSX.Element {
  return (
    <Head>
      <title>My Portfolio</title>
      <meta
        name="description"
        content="Taishi Hamasaki's portfolio showcasing web development skills in React, Node.js, Flutter, and more. Explore projects and connect with me for collaboration."
      />

      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />

      {/* Viewport for responsive design */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* Open Graph (OG) tags for social sharing */}
      <meta property="og:title" content="Taishi Hamasaki - Web Developer Portfolio" />
      <meta
        property="og:description"
        content="Showcasing my skills and projects in web development, including React, Node.js, Flutter, and more."
      />
      <meta property="og:image" content="/profile.jpg" />
      <meta property="og:url" content="https://my-portfolio.com" />
      <meta property="og:type" content="website" />

      {/* Twitter Card tags for better social sharing */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Taishi Hamasaki - Web Developer Portfolio" />
      <meta
        name="twitter:description"
        content="Showcasing my skills and projects in web development, including React, Node.js, Flutter, and more."
      />
      <meta name="twitter:image" content="/profile.jpg" />
      <meta name="twitter:site" content="@OnTAumv5KAoVGN5" />

      {/* Robots meta tag */}
      <meta name="robots" content="index, follow" />
    </Head>
  );
}
