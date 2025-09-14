"use client";
import SeoHead from './components/SeoHead';
import Header from './components/Header';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Career from './components/Career';
import ContactForm from './components/ContactForm';
import { useState, useEffect } from 'react';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const darkModePreference = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (darkModePreference) {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDarkMode(false);
    }

    const timer = setTimeout(() => {
      setLoading(false);  // ローディングを解除
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-yellow-400 dark:bg-gray-900">
        {/* ローディングアニメーション */}
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-black dark:border-white"></div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <SeoHead />
      <div id="top" />
      <Header toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
      <main className="container mx-auto p-6 pt-24 bg-white dark:bg-gray-900">
        <About />
        <Projects />
        <Skills />
        <Career />
        <ContactForm />
      </main>
    </div>
  );
}