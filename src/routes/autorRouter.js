import express from 'express'
const autorRouter = express.Router();

import {createAutor, getAllAutor} from '../controllers/autorController.js';

autorRouter.post('/createAutor', createAutor);
autorRouter.get('/autores', getAllAutor);

export default autorRouter;