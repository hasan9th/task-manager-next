import "dotenv/config"
import { generateAccessToken } from "./jwt.js"
 
const token=generateAccessToken({userId:23984,email:"sdaf@diffSchemas.asd"})
console.log(token)