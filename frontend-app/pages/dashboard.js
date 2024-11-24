import { useEffect, useState } from 'react';
import {
  getLibros,
  getTransaccionesUsuario as getTransacciones,
  crearTransaccion as postTransaccion,
  eliminarTransaccion as deleteTransaccion,
  completarPago as pagarTransacciones,
} from '../services/api'; // Funciones de API

const Dashboard = () => {
  const [idUsuario, setIdUsuario] = useState(null);
  const [libros, setLibros] = useState([]);
  const [error, setError] = useState('');
  const [carrito, setCarrito] = useState([]); // Estado para las transacciones del carrito
  const [mostrarCarrito, setMostrarCarrito] = useState(false); // Estado para mostrar el carrito

  // Obtener el ID del usuario logueado
  useEffect(() => {
    const storedId = localStorage.getItem('id_usuario');
    if (storedId) {
      setIdUsuario(Number(storedId)); // Convertir a número
    } else {
      setError('No se encontró el usuario logueado.');
    }
  }, []);

  // Obtener los libros disponibles
  useEffect(() => {
    const fetchLibros = async () => {
      try {
        const data = await getLibros();
        setLibros(data);
      } catch (err) {
        setError('Error al cargar los libros.');
      }
    };

    fetchLibros();
  }, []);

  // Obtener transacciones pendientes del usuario
  const fetchTransacciones = async () => {
    if (!idUsuario) return;

    try {
      const data = await getTransacciones(idUsuario, 'PENDIENTE'); // Pasa el estado "PENDIENTE"
      
      // Filtrar las transacciones para excluir las que están en estado CANCELADO
      const transaccionesFiltradas = data.filter((transaccion) => transaccion.estado !== 'CANCELADO');
      
      setCarrito(transaccionesFiltradas);
    } catch (err) {
      setError('Error al cargar las transacciones.');
    }
  };

  // Agregar un libro al carrito
  const agregarAlCarrito = async (libro) => {
    if (!idUsuario) return;

    try {
      // Asegurarse de que el libro tiene cantidad disponible
      if (libro.cantidad <= 0) {
        setError('No hay suficiente cantidad de este libro.');
        return;
      }

      await postTransaccion(idUsuario, libro.id_libro);
      // Reducir la cantidad del libro seleccionado
      setLibros((prevLibros) =>
        prevLibros.map((l) =>
          l.id_libro === libro.id_libro ? { ...l, cantidad: l.cantidad - 1 } : l
        )
      );
      fetchTransacciones(); // Actualizar las transacciones pendientes
    } catch (err) {
      setError('Error al agregar el libro al carrito.');
    }
  };

  // Eliminar una transacción pendiente del carrito
  const eliminarDelCarrito = async (idTransaccion, idLibro) => {
    if (!idUsuario) return;

    try {
      await deleteTransaccion(idTransaccion);
      // Aumentar la cantidad del libro asociado
      setLibros((prevLibros) =>
        prevLibros.map((l) =>
          l.id_libro === idLibro ? { ...l, cantidad: l.cantidad + 1 } : l
        )
      );
      fetchTransacciones(); // Actualizar las transacciones pendientes
    } catch (err) {
      setError('Error al eliminar el libro del carrito.');
    }
  };

  // Finalizar la compra
  const comprar = async () => {
    if (!idUsuario) return;

    try {
      // Llamada a la API para procesar el pago y actualizar las transacciones
      const response = await pagarTransacciones(idUsuario);

      // Si la compra se realiza con éxito, también actualizamos el carrito
      // Ya que el estado de las transacciones se cambia a 'CANCELADO' en el backend
      if (response && response.message === 'Pago completado exitosamente.') {
        alert('¡Compra realizada con éxito!');
        
        // Limpiamos el carrito (vaciar las transacciones pendientes)
        setCarrito([]);

        // Actualizar las transacciones después del pago
        fetchTransacciones(); // Actualiza las transacciones pendientes, aunque estén ahora canceladas
      } else {
        setError('Hubo un problema con la compra.');
      }
    } catch (err) {
      setError('Error al realizar la compra.');
      console.error(err); // Puedes usar esto para obtener más detalles del error
    }
  };

  return (
    <div className="p-8 relative">
      <h1 className="text-2xl font-bold mb-4">BOOKstore</h1>

      {error && <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">{error}</div>}

      <h2 className="text-xl font-semibold mb-4">Libros disponibles</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {libros.length === 0 ? (
          <p>No hay libros disponibles.</p>
        ) : (
          libros.map((libro) => (
            <div
              key={libro.id_libro}
              className="border p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl cursor-pointer"
              onClick={() => agregarAlCarrito(libro)}
            >
              <div className="bg-gray-300 mb-4 h-48 rounded-lg overflow-hidden">
                <img
                  src={`http://localhost:3000${libro.imagen_url}`}
                  alt={libro.titulo}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center">
                <p className="font-bold text-lg">{libro.titulo}</p>
                <p className="text-sm text-gray-600 mt-2">{libro.precio} USD</p>
                <p className="text-xs text-gray-500">Cantidad disponible: {libro.cantidad}</p>
              </div>
            </div>
          ))
        )}
      </div>

      <button
        onClick={() => {
          setMostrarCarrito(!mostrarCarrito);
          if (!mostrarCarrito) fetchTransacciones(); // Actualizar transacciones al abrir el carrito
        }}
        className="absolute top-8 right-8 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
      >
        Carrito ({carrito.length})
      </button>

      {mostrarCarrito && (
        <div className="absolute top-16 right-8 bg-white border p-4 w-80 shadow-lg rounded-lg">
          <h3 className="font-bold text-lg mb-4">Carrito</h3>
          {carrito.length === 0 ? (
            <p>No hay transacciones pendientes.</p>
          ) : (
            <div>
              <ul>
                {carrito.map((transaccion) => (
                  <li key={transaccion.id_transaccion} className="flex justify-between items-center mb-2">
                    <p>{transaccion.libro.titulo}</p>
                    <button
                      onClick={() => eliminarDelCarrito(transaccion.id_transaccion, transaccion.id_libro)}
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
