import express from "express";
import cors from "cors";
import {taskRouter} from './routes/taskRoutes.js'
const app = express();
const PORT = 3001;
app.use(cors())
app.use(express.json())
app.use('/tasks',taskRouter)
app.use((req,res)=>res.json({    message: "TaskFlow API",}))
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
