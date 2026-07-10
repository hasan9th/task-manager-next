"use client";
import type { Task } from "@/app/types/task";
import { useState, type ChangeEvent } from "react";
import { useTask } from "@/app/hooks/useTask";
import { Button } from "@/components/ui/button";
import { Card,CardHeader,CardContent,CardFooter } from "@/components/ui/card";

export default function TaskForm() {
  const { tasks, addTask } = useTask();
  const [task, setTask] = useState<Task>({
    id: "",
    title: "",
    description: "",
    status: "todo",
    priority: "medium",
    dueDate: "",
    completed: false,
  });

  function onChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    const { id, value } = e.target;
    setTask((prev) => ({
      ...prev,
      id: Date.now().toString(),
      [id]: value,
    }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    addTask(task);
  }

  return (
    <form onSubmit={handleSubmit} className="">
      <Card>
        <CardHeader>
          New Task
        </CardHeader>
        <CardContent>
          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              value={task.title}
              onChange={onChange}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter task title"
            />
          </div>
          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              rows={3}
              value={task.description}
              onChange={onChange}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Describe the task"
            />
          </div>
          {/* Status & Priority (two columns) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700"
              >
                Status
              </label>
              <select
                id="status"
                value={task.status}
                onChange={onChange}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              >
                <option value="todo">To Do</option>
                <option value="in_progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="priority"
                className="block text-sm font-medium text-gray-700"
              >
                Priority
              </label>
              <select
                id="priority"
                value={task.priority}
                onChange={onChange}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
          {/* Due Date & Completed (two columns) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
            <div>
              <label
                htmlFor="dueDate"
                className="block text-sm font-medium text-gray-700"
              >
                Due Date
              </label>
              <input
                id="dueDate"
                type="date"
                value={task.dueDate}
                onChange={onChange}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex items-center space-x-3 pt-1">
              <input
                id="completed"
                type="checkbox"
                checked={task.completed}
                onChange={() =>
                  setTask((prev) => ({ ...prev, completed: !prev.completed }))
                }
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label
                htmlFor="completed"
                className="text-sm font-medium text-gray-700"
              >
                Completed
              </label>
            </div>
          </div>
        </CardContent>

        <CardFooter>
          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Add Task
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
