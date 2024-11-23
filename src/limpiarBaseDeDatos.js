import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function limpiarBaseDeDatos() {
  try {
    console.log('=== LIMPIANDO BASE DE DATOS ===');
    await prisma.transacciones.deleteMany({});
    await prisma.libros.deleteMany({});
    await prisma.generos.deleteMany({});
    await prisma.usuarios.deleteMany({});
    console.log('Base de datos limpiada con éxito.');
  } catch (error) {
    console.error('Error al limpiar la base de datos:', error);
  } finally {
    await prisma.$disconnect();
  }
}

limpiarBaseDeDatos();
