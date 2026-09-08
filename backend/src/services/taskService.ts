import { Task, TaskPriority } from "../types/tasks.js";
import {
  getAllTask as getAllTaskRepository,
  getATask as getATaskRepository,
  createTask as createTaskRepository,
  updateTask as updateTaskRepository,
  removeTask as removeTaskRepository,
} from "../repositories/task.repository.js";
import { CreateTaskInput, UpdateTaskInput } from "../schema/taskSchema.js";

export async function getAllTasks(): Promise<Task[]|null> {
  return getAllTaskRepository();
}
export async function getATask(id: number): Promise<Task | null> {
  return getATaskRepository(id);
}
export async function createTask(data:CreateTaskInput) {
  return createTaskRepository({
    title: data.title,
    description: data.description,
    priority: data.priority,
    dueDate: data.dueDate ?? null,
    userId:data.userId
  });
}
export async function updateTask(id:number,data:UpdateTaskInput): Promise<Task | null> {
  return updateTaskRepository(id,data);
}
export async function removeTask(id: number):Promise<Task|null> {
  const deleteItem = removeTaskRepository(id);
  return deleteItem;
}
