'use client'
import { useContext } from "react";
import type { Task } from "@/app/types/task";
import { TasksContext } from "@/app/context/taskContext";

export function useTask() {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error("!useTasks must be used within TasksProvider...");
  }

  return context;
}
