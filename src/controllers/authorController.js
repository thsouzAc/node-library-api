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
}

const getAllAuthors = async (req,res) => {
    try {
        const autores = await prisma.autor.findMany({
            include : {
                livros : true,
            }
        })
        res.status(200).json(autores);
    } catch (error) {
        res.status(400).json({error : error.message});
    }
}

export {
    createAuthor, 
    getAllAuthors
};