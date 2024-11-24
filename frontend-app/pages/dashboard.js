import { useEffect, useState } from 'react';
import { getLibros } from '../services/api';  // Importa la función para obtener libros

const Dashboard = () => {
  const [libros, setLibros] = useState([]);
  const [error, setError] = useState('');
  const [carrito, setCarrito] = useState([]);  // Estado para el carrito
  const [mostrarCarrito, setMostrarCarrito] = useState(false); // Estado para mostrar el carrito

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

  // Función para agregar un libro al carrito
  const agregarAlCarrito = (libro) => {
    setCarrito([...carrito, libro]);
  };

  // Función para eliminar un libro del carrito
  const eliminarDelCarrito = (idLibro) => {
    setCarrito(carrito.filter(libro => libro.id_libro !== idLibro));
  };

  // Función para manejar la acción de compra
  const comprar = () => {
    alert('¡Compra realizada!');
    setCarrito([]);  // Vaciar el carrito después de la compra
  };

  return (
    <div className="p-8 relative">
      <h1 className="text-2xl font-bold mb-4">BOOKstore</h1>

      {error && <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">{error}</div>}

      <h2 className="text-xl font-semibold mb-4">Libros disponibles</h2>

      {/* Grid para mostrar los libros, hasta 4 libros por columna */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {libros.length === 0 ? (
          <p>No hay libros disponibles.</p>
        ) : (
          libros.map((libro) => (
            <div
              key={libro.id_libro}
              className="border p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl cursor-pointer"
              onClick={() => agregarAlCarrito(libro)} // Se agrega al carrito al hacer clic en el libro
            >
              <div className="bg-gray-300 mb-4 h-48 rounded-lg overflow-hidden">
                <img
                  src={libro.imagen_url}  // Ruta de la imagen
                  alt={libro.titulo}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center">
                <p className="font-bold text-lg">{libro.titulo}</p>
                <p className="text-sm text-gray-600 mt-2">{libro.precio} USD</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Botón de carrito en la parte superior derecha */}
      <button
        onClick={() => setMostrarCarrito(!mostrarCarrito)}
        className="absolute top-8 right-8 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
      >
        Carrito ({carrito.length})
      </button>

      {/* Mostrar el carrito si está visible */}
      {mostrarCarrito && (
        <div className="absolute top-16 right-8 bg-white border p-4 w-80 shadow-lg rounded-lg">
          <h3 className="font-bold text-lg mb-4">Carrito</h3>
          {carrito.length === 0 ? (
            <p>No hay libros en el carrito.</p>
          ) : (
            <div>
              <ul>
                {carrito.map((libro) => (
                  <li key={libro.id_libro} className="flex justify-between items-center mb-2">
                    <p>{libro.titulo}</p>
                    <button
                      onClick={() => eliminarDelCarrito(libro.id_libro)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                      Eliminar
                    </button>
                  </li>
                ))}
              </ul>
              <div className="mt-4 text-center">
                <button
                  onClick={comprar}
                  className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600"
                >
                  Comprar
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
