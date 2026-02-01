"use client";

import { useTaskContext } from "@/lib/task-context";
import type { ViewMode } from "@/lib/types";

export function NavBar() {
  const { viewMode, setViewMode } = useTaskContext();

  const tabs: { mode: ViewMode; label: string; icon: string }[] = [
    { mode: 'today', label: 'TODAY', icon: '[]' },
    { mode: 'tomorrow', label: 'TOMORROW', icon: '>>' },
  ];

  return (
    <div className="border-2 border-foreground bg-background">
      <div className="flex">
        {tabs.map(({ mode, label, icon }) => (
          <button
            key={mode}
            onClick={() => setViewMode(mode)}
            className={`flex-1 px-4 py-3 text-xl flex items-center justify-center gap-2 border-r-2 border-foreground last:border-r-0 transition-none ${
              viewMode === mode 
                ? 'bg-foreground text-background' 
                : 'bg-background text-foreground hover:bg-foreground/10'
            }`}
          >
            <span className="font-mono">{icon}</span>
            <span>{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
