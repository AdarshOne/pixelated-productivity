"use client";

import { useTheme } from "@/lib/theme-context";
import type { ThemeId } from "@/lib/theme-context";

export function ThemeSelector() {
  const { theme, setTheme, themes } = useTheme();

  return (
    <div className="flex items-center gap-1 flex-wrap">
      <span className="text-base mr-1 opacity-80">Theme:</span>
      {themes.map((t) => (
        <button
          key={t.id}
          type="button"
          onClick={() => setTheme(t.id as ThemeId)}
          className={`px-2 py-1 text-sm border-2 transition-none ${
            theme === t.id
              ? "bg-foreground text-background border-foreground"
              : "border-foreground bg-background hover:bg-foreground/10"
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
