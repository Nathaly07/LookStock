'use client';
import React, {useState} from "react";

interface StockProps{
    nameProduct: string;
    type: string;
    comment: number;
}
const RegisterForm = () => {
      
    return (  
        <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Registrar Movimiento</h2>
        <form >
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">Nombre del Producto</label>
            <input
              type="text"
              id="name"
              name="name"
              className="border border-gray-300 p-2 w-full rounded mt-2"
              placeholder="Ejemplo: Vestido de verano"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block text-gray-700">Tipo de Movimiento</label>
            <input
              type="text"
              id="price"
              name="price"
              className="border border-gray-300 p-2 w-full rounded mt-2"
              placeholder="Ejemplo: Entrada o Salida"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="stock" className="block text-gray-700">Cantidad</label>
            <input
              type="number"
              id="stock"
              name="stock"
              className="border border-gray-300 p-2 w-full rounded mt-2"
              placeholder="Ejemplo: 10"
            />
          </div>
          <div className="flex justify-center items-center space-x-4 w-full">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition disabled:opacity-50 w-full">
                Registrar
          </button>
          <button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg bg-white hover:bg-gray-300 w-full">
          Cancelar
        </button>
          </div>
        </form>
      </div>
    </div>
    );
}
export default RegisterForm;