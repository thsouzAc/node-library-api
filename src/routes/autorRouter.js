import express from 'express'
const autorRouter = express.Router();

import {criarAutor, listarAutores} from '../controllers/autorController.js';

autorRouter.post('/criarAutor', criarAutor);
autorRouter.get('/autores', listarAutores);

export default autorRouter;