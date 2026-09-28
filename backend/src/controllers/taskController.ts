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
  taskQuerySchema,
  updateTaskSchema,
} from "../schema/taskSchema.js";
import { AuthenticatedRequest } from "../middleware/authMiddleware.js";
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
    res.json(result);
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
    const task = await getTaskByIdService(
      Number(req.params.id),
      Number(req.user.userId),
    );
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
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
      return res.status(401).json({
        message: "Authentication required",
      });
    }
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      res.status(400).json({
        message: "Invalid task ID",
      });
      return;
    }
    const deleted = await removeTaskService(id, req.user.userId);
    if (deleted === 0) {
      return res.status(404).json({ message: "Task not found" });
    }
    return res.status(204).json({ message: "Task deleted successfully" });
  } catch (error) {
    next(error);
  }
};
