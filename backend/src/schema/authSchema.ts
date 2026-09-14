import { z} from "zod"

export const registerSchema=z.object({
    name:z.string().min(2).max(100).trim(),
  email:z.email().max(254).lowercase().trim(),
password: z.string().min(1).max(72)
})
export type RegisterInput=z.infer<typeof registerSchema>

export const loginSchema=z.object({
  email:z.email().max(254).lowercase().trim(),
password: z.string().min(1).max(72)
})
export type LoginInput=z.infer<typeof loginSchema>