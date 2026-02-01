"use client";

import { useState, useRef, useEffect } from "react";
import type { Task } from "@/lib/types";
import { useTaskContext } from "@/lib/task-context";

interface TaskItemProps {
  task: Task;
}

export function TaskItem({ task }: TaskItemProps) {
  const { toggleTask, deleteTask, updateTask } = useTaskContext();
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editPriority, setEditPriority] = useState(task.isPriority);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) {
      setEditTitle(task.title);
      setEditPriority(task.isPriority);
      inputRef.current?.focus();
    }
  }, [editing, task.title, task.isPriority]);

  const handleSave = () => {
    const titleOk = editTitle.trim() && updateTask(task.id, { title: editTitle.trim(), isPriority: editPriority });
    if (titleOk) setEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setEditPriority(task.isPriority);
    setEditing(false);
  };

  if (editing) {
    return (
      <div className="flex flex-col gap-2 py-2 border-b-2 border-dashed border-foreground last:border-b-0">
        <input
          ref={inputRef}
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          className="w-full border-2 border-foreground px-3 py-2 text-lg bg-background focus:outline-none"
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSave();
            if (e.key === "Escape") handleCancel();
          }}
        />
        <div className="flex items-center gap-2 flex-wrap">
          <label className="flex items-center gap-1 text-base cursor-pointer">
            <input
              type="checkbox"
              checked={editPriority}
              onChange={(e) => setEditPriority(e.target.checked)}
              className="w-4 h-4"
            />
            Priority
          </label>
          <div className="flex gap-2 ml-2">
            <button
              type="button"
              onClick={handleSave}
              className="mac-button px-3 py-1 text-base"
            >
              Save
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="border-2 border-foreground px-3 py-1 text-base hover:bg-foreground hover:text-background"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 py-2 border-b-2 border-dashed border-foreground last:border-b-0 group">
      <button
        type="button"
        onClick={() => toggleTask(task.id)}
        className={`w-6 h-6 border-2 border-foreground flex-shrink-0 flex items-center justify-center ${
          task.completed ? "bg-foreground" : "bg-background"
        }`}
        aria-label={task.completed ? "Mark incomplete" : "Mark complete"}
      >
        {task.completed && <span className="text-background text-sm">✓</span>}
      </button>

      <span className={`flex-1 text-xl min-w-0 ${task.completed ? "line-through opacity-60" : ""}`}>
        {task.isPriority && <span className="mr-1">*</span>}
        {task.title}
      </span>

      <div className="flex items-center gap-1 flex-shrink-0">
        <button
          type="button"
          onClick={() => setEditing(true)}
          className="w-8 h-8 border-2 border-foreground flex items-center justify-center text-sm hover:bg-foreground hover:text-background"
          aria-label="Edit task"
        >
          ✎
        </button>
        <button
          type="button"
          onClick={() => deleteTask(task.id)}
          className="w-8 h-8 border-2 border-foreground flex items-center justify-center text-sm hover:bg-foreground hover:text-background"
          aria-label="Delete task"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
