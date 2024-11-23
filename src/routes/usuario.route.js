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

// Comprobar login
router.post('/usuarios/login', async (req, res) => {
  const { codigo_tarjeta, contrasena } = req.body;

  const usuario = await prisma.usuarios.findUnique({
    where: { codigo_tarjeta },
  });

  if (!usuario || usuario.contrasena !== contrasena) {
    return res.status(401).json({ error: 'Credenciales incorrectas' });
  }

  res.json({ message: 'Inicio de sesión exitoso', usuario });
});

export default router;
