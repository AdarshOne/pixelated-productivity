"use client";

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import type { Task, ViewMode } from './types';

interface TaskContextType {
  tasks: Task[];
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  addTask: (title: string, isPriority: boolean, date: string) => boolean;
  updateTask: (id: string, updates: { title?: string; isPriority?: boolean }) => boolean;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  getTodayTasks: () => Task[];
  getTomorrowTasks: () => Task[];
  canAddPriorityTask: (date: string) => boolean;
  canAddOptionalTask: (date: string) => boolean;
  getPriorityCount: (date: string) => number;
  getOptionalCount: (date: string) => number;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function getDateString(daysFromNow: number = 0): string {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date.toISOString().split('T')[0];
}

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>('today');
  const [isLoaded, setIsLoaded] = useState(false);

  // Load tasks from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('focus-tasks');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Filter out any tasks from past days (no carry forward)
        const today = getDateString(0);
        const tomorrow = getDateString(1);
        const validTasks = parsed.filter((task: Task) => 
          task.date === today || task.date === tomorrow
        );
        setTasks(validTasks);
      } catch (e) {
        console.error('[v0] Failed to parse stored tasks:', e);
        setTasks([]);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('focus-tasks', JSON.stringify(tasks));
    }
  }, [tasks, isLoaded]);

  // Clean up overdue tasks on day change
  useEffect(() => {
    const checkDate = () => {
      const today = getDateString(0);
      const tomorrow = getDateString(1);
      setTasks(prev => prev.filter(task => 
        task.date === today || task.date === tomorrow
      ));
    };

    // Check every minute
    const interval = setInterval(checkDate, 60000);
    return () => clearInterval(interval);
  }, []);

  const getPriorityCount = useCallback((date: string) => {
    return tasks.filter(t => t.date === date && t.isPriority).length;
  }, [tasks]);

  const getOptionalCount = useCallback((date: string) => {
    return tasks.filter(t => t.date === date && !t.isPriority).length;
  }, [tasks]);

  const canAddPriorityTask = useCallback((date: string) => {
    return getPriorityCount(date) < 3;
  }, [getPriorityCount]);

  const canAddOptionalTask = useCallback((date: string) => {
    return getOptionalCount(date) < 3;
  }, [getOptionalCount]);

  const addTask = useCallback((title: string, isPriority: boolean, date: string): boolean => {
    if (isPriority && !canAddPriorityTask(date)) return false;
    if (!isPriority && !canAddOptionalTask(date)) return false;
    if (!title.trim()) return false;

    const newTask: Task = {
      id: crypto.randomUUID(),
      title: title.trim(),
      completed: false,
      isPriority,
      date,
      createdAt: new Date().toISOString(),
    };

    setTasks(prev => [...prev, newTask]);
    return true;
  }, [canAddPriorityTask, canAddOptionalTask]);

  const updateTask = useCallback((id: string, updates: { title?: string; isPriority?: boolean }): boolean => {
    const task = tasks.find(t => t.id === id);
    if (!task) return false;
    if (updates.title !== undefined) {
      if (!updates.title.trim()) return false;
      const date = task.date;
      const otherTasks = tasks.filter(t => t.id !== id && t.date === date);
      const newPriority = updates.isPriority ?? task.isPriority;
      const priorityCount = otherTasks.filter(t => t.isPriority).length + (newPriority ? 1 : 0);
      const optionalCount = otherTasks.filter(t => !t.isPriority).length + (newPriority ? 0 : 1);
      if (newPriority && priorityCount > 3) return false;
      if (!newPriority && optionalCount > 3) return false;
    }
    if (updates.isPriority !== undefined) {
      const date = task.date;
      const otherTasks = tasks.filter(t => t.id !== id && t.date === date);
      const priorityCount = otherTasks.filter(t => t.isPriority).length + (updates.isPriority ? 1 : 0);
      const optionalCount = otherTasks.filter(t => !t.isPriority).length + (updates.isPriority ? 0 : 1);
      if (priorityCount > 3 || optionalCount > 3) return false;
    }
    setTasks(prev => prev.map(t =>
      t.id === id
        ? {
            ...t,
            ...(updates.title !== undefined && { title: updates.title.trim() }),
            ...(updates.isPriority !== undefined && { isPriority: updates.isPriority }),
          }
        : t
    ));
    return true;
  }, [tasks]);

  const toggleTask = useCallback((id: string) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  }, []);

  const getTodayTasks = useCallback(() => {
    const today = getDateString(0);
    return tasks.filter(t => t.date === today);
  }, [tasks]);

  const getTomorrowTasks = useCallback(() => {
    const tomorrow = getDateString(1);
    return tasks.filter(t => t.date === tomorrow);
  }, [tasks]);

  return (
    <TaskContext.Provider value={{
      tasks,
      viewMode,
      setViewMode,
      addTask,
      updateTask,
      toggleTask,
      deleteTask,
      getTodayTasks,
      getTomorrowTasks,
      canAddPriorityTask,
      canAddOptionalTask,
      getPriorityCount,
      getOptionalCount,
    }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTaskContext() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
}
