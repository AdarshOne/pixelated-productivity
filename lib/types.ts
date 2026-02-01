export interface Task {
  id: string;
  title: string;
  completed: boolean;
  isPriority: boolean; // true = top 3 priority, false = optional
  date: string; // YYYY-MM-DD format
  createdAt: string;
}

export type ViewMode = 'today' | 'tomorrow';
