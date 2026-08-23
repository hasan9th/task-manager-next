import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().min(1),
});
export const updateTaskSchema=z.object(
  {
    title:z.string().min(3).max(100).optional(),
    completed:z.boolean().optional(),
  }
).refine((data)=>data.title!==undefined||data.completed!==undefined,{message:"At least one field must be provided"})