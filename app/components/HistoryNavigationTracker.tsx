"use client";

import { useEffect } from "react";

export const HISTORY_RESTORE_SESSION_KEY = "portfolio-history-restore";

export default function HistoryNavigationTracker() {
  useEffect(() => {
    const markHistoryRestore = () => {
      try {
        sessionStorage.setItem(HISTORY_RESTORE_SESSION_KEY, "true");
      } catch {
        // Ignore storage failures and keep browser navigation working normally.
      }
    };

    window.addEventListener("popstate", markHistoryRestore);

    return () => window.removeEventListener("popstate", markHistoryRestore);
  }, []);

  return null;
}
