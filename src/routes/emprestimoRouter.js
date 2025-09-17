import expresss from 'express'
const emprestimoRouter = expresss.Router();

import {criarEmprestimo, listarEmprestimos} from '../controllers/emprestimoController.js';

emprestimoRouter.post('/crriarEmprestimo', criarEmprestimo);
emprestimoRouter.get('/emprestimos', listarEmprestimos);

export default emprestimoRouter;