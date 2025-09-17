import express from 'express'
const livrosRouter = express.Router();

import {criarLivro, listarLivros} from '../controllers/livrosController.js';

livrosRouter.get('/criarLivro', criarLivro);
livrosRouter.get('/livros', listarLivros);

export default livrosRouter;