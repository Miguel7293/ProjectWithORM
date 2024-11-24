import { useState } from 'react';
import { loginUsuario } from '../services/api'; // Importa la función desde el archivo api.js
import { useRouter } from 'next/router';
import '../styles/login.prueba.css';

const Login = () => {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const router = useRouter(); // Inicializa el hook useRouter

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUsuario(correo, contrasena); // Llama a la función del servicio

      // Extrae el usuario y el mensaje de la respuesta
      const { usuario, message: successMessage } = response;
      
      // Extrae el id_usuario del objeto usuario
      const { id_usuario } = usuario;

      if (!id_usuario) {
        throw new Error("No se pudo obtener el ID del usuario desde el servidor.");
      }

      setMessage(successMessage); // Muestra el mensaje de éxito
      setError(''); // Limpia el error en caso de éxito

      console.log("ID Usuario recibido:", id_usuario); // Imprime el valor recibido

      // Guarda el ID del usuario en localStorage
      localStorage.setItem('id_usuario', id_usuario);

      // Redirige al Dashboard (puedes pasar el ID como parámetro si lo deseas)
      router.push('/dashboard');
    } catch (err) {
      setError(err.message || 'Error en el inicio de sesión'); // Muestra el error
      setMessage(''); // Limpia el mensaje de éxito
      console.error("Error en el inicio de sesión:", err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Iniciar sesión</h2>

        {message && <div className="bg-green-100 text-green-700 p-2 mb-4 rounded">{message}</div>}
        {error && <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="correo" className="block text-sm font-medium text-gray-700">
              Correo
            </label>
            <input
              id="correo"
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="contrasena" className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              id="contrasena"
              type="password"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
