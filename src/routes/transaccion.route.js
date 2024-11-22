import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Obtener todas las transacciones
router.get('/transacciones', async (req, res) => {
  const transacciones = await prisma.transacciones.findMany();
  res.json(transacciones);
});

// Crear una nueva transacción
router.post('/transacciones', async (req, res) => {
  const { id_usuario, id_libro } = req.body;
  const nuevaTransaccion = await prisma.transacciones.create({
    data: { id_usuario, id_libro },
  });
  res.json(nuevaTransaccion);
});

export default router;
