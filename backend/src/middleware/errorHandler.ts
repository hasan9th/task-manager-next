import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError.js";
import { ZodError } from "zod";
export const errorHandler=(err:Error,req:Request,res:Response,next:NextFunction)=>{
           if(err instanceof ZodError){
         return res.status(400).json({
    message: "Validation failed",
    error: err.issues,
  });
    }
    if(err instanceof AppError){
            return res.status(err.statusCode).json({message:err.message})
    }
 
   return res.status(500).json({message:"Internal server error"})

}