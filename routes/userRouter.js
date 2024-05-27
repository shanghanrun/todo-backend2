const express = require('express')
const userController = require('../controller/userController')
const authController = require('../controller/authController')
const userRouter = express.Router()

// 회원가입 endpoint  [프론트엔드에서 전한 데이터로 user를 만든다.]
userRouter.post('/', userController.createUser)
userRouter.post('/login', userController.loginWithEmail)

// 토큰에서 유저 id 빼내고, 그 아이디로 유저 객체 찾아서 보내주기
userRouter.get('/me', authController.authenticate, userController.getUser)


module.exports = userRouter