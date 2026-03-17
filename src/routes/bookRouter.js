import express from 'express'
const livrosRouter = express.Router();

import {createBook, deleteBook, getAllBooks, getIdBook} from '../controllers/bookController.js';



// rotas privadas

livrosRouter.get('/livros', getAllBooks);
livrosRouter.post('/criarLivro', createBook);
livrosRouter.get('/:id', getIdBook);

// rotas admin

livrosRouter.delete('/deletar/:id', deleteBook);


export default livrosRouter;