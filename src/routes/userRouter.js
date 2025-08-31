import express from 'express'
const userRouter = express.Router();

import {createUser, getAllUser} from '../controllers/userController.js';

userRouter.post('/createUser', createUser);
userRouter.get('/users', getAllUser);

export default userRouter;