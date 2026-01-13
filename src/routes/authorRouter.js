import express from 'express'
const autorRouter = express.Router();

import {createAuthor, getAllAuthors} from '../controllers/authorController.js';

// rotas privadas
autorRouter.get('/autores', getAllAuthors);
// rotas admin
autorRouter.post('/criarAutor', createAuthor);

export default autorRouter;