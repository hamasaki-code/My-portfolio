"use client";

import { useEffect, useState } from "react";

import Header from "./Header";
import About from "./About";
import Projects from "./Projects";
import Skills from "./Skills";
import Career from "./Career";
import ContactForm from "./ContactForm";
import LoadingScreen from "./LoadingScreen";
import { HISTORY_RESTORE_SESSION_KEY } from "./HistoryNavigationTracker";

const LOADING_SCREEN_SESSION_KEY = "portfolio-loading-screen-shown";

const shouldShowLoadingScreen = () => {
  if (typeof window === "undefined") {
    return true;
  }

  const navigationEntry = performance.getEntriesByType("navigation")[0] as
    | PerformanceNavigationTiming
    | undefined;

  if (navigationEntry?.type === "back_forward") {
    return false;
  }

  try {
    if (sessionStorage.getItem(HISTORY_RESTORE_SESSION_KEY) === "true") {
      sessionStorage.removeItem(HISTORY_RESTORE_SESSION_KEY);
      return false;
    }
  } catch {
    return true;
  }

  if (navigationEntry?.type === "reload") {
    return true;
  }

  try {
    return sessionStorage.getItem(LOADING_SCREEN_SESSION_KEY) !== "true";
  } catch {
    return true;
  }
};

export default function HomePageClient() {
  const [loading, setLoading] = useState(shouldShowLoadingScreen);

  useEffect(() => {
    if (!loading) {
      return;
    }

    try {
      sessionStorage.setItem(LOADING_SCREEN_SESSION_KEY, "true");
    } catch {
      // Ignore storage failures and keep the loading screen behavior best-effort.
    }

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [loading]);

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
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen">
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
