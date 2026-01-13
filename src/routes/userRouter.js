import express from 'express'
import { createUser, getAllUsers , getMe, deleteUser, createAdminUser, getIdUser} from '../controllers/userController.js';
import {authMiddleware} from '../middlewares/authMiddleware.js';
import {adminMiddleware} from '../middlewares/adminMiddleware.js';


const userRouter = express.Router();

// rotas públicas 
userRouter.post('/', createUser);

// rotas privadas 
userRouter.get("/me", authMiddleware, getMe)

// rotas admin
userRouter.get("/", authMiddleware, adminMiddleware, getAllUsers);
userRouter.post("/admin", authMiddleware, adminMiddleware, createAdminUser);
userRouter.delete("/delete/:id", authMiddleware, adminMiddleware, deleteUser);
userRouter.get("/:id", authMiddleware, adminMiddleware, getIdUser);

export default userRouter;