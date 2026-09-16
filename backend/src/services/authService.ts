import { createUser, findUserByEmail, findUserByEmailWithPassword } from "../repositories/authRepository.js";
import { LoginInput, RegisterInput } from "../schema/authSchema.js";
import { SafeUser, User } from "../types/auth.js";
import { generateAccessToken } from "../utils/jwt.js";
import { hashPassword,comparePassword } from "../utils/password.js";

export const register=async (data:RegisterInput):Promise<SafeUser|null>=>{
   const claimed=await findUserByEmail(data.email);
   if(claimed){
    return null
   }
     const passwordHash = await hashPassword(data.password);
   
   const result=await createUser({...data,passwordHash})
   return result;
}

export const login=async (data:LoginInput):Promise<User|null>=>{
  const user=await findUserByEmailWithPassword(data.email);
  if(!user){
    return null
  }
  const authenticate= await comparePassword(data.password,user.passwordHash);
 
    if(!authenticate){
    return null
  }
  const token=generateAccessToken({userId:user.id,email:user.email})
   console.log(token);
  
throw new Error("Service is not implemented yet");
}
