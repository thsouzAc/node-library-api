import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function resetDb() {
  await prisma.$executeRawUnsafe(`
    TRUNCATE TABLE
      "Emprestimo",
      "Livro",
      "Autor",
      "User"
    RESTART IDENTITY CASCADE;
  `);

  console.log("Banco resetado !");
}

resetDb()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
