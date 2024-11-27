// ConfirmDeleteModal.tsx
import React from 'react';

interface deleteProduct {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  productName: string; // Nombre del producto a eliminar
}

const DeleteProduct = ({ isOpen, onClose, onConfirm, productName }: deleteProduct) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold text-center mb-4">¿Estás seguro de que deseas eliminar?</h2>
        <p className="text-center mb-4">El producto "{productName}" será eliminado de manera permanente.</p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Confirmar
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProduct;
