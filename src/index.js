import express from 'express';
import cors from 'cors';  // Importa el paquete CORS
import usuarioRoutes from './routes/usuario.route.js';
import libroRoutes from './routes/libro.route.js';
import transaccionRoutes from './routes/transaccion.route.js';
import generoRoutes from './routes/genero.route.js';
import path from 'path';


const app = express();

const __dirname = new URL('.', import.meta.url).pathname;


// Configurar CORS
app.use(cors({
  origin: 'http://localhost:3001',  // Permite solicitudes desde tu frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Métodos permitidos
  allowedHeaders: ['Content-Type'],  // Encabezados permitidos
}));

app.use(express.json());

// Rutas
app.use('/api', usuarioRoutes);
app.use('/api', libroRoutes);
app.use('/api', transaccionRoutes);
app.use('/api', generoRoutes);
app.use('/img', express.static(path.join(__dirname, 'public', 'img')));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
