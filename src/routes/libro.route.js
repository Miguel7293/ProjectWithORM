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


// Eliminar múltiples libros por sus IDs
router.delete('/libros/multiples', async (req, res) => {
  const { id_libros } = req.body; // id_libros es un array de IDs

  if (!Array.isArray(id_libros) || id_libros.length === 0) {
    return res.status(400).json({ error: 'Debe proporcionar un array de IDs de libros.' });
  }

  try {
    // Eliminar los libros en cadena
    const eliminados = await prisma.libros.deleteMany({
      where: { id_libro: { in: id_libros } },
    });

    res.json({ 
      message: 'Libros eliminados exitosamente.', 
      cantidad_eliminados: eliminados.count 
    });
  } catch (error) {
    console.error('Error al eliminar los libros:', error);
    res.status(500).json({ error: 'Ocurrió un error al eliminar los libros.' });
  }
});

export default router;

