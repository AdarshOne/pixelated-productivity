"use client";

import React from "react";
import { useState, useEffect } from "react";
import { useTaskContext, getDateString } from "@/lib/task-context";
import type { ViewMode } from "@/lib/types";

interface TaskInputProps {
  mode: ViewMode;
}

export function TaskInput({ mode }: TaskInputProps) {
  const [title, setTitle] = useState("");
  const [isPriority, setIsPriority] = useState(true);
  const { addTask, canAddPriorityTask, canAddOptionalTask, getPriorityCount, getOptionalCount } = useTaskContext();

  const date = mode === 'today' ? getDateString(0) : getDateString(1);
  const priorityCount = getPriorityCount(date);
  const optionalCount = getOptionalCount(date);
  
  const canAddPriority = canAddPriorityTask(date);
  const canAddOptional = canAddOptionalTask(date);
  const canAdd = isPriority ? canAddPriority : canAddOptional;

  // Auto-adjust isPriority when current slot is full (so user can add to the other type)
  useEffect(() => {
    if (isPriority && !canAddPriority && canAddOptional) {
      setIsPriority(false);
    } else if (!isPriority && !canAddOptional && canAddPriority) {
      setIsPriority(true);
    }
  }, [isPriority, canAddPriority, canAddOptional]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !canAdd) return;
    
    const success = addTask(title, isPriority, date);
    if (success) {
      setTitle("");
      if (isPriority && !canAddPriorityTask(date)) {
        setIsPriority(false);
      }
    }
  };

  const isFull = priorityCount >= 3 && optionalCount >= 3;

  if (isFull) {
    return (
      <div className="border-2 border-foreground p-4 bg-background">
        <p className="text-center text-lg">
          [ TASK LIMIT REACHED: 3/3 PRIORITY + 3/3 OPTIONAL ]
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex gap-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task..."
          className="flex-1 border-2 border-foreground px-3 py-2 bg-background text-foreground placeholder:text-foreground/50 text-xl focus:outline-none"
        />
        <button
          type="submit"
          disabled={!canAdd || !title.trim()}
          className="mac-button px-4 py-2 text-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ADD
        </button>
      </div>
      <div className="flex items-center gap-4 text-base">
        <button
          type="button"
          onClick={() => canAddPriority && setIsPriority(true)}
          disabled={!canAddPriority}
          className={`flex items-center gap-2 ${!canAddPriority ? 'opacity-50' : ''}`}
        >
          <span className={`w-5 h-5 border-2 border-foreground flex items-center justify-center ${isPriority ? 'bg-foreground' : 'bg-background'}`}>
            {isPriority && <span className="text-background text-sm">✓</span>}
          </span>
          <span>*PRIORITY ({priorityCount}/3)</span>
        </button>
        <button
          type="button"
          onClick={() => canAddOptional && setIsPriority(false)}
          disabled={!canAddOptional}
          className={`flex items-center gap-2 ${!canAddOptional ? 'opacity-50' : ''}`}
        >
          <span className={`w-5 h-5 border-2 border-foreground flex items-center justify-center ${!isPriority ? 'bg-foreground' : 'bg-background'}`}>
            {!isPriority && <span className="text-background text-sm">✓</span>}
          </span>
          <span>OPTIONAL ({optionalCount}/3)</span>
        </button>
      </div>
    </form>
  );
}
