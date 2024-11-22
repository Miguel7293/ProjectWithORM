import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Obtener todos los usuarios
router.get('/usuarios', async (req, res) => {
  const usuarios = await prisma.usuarios.findMany();
  res.json(usuarios);
});

// Crear un nuevo usuario
router.post('/usuarios', async (req, res) => {
  const { nombre, apellido, codigo_tarjeta, contrasena, saldo } = req.body;
  const nuevoUsuario = await prisma.usuarios.create({
    data: { nombre, apellido, codigo_tarjeta, contrasena, saldo },
  });
  res.json(nuevoUsuario);
});

export default router;
