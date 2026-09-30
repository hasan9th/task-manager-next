import { Request, Response, NextFunction } from "express";
import z from "zod";

export function validate(
  schema: z.ZodType,
  source: "body" | "params" | "query",
) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[source]);
    if (!result.success) {
      return next(result.error);
    }
    res.locals.validate= {...res.locals.validate,[source]:result.data};
    next();
  };
}
