import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import path from 'path';

const router = Router();
const prisma = new PrismaClient();

// Función para obtener la imagen por defecto según el género
const obtenerImagenPorDefecto = (genero) => {
  const imagenesPorDefecto = {
    "Ficción": "ficcionDefault.jpeg",
    "Ciencia": "cienciaDefault.jpg",
    "Fantasía": "fantasiaDefault.jpeg",
    "Misterio": "misteryDefault.jpg",
    "Romance": "romanceDefault.jpg",
    "Historia": "historiaDefault.jpg",
    "Cómics": "comicsDefault.jpg",
    "Terror": "terrorDefault.jpg",
    "Autoayuda": "autoayudaDefault.jpg",
    "Anime": "animeDefault.jpg"
  };

  return imagenesPorDefecto[genero] || null;  // Retorna null si no se encuentra el género
};

// Ruta para obtener todos los libros con su género
router.get('/libros', async (req, res) => {
  try {
    const libros = await prisma.libros.findMany({
      include: { genero: true },
    });

    // Modificar los libros para incluir la imagen por defecto si no tienen una URL
    const librosConImagen = libros.map(libro => {
      if (!libro.imagen_url) {
        // Asignar imagen por defecto según el género
        const imagenPorDefecto = obtenerImagenPorDefecto(libro.genero?.nombre);
        libro.imagen_url = imagenPorDefecto ? `/img/${imagenPorDefecto}` : null;
      }
      return libro;
    });

    res.json(librosConImagen);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los libros' });
  }
});

// Crear un nuevo libro
router.post('/libros', async (req, res) => {
  const { titulo, autor, precio, id_genero } = req.body;
  let imagenUrl = req.body.imagen_url;

  try {
    // Verifica si no se ha proporcionado una imagen, y asigna una por defecto basada en el género
    if (!imagenUrl) {
      // Obtener el género del libro para asignar la imagen por defecto
      const genero = await prisma.genero.findUnique({
        where: { id_genero: id_genero }
      });

      imagenUrl = obtenerImagenPorDefecto(genero?.nombre); // Asignar imagen por defecto según el género
      if (imagenUrl) {
        imagenUrl = `/img/${imagenUrl}`;
      }
    }

    const nuevoLibro = await prisma.libros.create({
      data: { titulo, autor, precio, id_genero, imagen_url: imagenUrl },
    });
    res.json(nuevoLibro);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el libro' });
  }
});

// Eliminar un libro por su ID
router.delete('/libros/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.libros.delete({
      where: { id_libro: parseInt(id) },
    });
    res.json({ message: 'Libro eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el libro' });
  }
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

