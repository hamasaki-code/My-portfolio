"use client";
import SeoHead from './components/SeoHead';
import Header from './components/Header';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Career from './components/Career';
import ContactForm from './components/ContactForm';
import { useEffect, useState } from 'react';

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);  // ローディングを解除
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (loading) {
      return;
    }

    const hash = window.location.hash.replace('#', '');
    if (!hash) {
      return;
    }

    const scrollToHash = () => {
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
      <SeoHead />
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