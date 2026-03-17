import express from 'express'
const autorRouter = express.Router();

import {createAuthor, getAllAuthors, getIdAuthor} from '../controllers/authorController.js';

// rotas privadas
autorRouter.get('/autores', getAllAuthors);
// rotas admin
autorRouter.post('/criarAutor', createAuthor);
// rotas públicas
autorRouter.get('/:id', getIdAuthor);

export default autorRouter;