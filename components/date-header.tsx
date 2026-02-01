"use client";

import { useState, useEffect } from "react";
import { useTaskContext } from "@/lib/task-context";
import type { ViewMode } from "@/lib/types";
import { useWeather } from "@/hooks/use-weather";

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function DateHeader({
  viewMode,
  completedCount,
  totalCount,
  nickname,
}: {
  viewMode: ViewMode;
  completedCount: number;
  totalCount: number;
  nickname: string | null;
}) {
  const [timeString, setTimeString] = useState("--:-- --");
  const weather = useWeather();

  const date = new Date();
  if (viewMode === "tomorrow") date.setDate(date.getDate() + 1);
  const dateString = `${dayNames[date.getDay()]} ${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  const label = viewMode === "today" ? "TODAY" : "TOMORROW";

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";
      const displayHours = hours % 12 || 12;
      setTimeString(`${displayHours}:${minutes} ${ampm}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="border-2 border-foreground p-4 bg-background">
      <div className="flex justify-between items-start flex-wrap gap-4">
        <div>
          <h2 className="text-3xl font-bold">{label}</h2>
          <p className="text-xl mt-0.5">{dateString}</p>
          {nickname && (
            <p className="text-lg mt-1 opacity-80">Hi, {nickname}</p>
          )}
          {viewMode === "today" && (
            <div className="mt-2 flex flex-wrap items-center gap-3 text-lg">
              <span className="font-mono font-bold">{timeString}</span>
              <span className="opacity-70">·</span>
              <span className="opacity-90">
                {weather.loading
                  ? "Loading weather…"
                  : weather.error
                    ? weather.error
                    : `${weather.label} ${weather.temp != null ? `${Math.round(weather.temp)}°C` : ""}`}
              </span>
            </div>
          )}
        </div>
        <div className="text-right text-xl">
          <p className="font-bold">{completedCount}/{totalCount}</p>
          <p className="text-base opacity-80">{viewMode === "today" ? "COMPLETE" : "PLANNED"}</p>
        </div>
      </div>
    </div>
  );
}
