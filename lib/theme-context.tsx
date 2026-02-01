"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export type ThemeId = "basic" | "flowers" | "mountains" | "cake" | "science";

const STORAGE_KEY = "focus-theme";

const themes: { id: ThemeId; label: string }[] = [
  { id: "basic", label: "Basic" },
  { id: "flowers", label: "Flowers" },
  { id: "mountains", label: "Mountains" },
  { id: "cake", label: "Cake" },
  { id: "science", label: "Science" },
];

interface ThemeContextType {
  theme: ThemeId;
  setTheme: (id: ThemeId) => void;
  themes: typeof themes;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>("basic");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(STORAGE_KEY) as ThemeId | null;
    const initial = stored && themes.some((t) => t.id === stored) ? stored : "basic";
    setThemeState(initial);
    document.documentElement.setAttribute("data-theme", initial);
  }, []);

  useEffect(() => {
    if (!mounted || typeof document === "undefined") return;
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme, mounted]);

  const setTheme = (id: ThemeId) => setThemeState(id);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
