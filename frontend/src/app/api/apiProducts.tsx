import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000/products', // Cambia la URL según tu configuración
});

// Obtener todos los productos
export const getAllProducts = async () => {
  const response = await api.get('/');
  return response.data;
};

// Obtener un producto por ID
export const getProductById = async (id: string) => {
  const response = await api.get(`/${id}`);
  return response.data;
};

// Crear un producto
export const createProduct = async (productData: any) => {
  const response = await api.post('/', productData);
  return response.data;
};

// Actualizar un producto
export const updateProduct = async (id: string, updatedData: any) => {
  const response = await api.patch(`/${id}`, updatedData);
  return response.data;
};

// Eliminar un producto
export const deleteProduct = async (id: string) => {
  const response = await api.delete(`/${id}`);
  return response.data;
};
