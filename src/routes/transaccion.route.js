import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Obtener todas las transacciones de un usuario por ID con su estado
router.get('/transacciones/:id_usuario', async (req, res) => {
  const { id_usuario } = req.params;

  try {
    const transacciones = await prisma.transacciones.findMany({
      where: { id_usuario: parseInt(id_usuario) },
      include: { usuario: true, libro: true },
    });

    if (!transacciones.length) {
      return res.status(404).json({ error: 'No se encontraron transacciones para este usuario.' });
    }

    res.json(transacciones);
  } catch (error) {
    console.error('Error al obtener transacciones:', error);
    res.status(500).json({ error: 'Ocurrió un error al obtener las transacciones.' });
  }
});

// Crear una nueva transacción (Pendiente)
router.post('/transacciones', async (req, res) => {
  const { id_usuario, id_libro } = req.body;

  try {
    // Verificar si el libro existe
    const libro = await prisma.libros.findUnique({
      where: { id_libro: parseInt(id_libro) },
    });

    if (!libro) {
      return res.status(404).json({ error: 'Libro no encontrado.' });
    }

    // Verificar si hay libros disponibles
    if (libro.cantidad <= 0) {
      return res.status(400).json({ error: 'No hay libros disponibles.' });
    }

    // Verificar si el usuario existe
    const usuario = await prisma.usuarios.findUnique({
      where: { id_usuario: parseInt(id_usuario) },
    });

    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }

    // Crear la transacción con estado 'PENDIENTE'
    const nuevaTransaccion = await prisma.transacciones.create({
      data: {
        id_usuario: parseInt(id_usuario),
        id_libro: parseInt(id_libro),
        estado: 'PENDIENTE', // Estado inicial
      },
    });

    // Reducir la cantidad del libro en stock
    await prisma.libros.update({
      where: { id_libro: parseInt(id_libro) },
      data: {
        cantidad: { decrement: 1 },
      },
    });

    res.json({
      message: 'Transacción creada exitosamente con estado PENDIENTE.',
      transaccion: nuevaTransaccion,
    });
  } catch (error) {
    console.error('Error al crear transacción:', error);
    res.status(500).json({ error: 'Ocurrió un error al crear la transacción.' });
  }
});


// Actualizar el estado de una transacción
router.put('/transacciones/:id_transaccion', async (req, res) => {
  const { id_transaccion } = req.params;
  const { estado } = req.body;

  try {
    const transaccionActualizada = await prisma.transacciones.update({
      where: { id_transaccion: parseInt(id_transaccion) },
      data: { estado },
    });

    res.json({
      message: 'Estado de transacción actualizado exitosamente.',
      transaccion: transaccionActualizada,
    });
  } catch (error) {
    console.error('Error al actualizar transacción:', error);
    res.status(500).json({ error: 'Ocurrió un error al actualizar la transacción.' });
  }
});

// Eliminar una transacción por ID
router.delete('/transacciones/:id_transaccion', async (req, res) => {
  const { id_transaccion } = req.params;

  try {
    // Buscar la transacción antes de eliminarla
    const transaccion = await prisma.transacciones.findUnique({
      where: { id_transaccion: parseInt(id_transaccion) },
      include: { libro: true }, // Incluir el libro relacionado
    });

    if (!transaccion) {
      return res.status(404).json({ error: 'Transacción no encontrada.' });
    }

    // Incrementar la cantidad del libro en 1
    await prisma.libros.update({
      where: { id_libro: transaccion.id_libro },
      data: {
        cantidad: { increment: 1 },
      },
    });

    // Eliminar la transacción
    await prisma.transacciones.delete({
      where: { id_transaccion: parseInt(id_transaccion) },
    });

    res.json({ message: 'Transacción eliminada exitosamente y el libro retornado al stock.' });
  } catch (error) {
    console.error('Error al eliminar transacción:', error);
    res.status(500).json({ error: 'Ocurrió un error al eliminar la transacción.' });
  }
});

// Pago completo de transacciones pendientes
router.post('/transacciones/PagoCompleto', async (req, res) => {
  const { id_usuario } = req.body;

  try {
    // Obtener las transacciones pendientes del usuario
    const transaccionesPendientes = await prisma.transacciones.findMany({
      where: {
        id_usuario: parseInt(id_usuario),
        estado: 'PENDIENTE',
      },
      include: { libro: true },
    });

    if (transaccionesPendientes.length === 0) {
      return res.status(404).json({ error: 'No hay transacciones pendientes para este usuario.' });
    }

    // Calcular el costo total de los libros
    const costoTotal = transaccionesPendientes.reduce(
      (total, transaccion) => total + transaccion.libro.precio,
      0
    );

    // Obtener el usuario para verificar el saldo
    const usuario = await prisma.usuarios.findUnique({
      where: { id_usuario: parseInt(id_usuario) },
    });

    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }

    if (usuario.saldo < costoTotal) {
      return res.status(400).json({ error: 'Saldo insuficiente para completar el pago.' });
    }

    // Reducir el saldo del usuario
    const usuarioActualizado = await prisma.usuarios.update({
      where: { id_usuario: parseInt(id_usuario) },
      data: {
        saldo: { decrement: costoTotal },
      },
    });

    // Cambiar el estado de todas las transacciones pendientes a CANCELADO
    const transaccionesActualizadas = await prisma.transacciones.updateMany({
      where: {
        id_usuario: parseInt(id_usuario),
        estado: 'PENDIENTE',
      },
      data: { estado: 'CANCELADO' },
    });

    res.json({
      message: 'Pago completado exitosamente.',
      costo_total: costoTotal,
      saldo_actualizado: usuarioActualizado.saldo,
      transacciones_actualizadas: transaccionesActualizadas.count,
    });
  } catch (error) {
    console.error('Error al realizar el pago completo:', error);
    res.status(500).json({ error: 'Ocurrió un error al realizar el pago completo.' });
  }
});


export default router;



