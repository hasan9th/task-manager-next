"use client";
import { getTaskById } from "@/app/services/taskService";
import { Task } from "@/app/types/task";
import { useEffect, useState } from "react";
import NotFound from "./not-found";
import ProtectedRoute from "@/app/auth/protectedRoute";
export default function TaskDetails({
  params,
}: {
  params: Promise<{ taskId: string }>;
}) {
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    async function getTask() {
      try {
        const { taskId } = await params;
         console.log("my type:",typeof(taskId))
        const data = await getTaskById(Number(taskId));
        setTask(data);
      } catch (error) {
        console.error("Failed to load task:", error);
      } finally {
        setLoading(false);
      }
    }
            getTask();

  }, [params]);
  if (loading) {
    return <p>Loading task...</p>;
  }
    if (!task) {
    return <NotFound />;
  }

  return (
    <ProtectedRoute>
      <h1>id:{task.id}</h1>

      <p>
        <strong>Title:</strong> {task.title}
      </p>

      <p>
        <strong>Description:</strong> {task.description}
      </p>
      <p>
        <strong>Priority:</strong> {task.priority}
      </p>
      <p>
        <strong>due date:</strong> {task.dueDate}
      </p>
    </ProtectedRoute>
  );
}

