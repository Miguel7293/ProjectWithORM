import { useEffect, useState } from 'react';
import { getUsuarios } from '../services/api';  // Importar el servicio

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const data = await getUsuarios();  // Llamar a la función desde el servicio
        setUsuarios(data);  // Guardar los datos en el estado
      } catch (error) {
        console.error('Error al obtener los usuarios:', error);
      } finally {
        setLoading(false);  // Cambiar el estado de carga
      }
    };

    fetchUsuarios();
  }, []);

  if (loading) {
    return <div className="text-center">Cargando...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Usuarios</h1>
      <ul>
        {usuarios.map((usuario) => (
          <li key={usuario.id_usuario} className="bg-gray-100 p-4 mb-2 rounded-lg">
            <p><strong>Nombre:</strong> {usuario.nombre} {usuario.apellido}</p>
            <p><strong>Correo:</strong> {usuario.correo}</p>
            <p><strong>Saldo:</strong> ${usuario.saldo}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Usuarios;
