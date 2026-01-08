import express from 'express'
import { createUser, getAllUsers } from '../controllers/userController.js';
const userRouter = express.Router();


userRouter.post('/criarUsuario', createUser);
userRouter.get('/usuarios', getAllUsers);

export default userRouter;