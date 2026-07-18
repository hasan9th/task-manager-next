"use client";
import type { Task } from "@/app/types/task";
import { createContext, useState, useEffect } from "react";
import { getTasks } from "@/app/services/taskService";
import { updateTaskApi } from "@/app/services/taskService";

export interface TaskContextType {
  tasks: Task[];
  error: string | null;
  loading: boolean;
  addTask: (newTask: Task) => void;
  toggleCompletionTask: (id: string) => void;
  deleteTask: (id: string) => void;
}

export const TasksContext = createContext<TaskContextType | null>(null);

export function TasksProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string | null>(null);
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

  //Add Task
  const addTask = (newTask: Task): void =>
    setTasks((prev) => [...prev, newTask]);

  //Toggle completion
  async function toggleCompletionTask(id: string) {
    const task =tasks.find(task=>task.id === id);
    if (!task) return
    const updatedTask = {...task,completed:!task?.completed};
    setTasks(prev=>
      prev.map((prTask) =>
        prTask.id === id ? updatedTask : prTask,
      ),
    );
    try {
      await updateTaskApi(updatedTask);
    } catch (error) {
      console.log("Update Error ...")
          setTasks(prev=>
      prev.map((prTask) =>
        prTask.id === id ? task : prTask,
      ),
    );
    }
  }

  //delete task
  const deleteTask = (id: string): void =>
    setTasks((prev) => prev.filter((task) => task.id !== id));

  return (
    <TasksContext.Provider
      value={{
        tasks,
        error,
        loading,
        addTask,
        toggleCompletionTask,
        deleteTask,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}
