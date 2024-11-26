"use client";
import React from 'react';

const Inventory = () => {
      // Datos de prueba
    const inventoryData = [
        { id: 1, name: 'Camisa', category: 'Ropa', quantity: 25, price: '$15' },
        { id: 2, name: 'Pantalón', category: 'Ropa', quantity: 30, price: '$25' },
        { id: 3, name: 'Zapatos', category: 'Calzado', quantity: 15, price: '$45' },
        { id: 4, name: 'Sombrero', category: 'Accesorios', quantity: 10, price: '$20' },
    ];
    return(
        <div className="flex-1 bg-white p-10">
        <h1 className="text-3xl font-bold mb-6 text-black text-center">Inventario</h1>
        <div className="overflow-x-auto">
          <table className="table-auto w-full bg-white shadow-md rounded-lg">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Nombre</th>
                <th className="px-4 py-2">Categoría</th>
                <th className="px-4 py-2">Cantidad</th>
                <th className="px-4 py-2">Precio</th>
              </tr>
            </thead>
            <tbody>
              {inventoryData.map((item) => (
                <tr key={item.id} className="text-center border-b">
                  <td className="px-4 py-2">{item.id}</td>
                  <td className="px-4 py-2">{item.name}</td>
                  <td className="px-4 py-2">{item.category}</td>
                  <td className="px-4 py-2">{item.quantity}</td>
                  <td className="px-4 py-2">{item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
}
export default Inventory;
