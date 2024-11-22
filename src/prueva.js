import { 
    crearUsuario, obtenerUsuarios, actualizarUsuario, eliminarUsuario,
    crearGenero, obtenerGeneros,
    crearLibro, obtenerLibros, actualizarLibro, eliminarLibro 
  } from './consultasORM.js';
  
  async function probarConsultas() {
    try {
      console.log('=== INICIANDO PRUEBAS ===');
  
      // *** USUARIOS ***
      console.log('1. Insertar usuarios:');
      const usuario1 = await crearUsuario({
        nombre: 'Juan',
        apellido: 'Pérez',
        codigoTarjeta: '1234-5678-9012-3456',
        contrasena: 'password123',
        saldo: 500.0
      });
      console.log('Usuario creado:', usuario1);
  
      const usuario2 = await crearUsuario({
        nombre: 'Ana',
        apellido: 'García',
        codigoTarjeta: '9876-5432-1098-7654',
        contrasena: 'securepass456',
        saldo: 300.0
      });
      console.log('Usuario creado:', usuario2);
  
      console.log('2. Obtener usuarios:');
      const usuarios = await obtenerUsuarios();
      console.log('Usuarios:', usuarios);
  
      console.log('3. Actualizar usuario:');
      const usuarioActualizado = await actualizarUsuario(usuario1.id_usuario, { saldo: 700.0 });
      console.log('Usuario actualizado:', usuarioActualizado);
  
      console.log('4. Eliminar usuario:');
      const usuarioEliminado = await eliminarUsuario(usuario2.id_usuario);
      console.log('Usuario eliminado:', usuarioEliminado);
  
      console.log('5. Usuarios finales:');
      console.log(await obtenerUsuarios());
  
      // *** GENEROS ***
      console.log('1. Insertar géneros:');
      const genero1 = await crearGenero('Ficción');
      const genero2 = await crearGenero('Ciencia');
      console.log('Géneros creados:', [genero1, genero2]);
  
      console.log('2. Obtener géneros:');
      console.log(await obtenerGeneros());
  
      // *** LIBROS ***
      console.log('1. Insertar libros:');
      const libro1 = await crearLibro({
        titulo: 'El Principito',
        autor: 'Antoine de Saint-Exupéry',
        precio: 50.0,
        id_genero: genero1.id_genero
      });
      console.log('Libro creado:', libro1);
  
      const libro2 = await crearLibro({
        titulo: 'Breve historia del tiempo',
        autor: 'Stephen Hawking',
        precio: 100.0,
        id_genero: genero2.id_genero
      });
      console.log('Libro creado:', libro2);
  
      console.log('2. Obtener libros:');
      console.log(await obtenerLibros());
  
      console.log('3. Actualizar libro:');
      const libroActualizado = await actualizarLibro(libro1.id_libro, { precio: 60.0 });
      console.log('Libro actualizado:', libroActualizado);
  
      console.log('4. Eliminar libro:');
      const libroEliminado = await eliminarLibro(libro2.id_libro);
      console.log('Libro eliminado:', libroEliminado);
  
      console.log('5. Libros finales:');
      console.log(await obtenerLibros());
  
      console.log('=== PRUEBAS COMPLETADAS ===');
    } catch (error) {
      console.error('Error durante las pruebas:', error);
    } finally {
      process.exit();
    }
  }
  
  probarConsultas();
  