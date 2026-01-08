import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // usuarios
  await prisma.user.createMany({
    data: [
      { nome: 'admin', email: 'admin@email.com', keyPass: 'admin123', role: 'admin' },
      { nome: 'Thiago Silva', email: 'thiago@email.com', keyPass: '123456' },
      { nome: 'Maria Oliveira', email: 'maria@email.com', keyPass: 'abcdef' },
      { nome: 'João Souza', email: 'joao@email.com', keyPass: 'qwerty' },
      { nome: 'Ana Costa', email: 'ana@email.com', keyPass: 'senha123' },
      { nome: 'Carlos Pereira', email: 'carlos@email.com', keyPass: 'pass123' },
      { nome: 'Fernanda Lima', email: 'fernanda@email.com', keyPass: 'lim@456' },
      { nome: 'Rafael Mendes', email: 'rafael@email.com', keyPass: 'raf@2025' },
      { nome: 'Juliana Santos', email: 'juliana@email.com', keyPass: 'jul#321' },
      { nome: 'Pedro Henrique', email: 'pedro@email.com', keyPass: 'pedr0' },
      { nome: 'Luciana Rocha', email: 'luciana@email.com', keyPass: 'luc@pass' },
    ],
    skipDuplicates: true, // ✅ ignora emails já existentes
  })

/*
  for (const u of usersData) {
    const hashedPassword = await bcrypt.hash(u.password, 10);
    await prisma.user.upsert({
      where: { email: u.email },
      update: {},
      create: {
        name: u.name,
        email: u.email,
        password: hashedPassword,
        role: u.role || "user",
      },
    });
  }

*/


  const users = await prisma.user.findMany()

  // autores e livros
  const autoresData = [
    { nome: 'George Orwell', livros: [{ nome: '1984', dataPublic: 1949 }, { nome: 'A Revolução dos Bichos', dataPublic: 1945 }] },
    { nome: 'J.R.R. Tolkien', livros: [{ nome: 'O Hobbit', dataPublic: 1937 }, { nome: 'O Senhor dos Anéis', dataPublic: 1954 }] },
    { nome: 'Machado de Assis', livros: [{ nome: 'Dom Casmurro', dataPublic: 1899 }, { nome: 'Memórias Póstumas de Brás Cubas', dataPublic: 1881 }] },
    { nome: 'Clarice Lispector', livros: [{ nome: 'A Hora da Estrela', dataPublic: 1977 }, { nome: 'Perto do Coração Selvagem', dataPublic: 1943 }] },
    { nome: 'José de Alencar', livros: [{ nome: 'O Guarani', dataPublic: 1857 }, { nome: 'Iracema', dataPublic: 1865 }] },
    { nome: 'Monteiro Lobato', livros: [{ nome: 'O Saci', dataPublic: 1921 }, { nome: 'Caçadas de Pedrinho', dataPublic: 1933 }] },
    { nome: 'Gabriel García Márquez', livros: [{ nome: 'Cem Anos de Solidão', dataPublic: 1967 }, { nome: 'O Amor nos Tempos do Cólera', dataPublic: 1985 }] },
    { nome: 'Franz Kafka', livros: [{ nome: 'A Metamorfose', dataPublic: 1915 }, { nome: 'O Processo', dataPublic: 1925 }] },
    { nome: 'Jane Austen', livros: [{ nome: 'Orgulho e Preconceito', dataPublic: 1813 }, { nome: 'Razão e Sensibilidade', dataPublic: 1811 }] },
    { nome: 'Fiódor Dostoiévski', livros: [{ nome: 'Crime e Castigo', dataPublic: 1866 }, { nome: 'Os Irmãos Karamázov', dataPublic: 1880 }] },
  ]

  const autoresCriados = []
  for (const autor of autoresData) {
    const a = await prisma.autor.create({
      data: {
        nome: autor.nome,
        livros: { create: autor.livros },
      },
      include: { livros: true },
    })
    autoresCriados.push(a)
  }

  // empréstimos
  const emprestimosData = [
    { userId: users[1].id, livroId: autoresCriados[0].livros[0].id }, 
    { userId: users[2].id, livroId: autoresCriados[1].livros[1].id, dataDevolucaoAt: new Date('2025-01-10') },
    { userId: users[3].id, livroId: autoresCriados[2].livros[0].id },
    { userId: users[4].id, livroId: autoresCriados[3].livros[1].id },
    { userId: users[5].id, livroId: autoresCriados[4].livros[0].id },
    { userId: users[6].id, livroId: autoresCriados[5].livros[1].id, dataDevolucaoAt: new Date('2025-02-05') },
    { userId: users[7].id, livroId: autoresCriados[6].livros[0].id },
    { userId: users[8].id, livroId: autoresCriados[7].livros[0].id },
    { userId: users[9].id, livroId: autoresCriados[8].livros[1].id },
    { userId: users[10].id, livroId: autoresCriados[9].livros[1].id, dataDevolucaoAt: new Date('2025-03-01') },
  ]

  for (const e of emprestimosData) {
    await prisma.emprestimo.create({
      data: e
    })
  }

  console.log('✅ banco populado com sucesso!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
