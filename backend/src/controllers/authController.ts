import {  Request, Response } from "express";
export const register=(req:Request,res:Response)=>{
    res.status(501).json({message:"POST /auth/register is wired correctly. Implementation starts on Day 44."})
}
export const login=(req:Request,res:Response)=>{
    res.status(501).json({message:"POST /auth/login is wired correctly. Implementation starts on Day 45."})
}