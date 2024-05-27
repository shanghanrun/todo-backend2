const express = require('express')
const router = express.Router()

const taskRouter = require('./taskRouter')
const userRouter = require('./userRouter')
const replyRouter = require('./replyRouter')

router.use('/tasks', taskRouter)
router.use('/user', userRouter)
router.use('/reply', replyRouter)

module.exports = router;