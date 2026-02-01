"use client";

import { useTaskContext } from "@/lib/task-context";
import { MacWindow } from "./mac-window";
import { TaskList } from "./task-list";
import { TaskInput } from "./task-input";
import { MiniCalendar } from "./mini-calendar";

export function TodayView() {
  const { getTodayTasks } = useTaskContext();
  const tasks = getTodayTasks();
  
  const completedCount = tasks.filter(t => t.completed).length;
  const totalCount = tasks.length;

  // Format today's date: Sat Jan 31, 2026
  const today = new Date();
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const dateString = `${dayNames[today.getDay()]} ${monthNames[today.getMonth()]} ${today.getDate()}, ${today.getFullYear()}`;

  return (
    <div className="space-y-4">
      {/* Header with date */}
      <div className="border-2 border-foreground p-3 bg-background">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">TODAY</h2>
            <p className="text-sm">{dateString}</p>
          </div>
          <div className="text-right">
            <p className="text-lg">{completedCount}/{totalCount}</p>
            <p className="text-xs">COMPLETE</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Task list - takes 2 columns */}
        <div className="md:col-span-2">
          <MacWindow title="TASK LIST">
            <div className="space-y-4">
              <TaskInput mode="today" />
              <div className="border-t-2 border-foreground pt-4">
                <TaskList 
                  tasks={tasks} 
                  emptyMessage="NO TASKS FOR TODAY. ADD YOUR TOP 3 PRIORITIES."
                />
              </div>
            </div>
          </MacWindow>
        </div>

        {/* Calendar sidebar */}
        <div className="space-y-4">
          <MacWindow title="CALENDAR">
            <MiniCalendar />
          </MacWindow>
          
          {/* Progress indicator */}
          <MacWindow title="PROGRESS">
            <div className="space-y-2">
              {/* ASCII-style progress bar */}
              <div className="font-mono text-sm">
                <p>TASKS: {totalCount}/6</p>
                <div className="flex gap-0.5 mt-1">
                  {Array.from({ length: 6 }, (_, i) => (
                    <div 
                      key={i}
                      className={`w-4 h-4 border border-foreground ${
                        i < totalCount 
                          ? i < completedCount 
                            ? 'bg-foreground' 
                            : 'bg-background'
                          : 'bg-background'
                      }`}
                    />
                  ))}
                </div>
              </div>
              
              <div className="border-t border-dashed border-foreground pt-2 mt-2 text-xs">
                <p>[X] = DONE</p>
                <p>[ ] = TODO</p>
              </div>
            </div>
          </MacWindow>
        </div>
      </div>
    </div>
  );
}
