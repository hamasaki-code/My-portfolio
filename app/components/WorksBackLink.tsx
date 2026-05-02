"use client";

import Link from "next/link";
import type { ReactNode } from "react";

import { HISTORY_RESTORE_SESSION_KEY } from "./HistoryNavigationTracker";

type WorksBackLinkProps = {
  children: ReactNode;
  className?: string;
};

export default function WorksBackLink({
  children,
  className,
}: WorksBackLinkProps) {
  const handleClick = () => {
    try {
      sessionStorage.setItem(HISTORY_RESTORE_SESSION_KEY, "true");
    } catch {
      // Ignore storage failures and allow the navigation to proceed.
    }
  };

  return (
    <Link
      href={{ pathname: "/", hash: "projects" }}
      scroll={false}
      className={className}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
}
