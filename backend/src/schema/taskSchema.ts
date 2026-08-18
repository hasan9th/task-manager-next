import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().min(1),
});
export const updateTaskSchema=z.object(
  {
    title:z.string().min(3),
    completed:z.boolean(),
  }
)