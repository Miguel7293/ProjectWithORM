import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function inicializarBaseDeDatos() {
  try {
    console.log('=== INICIALIZANDO BASE DE DATOS ===');
    
    // Crear usuarios
    console.log('Creando usuarios...');
    const usuarios = [];
    for (let i = 1; i <= 20; i++) {
      usuarios.push(await prisma.usuarios.create({
        data: {
          nombre: `Usuario${i}`,
          apellido: `Apellido${i}`,
          codigo_tarjeta: `1234-5678-9012-${1000 + i}`,
          contrasena: `password${i}`,
          saldo: Math.random() * 500 + 50, // Saldo aleatorio entre 50 y 550
        },
      }));
    }
    console.log('Usuarios creados:', usuarios);

    // Crear géneros
    console.log('Creando géneros...');
    const generosData = [
      'Ficción', 'Ciencia', 'Fantasía', 'Misterio', 'Romance',
      'Historia', 'Cómics', 'Terror', 'Autoayuda', 'Anime'
    ];
    const generos = [];
    for (const nombre_genero of generosData) {
      generos.push(await prisma.generos.create({
        data: { nombre_genero },
      }));
    }
    console.log('Géneros creados:', generos);

    // Crear libros
    console.log('Creando libros...');
    const librosData = [
      { titulo: 'El señor de los anillos', autor: 'J.R.R. Tolkien', precio: 120.0, genero: 'Fantasía' },
      { titulo: '1984', autor: 'George Orwell', precio: 90.0, genero: 'Ficción' },
      { titulo: 'El código Da Vinci', autor: 'Dan Brown', precio: 80.0, genero: 'Misterio' },
      { titulo: 'Cumbres borrascosas', autor: 'Emily Brontë', precio: 70.0, genero: 'Romance' },
      { titulo: 'La Odisea', autor: 'Homero', precio: 100.0, genero: 'Historia' },
      { titulo: 'Spider-Man: Homecoming', autor: 'Marvel', precio: 50.0, genero: 'Cómics' },
      { titulo: 'Drácula', autor: 'Bram Stoker', precio: 75.0, genero: 'Terror' },
      { titulo: 'Cómo ganar amigos', autor: 'Dale Carnegie', precio: 65.0, genero: 'Autoayuda' },
      { titulo: 'Naruto: Historia Secreta', autor: 'Masashi Kishimoto', precio: 55.0, genero: 'Anime' },
      { titulo: 'El Principito', autor: 'Antoine de Saint-Exupéry', precio: 40.0, genero: 'Ficción' },
      // ... Agrega otros 30 libros con títulos y autores variados
    ];

    const libros = [];
    for (const libro of librosData) {
      const genero = generos.find(g => g.nombre_genero === libro.genero);
      libros.push(await prisma.libros.create({
        data: {
          titulo: libro.titulo,
          autor: libro.autor,
          precio: libro.precio,
          id_genero: genero.id_genero,
        },
      }));
    }
    console.log('Libros creados:', libros);

    console.log('=== BASE DE DATOS INICIALIZADA CON ÉXITO ===');
  } catch (error) {
    console.error('Error al inicializar la base de datos:', error);
  } finally {
    await prisma.$disconnect();
  }
}

inicializarBaseDeDatos();
