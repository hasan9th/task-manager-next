import { Request, Response } from "express";
import {
  getAllTasks,
  getATask as getATaskService,
  createTask as createTaskService,
  updateTask as updateTaskService,
  removeTask as removeTaskService,
} from "../services/taskService.js";
import { createTaskSchema, updateTaskSchema } from "../schema/taskSchema.js";
export const getTasks = (req: Request, res: Response) => {
  const tasks = getAllTasks();
  res.json(tasks);
};
export const getATask = (req: Request, res: Response) => {
  const task = getATaskService(req.params.id.toString());
  if (!task) {
    res.status(404).json({ message: "Task not found" });
  }
<<<<<<< HEAD
  res.status(200).json(task);
};
export const getAbout = (req: Request, res: Response) => {
  res.json({
    message: "Task endpoints",
  });
};
export const createTask = (req: Request, res: Response) => {
  const result = createTaskSchema.safeParse(req.body);
  console.log(result);

  if (!result.success) {
    return res
      .status(400)
      .json({ message: "Data was invalid", error: result.error.issues });
=======
  res.status(200).json(task)
}
export const getAbout=(req:Request,res:Response)=>{
res.json({
  "message": "Task endpoints"
})
}
export const createTask=(req:Request,res:Response)=>{
  const result=createTaskSchema.safeParse(req.body);
  if(!result.success){
    return res.status(400).json({message:"Data was invalid",error:result.error.issues})
>>>>>>> feature/middleware
  }
  const { title } = result.data;
  const nt = createTaskService(title);
  res.status(201).json(nt);
};
export const updateTask = (req: Request, res: Response) => {
  const result = updateTaskSchema.safeParse(req.body);
  const id = req.params.id.toString();
  if (!result.success) {
    return res
      .status(400)
      .json({ message: "Invalid data", error: result.error.issues });
  }
  const newTask = updateTaskService(
    id,
    result.data.title,
    result.data.completed,
  );
  if (!newTask) {
    return res.status(404).json({ message: "Task not not found" });
  }
  res.json(newTask);
};
export const removeTask = (req: Request, res: Response) => {
  const id  = req.params.id.toString();
    const deleted = removeTaskService(id);

    if (!deleted) {
    return res.status(404).json({
      message: "Task not found",
    });
  }

  return res.status(204).send();
};
