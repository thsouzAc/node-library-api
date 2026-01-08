import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const createUser = async (req, res) => {
  try {
    const { nome, email, keyPass } = req.body;

    if (!keyPass) {
      return res.status(400).json({ error: "Senha obrigatória" });
    }

    const hashedPassword = await bcrypt.hash(keyPass, 10);

    const user = await prisma.user.create({
      data: {
        nome,
        email,
        keyPass: hashedPassword,
        role: "user",
      },
    });

    const { keyPass: _, ...userWithoutPassword } = user;
    return res.status(201).json(userWithoutPassword);
  } catch (error) {
    return res.status(400).json({ error: "Erro ao criar usuário" });
  }
};

const createAdminUser = async (req, res) => {
  try {
    const { nome, email, keyPass } = req.body;

    if (!keyPass) {
      return res.status(400).json({ error: "Senha obrigatória" });
    }

    const hashedPassword = await bcrypt.hash(keyPass, 10);

    const user = await prisma.user.create({
      data: {
        nome,
        email,
        keyPass: hashedPassword,
        role: "admin",
      },
    });

    const { keyPass: _, ...userWithoutPassword } = user;
    return res.status(201).json(userWithoutPassword);
  } catch (error) {
    return res.status(400).json({ error: "Erro ao criar usuário" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: { emprestimos: true },
    });

    return res.status(200).json(users);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getMe = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      include: { emprestimos: true },
    });

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getIdUser = async ( req, res ) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where : { id : Number(id)},
      select : {
        id : true,
        nome : true,
        email : true,
        role : true,
        createdAt : true,
        emprestimos : true,
      }
    });
    if (!user) { return res.status(404).json({ error : "Id user não encontrado"})};
    return res.status(200).json(user);
  }catch ( error ) {
    res.status(400).json({ error : error.message });
  }
};


const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.delete({
      where: { id: Number(id) },
    });

    return res.status(200).json({ message: "Usuário deletado", user });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export {
  createUser,
  createAdminUser,
  getAllUsers,
  getIdUser,
  getMe,
  deleteUser,
};
