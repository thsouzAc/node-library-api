import express from 'express';
import dotenv from 'dotenv';
import autorRouter from './routes/autorRouter.js';
import emprestimoRouter from './routes/emprestimoRouter.js';
import livrosRouter from './routes/livrosRouter.js';
import userRouter from './routes/userRouter.js';


dotenv.config();
const app = express();

app.use(express.json());

app.use(autorRouter);
app.use(emprestimoRouter);
app.use(livrosRouter);
app.use(userRouter);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));