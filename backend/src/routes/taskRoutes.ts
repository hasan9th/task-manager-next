import express from 'express'
import { getTasks ,getAbout, createTask} from '../controllers/taskController.js'


export const taskRouter=express.Router()
taskRouter.get('/',getTasks)
taskRouter.get('/about',getAbout)
taskRouter.post('/',createTask)