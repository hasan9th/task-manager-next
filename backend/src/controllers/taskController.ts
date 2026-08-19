import { Request, Response } from "express";
import { getAllTasks,getATask as getATaskService,createTask as createTaskService } from "../services/taskService.js";
import { createTaskSchema } from "../schema/taskSchema.js";
export const getTasks=(req:Request, res:Response)=>{
  const tasks=getAllTasks();
  res.json(tasks);
};
export const getATask=(req:Request,res:Response)=>{
 
  const task=getATaskService(req.params.id.toString())
  if(!task){
    res.status(404).json({message:"Task not found"})
  }
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
  }
  const {title}=result.data;
  const nt=createTaskService(title);
  res.status(201).json(nt)
}