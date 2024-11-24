import { useEffect, useState } from 'react';
import '../styles/styles.css';
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
  const [carrito, setCarrito] = useState([]);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);

  // Obtener el ID del usuario logueado
  useEffect(() => {
    const storedId = localStorage.getItem('id_usuario');
    if (storedId) {
      setIdUsuario(Number(storedId));
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
      const data = await getTransacciones(idUsuario, 'PENDIENTE');
      setCarrito(data);
    } catch (err) {
      setError('Error al cargar las transacciones.');
    }
  };

  // Agregar un libro al carrito
  const agregarAlCarrito = async (libro) => {
    if (!idUsuario) return;

    try {
      if (libro.cantidad <= 0) {
        setError('No hay suficiente cantidad de este libro.');
        return;
      }

      await postTransaccion(idUsuario, libro.id_libro);
      setLibros((prevLibros) =>
        prevLibros.map((l) =>
          l.id_libro === libro.id_libro ? { ...l, cantidad: l.cantidad - 1 } : l
        )
      );
      fetchTransacciones();
    } catch (err) {
      setError('Error al agregar el libro al carrito.');
    }
  };

  // Eliminar una transacción pendiente del carrito
  const eliminarDelCarrito = async (idTransaccion, idLibro) => {
    if (!idUsuario) return;

    try {
      await deleteTransaccion(idTransaccion);
      setLibros((prevLibros) =>
        prevLibros.map((l) =>
          l.id_libro === idLibro ? { ...l, cantidad: l.cantidad + 1 } : l
        )
      );
      fetchTransacciones();
    } catch (err) {
      setError('Error al eliminar el libro del carrito.');
    }
  };

  // Finalizar la compra
  const comprar = async () => {
    if (!idUsuario) return;

    try {
      await pagarTransacciones(idUsuario);
      alert('¡Compra realizada con éxito!');
      fetchTransacciones();
    } catch (err) {
      setError('Error al realizar la compra.');
    }
  };

  return (
    <div className="dashboard">
      <h1 className="title">BOOKstore</h1>

      {error && <div className="error">{error}</div>}

      <h2 className="subtitle">Libros disponibles</h2>

      <div className="gallery">
        {libros.length === 0 ? (
          <p className="empty">No hay libros disponibles.</p>
        ) : (
          libros.map((libro) => (
            <div
              key={libro.id_libro}
              className="gallery-item"
              onClick={() => agregarAlCarrito(libro)}
            >
              <img
                src={`http://localhost:3000${libro.imagen_url}`}
                alt={libro.titulo}
                className="gallery-img"
              />
              <div className="gallery-info">
                <p className="title">{libro.titulo}</p>
                <p className="price">{libro.precio} USD</p>
                <p className="stock">Cantidad disponible: {libro.cantidad}</p>
              </div>
            </div>
          ))
        )}
      </div>

      <button
        onClick={() => {
          setMostrarCarrito(!mostrarCarrito);
          if (!mostrarCarrito) fetchTransacciones();
        }}
        className="cart-btn"
      >
        Carrito ({carrito.length})
      </button>

      {mostrarCarrito && (
        <div className="cart">
          <h3>Carrito</h3>
          {carrito.length === 0 ? (
            <p className="empty-cart">No hay transacciones pendientes.</p>
          ) : (
            <div>
              <ul>
                {carrito.map((transaccion) => (
                  <li key={transaccion.id_transaccion}>
                    <p>{transaccion.libro.titulo}</p>
                    <button
                      onClick={() =>
                        eliminarDelCarrito(
                          transaccion.id_transaccion,
                          transaccion.id_libro
                        )
                      }
                      className="delete-btn"
                    >
                      Eliminar
                    </button>
                  </li>
                ))}
              </ul>
              <button onClick={comprar} className="checkout-btn">
                Comprar
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
