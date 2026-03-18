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
            select : {
                id : true,
                dataEmprestimoAt : true,
                dataDevolucaoAt : true,
                user : {
                    select : {
                        id : true,
                        nome : true,
                        email : true,
                    }
                },
                livro : {
                    select : {
                        id : true,
                        nome : true,
                        autor : {
                            select : {
                                id : true,
                                nome : true
                            }
                        }
                    }
                }
            }
        });
        res.status(200).json(emprestimos);
    } catch (error) {
        res.status(400).json({error : error.message});        
    }
}
const getIdLoan = async ( req, res ) => { 
    try {
        const {id} = req.params;
        const loan = await prisma.emprestimo.findUnique({
            where : { id : Number(id)},
            select : {
                id : true,
                dataEmprestimoAt : true,
                dataDevolucaoAt : true,
                user : {
                    select : {
                        id : true,
                        nome : true,
                        email : true,
                    }
                },
                livro : {
                    select : {
                        id : true,
                        nome : true,
                        autor : {
                            select : {
                                id : true,
                                nome : true
                            }
                        }
                    }
                }
            }
        })
        if (!loan) {return res.status(404).json({error : "Emprestimo não encontrado"})};
        res.status(200).json(loan);
    } catch ( error ) {
        res.status(400).json({ error : error.message});
    }
};

export {
    createLoan,
    getAllLoan,
    getIdLoan
};