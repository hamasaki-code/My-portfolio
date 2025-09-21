"use client";
import { useEffect, useState } from "react";

import SeoHead from "./components/SeoHead";
import Header from "./components/Header";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Career from "./components/Career";
import ContactForm from "./components/ContactForm";

const SITE_URL = "https://taishi-hamasaki-portfolio.vercel.app";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (loading) {
      return;
    }

    const hash = window.location.hash.replace("#", "");
    if (!hash) {
      return;
    }

    const scrollToHash = () => {
      const element = document.getElementById(hash);
      if (!element) {
        return;
      }

      element.scrollIntoView({ behavior: "smooth", block: "start" });

      if (window.history.replaceState) {
        const { pathname, search } = window.location;
        window.history.replaceState(null, "", `${pathname}${search}`);
      }
    };

    const frame = window.requestAnimationFrame(scrollToHash);

    return () => window.cancelAnimationFrame(frame);
  }, [loading]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-yellow-400 dark:bg-gray-900">
        {/* ローディングアニメーション */}
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-black dark:border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <SeoHead
        title="Taishi Hamasaki | Portfolio"
        description="Discover Taishi Hamasaki's web development projects, technical skills, and professional experience."
        canonicalUrl={SITE_URL}
        keywords={[
          "Taishi Hamasaki",
          "web developer",
          "portfolio",
          "frontend engineer",
          "React",
          "Next.js",
          "TypeScript",
          "Tailwind CSS",
        ]}
        ogImage="/profile.jpg"
        ogUrl={SITE_URL}
        themeColor="#facc15"
        twitterHandle="@OnTAumv5KAoVGN5"
      />
      <div id="top" />
      <Header />
      <main className="container mx-auto p-6 pt-24">
        <About />
        <Projects />
        <Skills />
        <Career />
        <ContactForm />
      </main>
    </div>
  );
}
