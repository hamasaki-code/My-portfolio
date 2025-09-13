"use client";
import { useState, useEffect, useRef } from 'react';
import useScrollDirection from '../hooks/useScrollDirection';
import { FiSun, FiMoon, FiArrowUp } from 'react-icons/fi';

export default function Header({ toggleDarkMode, isDarkMode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [flash, setFlash] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);
  const scrollDirection = useScrollDirection();
  const menuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setShowTop(window.scrollY > 300);
      const progress =
        (window.scrollY /
          (document.body.scrollHeight - window.innerHeight)) *
        100;
      setScrollProgress(progress);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const menuEl = menuRef.current;
    if (!menuEl) return;
    const focusable = menuEl.querySelectorAll(
      'a[href], button:not([disabled])'
    );
    const firstEl = focusable[0];
    const lastEl = focusable[focusable.length - 1];
    const handleKeyDown = (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstEl) {
            e.preventDefault();
            lastEl.focus();
          }
        } else {
          if (document.activeElement === lastEl) {
            e.preventDefault();
            firstEl.focus();
          }
        }
      } else if (e.key === 'Escape') {
        setMenuOpen(false);
      }
    };
    firstEl && firstEl.focus();
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  useEffect(() => {
    const sectionIds = ['about', 'projects', 'skills', 'career', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-50% 0px -50% 0px' }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleToggleDark = () => {
    toggleDarkMode();
    setMenuOpen(false);
    setFlash(true);
    setTimeout(() => setFlash(false), 500);
  };

  return (
    <>
      <div
        className="fixed top-0 left-0 h-[2px] bg-yellow-400 dark:bg-yellow-300 z-[60] pointer-events-none motion-safe:transition-all motion-safe:duration-200 motion-reduce:transition-none"
        style={{ width: `${scrollProgress}%` }}
      />
      <div
        className={`fixed inset-0 bg-black/40 md:hidden motion-safe:transition-opacity motion-safe:duration-300 motion-reduce:transition-none ${menuOpen ? 'opacity-100 z-40' : 'opacity-0 -z-10 pointer-events-none'
          }`}
        onClick={() => setMenuOpen(false)}
      />
      <header
        className={`fixed top-0 w-full z-50 transition-colors text-black dark:text-yellow-400 p-6 border-b border-black/10 dark:border-yellow-400/10 motion-safe:transition-transform motion-safe:duration-500 motion-reduce:transition-none motion-reduce:transform-none ease-in-out ${isScrolled
            ? 'bg-yellow-400 dark:bg-black scale-100 shadow-lg'
            : 'bg-yellow-400/70 dark:bg-black/70 backdrop-blur-lg scale-95 shadow-none'
          } ${scrollDirection === 'down' && !menuOpen ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'}`}
      >
        <nav
          aria-label="Main navigation"
          className="container mx-auto flex justify-between items-center"
        >
          <h1 className="text-5xl font-extrabold tracking-tight font-mono animate-fade-in-down">
            <a
              href="#top"
              className="text-black dark:text-yellow-400 hover:scale-105 motion-safe:transition-transform"
              title="Back to top"
            >
              My <span className="text-yellow-600 dark:text-yellow-300">Portfolio</span>
            </a>
          </h1>

          <button
            className="block md:hidden w-12 h-12 flex items-center justify-center text-black dark:text-yellow-400"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>

          <ul
            ref={menuRef}
            role="menubar"
            className={`fixed inset-0 flex flex-col items-center justify-center bg-yellow-400/95 dark:bg-black/95 space-y-8 text-3xl font-bold transform motion-safe:transition-transform motion-safe:duration-500 motion-reduce:transition-none motion-reduce:transform-none motion-reduce:animate-none ease-in-out ${menuOpen ? 'translate-x-0 opacity-100 scale-100' : 'translate-x-full opacity-0 scale-105 pointer-events-none'
              } md:static md:flex md:flex-row md:items-center md:space-x-6 md:space-y-0 md:bg-transparent md:text-base md:font-normal md:translate-x-0 md:opacity-100 md:scale-100 md:pointer-events-auto`}
            id="menu"
          >
            <li role="none">
              <a
                href="#about"
                role="menuitem"
                aria-current={activeSection === 'about' ? 'page' : undefined}
                className={`relative p-2 font-semibold text-black dark:text-yellow-400 group motion-safe:transition-transform hover:scale-105 ${menuOpen ? 'animate-slide-up-fade [animation-delay:0.2s]' : ''
                  }`}
                onClick={() => setMenuOpen(false)}
                title="About section"
              >
                <span
                  className={`relative z-10 px-2 py-1 rounded-md transition-all duration-300 ${activeSection === 'about'
                      ? 'bg-black text-yellow-400 dark:bg-yellow-400 dark:text-black'
                      : ''
                    }`}
                >
                  About Me
                </span>
                <span
                  className={`absolute left-0 -bottom-1 h-0.5 bg-gradient-to-r from-yellow-400 to-black transition-all duration-500 ${activeSection === 'about' ? 'w-full' : 'w-0'
                    } group-hover:w-full`}
                ></span>
              </a>
            </li>
            <li role="none">
              <a
                href="#projects"
                role="menuitem"
                aria-current={activeSection === 'projects' ? 'page' : undefined}
                className={`relative p-2 font-semibold text-black dark:text-yellow-400 group motion-safe:transition-transform hover:scale-105 ${menuOpen ? 'animate-slide-up-fade [animation-delay:0.3s]' : ''
                  }`}
                onClick={() => setMenuOpen(false)}
                title="Projects section"
              >
                <span
                  className={`relative z-10 px-2 py-1 rounded-md transition-all duration-300 ${activeSection === 'projects'
                      ? 'bg-black text-yellow-400 dark:bg-yellow-400 dark:text-black'
                      : ''
                    }`}
                >
                  Projects
                </span>
                <span
                  className={`absolute left-0 -bottom-1 h-0.5 bg-gradient-to-r from-yellow-400 to-black transition-all duration-500 ${activeSection === 'projects' ? 'w-full' : 'w-0'
                    } group-hover:w-full`}
                ></span>
              </a>
            </li>
            <li role="none">
              <a
                href="#skills"
                role="menuitem"
                aria-current={activeSection === 'skills' ? 'page' : undefined}
                className={`relative p-2 font-semibold text-black dark:text-yellow-400 group motion-safe:transition-transform hover:scale-105 ${menuOpen ? 'animate-slide-up-fade [animation-delay:0.4s]' : ''
                  }`}
                onClick={() => setMenuOpen(false)}
                title="Skills & Technologies section"
              >
                <span
                  className={`relative z-10 px-2 py-1 rounded-md transition-all duration-300 ${activeSection === 'skills'
                      ? 'bg-black text-yellow-400 dark:bg-yellow-400 dark:text-black'
                      : ''
                    }`}
                >
                  Skills
                </span>
                <span
                  className={`absolute left-0 -bottom-1 h-0.5 bg-gradient-to-r from-yellow-400 to-black transition-all duration-500 ${activeSection === 'skills' ? 'w-full' : 'w-0'
                    } group-hover:w-full`}
                ></span>
              </a>
            </li>
            <li role="none">
              <a
                href="#career"
                role="menuitem"
                aria-current={activeSection === 'career' ? 'page' : undefined}
                className={`relative p-2 font-semibold text-black dark:text-yellow-400 group motion-safe:transition-transform hover:scale-105 ${menuOpen ? 'animate-slide-up-fade [animation-delay:0.5s]' : ''
                  }`}
                onClick={() => setMenuOpen(false)}
                title="Career section"
              >
                <span
                  className={`relative z-10 px-2 py-1 rounded-md transition-all duration-300 ${activeSection === 'career'
                      ? 'bg-black text-yellow-400 dark:bg-yellow-400 dark:text-black'
                      : ''
                    }`}
                >
                  Career
                </span>
                <span
                  className={`absolute left-0 -bottom-1 h-0.5 bg-gradient-to-r from-yellow-400 to-black transition-all duration-500 ${activeSection === 'career' ? 'w-full' : 'w-0'
                    } group-hover:w-full`}
                ></span>
              </a>
            </li>
            <li role="none">
              <a
                href="#contact"
                role="menuitem"
                aria-current={activeSection === 'contact' ? 'page' : undefined}
                className={`relative p-2 font-semibold text-black dark:text-yellow-400 group motion-safe:transition-transform hover:scale-105 ${menuOpen ? 'animate-slide-up-fade [animation-delay:0.6s]' : ''
                  }`}
                onClick={() => setMenuOpen(false)}
                title="Contact section"
              >
                <span
                  className={`relative z-10 px-2 py-1 rounded-md transition-all duration-300 ${activeSection === 'contact'
                      ? 'bg-black text-yellow-400 dark:bg-yellow-400 dark:text-black'
                      : ''
                    }`}
                >
                  Contact
                </span>
                <span
                  className={`absolute left-0 -bottom-1 h-0.5 bg-gradient-to-r from-yellow-400 to-black transition-all duration-500 ${activeSection === 'contact' ? 'w-full' : 'w-0'
                    } group-hover:w-full`}
                ></span>
              </a>
            </li>
            <li role="none">
              <button
                onClick={handleToggleDark}
                className={`relative w-12 h-12 flex items-center justify-center rounded-full bg-black text-yellow-400 dark:bg-yellow-400 dark:text-black motion-safe:transition-transform motion-safe:duration-500 hover:scale-110 ${flash ? 'animate-flash-bg' : ''} ${menuOpen ? 'animate-slide-up-fade [animation-delay:0.7s]' : ''}`}
                aria-label="Toggle dark mode"
                aria-pressed={isDarkMode}
              >
                <FiSun
                  className={`absolute w-6 h-6 transition-opacity duration-500 ${isDarkMode ? 'opacity-100' : 'opacity-0'}`}
                />
                <FiMoon
                  className={`absolute w-6 h-6 transition-opacity duration-500 ${isDarkMode ? 'opacity-0' : 'opacity-100'}`}
                />
              </button>
            </li>
          </ul>
        </nav>
      </header>
      <button
        className={`fixed bottom-6 right-6 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-black text-yellow-400 dark:bg-yellow-400 dark:text-black shadow-lg transform motion-safe:transition-all motion-safe:duration-300 motion-reduce:transition-none motion-reduce:transform-none hover:scale-110 ${showTop && !menuOpen
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-6 pointer-events-none'
          }`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Scroll to top"
      >
        <FiArrowUp className="w-6 h-6" />
      </button>
    </>
  );
}
