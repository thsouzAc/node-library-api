import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;

export async function loginUser({ email, password }) {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error('Usuário não encontrado');
  }

  const isPasswordValid = await bcrypt.compare(password, user.keyPass);
  if (!isPasswordValid) {
    throw new Error('Senha inválida');
  }

  const token = jwt.sign(
    { userId: user.id, role: user.role },
    JWT_SECRET,
    { expiresIn: '1h' }
  );

  const { keyPass, ...userWithoutPassword } = user;

  return {
    token,
    user: userWithoutPassword,
  };
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    throw new Error('Token inválido ou expirado');
  }
}
