import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client/extension';
import dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;

export async function loginUser( { email, password } ) {
    const user = await prisma.user.findUnique( { where : {email} } );
    if (!user) throw new Error("User não Encontrado.");
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!password) throw new Error("Senha Inválida");

    const token = jwt.sign( 
            { userId: user.id, role : user.role }, 
            JWT_SECRET,
            {expiresIn : "1h"}
    );

    const {password: _, ...userWithoutPassword} = user;
    return { token, user : userWithoutPassword};
}


export function verifyToken(token) {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch ( error ) {
        throw new Error("Token inválido ou expirado");
    }
}