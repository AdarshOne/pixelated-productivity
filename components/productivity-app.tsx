"use client";

import { TaskProvider, useTaskContext } from "@/lib/task-context";
import { NavBar } from "./nav-bar";
import { TodayView } from "./today-view";
import { TomorrowView } from "./tomorrow-view";
import { MotivationalQuote } from "./motivational-quote";

function AppContent() {
  const { viewMode } = useTaskContext();

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-4">
        {/* Motivational Quote */}
        <MotivationalQuote />
        
        {/* Navigation */}
        <NavBar />
        
        {/* Main content */}
        <main>
          {viewMode === 'today' && <TodayView />}
          {viewMode === 'tomorrow' && <TomorrowView />}
        </main>
      </div>
    </div>
  );
}

export function ProductivityApp() {
  return (
    <TaskProvider>
      <AppContent />
    </TaskProvider>
  );
}
