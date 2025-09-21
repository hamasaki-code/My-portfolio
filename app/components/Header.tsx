"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { MouseEvent, useEffect, useRef, useState } from "react";
import useScrollDirection from "../hooks/useScrollDirection";
import { FiArrowUp, FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "./ThemeProvider";

type SectionId = "about" | "projects" | "skills" | "career" | "contact";

export default function Header() {
  const { toggleDarkMode, isDarkMode } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId | "">("");
  const [flash, setFlash] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);
  const scrollDirection = useScrollDirection() as "up" | "down";
  const menuRef = useRef<HTMLUListElement | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";

  const navItems: { id: SectionId; label: string; title: string; delay: string }[] = [
    { id: "about", label: "About Me", title: "About section", delay: "0.2s" },
    { id: "projects", label: "Projects", title: "Projects section", delay: "0.3s" },
    { id: "skills", label: "Skills", title: "Skills section", delay: "0.4s" },
    { id: "career", label: "Career", title: "Career section", delay: "0.5s" },
    { id: "contact", label: "Contact", title: "Contact section", delay: "0.6s" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setShowTop(window.scrollY > 300);
      const progress = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      setScrollProgress(progress);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;
    const menuEl = menuRef.current;
    if (!menuEl) return;
    const focusable = menuEl.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
    const firstEl = focusable[0];
    const lastEl = focusable[focusable.length - 1] ?? firstEl;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Tab") {
        if (event.shiftKey && document.activeElement === firstEl) {
          event.preventDefault();
          lastEl.focus();
        } else if (document.activeElement === lastEl) {
          event.preventDefault();
          firstEl.focus();
        }
      } else if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    firstEl?.focus();
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id as SectionId);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );

    navItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleToggleDark = () => {
    toggleDarkMode();
    setIsMenuOpen(false);
    setFlash(true);
    setTimeout(() => setFlash(false), 500);
  };

  const handleSectionClick = (event: MouseEvent<HTMLAnchorElement>, section: SectionId) => {
    if (isHome) {
      event.preventDefault();
      const target = document.getElementById(section);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      event.preventDefault();
      router.push(`/#${section}`, { scroll: false });
    }
    setIsMenuOpen(false);
  };

  const sectionHref = (section: SectionId) => (isHome ? `#${section}` : `/#${section}`);

  return (
    <>
      {/* スクロールバー */}
      <div
        className="fixed top-0 left-0 h-[2px] bg-yellow-400 dark:bg-yellow-300 z-[60] pointer-events-none transition-all duration-200"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* モバイルオーバーレイ */}
      <div
        className={`fixed inset-0 bg-black/40 md:hidden transition-opacity duration-300 ${isMenuOpen ? "opacity-100 z-40" : "opacity-0 -z-10 pointer-events-none"
          }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* ヘッダー */}
      <header
        className={`fixed top-0 w-full z-50 text-black dark:text-yellow-400 p-6 border-b border-black/10 dark:border-yellow-400/10 transition-transform duration-500 ease-in-out ${isScrolled
            ? "bg-yellow-400 dark:bg-black shadow-lg scale-100"
            : "bg-yellow-400/70 dark:bg-black/70 backdrop-blur-md scale-95"
          } ${scrollDirection === "down" && !isMenuOpen ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"}`}
      >
        <nav className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-extrabold tracking-tight font-mono">
            <a href="#top" className="text-black dark:text-yellow-400 hover:scale-105 transition-transform">
              My <span className="text-yellow-600 dark:text-yellow-300">Portfolio</span>
            </a>
          </h1>

          {/* ハンバーガーメニュー */}
          <button
            className="block md:hidden w-12 h-12 flex items-center justify-center text-yellow-400 bg-black/80 rounded-md border border-yellow-400 shadow-md"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>

          {/* ナビゲーションリスト */}
          <ul
            ref={menuRef}
            className={`fixed inset-0 z-50 flex flex-col items-center justify-center 
              bg-yellow-400 dark:bg-black
              space-y-6 text-xl font-bold transition-transform duration-500 ease-in-out
              ${isMenuOpen ? "translate-x-0 opacity-100 scale-100" : "translate-x-full opacity-0 scale-105 pointer-events-none"}
              md:static md:flex md:flex-row md:items-center md:space-x-6 md:space-y-0 md:bg-transparent md:text-base md:font-normal md:translate-x-0 md:opacity-100 md:scale-100 md:pointer-events-auto`}
            id="menu"
            role="menubar"
          >
            {navItems.map(({ id, label, title, delay }) => (
              <li key={id} role="none">
                <Link
                  href={sectionHref(id)}
                  role="menuitem"
                  aria-label={title}
                  aria-current={activeSection === id ? "page" : undefined}
                  className={`relative p-2 font-semibold group transition-transform hover:scale-105 text-black dark:text-yellow-400 ${isMenuOpen ? `animate-slide-up-fade [animation-delay:${delay}]` : ""
                    }`}
                  onClick={(e) => handleSectionClick(e, id)}
                >
                  <span
                    className={`relative z-10 px-2 py-1 rounded-md transition-all duration-300 ${activeSection === id
                        ? "bg-black text-yellow-400 dark:bg-yellow-400 dark:text-black font-bold"
                        : "hover:bg-black/10 dark:hover:bg-yellow-100/10"
                      }`}
                  >
                    {label}
                  </span>
                  <span
                    className={`absolute left-0 -bottom-1 h-0.5 bg-gradient-to-r from-yellow-400 to-black transition-all duration-500 ${activeSection === id ? "w-full" : "w-0"
                      } group-hover:w-full`}
                  ></span>
                </Link>
              </li>
            ))}
            {/* ダークモードボタン */}
            <li role="none">
              <button
                onClick={handleToggleDark}
                className={`w-10 h-10 flex items-center justify-center rounded-full bg-black text-yellow-400 dark:bg-yellow-400 dark:text-black transition-transform hover:scale-110 ${flash ? "animate-flash-bg" : ""
                  }`}
                aria-label="Toggle dark mode"
                aria-pressed={isDarkMode}
              >
                <FiSun className={`absolute w-6 h-6 transition-opacity duration-500 ${isDarkMode ? "opacity-100" : "opacity-0"}`} />
                <FiMoon className={`absolute w-6 h-6 transition-opacity duration-500 ${isDarkMode ? "opacity-0" : "opacity-100"}`} />
              </button>
            </li>
          </ul>
        </nav>
      </header>

      {/* トップに戻るボタン */}
      <button
        className={`fixed bottom-6 right-6 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-black text-yellow-400 dark:bg-yellow-400 dark:text-black border border-yellow-300 dark:border-yellow-500 shadow-lg hover:scale-110 transition-all ${showTop && !isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 pointer-events-none"
          }`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Scroll to top"
      >
        <FiArrowUp className="w-6 h-6" />
      </button>
    </>
  );
}
