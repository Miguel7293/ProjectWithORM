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

  export const getTransaccionesUsuario = async (idUsuario, estado) => {
    try {
      const response = await axiosInstance.get(`/api/transacciones/${idUsuario}`, {
        params: { estado }, // Pasamos el estado como parámetro
      });
      return response.data;  // Retorna las transacciones obtenidas
    } catch (error) {
      throw error;  // Propaga el error para manejarlo en el componente
    }
  };
  export const crearTransaccion = async (idUsuario, idLibro) => {
    try {
      const response = await axiosInstance.post('/api/transacciones', {
        id_usuario: idUsuario,
        id_libro: idLibro,
      });
      return response.data;  // Retorna la transacción creada
    } catch (error) {
      throw error;  // Propaga el error para manejarlo en el componente
    }
  };

  export const eliminarTransaccion = async (idTransaccion) => {
    try {
      const response = await axiosInstance.delete(`/api/transacciones/${idTransaccion}`);
      return response.data;  // Retorna la respuesta del servidor
    } catch (error) {
      throw error;  // Propaga el error para manejarlo en el componente
    }
  };

  export const completarPago = async (idUsuario) => {
    try {
      const response = await axiosInstance.post('/api/transacciones/PagoCompletado', {
        id_usuario: idUsuario,
      });
      return response.data;  // Retorna la respuesta del servidor
    } catch (error) {
      throw error;  // Propaga el error para manejarlo en el componente
    }
  };
  export const reducirCantidadLibro = async (idLibro) => {
    try {
      const response = await axiosInstance.put(`/api/libros/reducir/${idLibro}`);
      return response.data;  // Retorna el libro actualizado
    } catch (error) {
      throw error;  // Propaga el error para manejarlo en el componente
    }
  };
  export const incrementarCantidadLibro = async (idLibro) => {
    try {
      const response = await axiosInstance.put(`/api/libros/incrementar/${idLibro}`);
      return response.data;  // Retorna el libro actualizado
    } catch (error) {
      throw error;  // Propaga el error para manejarlo en el componente
    }
  };