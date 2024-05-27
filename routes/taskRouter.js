const express = require('express')
const taskController = require('../controller/taskController')
const authController = require('../controller/authController')
const taskRouter = express.Router()

taskRouter.post('/', authController.authenticate, taskController.createTask) //{taskId}

taskRouter.get('/', taskController.getTasks) 

taskRouter.put('/:id', authController.authenticate,taskController.updateTask) // taskId
taskRouter.delete('/:id', authController.authenticate,taskController.deleteTask) // taskId

module.exports = taskRouter;