import express from 'express'
const autorRouter = express.Router();

import {createAuthor, getAllAuthors, getIdAuthor} from '../controllers/authorController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { adminMiddleware } from '../middlewares/adminMiddleware.js';


// rotas privadas ( depois testar ordem de hierarquia /:id !!!)
autorRouter.get('/autores', authMiddleware, getAllAuthors);
autorRouter.get('/:id', authMiddleware, getIdAuthor);
// rotas admin
autorRouter.post('/criarAutor', authMiddleware, adminMiddleware, createAuthor);

export default autorRouter;