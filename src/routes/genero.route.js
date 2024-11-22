import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Obtener todos los géneros
router.get('/generos', async (req, res) => {
  const generos = await prisma.generos.findMany();
  res.json(generos);
});

// Crear un nuevo género
router.post('/generos', async (req, res) => {
  const { nombre_genero } = req.body;
  const nuevoGenero = await prisma.generos.create({
    data: { nombre_genero },
  });
  res.json(nuevoGenero);
});

export default router;
