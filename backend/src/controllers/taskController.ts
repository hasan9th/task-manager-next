import { NextFunction, Request, Response } from "express";
import {
  getAllTasks,
  getATask as getATaskService,
  createTask as createTaskService,
  updateTask as updateTaskService,
  removeTask as removeTaskService,
} from "../services/taskService.js";
import { createTaskSchema, updateTaskSchema } from "../schema/taskSchema.js";
export const getTasks = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const tasks = await getAllTasks();
    res.json(tasks);
  } catch (err) {
    next(err);
  }
};
export const getATask = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const task = await getATaskService(Number(req.params.id));
    if (!task) {
      res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (err) {
    next(err);
  }
};
export const getAbout = (req: Request, res: Response) => {
  res.json({
    message: "Task endpoints",
  });
};
export const createTask = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = createTaskSchema.safeParse(req.body);
  
    if (!result.success) {
      return res
        .status(400)
        .json({ message: "Data was invalid", error: result.error.issues });
    }
    const newTask = await createTaskService(result.data);
    res.status(201).json(newTask);
  } catch (err) {
    next(err);
  }
};
export const updateTask = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        message: "Invalid task ID",
      });
    }
    const result = updateTaskSchema.safeParse(req.body);

    if (!result.success) {
      return res
        .status(400)
        .json({ message: "Invalid data", error: result.error.issues });
    }
    const newTask = await updateTaskService(id,result.data);
    if (!newTask) {
      return res.status(404).json({ message: "Task not not found" });
    }
    res.json(newTask);
  } catch (err) {
    next(err);
  }
};
export const removeTask = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      res.status(400).json({
        message: "Invalid task ID",
      });
      return;
    }
    const deleted =await removeTaskService(id);
    if (deleted===0) {
      return res.status(404).send();
    }
    return res.status(204).json({ message: "Task deleted successfully"});
  } catch (error) {
    next(error);
  }
};
