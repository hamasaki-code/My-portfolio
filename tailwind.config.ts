import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class', // ダークモードをクラスで制御
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)", // カスタムCSS変数の使用
        foreground: "var(--foreground)", // カスタムCSS変数の使用
      },
      fontFamily: {
        sans: ['Space Grotesk', 'sans-serif'],
      },
      keyframes: {
        'fade-in-down': {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'flash-bg': {
          '0%': { 'background-color': 'transparent' },
          '50%': { 'background-color': 'rgba(250,204,21,0.3)' },
          '100%': { 'background-color': 'transparent' },
        },
        'slide-up-fade': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in-down': 'fade-in-down 0.6s ease-out forwards',
        'flash-bg': 'flash-bg 0.5s ease',
        'slide-up-fade': 'slide-up-fade 0.5s ease forwards',
      },
    },
  },
  plugins: [],
};

export default config;
