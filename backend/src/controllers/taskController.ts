import { NextFunction, Response } from "express";
import {
  getAllTasks,
  getTaskById as getTaskByIdService,
  createTask as createTaskService,
  updateTask as updateTaskService,
  removeTask as removeTaskService,
} from "../services/taskService.js";
import {
  createTaskSchema,
  taskIdSchema,
  taskQuerySchema,
  updateTaskSchema,
} from "../schema/taskSchema.js";
import { AuthenticatedRequest } from "../middleware/authMiddleware.js";
import { AppError } from "../errors/AppError.js";
export const getTasks = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }
    const queryResult = taskQuerySchema.safeParse(req.query);
    if (!queryResult.success) {
      return res.status(400).json({
        message: "Invalid query parameters",
        error: queryResult.error.issues,
      });
    }
     
    const result = await getAllTasks(req.user.userId, queryResult.data);
    res.json(result.data);
  } catch (err) {
    next(err);
  }
};
export const getTaskById = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }
    const result=taskIdSchema.safeParse(req.params)
    if(!result.success){
      return res.json({message:"Invalid Data",error:result.error.issues})
    }
    const task = await getTaskByIdService(
      result.data.id,
      Number(req.user.userId),
    );
    if (!task) {
      throw new AppError(404,"Task not found!")
    }
    return res.status(200).json(task);
  } catch (err) {
    next(err);
  }
};
export const getAbout = (res: Response) => {
  res.json({
    message: "Task endpoints",
  });
};
export const createTask = async (
  req: AuthenticatedRequest,
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
    if (!req.user) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }
    const newTask = await createTaskService(result.data, req.user.userId);
    res.status(201).json(newTask);
  } catch (err) {
    next(err);
  }
};
export const updateTask = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }
        const resultTaskId=taskIdSchema.safeParse(req.params)
    if(!resultTaskId.success){
      return res.json({message:"Invalid Data",error:resultTaskId.error.issues})
    }
    const id = resultTaskId.data.id;

    const result = updateTaskSchema.safeParse(req.body);

    if (!result.success) {
      return res
        .status(400)
        .json({ message: "Invalid data", error: result.error.issues });
    }
    const newTask = await updateTaskService(id, result.data, req.user.userId);
    if (!newTask) {
      return res.status(404).json({ message: "Task not not found" });
    }
    res.json(newTask);
  } catch (err) {
    next(err);
  }
};
export const removeTask = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      throw new AppError(401,"Authentication required")
    }
       const resultTaskId=taskIdSchema.safeParse(req.params)
    if(!resultTaskId.success){
      return res.json({message:"Invalid Data",error:resultTaskId.error.issues})
    }
    const id = resultTaskId.data.id;
    const deleted = await removeTaskService(id, req.user.userId);
    if (deleted === 0) {
      return res.status(404).json({ message: "Task not found" });
    }
    return res.status(204).json({ message: "Task deleted successfully" });
  } catch (error) {
    next(error);
  }
};
