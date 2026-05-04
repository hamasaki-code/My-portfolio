"use client";

import { useEffect, useState } from "react";

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(() => new Date().getFullYear());

  useEffect(() => {
    const now = new Date();
    const nextYear = new Date(now.getFullYear() + 1, 0, 1);
    const timeout = window.setTimeout(() => {
      setCurrentYear(new Date().getFullYear());
    }, nextYear.getTime() - now.getTime());

    return () => {
      window.clearTimeout(timeout);
    };
  }, [currentYear]);

  return (
    <footer className="border-t border-black/10 bg-white/70 px-6 py-8 text-center text-sm text-gray-600 transition-colors dark:border-yellow-400/10 dark:bg-black/80 dark:text-yellow-100/70">
      <p>&copy; {currentYear} Taishi Hamasaki. All rights reserved.</p>
    </footer>
  );
}
