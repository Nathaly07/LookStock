"use client";
import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../api/apiProducts';
import Modal from './Modal';
import AddProduct from './AddProduct';
import Image from 'next/image';

interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  stock: number;
  image: string;
  addedDate: string;
}

const Inventory = () => {
  const [inventoryData, setInventoryData] = useState<Product[]>([]); // Todos los productos
  const [filteredData, setFilteredData] = useState<Product[]>([]); // Datos filtrados
  const [searchQuery, setSearchQuery] = useState<string>(''); // Query de búsqueda
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await getAllProducts();
        setInventoryData(products);
        setFilteredData(products); // Inicialmente muestra todos los productos
      } catch (err) {
        setError('Error al cargar los datos del inventario.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filtra los datos cuando el usuario escribe en la barra de búsqueda
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredData(inventoryData); // Si no hay query, muestra todos los productos
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = inventoryData.filter((product) =>
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
      setFilteredData(filtered);
    }
  }, [searchQuery, inventoryData]);

  // Maneja el cambio en la barra de búsqueda
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleAddProduct = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false); // Cierra el modal
  };

  const refreshProducts = async () => {
    // Recarga los productos desde el backend para actualizar la lista
    const products = await getAllProducts();
    setInventoryData(products);
    setFilteredData(products);
  };

  if (loading) {
    return <p className="text-center">Cargando inventario...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="flex-1 bg-white p-10">
      <h1 className="text-3xl font-bold mb-6 text-black text-center">Inventario</h1>

      {/* Barra de búsqueda y botón agregar producto */}
      <div className="flex items-center justify-between mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Buscar productos..."
          className="border border-gray-300 p-2 rounded w-1/2"
        />
        <button
          onClick={handleAddProduct}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Agregar Producto
        </button>
      </div>

      {/* Tabla de productos */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full bg-white shadow-md rounded-lg">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2">Categoría</th>
              <th className="px-4 py-2">Precio</th>
              <th className="px-4 py-2">Stock</th>
              <th className="px-4 py-2">Imagen</th>
              <th className="px-4 py-2">Fecha Añadida</th>
              <th className="px-4 py-2">Opciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id} className="text-center border-b">
                <td className="px-4 py-2">{item.name}</td>
                <td className="px-4 py-2">{item.category}</td>
                <td className="px-4 py-2">{item.price}</td>
                <td className="px-4 py-2">{item.stock}</td>
                <td className="px-4 py-2">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-16 w-16 object-cover mx-auto"
                  />
                </td>
                <td className="px-4 py-2">{new Date(item.addedDate).toLocaleDateString()}</td>
                <td className="px-4 py-8 flex justify-center items-center space-x-4 w-full">
                  <button>
                  <img src="../icons/Edit.svg" alt="Editar" />
                  </button>
                  <button>
                  <img src="../icons/Delete.svg" alt="Eliminar" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <AddProduct onClose={closeModal} refreshProducts={refreshProducts}></AddProduct>
      </Modal>
    </div>
  );
};

export default Inventory;