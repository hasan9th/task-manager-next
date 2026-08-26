import { Task } from "../types/tasks.js";
import {
  getAllTask as getAllTaskRepository,
  getATask as getATaskRepository,
  createTask as createTaskRepository,
  updateTask as updateTaskRepository
} from "../repositories/task.repository.js";
var tasks: Task[] = [
  {
    id: "task_0",
    title: "Review quarterly budget report",
    description:
      "Go through Q4 financial and flag any discrepancies before the board meeting",
    priority: "high",
    dueDate: "2026-08-20",
    completed: false,
  },
  {
    id: "task_1",
    title: "Update employee handbook",
    description: "Add new remote work policies and hybrid schedule guidelines",
    priority: "medium",
    dueDate: "2026-09-05",
    completed: false,
  },

  {
    id: "task_2",
    title: "Organize team lunch",
    description:
      "Coordinate catering and book conference room for Friday's team-building event",
    priority: "low",
    dueDate: "2026-08-22",
    completed: false,
  },
];
export async function getAllTasks(): Promise<Task[]> {
  return getAllTaskRepository();
}
export async function getATask(id: string): Promise<Task | undefined> {
  return getATaskRepository(id);
}
export async function createTask(title: string) {
  return createTaskRepository(title);
}
export async function updateTask(
  id: number,
  title: string | undefined,
  completed: boolean | undefined,
): Promise<Task | null> {
return updateTaskRepository(id,title,completed)
}
export function removeTask(id: number): boolean {
  const taskIndex = tasks.findIndex((task) => task.id === id);
  if (taskIndex === -1) {
    return false;
  }
  tasks.splice(taskIndex, 1);

  return true;
}
