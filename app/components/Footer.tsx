"use client";

import { useEffect, useState } from "react";

const MAX_TIMEOUT_MS = 2_147_483_647;

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(() => new Date().getFullYear());

  useEffect(() => {
    let timeoutId: number;

    const scheduleYearRollover = () => {
      const now = new Date();
      const year = now.getFullYear();
      const nextYear = new Date(year + 1, 0, 1);
      const msUntilNextYear = nextYear.getTime() - now.getTime();

      setCurrentYear(year);

      timeoutId = window.setTimeout(
        scheduleYearRollover,
        Math.min(msUntilNextYear, MAX_TIMEOUT_MS),
      );
    };

    scheduleYearRollover();

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <footer className="border-t border-black/10 bg-white/70 px-6 py-8 text-center text-sm text-gray-600 transition-colors dark:border-yellow-400/10 dark:bg-black/80 dark:text-yellow-100/70">
      <p>&copy; {currentYear} Taishi Hamasaki. All rights reserved.</p>
    </footer>
  );
}
