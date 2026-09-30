import express from 'express'
import { getTasks, getTaskById , createTask,updateTask,removeTask} from '../controllers/taskController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { validate } from '../middleware/validate.js'
import { createTaskSchema, taskIdSchema, taskQuerySchema, updateTaskSchema } from '../schema/taskSchema.js'


export const taskRouter=express.Router()

taskRouter.get('/',authMiddleware,validate(taskQuerySchema,'query'),getTasks)
taskRouter.get('/:id',authMiddleware,validate(taskIdSchema,"params"),getTaskById)
taskRouter.post('/',authMiddleware,validate(createTaskSchema,'body'),createTask)
taskRouter.patch('/:id',authMiddleware,validate(taskIdSchema,'params'),validate(updateTaskSchema,'body'),updateTask)
taskRouter.delete('/:id',authMiddleware,validate(taskIdSchema,'params'),removeTask)