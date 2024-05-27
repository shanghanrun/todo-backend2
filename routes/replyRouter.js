const express = require('express')
const replyController = require('../controller/replyController')
const authController = require('../controller/authController')
const replyRouter = express.Router()

replyRouter.post('/', authController.authenticate, replyController.createReply) // {taskId, content}

replyRouter.put('/:id', authController.authenticate,replyController.updateReply) // replyId, {content}
replyRouter.delete('/:id', authController.authenticate,replyController.deleteReply) // replyId

module.exports = replyRouter;