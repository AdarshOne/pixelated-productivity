"use client";

import React from "react"

interface MacWindowProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function MacWindow({ title, children, className = "" }: MacWindowProps) {
  return (
    <div className={`mac-window bg-background ${className}`}>
      {/* Classic Mac title bar with horizontal lines */}
      <div className="h-6 px-2 flex items-center gap-2 mac-title-bar">
        <div className="w-4 h-4 border-2 border-foreground bg-background flex items-center justify-center">
          <span className="text-[10px] leading-none">-</span>
        </div>
        <div className="flex-1 flex justify-center">
          <span className="text-sm font-bold bg-background px-2">{title}</span>
        </div>
        <div className="w-4 h-4" />
      </div>
      {/* Window content */}
      <div className="p-4">
        {children}
      </div>
    </div>
  );
}
