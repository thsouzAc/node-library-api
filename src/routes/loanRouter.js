import expresss from 'express'
const loanRouter = expresss.Router();

import {createLoan, getAllLoan} from '../controllers/loanController.js';

// rotas privadas
loanRouter.post('/crriarEmprestimo', createLoan);

// rotas admin
loanRouter.get('/emprestimos', getAllLoan);

export default loanRouter;