'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createProduct, updateProduct } from '../api/apiProducts';

interface Product {
  id?: string;
  name: string;
  category: string;
  price: string;
  stock: number;
  image: string;
}

interface AddProductProps {
  onClose: () => void;
  refreshProducts: () => void;
  productToEdit?: Product; // Propiedad opcional para editar un producto
}

const AddProduct = ({ onClose, refreshProducts, productToEdit }: AddProductProps) => {
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

  // Cargar los datos del producto si es para edición
  useEffect(() => {
    if (productToEdit) {
      setFormData(productToEdit);
    }
  }, [productToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const stock = parseInt(formData.stock.toString(), 10);

    if (!formData.name || !formData.category || !formData.price || isNaN(stock) || !formData.image) {
      setError('Todos los campos son obligatorios.');
      setLoading(false);
      return;
    }

    try {
      const productData = { ...formData, stock };

      if (productToEdit) {
        // Si estamos editando un producto, usamos updateProduct
        await updateProduct(productToEdit.id!, productData); // 'id' es obligatorio para actualizar
      } else {
        // Si estamos agregando un nuevo producto
        await createProduct(productData);
      }
      setLoading(false);
      await refreshProducts();
      onClose();
    } catch (err) {
      setLoading(false);
      setError('Error al guardar el producto.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">{productToEdit ? 'Actualizar Producto' : 'Agregar Producto'}</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          {/* Los campos del formulario siguen siendo los mismos */}
          <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">Nombre del Producto</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={(e) => {
              // Expresión regular para permitir solo letras y espacios
              const value = e.target.value;
              if (/^[A-Za-z\s]*$/.test(value) || value === '') {
                handleChange(e);
              }
            }}
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
              onChange={(e) => {
                // Expresión regular para permitir solo letras y espacios
                const value = e.target.value;
                if (/^[A-Za-z\s]*$/.test(value) || value === '') {
                  handleChange(e);
                }
              }}
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
              onChange={(e) => {
                // Expresión regular para validar números positivos con decimales
                const value = e.target.value;
                // Permite ingresar números positivos con decimales (ej: 899.99, 10)
                if (/^\d*\.?\d+$/.test(value) || value === '') {
                  handleChange(e);
                }
              }}
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
            onChange={(e) => {
              // Solo permite números positivos
              const value = e.target.value;
              // Si es un número positivo o vacío (para permitir borrar), actualiza el estado
              if (/^\d+$/.test(value) || value === '') {
                handleChange(e);
              }
            }}
            className="border border-gray-300 p-2 w-full rounded mt-2"
            placeholder="Ejemplo: 10"
            min="1" // Asegura que el valor mínimo sea 1
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
            {loading ? 'Guardando...' : productToEdit ? 'Actualizar' : 'Agregar'}
          </button>
          <button onClick={onClose} className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg bg-white hover:bg-gray-300 w-full">
          Cancelar
        </button>
          </div>
        </form>
        
      </div>
    </div>
  );
};

export default AddProduct;
