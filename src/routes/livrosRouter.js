import express from 'express'
const livrosRouter = express.Router();

import {createLivro, getAllLivros} from '../controllers/livrosController.js';

livrosRouter.get('/createLivro', createLivro);
livrosRouter.get('/livros', getAllLivros);

export default livrosRouter;