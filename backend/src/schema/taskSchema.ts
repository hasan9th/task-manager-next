import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().trim().min(3).max(100),
  description:z.string().max(200).trim(),
  priority:z.enum(["low", "medium", "high"]),
   dueDate: z.string().date().nullable().optional(),

});
export type CreateTaskInput=z.infer<typeof createTaskSchema>;
export const updateTaskSchema=z.object(
  {
   title: z.string().trim().min(1).max(200).optional(),

  description: z.string().trim().max(2000).optional(),

  priority: z.enum(["low", "medium", "high"]).optional(),

  dueDate: z.string().nullable().optional(),

  completed: z.boolean().optional(),
  }
).refine((data)=>data.title!==undefined||data.completed!==undefined||data.dueDate!==undefined||data.completed!==undefined,{message:"At least one field must be provided"});
  export type UpdateTaskInput=z.infer<typeof updateTaskSchema>;
export const taskQuerySchema=z.object({
  page:z.coerce.number().int().positive().default(1),
  limit:z.coerce.number().int().positive().max(100).default(10),
    completed: z
    .enum(["true", "false"])
    .transform((value) => value === "true")
    .optional(),

  priority: z.enum(["low", "medium", "high"]).optional(),

  search: z.string().trim().min(1).optional(),

  sortBy: z
    .enum(["created_at", "due_date", "title", "priority"])
    .default("created_at"),

  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});
export type TaskQueryInput=z.infer<typeof taskQuerySchema>;