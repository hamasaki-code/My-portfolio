"use client";

import { useEffect, useState } from "react";

export default function Footer() {
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="border-t border-black/10 bg-white/70 px-6 py-8 text-center text-sm text-gray-600 transition-colors dark:border-yellow-400/10 dark:bg-black/80 dark:text-yellow-100/70">
      <p>
        &copy;{" "}
        <span className="inline-block min-w-10 text-center">
          {currentYear ?? ""}
        </span>{" "}
        Taishi Hamasaki. All rights reserved.
      </p>
    </footer>
  );
}
