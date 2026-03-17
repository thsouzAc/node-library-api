import expresss from 'express'
const loanRouter = expresss.Router();

import {createLoan, getAllLoan, getIdLoan} from '../controllers/loanController.js';


// rotas privadas
loanRouter.post('/criarEmprestimo', createLoan);

// rotas admin
loanRouter.get('/emprestimos', getAllLoan);
loanRouter.get('/:id', getIdLoan);

export default loanRouter;