import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Obtener todos los libros con su género
router.get('/libros', async (req, res) => {
  const libros = await prisma.libros.findMany({
    include: { genero: true },
  });
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

// Eliminar un libro por su ID
router.delete('/libros/:id', async (req, res) => {
  const { id } = req.params;
  await prisma.libros.delete({
    where: { id_libro: parseInt(id) },
  });
  res.json({ message: 'Libro eliminado exitosamente' });
});

export default router;
