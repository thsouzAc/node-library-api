import expresss from 'express'
const loanRouter = expresss.Router();

import {createLoan, getAllLoan, getIdLoan} from '../controllers/loanController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { adminMiddleware } from '../middlewares/adminMiddleware.js';


// rotas privadas
loanRouter.post('/criarEmprestimo', authMiddleware, createLoan);

// rotas admin
loanRouter.get('/emprestimos', authMiddleware, adminMiddleware, getAllLoan);
loanRouter.get('/:id', authMiddleware, adminMiddleware, getIdLoan);

export default loanRouter;