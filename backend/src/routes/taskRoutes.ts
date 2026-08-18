import express from 'express'
import { getTasks, getATask ,getAbout, createTask,updateTask,removeTask} from '../controllers/taskController.js'


export const taskRouter=express.Router()
taskRouter.get('/',getTasks)
taskRouter.get('/:id',getATask)
taskRouter.get('/about',getAbout)
taskRouter.post('/',createTask)
taskRouter.put('/:id',updateTask)
taskRouter.delete('/:id',removeTask)