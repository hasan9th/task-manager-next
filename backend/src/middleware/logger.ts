import { Request,Response,NextFunction } from "express";

export const logger=(req:Request, res:Response, next:NextFunction)=>{
    console.log("logger>>",req.method, req.url)
    console.log("logger>>",req.body)
    next()
}