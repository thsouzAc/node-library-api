import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


const criarUser = async (req, res) => {
    try {
        const {nome, email} = req.body;
        const user = await prisma.user.create({
            data : {nome, email},
        });
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({error : error.message});
    }
}

const listarUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            include : {emprestimos : true},
        });
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({error : error.message});
    }
}


export {criarUser, listarUsers};