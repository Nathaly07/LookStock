'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createProduct } from '../api/apiProducts';
interface Product {
  name: string;
  category: string;
  price: string;
  stock: number;
  image: string;
}

interface AddProductProps {
  onClose: () => void; // Función para cerrar el modal
  refreshProducts: () => void; // Función para actualizar la lista de productos
}

const AddProduct = ({ onClose, refreshProducts }: AddProductProps) => {
  const [formData, setFormData] = useState<Product>({
    name: '',
    category: '',
    price: '',
    stock: 0,
    image: '',
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  // Maneja los cambios en el formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  
  // Maneja el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const stock = parseInt(formData.stock.toString(), 10); 

    // Verifica si los campos obligatorios están completos
    if (!formData.name || !formData.category || !formData.price || isNaN(stock)  || !formData.image) {
      setError('Todos los campos son obligatorios.');
      setLoading(false);
      return;
    }

    try {
      // Actualiza el estado para enviar la cantidad como un número entero
      const productData = { ...formData, stock };
      await createProduct(productData); // Llama a la función para crear el producto
      setLoading(false);
      await refreshProducts();
      onClose(); // Redirige después de agregar el producto
    } catch (err) {
      setLoading(false);
      setError('Error al agregar el producto.');
    }
  };
  
  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Agregar Producto</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">Nombre del Producto</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full rounded mt-2"
              placeholder="Ejemplo: Vestido de verano"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="category" className="block text-gray-700">Categoría</label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full rounded mt-2"
              placeholder="Ejemplo: Vestido"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="price" className="block text-gray-700">Precio</label>
            <input
              type="text"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full rounded mt-2"
              placeholder="Ejemplo: 899.99"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="stock" className="block text-gray-700">Stock</label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full rounded mt-2"
              placeholder="Ejemplo: 10"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="image" className="block text-gray-700">URL de la Imagen</label>
            <input
              type="text"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full rounded mt-2"
              placeholder="Ejemplo: https://example.com/image.jpg"
            />
          </div>
          <div className="flex justify-center items-center space-x-4 w-full">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition disabled:opacity-50 w-full"
              disabled={loading}
            >
              {loading ? 'Agregando...' : 'Agregar'}
            </button>
            <button
              onClick={onClose}
              className=" px-4 py-2 text-blue-600 border border-blue-600 rounded-lg bg-white hover:bg-gray-300  w-full"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
  
export default AddProduct;