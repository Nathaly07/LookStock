'use client';
import React, { useEffect, useState } from 'react';
import { getAllProducts , deleteProduct} from '../api/apiProducts';
import Modal from './Modal';
import AddProduct from './ProductForm';
import Image from 'next/image';
import ConfirmDeleteModal from './DeleteProduct';


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
  const [inventoryData, setInventoryData] = useState<Product[]>([]);
  const [filteredData, setFilteredData] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await getAllProducts();
        setInventoryData(products);
        setFilteredData(products);
      } catch (err) {
        setError('Error al cargar los datos del inventario.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredData(inventoryData);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = inventoryData.filter((product) =>
        product.name.toLowerCase().includes(query) || product.category.toLowerCase().includes(query)
      );
      setFilteredData(filtered);
    }
  }, [searchQuery, inventoryData]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleAddProduct = () => {
    setProductToEdit(null); // Aseguramos que no hay un producto en edición al abrir el modal para agregar
    setIsModalOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setProductToEdit(product); // Establecemos el producto a editar
    setIsModalOpen(true);
  };

  const handleDeleteProduct = (product: Product) => {
    setProductToDelete(product);
    setIsDeleteModalOpen(true); // Abre la ventana de confirmación
  };

  const handleConfirmDelete = async () => {
    if (!productToDelete) return;

    try {
      await deleteProduct(productToDelete.id); // Llamamos a la API para eliminar el producto
      setIsDeleteModalOpen(false); // Cierra el modal de confirmación
      refreshProducts(); // Actualizamos la lista de productos
    } catch (err) {
      console.error('Error al eliminar el producto', err);
      setError('Hubo un error al eliminar el producto.');
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsDeleteModalOpen(false);
  };

  const refreshProducts = async () => {
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

      <div className="overflow-x-auto">
        <table className="table-auto w-full bg-white shadow-md rounded-lg">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2">Categoría</th>
              <th className="px-4 py-2">Precio</th>
              <th className="px-4 py-2">Stock</th>
              <th className="px-4 py-2">Imagen</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((product) => (
              <tr key={product.id}>
                <td className="border px-4 py-2">{product.name}</td>
                <td className="border px-4 py-2">{product.category}</td>
                <td className="border px-4 py-2">{product.price}</td>
                <td className="border px-4 py-2">{product.stock}</td>
                <td className="border px-4 py-2">
                <img
                    src={product.image}
                    alt={product.name}
                    className="h-16 w-16 object-cover mx-auto"
                  />
                </td>
                <td className="border px-4 py-2">
                <div className="flex justify-center items-center space-x-4 w-full">
                  <button
                      onClick={() => handleEditProduct(product)}
                      className="bg-blue-400 text-white px-4 py-2 rounded-xl hover:bg-blue-200"
                    >
                      <img src="../icons/Edit.svg" alt="Editar" />
                    </button>

                    <button onClick={() => handleDeleteProduct(product)}
                      className="bg-blue-400 text-white px-4 py-2 rounded-xl hover:bg-blue-200"
                    >
                       <img src="../icons/Delete.svg" alt="Eliminar" />
                    </button>
                </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <AddProduct onClose={closeModal} refreshProducts={refreshProducts} productToEdit={productToEdit} />
        </Modal>
      )}

      {isDeleteModalOpen && (
        <ConfirmDeleteModal
          isOpen={isDeleteModalOpen}
          onClose={closeModal}
          onConfirm={handleConfirmDelete}
          productName={productToDelete?.name || ''}
        />
      )}
    </div>
  );
};

export default Inventory;