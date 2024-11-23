import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Obtener todas las transacciones
router.get('/transacciones', async (req, res) => {
  const transacciones = await prisma.transacciones.findMany({
    include: { usuario: true, libro: true },
  });
  res.json(transacciones);
});

// Crear una nueva transacción y actualizar el saldo del usuario
router.post('/transacciones', async (req, res) => {
  const { id_usuario, id_libro } = req.body;

  // Obtener el libro y verificar si existe
  const libro = await prisma.libros.findUnique({
    where: { id_libro },
  });

  if (!libro) {
    return res.status(404).json({ error: 'Libro no encontrado' });
  }

  // Crear la transacción
  const nuevaTransaccion = await prisma.transacciones.create({
    data: { id_usuario, id_libro },
  });

  // Actualizar el saldo del usuario
  const usuario = await prisma.usuarios.update({
    where: { id_usuario },
    data: {
      saldo: {
        decrement: libro.precio, // Restar el precio del libro
      },
    },
  });

  res.json({ transaccion: nuevaTransaccion, saldo_actualizado: usuario.saldo });
});

export default router;
