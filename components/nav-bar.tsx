"use client";

import { useState, useEffect } from "react";
import { useTaskContext } from "@/lib/task-context";
import type { ViewMode } from "@/lib/types";

export function NavBar() {
  const { viewMode, setViewMode } = useTaskContext();
  const [timeString, setTimeString] = useState("--:-- --");

  const tabs: { mode: ViewMode; label: string; icon: string }[] = [
    { mode: 'today', label: 'TODAY', icon: '[]' },
    { mode: 'tomorrow', label: 'TOMORROW', icon: '>>' },
  ];

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const displayHours = hours % 12 || 12;
      setTimeString(`${displayHours}:${minutes} ${ampm}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="border-2 border-foreground bg-background">
      {/* Menu bar - classic Mac style */}
      <div className="border-b-2 border-foreground px-4 py-2 flex items-center justify-between">
        {/* Apple logo / App name */}
        <div className="flex items-center gap-4">
          <span className="font-bold text-xl">FOCUS</span>
          <span className="text-sm opacity-70">v1.0</span>
        </div>
        
        {/* Clock */}
        <div className="text-sm">
          {timeString}
        </div>
      </div>
      
      {/* Tab navigation */}
      <div className="flex">
        {tabs.map(({ mode, label, icon }) => (
          <button
            key={mode}
            onClick={() => setViewMode(mode)}
            className={`flex-1 px-4 py-3 text-lg flex items-center justify-center gap-2 border-r-2 border-foreground last:border-r-0 transition-none ${
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
