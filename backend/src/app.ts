import express from "express";
import cors from "cors";
import {taskRouter} from './routes/taskRoutes.js'
import { logger } from "./middleware/logger.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();
const PORT = 3001;
app.use(cors())
app.use(logger)
app.use(express.json())
app.use('/tasks',taskRouter)
app.get('/error-test',(req,res,next)=>{next(new Error("xxxxx"))})
app.use((req,res)=>res.json({    message: "TaskFlow API",}))
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
