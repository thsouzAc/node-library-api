import expresss from 'express'
const emprestimoRouter = expresss.Router();

import {createEmprestimo, getAllEmprestimo} from '../controllers/emprestimoController.js';

emprestimoRouter.post('/createEmprestimo', createEmprestimo);
emprestimoRouter.get('/emprestimos', getAllEmprestimo);

export default emprestimoRouter;