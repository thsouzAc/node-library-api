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
};

const getAllBooks = async (req, res) => {
    try {
        const livros = await prisma.livro.findMany({
            select : {
                id :true,
                nome : true,
                dataPublic : true,
                autor : {
                    select : {
                        id : true,
                        nome : true
                    }
                }
            }
        });
        res.status(200).json(livros);
    } catch (error) {
        res.status(400).json({error : error.message});
    }
};

const getIdBook = async (req, res) => {
    try {
        const {id} = req.params;
        const book = await prisma.livro.findUnique({
            where : {id : Number(id)},
            select : {
                id : true,
                nome : true,
                dataPublic : true,
                autor : {
                    select : {
                        id : true,
                        nome : true
                    }
                }
            }
        })
        if (!book) {return res.status(404).json({error : "Livro não encontrado"})};
        res.status(200).json(book)
    } catch ( error ) {
        res.status(400).json({error : error.message});
    }
};

const deleteBook = async (req, res) => {
    try {
        const {id} = req.params;
        const book = await prisma.livro.delete({
            where : { id : Number(id)},
        });
        res.status(200).json({message : "Livro deletado", book});
    } catch ( error ) {
        res.status(400).json({error : error.message});
    }
}

export {
    createBook, 
    getAllBooks,
    getIdBook,
    deleteBook
};