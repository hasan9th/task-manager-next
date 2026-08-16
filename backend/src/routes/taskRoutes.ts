import express from 'express'
import { getTasks, getATask ,getAbout, createTask} from '../controllers/taskController.js'


export const taskRouter=express.Router()
taskRouter.get('/',getTasks)
taskRouter.get('/:id',getATask)
taskRouter.get('/about',getAbout)
taskRouter.post('/',createTask)