import { Request, Response, NextFunction } from "express";
import { string } from "zod";
import { verifyAccessToken } from "../utils/jwt.js";
export interface AuthenticatedRequest extends Request {
  user?: {
    userId: number;
    email: string;
  };
}
export function authMiddleware(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({
      message: "Authentication required",
    });
  }
  const [scheme, token] = authHeader.split(" ");
  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({
      message: "Invalid authorization header",
    });
  }
  try {
    const payLoad = verifyAccessToken(token);
    req.user = {
      userId: payLoad.userId,
      email: payLoad.email,
    };
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
}
