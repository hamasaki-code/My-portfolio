export default function Footer() {
  return (
    <footer className="border-t border-black/10 bg-white/70 px-6 py-8 text-center text-sm text-gray-600 transition-colors dark:border-yellow-400/10 dark:bg-black/80 dark:text-yellow-100/70">
      <p>
        &copy; {new Date().getFullYear()} Taishi Hamasaki. All rights reserved.
      </p>
    </footer>
  );
}
