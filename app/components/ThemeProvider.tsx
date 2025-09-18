
"use client";

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from "react";

type ThemeMode = "light" | "dark";

type ThemeContextValue = {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
    setTheme: (mode: ThemeMode) => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function applyThemeClass(isDark: boolean) {
    if (typeof window === "undefined") {
        return;
    }
    const root = window.document.documentElement;
    root.classList.toggle("dark", isDark);
    root.dataset.theme = isDark ? "dark" : "light";
}

type ThemeProviderProps = {
    children: ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

    useEffect(() => {
        if (typeof window === "undefined") {
            return;
        }

        const storedPreference = window.localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const shouldUseDark = storedPreference ? storedPreference === "dark" : prefersDark;

        setIsDarkMode(shouldUseDark);
        applyThemeClass(shouldUseDark);

        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handleChange = (event: MediaQueryListEvent) => {
            if (window.localStorage.getItem("theme")) {
                return;
            }
            setIsDarkMode(event.matches);
            applyThemeClass(event.matches);
        };

        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);

    const toggleDarkMode = useCallback(() => {
        setIsDarkMode((prev) => {
            const next = !prev;
            if (typeof window !== "undefined") {
                window.localStorage.setItem("theme", next ? "dark" : "light");
            }
            applyThemeClass(next);
            return next;
        });
    }, []);

    const setTheme = useCallback((mode: ThemeMode) => {
        const nextIsDark = mode === "dark";
        setIsDarkMode(nextIsDark);
        if (typeof window !== "undefined") {
            window.localStorage.setItem("theme", nextIsDark ? "dark" : "light");
        }
        applyThemeClass(nextIsDark);
    }, []);

    const value = useMemo(
        () => ({
            isDarkMode,
            toggleDarkMode,
            setTheme,
        }),
        [isDarkMode, setTheme, toggleDarkMode]
    );

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}
