import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Obtener todos los libros
router.get('/libros', async (req, res) => {
  const libros = await prisma.libros.findMany();
  res.json(libros);
});

// Crear un nuevo libro
router.post('/libros', async (req, res) => {
  const { titulo, autor, precio, id_genero } = req.body;
  const nuevoLibro = await prisma.libros.create({
    data: { titulo, autor, precio, id_genero },
  });
  res.json(nuevoLibro);
});

export default router;
