"use client";
import React from 'react';

const StockControl = () => {
    // Datos de prueba
    const stockData = [
    { nameProduct:'Producto A',nameEmployee: 'Expleado A', type: 'Entrada', quantity: 10, date: '2023/12/11' },
    { nameProduct:'Producto B',nameEmployee: 'Empleado B', type: 'Salida', quantity: 3, date: '2023/12/11' },
    { nameProduct:'Producto C',nameEmployee: 'Empleado C', type: 'Salida', quantity: 5, date: '2023/12/11' },
    { nameProduct:'Producto D',nameEmployee: 'Empleado D', type: 'Entrada', quantity: 3, date: '2023/12/11' },
    ];
    
    return(
        <div className="flex-1 bg-white p-10">
        <h1 className="text-3xl font-bold mb-6 text-black text-center">Control de Stock</h1>
        <div className="overflow-x-auto">
            <table className="table-auto w-full bg-white shadow-md rounded-lg">
            <thead className="bg-blue-500 text-white">
                <tr>
                <th className="px-4 py-2">Producto</th>
                <th className="px-4 py-2">Empleado</th>
                <th className="px-4 py-2">Tipo</th>
                <th className="px-4 py-2">Cantidad</th>
                <th className="px-4 py-2">Fecha</th>
                </tr>
            </thead>
            <tbody>
                {stockData.map((item, index) => (
                <tr key={index} className="text-center border-b hover:bg-gray-100">
                    <td className="px-4 py-2">{item.nameProduct}</td>
                    <td className="px-4 py-2">{item.nameEmployee}</td>
                    <td className="px-4 py-2">{item.type}</td>
                    <td className="px-4 py-2">{item.quantity}</td>
                    <td className="px-4 py-2">{item.date}</td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
    </div>
    );
}
export default StockControl;
