import express from 'express'
const livrosRouter = express.Router();

import {createBook, getAllBooks} from '../controllers/bookController.js';


// rotas privadas

livrosRouter.get('/livros', getAllBooks);
livrosRouter.get('/criarLivro', createBook);

export default livrosRouter;