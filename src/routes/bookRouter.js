import express from 'express'
const livrosRouter = express.Router();

import {createBook, deleteBook, getAllBooks, getIdBook} from '../controllers/bookController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { adminMiddleware } from '../middlewares/adminMiddleware.js';

// rotas privadas

livrosRouter.get('/livros', authMiddleware, getAllBooks);
livrosRouter.post('/criarLivro',authMiddleware, createBook);
livrosRouter.get('/:id', authMiddleware, getIdBook);

// rotas admin

livrosRouter.delete('/deletar/:id', authMiddleware, adminMiddleware, deleteBook);


export default livrosRouter;