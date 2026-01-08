import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


const createLoan = async (req, res) => {
    try {
        const {userId, livroId} = req.body;

        const now = new Date();
        const devolucao = new Date();

        devolucao.setDate(now.getDate() + 20); // data de devolução = 20 dias

        const emprestimo = await prisma.emprestimo.create({
            data : {
                userId,
                livroId,
                dataEmprestimoAt: now,
                dataDevolucaoAt : devolucao,
            },
        });
        res.status(201).json(emprestimo)
    } catch (error) {
        res.status(400).json({error : error.message});
    }
}

const getAllLoan = async (req, res) => {
    try {
        const emprestimos = await prisma.emprestimo.findMany({
            include : {
                user : true,
                livro : true,
            }
        });
        res.status(200).json(emprestimos);
    } catch (error) {
        res.status(400).json({error : error.message});        
    }
}

export {
    createLoan,
    getAllLoan
};