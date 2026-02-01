"use client";

import type { Task } from "@/lib/types";
import { TaskItem } from "./task-item";

interface TaskListProps {
  tasks: Task[];
  emptyMessage: string;
}

export function TaskList({ tasks, emptyMessage }: TaskListProps) {
  const priorityTasks = tasks.filter(t => t.isPriority);
  const optionalTasks = tasks.filter(t => !t.isPriority);

  if (tasks.length === 0) {
    return (
      <div className="border-2 border-dashed border-foreground p-6 text-center">
        <p className="text-lg opacity-70">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Priority Tasks */}
      {priorityTasks.length > 0 && (
        <div>
          <h3 className="text-sm mb-2 border-b border-foreground pb-1">
            * PRIORITY TASKS ({priorityTasks.length}/3)
          </h3>
          <div>
            {priorityTasks.map(task => (
              <TaskItem key={task.id} task={task} />
            ))}
          </div>
        </div>
      )}
      
      {/* Optional Tasks */}
      {optionalTasks.length > 0 && (
        <div>
          <h3 className="text-sm mb-2 border-b border-foreground pb-1">
            OPTIONAL TASKS ({optionalTasks.length}/3)
          </h3>
          <div>
            {optionalTasks.map(task => (
              <TaskItem key={task.id} task={task} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
