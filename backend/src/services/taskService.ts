import { Task } from "../types/tasks.js";
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
export function getAllTasks(): Task[] {
  return tasks;
}
export function getATask(id: string): Task | undefined {
  return tasks.find((task) => task.id === `task_${id}`);
}
export function createTask(title: string): Task {
  console.log("service start");
  const newTask: Task = {
    id: "task_" + (tasks.length + 1),
    title: title,
    description:
      "Coordinate catering and book conference room for Friday's team-building event",
    priority: "low",
    dueDate: "2026-08-22",
    completed: false,
  };
  tasks.push(newTask);
  console.log("service start" + newTask);
  return newTask;
}
export function updateTask(
  id: string,
  title: string,
  completed: boolean,
): Task | null {
  const task = tasks.find((task) => task.id === `task_` + id);
  if (!task) {
    return null;
  }
  task.title = title;
  task.completed = completed;
  return task;
}
export function removeTask(id: string): boolean {
  const taskIndex = tasks.findIndex((task) => task.id === `task_` + id);
  if (taskIndex === -1) {
    return false;
  }
  tasks.splice(taskIndex, 1);

  return true;
}
