import express from 'express'
const userRouter = express.Router();

import {criarUser, listarUsers} from '../controllers/userController.js';

userRouter.post('/criarUsuario', criarUser);
userRouter.get('/usuarios', listarUsers);

export default userRouter;