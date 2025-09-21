import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { ThemeProvider } from "./components/ThemeProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const SITE_URL = "https://taishi-hamasaki-portfolio.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Taishi Hamasaki | Portfolio",
    template: "%s | Taishi Hamasaki",
  },
  description:
    "Taishi Hamasaki's portfolio showcasing web development projects, skills, and professional experience.",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    locale: "ja_JP",
    siteName: "Taishi Hamasaki Portfolio",
    title: "Taishi Hamasaki | Portfolio",
    description:
      "Discover Taishi Hamasaki's web development projects, technical stack, and career history.",
    images: [
      {
        url: "/profile.jpg",
        width: 1200,
        height: 630,
        alt: "Taishi Hamasaki",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@OnTAumv5KAoVGN5",
    site: "@OnTAumv5KAoVGN5",
  },
};

const themeInitializer = `(() => {
  try {
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = stored === 'dark' || (!stored && prefersDark);
    document.documentElement.classList.toggle('dark', isDark);
    document.documentElement.dataset.theme = isDark ? 'dark' : 'light';
  } catch (error) {
    console.warn('Theme initialization failed', error);
  }
})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script dangerouslySetInnerHTML={{ __html: themeInitializer }} />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
