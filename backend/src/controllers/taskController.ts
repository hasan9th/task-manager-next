import { Request, Response } from "express";
import { getAllTasks,createTask as createTaskService } from "../services/taskService.js";
import { Task } from "../types/tasks.js";
export const getTasks=(req:Request, res:Response)=>{
  const tasks=getAllTasks();
  res.json(tasks);
};
export const getAbout=(req:Request,res:Response)=>{
res.json({
  "message": "Task endpoints"
})
}
export const createTask=(req:Request,res:Response)=>{
  const {title}=req.body
  const nt=createTaskService(title);
  res.status(201).json(nt)
}