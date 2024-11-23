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
          saldo: Math.random() * 5000 + 50, // Saldo aleatorio entre 50 y 550
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
      // Fantasía
      { titulo: 'El señor de los anillos', autor: 'J.R.R. Tolkien', precio: 120.0, genero: 'Fantasía' },
      { titulo: 'Harry Potter y la piedra filosofal', autor: 'J.K. Rowling', precio: 90.0, genero: 'Fantasía' },
      { titulo: 'Juego de Tronos', autor: 'George R.R. Martin', precio: 100.0, genero: 'Fantasía' },
      { titulo: 'Harry Potter y la piedra filosofal', autor: 'J.K. Rowling', precio: 90.0, genero: 'Fantasía' },
      { titulo: 'Juego de Tronos', autor: 'George R.R. Martin', precio: 100.0, genero: 'Fantasía' },
      { titulo: 'El hobbit', autor: 'J.R.R. Tolkien', precio: 80.0, genero: 'Fantasía' },
      { titulo: 'Las crónicas de Narnia', autor: 'C.S. Lewis', precio: 85.0, genero: 'Fantasía' },
      { titulo: 'Harry Potter y la piedra filosofal', autor: 'J.K. Rowling', precio: 90.0, genero: 'Fantasía' },
      { titulo: 'Juego de Tronos', autor: 'George R.R. Martin', precio: 100.0, genero: 'Fantasía' },
      { titulo: 'El hobbit', autor: 'J.R.R. Tolkien', precio: 80.0, genero: 'Fantasía' },
      { titulo: 'Las crónicas de Narnia', autor: 'C.S. Lewis', precio: 85.0, genero: 'Fantasía' },
    
      // Ficción
      { titulo: '1984', autor: 'George Orwell', precio: 90.0, genero: 'Ficción' },
      { titulo: 'Rebelión en la granja', autor: 'George Orwell', precio: 70.0, genero: 'Ficción' },
      { titulo: 'Fahrenheit 451', autor: 'Ray Bradbury', precio: 65.0, genero: 'Ficción' },
      { titulo: '1984', autor: 'George Orwell', precio: 90.0, genero: 'Ficción' },
      { titulo: 'Rebelión en la granja', autor: 'George Orwell', precio: 70.0, genero: 'Ficción' },
      { titulo: 'Fahrenheit 451', autor: 'Ray Bradbury', precio: 65.0, genero: 'Ficción' },
      { titulo: 'Un mundo feliz', autor: 'Aldous Huxley', precio: 75.0, genero: 'Ficción' },
      { titulo: 'El Principito', autor: 'Antoine de Saint-Exupéry', precio: 40.0, genero: 'Ficción' },
    
      // Misterio
      { titulo: 'El código Da Vinci', autor: 'Dan Brown', precio: 80.0, genero: 'Misterio' },
      { titulo: 'El símbolo perdido', autor: 'Dan Brown', precio: 85.0, genero: 'Misterio' },
      { titulo: 'Los hombres que no amaban a las mujeres', autor: 'Stieg Larsson', precio: 90.0, genero: 'Misterio' },
      { titulo: 'El psicoanalista', autor: 'John Katzenbach', precio: 70.0, genero: 'Misterio' },
      { titulo: 'El símbolo perdido', autor: 'Dan Brown', precio: 85.0, genero: 'Misterio' },
      { titulo: 'Los hombres que no amaban a las mujeres', autor: 'Stieg Larsson', precio: 90.0, genero: 'Misterio' },
      { titulo: 'El psicoanalista', autor: 'John Katzenbach', precio: 70.0, genero: 'Misterio' },
      { titulo: 'La chica del tren', autor: 'Paula Hawkins', precio: 60.0, genero: 'Misterio' },
    
      // Romance
      { titulo: 'Cumbres borrascosas', autor: 'Emily Brontë', precio: 70.0, genero: 'Romance' },
      { titulo: 'Orgullo y prejuicio', autor: 'Jane Austen', precio: 80.0, genero: 'Romance' },
      { titulo: 'Cumbres borrascosas', autor: 'Emily Brontë', precio: 70.0, genero: 'Romance' },
      { titulo: 'Orgullo y prejuicio', autor: 'Jane Austen', precio: 80.0, genero: 'Romance' },
      { titulo: 'Bajo la misma estrella', autor: 'John Green', precio: 75.0, genero: 'Romance' },
      { titulo: 'Cumbres borrascosas', autor: 'Emily Brontë', precio: 70.0, genero: 'Romance' },
      { titulo: 'Orgullo y prejuicio', autor: 'Jane Austen', precio: 80.0, genero: 'Romance' },
      { titulo: 'Bajo la misma estrella', autor: 'John Green', precio: 75.0, genero: 'Romance' },
      { titulo: 'Romeo y Julieta', autor: 'William Shakespeare', precio: 50.0, genero: 'Romance' },
      { titulo: 'Diario de una pasión', autor: 'Nicholas Sparks', precio: 60.0, genero: 'Romance' },
    
      // Historia
      { titulo: 'La Odisea', autor: 'Homero', precio: 100.0, genero: 'Historia' },
      { titulo: 'Sapiens', autor: 'Yuval Noah Harari', precio: 120.0, genero: 'Historia' },
      { titulo: 'El arte de la guerra', autor: 'Sun Tzu', precio: 40.0, genero: 'Historia' },
      { titulo: 'Guns, Germs, and Steel', autor: 'Jared Diamond', precio: 90.0, genero: 'Historia' },
      { titulo: 'La historia interminable', autor: 'Michael Ende', precio: 80.0, genero: 'Historia' },
      { titulo: 'Sapiens', autor: 'Yuval Noah Harari', precio: 120.0, genero: 'Historia' },
      { titulo: 'Guns, Germs, and Steel', autor: 'Jared Diamond', precio: 90.0, genero: 'Historia' },
      { titulo: 'La historia interminable', autor: 'Michael Ende', precio: 80.0, genero: 'Historia' },
      { titulo: 'Sapiens', autor: 'Yuval Noah Harari', precio: 120.0, genero: 'Historia' },
      { titulo: 'El arte de la guerra', autor: 'Sun Tzu', precio: 40.0, genero: 'Historia' },
      { titulo: 'Guns, Germs, and Steel', autor: 'Jared Diamond', precio: 90.0, genero: 'Historia' },
      { titulo: 'La historia interminable', autor: 'Michael Ende', precio: 80.0, genero: 'Historia' },
    
      // Cómics
      { titulo: 'Spider-Man: Homecoming', autor: 'Marvel', precio: 50.0, genero: 'Cómics' },
      { titulo: 'Batman: Año Uno', autor: 'Frank Miller', precio: 60.0, genero: 'Cómics' },
      { titulo: 'Watchmen', autor: 'Alan Moore', precio: 85.0, genero: 'Cómics' },
      { titulo: 'Spider-Man: Homecoming', autor: 'Marvel', precio: 50.0, genero: 'Cómics' },
      { titulo: 'Batman: Año Uno', autor: 'Frank Miller', precio: 60.0, genero: 'Cómics' },
      { titulo: 'Watchmen', autor: 'Alan Moore', precio: 85.0, genero: 'Cómics' },
      { titulo: 'Sandman', autor: 'Neil Gaiman', precio: 90.0, genero: 'Cómics' },
      { titulo: 'The Walking Dead', autor: 'Robert Kirkman', precio: 75.0, genero: 'Cómics' },
    
      // Terror
      { titulo: 'Drácula', autor: 'Bram Stoker', precio: 75.0, genero: 'Terror' },
      { titulo: 'It', autor: 'Stephen King', precio: 100.0, genero: 'Terror' },
      { titulo: 'El exorcista', autor: 'William Peter Blatty', precio: 80.0, genero: 'Terror' },
      { titulo: 'Frankenstein', autor: 'Mary Shelley', precio: 70.0, genero: 'Terror' },
      { titulo: 'Drácula', autor: 'Bram Stoker', precio: 75.0, genero: 'Terror' },
      { titulo: 'It', autor: 'Stephen King', precio: 100.0, genero: 'Terror' },
      { titulo: 'El exorcista', autor: 'William Peter Blatty', precio: 80.0, genero: 'Terror' },
      { titulo: 'Frankenstein', autor: 'Mary Shelley', precio: 70.0, genero: 'Terror' },
      { titulo: 'It', autor: 'Stephen King', precio: 100.0, genero: 'Terror' },
      { titulo: 'El exorcista', autor: 'William Peter Blatty', precio: 80.0, genero: 'Terror' },
      { titulo: 'Frankenstein', autor: 'Mary Shelley', precio: 70.0, genero: 'Terror' },
      { titulo: 'La llamada de Cthulhu', autor: 'H.P. Lovecraft', precio: 65.0, genero: 'Terror' },
    
      // Anime
      { titulo: 'Naruto: Historia Secreta', autor: 'Masashi Kishimoto', precio: 55.0, genero: 'Anime' },
      { titulo: 'Attack on Titan: No Regrets', autor: 'Hajime Isayama', precio: 60.0, genero: 'Anime' },
      { titulo: 'Your Name: Another Side', autor: 'Makoto Shinkai', precio: 70.0, genero: 'Anime' },
      { titulo: 'Attack on Titan: No Regrets', autor: 'Hajime Isayama', precio: 60.0, genero: 'Anime' },
      { titulo: 'Your Name: Another Side', autor: 'Makoto Shinkai', precio: 70.0, genero: 'Anime' },
      { titulo: 'Death Note: Another Note', autor: 'Tsugumi Ohba', precio: 65.0, genero: 'Anime' },
      { titulo: 'Your Name: Another Side', autor: 'Makoto Shinkai', precio: 70.0, genero: 'Anime' },
      { titulo: 'Death Note: Another Note', autor: 'Tsugumi Ohba', precio: 65.0, genero: 'Anime' },
      { titulo: 'Attack on Titan: No Regrets', autor: 'Hajime Isayama', precio: 60.0, genero: 'Anime' },
      { titulo: 'Your Name: Another Side', autor: 'Makoto Shinkai', precio: 70.0, genero: 'Anime' },
      { titulo: 'Death Note: Another Note', autor: 'Tsugumi Ohba', precio: 65.0, genero: 'Anime' },
      { titulo: 'Dragon Ball Super: Broly', autor: 'Akira Toriyama', precio: 50.0, genero: 'Anime' },
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
