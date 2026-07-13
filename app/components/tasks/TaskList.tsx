"use client";
import type { ReactElement } from "react";

import TaskCard from "@/app/components/tasks/TaskCard";
import { useTask } from "@/app/hooks/useTask";
import EmptyTask from "./EmptyList";
import FilterButtons from "./FilterButtons";
import { useState } from "react";
import { FileWarningIcon, Watch } from "lucide-react";

export default function TaskList(): ReactElement {
  const { tasks, loading, error, deleteTask, toggleCompletionTask } = useTask();

  const [filter, setFilter] = useState("all");
  const changeFilter = (newFilter: string) => setFilter(newFilter);
  const filterTasks = tasks.filter((task) => {
    if (filter === "completed") {
      return task.completed;
    }
    if (filter === "active") {
      return !task.completed;
    }
    return true;
  });

  if (loading) {
    return (
      <div className="flex h-4 w-full bg-amber-200">
        <h1 className="text-blue-600">
          <Watch />
          Loading..........
        </h1>
      </div>
    );
  }
  if (error) {
    return (
      <h1 className="text-red-600">
        <FileWarningIcon />
        {error}
      </h1>
    );
  }
  if (tasks.length === 0) {
    return <EmptyTask />;
  }
  return (
    <div>
      <FilterButtons changeFilter={changeFilter} filter={filter} />
      <div className="grid grid-cols-2 gap-2">
        {filterTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDelete={deleteTask}
            onCompletionToggle={toggleCompletionTask}
          />
        ))}
      </div>
    </div>
  );
}
