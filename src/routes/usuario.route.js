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
  const { nombre, apellido, correo, codigo_tarjeta, contrasena, saldo } = req.body;

  try {
    const nuevoUsuario = await prisma.usuarios.create({
      data: { nombre, apellido, correo, codigo_tarjeta, contrasena, saldo },
    });
    res.json(nuevoUsuario);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear el usuario. Verifica los datos ingresados.' });
  }
});

// Comprobar login por correo electrónico
router.post('/usuarios/login', async (req, res) => {
  const { correo, contrasena } = req.body;

  // Buscar el usuario por correo
  const usuario = await prisma.usuarios.findUnique({
    where: { correo },
  });

  // Verificar si el usuario existe y si la contraseña es correcta
  if (!usuario || usuario.contrasena !== contrasena) {
    return res.status(401).json({ error: 'Correo o contraseña incorrectos' });
  }

  res.json({ message: 'Inicio de sesión exitoso', usuario });
});

export default router;
