import { useEffect, useState } from 'react';
import { getLibros } from '../services/api';  // Importa la función para obtener libros

const Dashboard = () => {
  const [libros, setLibros] = useState([]);
  const [error, setError] = useState('');

  // Obtener los libros cuando el componente se monta
  useEffect(() => {
    const fetchLibros = async () => {
      try {
        const data = await getLibros();
        setLibros(data);  // Almacena los libros en el estado
      } catch (err) {
        setError('Error al cargar los libros');
      }
    };

    fetchLibros();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">BOOKstore</h1>

      {error && <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">{error}</div>}

      <h2 className="text-xl font-semibold mb-4">Libros disponibles</h2>

      {/* Grid para mostrar los libros en 3 columnas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {libros.length === 0 ? (
          <p>No hay libros disponibles.</p>
        ) : (
          libros.map((libro) => (
            <div
              key={libro.id_libro}
              className="border p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl"
            >
              {/* Contenedor que incluye imagen, nombre y precio */}
              <div className="bg-gray-300 mb-4 h-48 rounded-lg overflow-hidden">
                <img
                  src={libro.imagen_url}  // Ruta de la imagen (según lo que hayas configurado en el backend)
                  alt={libro.titulo}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="text-center">
                <p className="font-bold text-lg cursor-pointer hover:text-blue-600">{libro.titulo}</p>
                <p className="text-sm text-gray-600 mt-2">{libro.precio} USD</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
