import express from 'express'
import { createUser, getAllUsers , getMe, deleteUser, createAdminUser, getIdUser} from '../controllers/userController.js';
const userRouter = express.Router();

// rotas públicas 
userRouter.post('/', createUser);

// rotas privadas 

userRouter.get("/me", getMe)


// rotas admin
userRouter.get("/:id", getIdUser);
userRouter.post("/admin", createAdminUser);
userRouter.get("/", getAllUsers);
userRouter.delete("/:id", deleteUser)
export default userRouter;