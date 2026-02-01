"use client";

import { useTaskContext } from "@/lib/task-context";
import { MacWindow } from "./mac-window";
import { TaskList } from "./task-list";
import { TaskInput } from "./task-input";

export function TomorrowView() {
  const { getTomorrowTasks } = useTaskContext();
  const tasks = getTomorrowTasks();
  
  const priorityCount = tasks.filter(t => t.isPriority).length;
  const optionalCount = tasks.filter(t => !t.isPriority).length;

  // Format tomorrow's date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayNames = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
  const monthNames = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 
                      'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
  
  const dateString = `${dayNames[tomorrow.getDay()]}, ${monthNames[tomorrow.getMonth()]} ${tomorrow.getDate()}, ${tomorrow.getFullYear()}`;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="border-2 border-foreground p-3 bg-background">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">TOMORROW</h2>
            <p className="text-sm">{dateString}</p>
          </div>
          <div className="text-right">
            <p className="text-xs">PLANNING MODE</p>
            <p className="text-sm">*{priorityCount}/3 | +{optionalCount}/3</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Planning area - takes 2 columns */}
        <div className="md:col-span-2">
          <MacWindow title="PLAN TOMORROW">
            <div className="space-y-4">
              <TaskInput mode="tomorrow" />
              <div className="border-t-2 border-foreground pt-4">
                <TaskList 
                  tasks={tasks} 
                  emptyMessage="PLAN YOUR TOP 3 PRIORITIES FOR TOMORROW."
                />
              </div>
            </div>
          </MacWindow>
        </div>

        {/* Planning tips */}
        <div className="space-y-4">
          <MacWindow title="PLANNING TIPS">
            <div className="space-y-3 text-sm">
              <div className="border-b border-dashed border-foreground pb-2">
                <p className="font-bold">* PRIORITY TASKS</p>
                <p className="opacity-80">Your TOP 3 must-do items. These are non-negotiable.</p>
              </div>
              
              <div className="border-b border-dashed border-foreground pb-2">
                <p className="font-bold">+ OPTIONAL TASKS</p>
                <p className="opacity-80">Nice-to-have items. Only 3 allowed to maintain focus.</p>
              </div>
              
              <div>
                <p className="font-bold">! NO CARRY-FORWARD</p>
                <p className="opacity-80">Incomplete tasks are cleared at midnight. Start fresh each day.</p>
              </div>
            </div>
          </MacWindow>

          {/* Task slots visualization */}
          <MacWindow title="TASK SLOTS">
            <div className="space-y-2 text-sm">
              <div>
                <p className="mb-1">*PRIORITY:</p>
                <div className="flex gap-1">
                  {[0, 1, 2].map(i => (
                    <div 
                      key={`priority-${i}`}
                      className={`w-8 h-8 border-2 border-foreground flex items-center justify-center ${
                        i < priorityCount ? 'bg-foreground text-background' : 'bg-background'
                      }`}
                    >
                      {i < priorityCount ? (i + 1) : '-'}
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <p className="mb-1">+OPTIONAL:</p>
                <div className="flex gap-1">
                  {[0, 1, 2].map(i => (
                    <div 
                      key={`optional-${i}`}
                      className={`w-8 h-8 border-2 border-foreground flex items-center justify-center ${
                        i < optionalCount ? 'bg-foreground text-background' : 'bg-background'
                      }`}
                    >
                      {i < optionalCount ? (i + 1) : '-'}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </MacWindow>
        </div>
      </div>
    </div>
  );
}
