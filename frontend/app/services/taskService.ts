import { TaskFormData } from "../schema/taskSchema";
import { Task } from "../types/task";
interface TaskApi {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
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
      id: task.id,
      title: task.title,
      description: task.description,
      priority: task.priority,
      completed: task.completed,
    }),
  );
}
export async function getTaskById(id: number): Promise<Task> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/tasks/${id}`,
  );
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
export async function updateTaskApi(data: Partial<Task>,id:number) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/tasks/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",     
      },
      body: JSON.stringify(data),
    },
  );
  if (!response.ok) {
    throw new Error("Failed to update task");
  }
}
export async function createTask(newTask: TaskFormData):Promise<Task> {
  const response=await fetch( `${process.env.NEXT_PUBLIC_API_URL}/tasks`,{
     method: "POST",
     headers:{"content-type":"application/json"},
     body:JSON.stringify(newTask),
    });
    return await response.json();
}
export async function deleteTask(id: number): Promise<void> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/tasks/${id}`,
    { method: "DELETE" },
  );
  if (!response.ok) {
    throw new Error("Task delete error....");
  }
}
