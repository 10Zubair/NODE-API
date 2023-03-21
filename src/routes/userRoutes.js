const express = require('express');
const { singup, singin } = require('../controllers/userController');
const userRouter = express.Router();

userRouter.post('/signup', singup);

userRouter.post('/signin', singin);

module.exports = userRouter;