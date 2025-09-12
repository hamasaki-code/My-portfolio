"use client";
import { useState } from 'react';
import useScrollDirection from '../hooks/useScrollDirection';

export default function Header({ toggleDarkMode, isDarkMode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrollDirection = useScrollDirection();

  return (
    <header
      className={`fixed top-0 w-full z-50 bg-yellow-400 dark:bg-gray-800 text-black dark:text-white p-6 border-b-4 border-black
                  dark:border-white transform transition-transform transition-opacity duration-500 ease-in-out
                  ${scrollDirection === 'down' && !menuOpen ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'}`}
    >
      <nav className="container mx-auto flex justify-between items-center">
        <h1 className="text-4xl font-extrabold tracking-wider">My Portfolio</h1>

        <button
          className="block md:hidden text-black dark:text-white focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>

        <ul className={`${menuOpen ? 'block' : 'hidden'} md:flex space-x-6`} id="menu">
          <li><a href="#about" className="hover:text-gray-700 dark:hover:text-gray-400 font-semibold">About Me</a></li>
          <li><a href="#projects" className="hover:text-gray-700 dark:hover:text-gray-400 font-semibold">Projects</a></li>
          <li><a href="#contact" className="hover:text-gray-700 dark:hover:text-gray-400 font-semibold">Contact</a></li>
          <li>
            <button
              onClick={toggleDarkMode}
              className="hover:text-gray-700 dark:hover:text-gray-400 font-semibold"
            >
              {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
