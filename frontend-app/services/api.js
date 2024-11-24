import axios from 'axios';

// Crear instancia de Axios con la URL base del backend
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000', // Asegúrate de que esta URL apunte a tu backend
  timeout: 10000,
});

// Función para iniciar sesión
export const loginUsuario = async (correo, contrasena) => {
  try {
    const response = await axiosInstance.post('/api/usuarios/login', {
      correo,
      contrasena,
    });
    return response.data;  // Retorna los datos de la respuesta
  } catch (error) {
    throw error;  // Propaga el error para que pueda ser manejado en el componente
  }
};


// Función para obtener todos los usuarios
export const getUsuarios = async () => {
  try {
    const response = await axiosInstance.get('/usuarios');
    return response.data;  // Retorna los usuarios obtenidos
  } catch (error) {
    throw error;  // Propaga el error para que pueda ser manejado en el componente
  }
};

// Función para crear un usuario
export const crearUsuario = async (nombre, apellido, correo, codigo_tarjeta, contrasena, saldo) => {
  try {
    const response = await axiosInstance.post('/usuarios', {
      nombre,
      apellido,
      correo,
      codigo_tarjeta,
      contrasena,
      saldo,
    });
    return response.data;  // Retorna el usuario creado
  } catch (error) {
    throw error;  // Propaga el error para que pueda ser manejado en el componente
  }
};
export const getLibros = async () => {
    try {
      const response = await axiosInstance.get('api/libros');
      return response.data;  // Retorna los libros obtenidos
    } catch (error) {
      throw error;  // Propaga el error para que pueda ser manejado en el componente
    }
  };