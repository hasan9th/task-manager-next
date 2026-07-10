"use client";
import type { Task } from "@/app/types/task";
import { createContext, useState, useEffect } from "react";
import { getTasks } from "../services/taskService";

export interface TaskContextType {
  tasks: Task[];
  error:string|null;
  loading:boolean;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

export const TasksContext = createContext<TaskContextType | null>(null);

export function TasksProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string|null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function loadTasks() {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
        setError("Something went wrong...Failed to load tasks....");
      } finally {
        setLoading(false);
      }
    }
    loadTasks();
  }, []);
  return (
    <TasksContext.Provider value={{ tasks,error,loading, setTasks }}>
      {children}
    </TasksContext.Provider>
  );
}
