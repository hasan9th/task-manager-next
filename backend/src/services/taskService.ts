import { Task, TaskPriority } from "../types/tasks.js";
import {
  getAllTask as getAllTaskRepository,
  getTaskById as getTaskByIdRepository,
  createTask as createTaskRepository,
  updateTask as updateTaskRepository,
  removeTask as removeTaskRepository,
} from "../repositories/task.repository.js";
import { CreateTaskInput, UpdateTaskInput } from "../schema/taskSchema.js";

export async function getAllTasks(userId:number): Promise<Task[]|null> {
  return getAllTaskRepository(userId);
}
export async function getTaskById(id: number,userId:number): Promise<Task | null> {
  return getTaskByIdRepository(id,userId);
}
export async function createTask(data:CreateTaskInput,userId:number) {
  return createTaskRepository({
    title: data.title,
    description: data.description,
    priority: data.priority,
    dueDate: data.dueDate ?? null,
  },userId);
}
export async function updateTask(id:number,data:UpdateTaskInput,userId:number): Promise<Task | null> {
  return updateTaskRepository(id,data,userId);
}
export async function removeTask(id: number,userId:number):Promise<number> {
  return await removeTaskRepository(id,userId);
}
