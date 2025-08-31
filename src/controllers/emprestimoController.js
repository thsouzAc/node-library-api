import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


const createEmprestimo = async (req, res) => {
    try {
            const {userId, livroId} = req.body;

            const agora = new Date();
            const devolucao = new Date();

            devolucao.setDate(agora.getDate() + 20); // data de devolução = 20 dias

            const emprestimo = await prisma.emprestimo.create({
                data : {
                    userId,
                    livroId,
                    dataEmprestimoAt: agora,
                    dataDevolucaoAt : devolucao,
                },
            });
            res.status(201).json(emprestimo)
    } catch (error) {
        res.status(400).json({error : error.message});
    }
}

const getAllEmprestimo = async (req, res) => {
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

export {createEmprestimo, getAllEmprestimo};