import express from 'express';
import dotenv from 'dotenv';
import authorRouter from './routes/authorRouter.js';
import loanRouter from './routes/loanRouter.js';
import bookRouter from './routes/bookRouter.js';
import userRouter from './routes/userRouter.js';
import authRouter from './routes/authRouter.js';



dotenv.config();
const app = express();

app.use(express.json());

app.use("/api/auth", authRouter)
app.use("/api/authors", authorRouter);
app.use("/api/loan", loanRouter);
app.use("/api/book", bookRouter);
app.use("/api/user", userRouter);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`)); 