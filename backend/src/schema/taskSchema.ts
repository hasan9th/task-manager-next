import { TypeOf, z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().trim().min(3).max(100),
  description:z.string().max(200).trim(),
  priority:z.enum(["low", "medium", "high"]),
   dueDate: z.string().date().nullable().optional(),
   userId:z.number()

});
export type CreateTaskInput=z.infer<typeof createTaskSchema>;
export const updateTaskSchema=z.object(
  {
   title: z.string().trim().min(1).max(200).optional(),

  description: z.string().trim().max(2000).optional(),

  priority: z.enum(["low", "medium", "high"]).optional(),

  dueDate: z.string().date().nullable().optional(),

  completed: z.boolean().optional(),
  }
).refine((data)=>data.title!==undefined||data.completed!==undefined,{message:"At least one field must be provided"})
  export type UpdateTaskInput=z.infer<typeof updateTaskSchema>;
