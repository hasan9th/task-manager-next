import express from 'express'
import { getTasks, getTaskById ,getAbout, createTask,updateTask,removeTask} from '../controllers/taskController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'


export const taskRouter=express.Router()

taskRouter.get('/',authMiddleware,getTasks)
taskRouter.get('/about',getAbout)
taskRouter.get('/:id',authMiddleware,getTaskById)
taskRouter.post('/',authMiddleware,createTask)
taskRouter.patch('/:id',authMiddleware,updateTask)
taskRouter.delete('/:id',authMiddleware,removeTask)