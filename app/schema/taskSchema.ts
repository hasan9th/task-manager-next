import {z} from "zod";
export const taskSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters.")
    .max(100, "Title cannot exceed 100 characters."),

  description: z.string().min(5,"Description must be at least 5 characters"),

  status: z.enum(["todo", "in_progress", "done"]),

  priority: z.enum(["low", "medium", "high"]),

  dueDate: z.string().min(1,"Due date is required").refine((date)=>{
    const today=new Date();
    today.setHours(0,0,0,0);
    
    return new Date(date)>=today
  },"Due date cannot be in the past"),

  completed: z.boolean(),
});
export type TaskFormData=z.infer<typeof taskSchema>;