import "dotenv/config"
import { generateAccessToken, verifyAccessToken } from "./jwt.js"
 
const token=generateAccessToken({userId:23984,email:"sdaf@diffSchemas.asd"})
console.log(token)

const verifyToken=verifyAccessToken(token)
console.log(verifyToken)