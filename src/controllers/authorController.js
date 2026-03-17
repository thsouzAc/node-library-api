import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const createAuthor = async (req, res) => {
    try {
        const nome = req.body;
        const autor = await prisma.autor.create({
            data : {
                nome,
            }
        });
        res.status(201).json(autor);
    } catch (error) {
        res.status(400).json({error : error.message});
    }
};

const getAllAuthors = async (req,res) => {
    try {
        const autores = await prisma.autor.findMany({
            select : {
                id : true,
                nome : true,
                livros : {
                    select : {
                        id : true,
                        nome : true,
                        dataPublic : true,
                    }
                }
            }
        })
        res.status(200).json(autores);
    } catch (error) {
        res.status(400).json({error : error.message});
    }
};

const getIdAuthor = async ( req, res ) => {
    try {
        const { id } = req.params;
        const author = await prisma.autor.findUnique({
            where : { id : Number(id)},
            select : {
                id : true,
                nome : true,
                livros : {
                    select : {
                        id : true,
                        nome : true,
                        dataPublic : true,
                    }
                }
            }
        })
        if (!author) {return res.status(404).json({error : "Id Autor não encontrado"})};
        res.status(200).json(author);
    } catch ( error ) {
        res.status(400).json({error : error.message});
    }
};

export {
    createAuthor, 
    getAllAuthors,
    getIdAuthor
};