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
      throw new AppError(401,"Authentication required")
    }
    const query = res.locals.validate.query;
  

    const result = await getAllTasks(req.user.userId, query);
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
throw new AppError(401,"Authentication required")
    }
    const {id}=res.locals.validate.params;
    const task = await getTaskByIdService(
      id,
      req.user.userId,
    );
    if (!task) {
      throw new AppError(404, "Task not found");
    }
    return res.status(200).json(task);
  } catch (err) {
    next(err);
  }
};

export const createTask = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
  
    if (!req.user) {
      throw new AppError(401,"Authentication required");
    }
      const data = res.locals.validate.query;
    const newTask = await createTaskService(data, req.user.userId);
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
          throw new AppError(401,"Authentication required");
    }
    const {id} = res.locals.validate.params;
    const data = res.locals.validate.body;
    console.log(id,data)
    const newTask = await updateTaskService(id, data, req.user.userId);
    if (!newTask) {
      throw new AppError(404, "Task not found");
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
            throw new AppError(401,"Authentication required");

    }
    

    const {id}= res.locals.validate.params;
    const deleted = await removeTaskService(id, req.user.userId);
    if (deleted === 0) {
      return res.status(404).json({ message: "Task not found" });
    }
    return res.status(204).json({ message: "Task deleted successfully" });
  } catch (error) {
    next(error);
  }
};
