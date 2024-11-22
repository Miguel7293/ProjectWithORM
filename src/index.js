import express from 'express';
import usuarioRoutes from './routes/usuario.route.js';
import libroRoutes from './routes/libro.route.js';
import transaccionRoutes from './routes/transaccion.route.js';
import generoRoutes from './routes/genero.route.js';

const app = express();

app.use(express.json());

// Rutas
app.use('/api', usuarioRoutes);
app.use('/api', libroRoutes);
app.use('/api', transaccionRoutes);
app.use('/api', generoRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
     