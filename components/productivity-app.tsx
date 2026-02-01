"use client";

import { useState, useEffect } from "react";
import { TaskProvider, useTaskContext } from "@/lib/task-context";
import { ThemeProvider } from "@/lib/theme-context";
import {
  SplashScreen,
  hasSeenSplash,
  getStoredNickname,
} from "./splash-screen";
import { NavBar } from "./nav-bar";
import { MotivationalQuote } from "./motivational-quote";
import { MiniCalendar } from "./mini-calendar";
import { MacWindow } from "./mac-window";
import { TaskList } from "./task-list";
import { TaskInput } from "./task-input";
import { DateHeader } from "./date-header";
import { ThemeSelector } from "./theme-selector";
import { useTheme } from "@/lib/theme-context";

function MainContent({ nickname }: { nickname: string | null }) {
  const { viewMode, getTodayTasks, getTomorrowTasks } = useTaskContext();
  const { theme } = useTheme();
  const tasks = viewMode === "today" ? getTodayTasks() : getTomorrowTasks();
  const completedCount =
    viewMode === "today"
      ? tasks.filter((t) => t.completed).length
      : tasks.length;
  const totalCount = tasks.length;
  const emptyMessage =
    viewMode === "today"
      ? "NO TASKS FOR TODAY. ADD YOUR TOP 3 PRIORITIES."
      : "PLAN YOUR TOP 3 PRIORITIES FOR TOMORROW.";

  return (
    <div className={`min-h-screen p-4 md:p-6 theme-bg theme-${theme}`}>
      <div className="max-w-3xl mx-auto space-y-4">
        {/* 1. Today / Tomorrow date header */}
        <DateHeader
          viewMode={viewMode}
          completedCount={completedCount}
          totalCount={totalCount}
          nickname={nickname}
        />

        {/* 2. Quote */}
        <MotivationalQuote />

        {/* 3. Calendar */}
        <MacWindow title="CALENDAR">
          <MiniCalendar />
        </MacWindow>

        {/* 4. Today / Tomorrow toggle */}
        <NavBar />

        {/* 5. Task list */}
        <MacWindow title={viewMode === "today" ? "TASK LIST" : "PLAN TOMORROW"}>
          <div className="space-y-4">
            <TaskInput mode={viewMode} />
            <div className="border-t-2 border-foreground pt-4">
              <TaskList tasks={tasks} emptyMessage={emptyMessage} />
            </div>
          </div>
        </MacWindow>

        {/* 6. Progress */}
        <MacWindow title="PROGRESS">
          <div className="space-y-3">
            <div className="font-mono text-xl">
              <p>TASKS: {totalCount}/6</p>
              <div className="flex gap-1 mt-2">
                {Array.from({ length: 6 }, (_, i) => (
                  <div
                    key={i}
                    className={`w-6 h-6 border-2 border-foreground flex items-center justify-center text-sm ${
                      i < totalCount
                        ? i < completedCount
                          ? "bg-foreground text-background"
                          : "bg-background"
                        : "bg-background opacity-50"
                    }`}
                  >
                    {i < totalCount ? (i < completedCount ? "✓" : "") : "-"}
                  </div>
                ))}
              </div>
            </div>
            <div className="border-t border-dashed border-foreground pt-2 text-base">
              <p>[✓] = DONE</p>
              <p>[ ] = TODO</p>
            </div>
          </div>
        </MacWindow>

        {/* 7. Theme selector (small) */}
        <ThemeSelector />
      </div>
    </div>
  );
}

function AppContent() {
  const [ready, setReady] = useState(false);
  const [splashDone, setSplashDone] = useState(true);
  const [nickname, setNickname] = useState<string | null>(null);

  useEffect(() => {
    setSplashDone(hasSeenSplash());
    setNickname(getStoredNickname());
    setReady(true);
  }, []);

  const handleSplashComplete = (name: string) => {
    setNickname(name);
    setSplashDone(true);
  };

  if (!ready) return null;
  if (!splashDone) return <SplashScreen onComplete={handleSplashComplete} />;

  return (
    <TaskProvider>
      <MainContent nickname={nickname} />
    </TaskProvider>
  );
}

export function ProductivityApp() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
