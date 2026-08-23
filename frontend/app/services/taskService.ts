import { Task } from "../types/task";
interface TaskApi {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}
export async function getTasks(): Promise<Task[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks`);
  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }
  const data = await response.json();
  return data.map(
    (task: TaskApi): Task => ({
      id: task.id.toString(),
      title: task.title,
      description: "---",
      priority: "medium",
      completed: task.completed,
    }),
  );
}
export async function getTaskById(id: string): Promise<Task> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${id}`);
  if (!response.ok) {
    throw new Error("Task Fetch error....");
  }
  const task = await response.json();
  return {
    id: task.id.toString(),
    title: task.title,
    description: "---",
    priority: "medium",
    completed: task.completed,
  };
}
export async function updateTaskApi(newTasks: Task) {
  const response = await fetch("https://dummyjson.com/todos/sdss");
  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }
}
