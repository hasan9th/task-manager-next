import { NextFunction, Request, Response } from "express";
import { loginSchema, registerSchema } from "../schema/authSchema.js";
import {
  register as registerService,
  login as loginService,
} from "../services/authService.js";
import { AuthenticatedRequest } from "../middleware/authMiddleware.js";
import { getUserById } from "../repositories/authRepository.js";
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const result = registerSchema.safeParse(req.body);
  if (!result.success) {
    return res
      .status(400)
      .json({ message: "Data was invalid", error: result.error.issues });
  }
  try {
    const newUser = await registerService(result.data);
    if (!newUser) {
      return res.status(409).json({
        message: "Email is already registered",
      });
    }
    return res.status(201).json(newUser);
  } catch (error) {
    return next(error);
  }
};
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const validation = loginSchema.safeParse(req.body);
  if (!validation.success) {
    return res
      .status(400)
      .json({ message: "Data was invalid", error: validation.error.issues });
  }
  try {
    const loginResult = await loginService(validation.data);

    if (!loginResult) {
      res.status(401).json({
        message: "Invalid username or password.",
      });
    }
    res.status(200).json(loginResult);
  } catch (error) {
    next(error);
  }
};
export const me = async (
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
    const user = await getUserById(req.user.userId);
    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }
    return res.status(200).json({ user });
  } catch (error) {
    return next(error);
  }
};
