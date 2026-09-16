import { NextFunction, Request, Response } from "express";
import { loginSchema, registerSchema } from "../schema/authSchema.js";
import { register as registerService,login as loginService } from "../services/authService.js";
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
export const login = async (req: Request, res: Response, next: NextFunction) => {
  const result = loginSchema.safeParse(req.body);
  if (!result.success) {
    return res
      .status(400)
      .json({ message: "Data was invalid", error: result.error.issues });
  }
  try {
    const user=await loginService(result.data)

    if(!user){
      res.status(401).json({
      message:
        "Invalid username or password.",
    });
    }
    res.status(501).json({
      message:
        "POST /auth/login is wired correctly. Implementation starts on Day 45.",
    });
  } catch (error) {
    next(error);
  }
};
