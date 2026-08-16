import { Task } from "../types/tasks.js";
const tasks:Task[]=[
  {
    id: "task_1",
    title: "Review quarterly budget report",
    description: "Go through Q4 financial and flag any discrepancies before the board meeting",
    priority: "high",
    dueDate: "2026-08-20",
    completed: false
  },
  {
    id: "task_2",
    title: "Update employee handbook",
    description: "Add new remote work policies and hybrid schedule guidelines",
    priority: "medium",
    dueDate: "2026-09-05",
    completed: false
  },

  {
    id: "task_3",
    title: "Organize team lunch",
    description: "Coordinate catering and book conference room for Friday's team-building event",
    priority: "low",
    dueDate: "2026-08-22",
    completed: false
  },

]
export function getAllTasks():Task[] {
  return  tasks;

}
export function getATask(id:string):Task|undefined{
  return tasks.find((task)=>task.id===`task_${id}`)
}
export function createTask(title:string):Task{
  console.log("service start")
  const newTask:Task={
    id:"task_"+(tasks.length+1),
    title: title,
    description: "Coordinate catering and book conference room for Friday's team-building event",
    priority: "low",
    dueDate: "2026-08-22",
    completed: false
  }
  tasks.push(newTask)
  console.log("service start"+newTask)
  return newTask;
}