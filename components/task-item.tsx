"use client";

import type { Task } from "@/lib/types";
import { useTaskContext } from "@/lib/task-context";

interface TaskItemProps {
  task: Task;
}

export function TaskItem({ task }: TaskItemProps) {
  const { toggleTask, deleteTask } = useTaskContext();

  return (
    <div className="flex items-center gap-3 py-2 border-b-2 border-dashed border-foreground last:border-b-0 group">
      {/* Pixel checkbox */}
      <button
        type="button"
        onClick={() => toggleTask(task.id)}
        className={`w-4 h-4 border-2 border-foreground flex-shrink-0 flex items-center justify-center ${
          task.completed ? "bg-foreground" : "bg-background"
        }`}
        aria-label={task.completed ? "Mark incomplete" : "Mark complete"}
      >
        {task.completed && (
          <span className="text-background text-xs">X</span>
        )}
      </button>
      
      {/* Task title */}
      <span className={`flex-1 text-lg ${task.completed ? "line-through opacity-50" : ""}`}>
        {task.isPriority && <span className="mr-1">*</span>}
        {task.title}
      </span>
      
      {/* Delete button - shows on hover */}
      <button
        type="button"
        onClick={() => deleteTask(task.id)}
        className="opacity-0 group-hover:opacity-100 w-6 h-6 border-2 border-foreground flex items-center justify-center hover:bg-foreground hover:text-background transition-none"
        aria-label="Delete task"
      >
        X
      </button>
    </div>
  );
}
