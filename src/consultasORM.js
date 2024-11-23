import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Crear un nuevo usuario.
 */
export const crearUsuario = async ({ nombre, apellido, codigoTarjeta, contrasena, saldo }) => {
  return await prisma.usuarios.create({
    data: {
      nombre,
      apellido,
      codigo_tarjeta: codigoTarjeta,
      contrasena,
      saldo,
    },
  });
};

/**
 * Obtener todos los usuarios.
 */
export const obtenerUsuarios = async () => {
  return await prisma.usuarios.findMany();
};

/**
 * Obtener un usuario por su ID.
 */
export const obtenerUsuarioPorId = async (id_usuario) => {
  return await prisma.usuarios.findUnique({
    where: { id_usuario },
  });
};

/**
 * Actualizar un usuario.
 */
export const actualizarUsuario = async (id_usuario, datosActualizados) => {
  return await prisma.usuarios.update({
    where: { id_usuario },
    data: datosActualizados,
  });
};

/**
 * Eliminar un usuario.
 */
export const eliminarUsuario = async (id_usuario) => {
  return await prisma.usuarios.delete({
    where: { id_usuario },
  });
};

/**
 * Crear un género.
 */
export const crearGenero = async (nombre_genero) => {
  return await prisma.generos.create({
    data: { nombre_genero },
  });
};

/**
 * Obtener todos los géneros.
 */
export const obtenerGeneros = async () => {
  return await prisma.generos.findMany();
};

/**
 * Crear un libro.
 */
export const crearLibro = async ({ titulo, autor, precio, id_genero }) => {
  return await prisma.libros.create({
    data: {
      titulo,
      autor,
      precio,
      id_genero,
    },
  });
};

/**
 * Obtener todos los libros.
 */
export const obtenerLibros = async () => {
  return await prisma.libros.findMany({
    include: { genero: true }, // Incluye datos del género relacionado
  });
};

/**
 * Obtener un libro por su ID.
 */
export const obtenerLibroPorId = async (id_libro) => {
  return await prisma.libros.findUnique({
    where: { id_libro },
    include: { generos: true }, // Incluye datos del género relacionado
  });
};

/**
 * Actualizar un libro.
 */
export const actualizarLibro = async (id_libro, datosActualizados) => {
  return await prisma.libros.update({
    where: { id_libro },
    data: datosActualizados,
  });
};

/**
 * Eliminar un libro.
 */

export const eliminarLibro = async (id_libro) => {
  return await prisma.libros.delete({
    where: { id_libro },
  });
};

/**
 * Crear una transacción (compra de libro por un usuario).
 */
export const crearTransaccion = async ({ id_usuario, id_libro }) => {
  return await prisma.transacciones.create({
    data: {
      id_usuario,
      id_libro,
    },
  });
};

/**
 * Obtener todas las transacciones.
 */
export const obtenerTransacciones = async () => {
  return await prisma.transacciones.findMany({
    include: {
      usuarios: true, // Incluye datos del usuario relacionado
      libros: true, // Incluye datos del libro relacionado
    },
  });
};

/**
 * Obtener transacciones por usuario.
 */
export const obtenerTransaccionesPorUsuario = async (id_usuario) => {
  return await prisma.transacciones.findMany({
    where: { id_usuario },
    include: { libros: true },
  });
};

/**
 * Obtener transacciones por libro.
 */
export const obtenerTransaccionesPorLibro = async (id_libro) => {
  return await prisma.transacciones.findMany({
    where: { id_libro },
    include: { usuarios: true },
  });
};
