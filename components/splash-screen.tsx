"use client";

import { useState, useEffect, type FormEvent } from "react";

const STORAGE_KEY_SEEN = "focus-splash-seen";
const STORAGE_KEY_NICKNAME = "focus-nickname";

export function getStoredNickname(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(STORAGE_KEY_NICKNAME);
}

export function hasSeenSplash(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(STORAGE_KEY_SEEN) === "true";
}

interface SplashScreenProps {
  onComplete: (nickname: string) => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [nickname, setNickname] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const name = nickname.trim() || "Friend";
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY_SEEN, "true");
      localStorage.setItem(STORAGE_KEY_NICKNAME, name);
    }
    onComplete(name);
  };

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background p-4">
      <div className="max-w-md w-full border-2 border-foreground p-6 bg-background space-y-6">
        <h1 className="text-3xl font-bold text-center">FOCUS</h1>
        <p className="text-lg leading-relaxed">
          A simple productivity app: <strong>6 tasks per day</strong> (3 priority, 3 optional).
          Tasks reset daily; use the <strong>Tomorrow</strong> tab to plan ahead. A quote rotates at the top.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label htmlFor="nickname" className="block text-lg">
            What should we call you?
          </label>
          <input
            id="nickname"
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="Your nickname"
            className="w-full border-2 border-foreground px-3 py-2 text-lg bg-background placeholder:text-foreground/50 focus:outline-none"
            autoFocus
          />
          <button type="submit" className="w-full mac-button px-4 py-3 text-xl">
            GET STARTED
          </button>
        </form>
      </div>
    </div>
  );
}
