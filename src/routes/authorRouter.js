import express from 'express'
const autorRouter = express.Router();

import {createAuthor, getAllAuthors} from '../controllers/authorController.js';

autorRouter.post('/criarAutor', createAuthor);
autorRouter.get('/autores', getAllAuthors);

export default autorRouter;