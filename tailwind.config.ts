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
    },
  },
  plugins: [],
};

export default config;
