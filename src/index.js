import express from 'express';
import cors from 'cors'; // Importa el paquete CORS
import usuarioRoutes from './routes/usuario.route.js';
import libroRoutes from './routes/libro.route.js';
import transaccionRoutes from './routes/transaccion.route.js';
import generoRoutes from './routes/genero.route.js';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtener __dirname compatible
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Configurar CORS
app.use(cors({
  origin: 'http://localhost:3001', // Permite solicitudes desde tu frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Content-Type'], // Encabezados permitidos
}));

app.use(express.json());

// Configurar carpeta estática para imágenes
app.use('/img', express.static(path.join(__dirname, '..', 'public', 'img')));

// Rutas
app.use('/api', usuarioRoutes);
app.use('/api', libroRoutes);
app.use('/api', transaccionRoutes);
app.use('/api', generoRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
