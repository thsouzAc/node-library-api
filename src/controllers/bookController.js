import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


const createBook = async (req, res) => {
    try {
        const {nome, dataPublic, autorID} = req.body;

        const livro = await prisma.livro.create({
            data : {nome, dataPublic, autorID},
        });

        res.status(201).json(livro);
    } catch (error) {
        res.status(400).json({error : error.message});
    }
}

const getAllBooks = async (req, res) => {
    try {
        const livros = await prisma.livro.findMany({
            include : {
                emprestimos : true,
            },
        });
        res.status(200).json(livros);
    } catch (error) {
        res.status(400).json({error : error.message});
    }
}

export {
    createBook, 
    getAllBooks
};