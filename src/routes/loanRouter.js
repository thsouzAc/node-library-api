import expresss from 'express'
const loanRouter = expresss.Router();

import {createLoan, getAllLoan} from '../controllers/loanController.js';

loanRouter.post('/crriarEmprestimo', createLoan);
loanRouter.get('/emprestimos', getAllLoan);

export default loanRouter;