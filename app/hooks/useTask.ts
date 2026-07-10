'use client'
import { useContext } from "react";
import type { Task } from "@/app/types/task";
import { TasksContext } from "@/app/context/taskContext";

export function useTask() {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error("!useTasks must be used within TasksProvider...");
  }
  const { tasks,loading,error, setTasks } = context;

  //Add Task
  const addTask = (newTask: Task): void =>
    setTasks((prev) => [...prev, newTask]);
  //Toggle completion
  const toggleCompletionTask = (id: string): void =>
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed }:task,
      ),
    );
  //delete task
  const deleteTask = (id: string): void =>
    setTasks((prev) => prev.filter((task) => task.id !== id));

  return { tasks,loading,error, addTask, toggleCompletionTask, deleteTask };
}
