import express from 'express'
import { getTasks, getATask ,getAbout, createTask,updateTask,removeTask} from '../controllers/taskController.js'


export const taskRouter=express.Router()

taskRouter.get('/',getTasks)
taskRouter.get('/about',getAbout)
taskRouter.get('/:id',getATask)
taskRouter.post('/',createTask)
taskRouter.patch('/:id',updateTask)
taskRouter.delete('/:id',removeTask)