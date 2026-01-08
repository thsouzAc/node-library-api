import express from 'express'
const livrosRouter = express.Router();

import {createBook, getAllBooks} from '../controllers/bookController.js';

livrosRouter.get('/criarLivro', createBook);
livrosRouter.get('/livros', getAllBooks);

export default livrosRouter;