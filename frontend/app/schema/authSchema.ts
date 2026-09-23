import {z} from "zod"
export const loginSchema=z.object({
  email:z.email().max(254).lowercase().trim(),
password: z.string().min(1).max(72)
})
export type LoginData=z.infer<typeof loginSchema>;
