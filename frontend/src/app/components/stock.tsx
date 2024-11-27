"use client";
import React, { useEffect, useState } from "react";
import { getAllStock } from "../api/apiStockControl";
import Modal from './Modal';
import RegisterForm from "./registerForm";


  interface StockItem {
    nameProduct: string;
    nameEmployee: string;
    type: string;
    quantity: number;
    date: string;
  }
  const StockControl = () => {
    const [stockData, setStockData] = useState<StockItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);


    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleAddStock = () => {
      setIsModalOpen(true);
    };
  

  
    useEffect(() => {
      const fetchStockData = async () => {
        try {
          setLoading(true);
          const data = await getAllStock();
          const formattedData: StockItem[] = data.map((log: any) => ({
            nameProduct: log.products?.name || "Producto desconocido",
            nameEmployee: log.employees?.name || "Empleado desconocido",
            type: log.type === "addition" ? "Entrada" : "Salida",
            quantity: log.quantityChange,
            date: new Date(log.timestamp).toLocaleDateString(),
          }));
          setStockData(formattedData);
        } catch (error) {
          console.error("Error fetching stock data:", error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchStockData();
    }, []);
  
    if (loading) {
      return <p className="text-center text-gray-500">Cargando movimientos...</p>;
    }
  
    return (
      <div className="flex-1 bg-white p-10">
        <h1 className="text-3xl font-bold mb-6 text-black text-center">
          Control de Stock
        </h1>
        <div className="flex items-center justify-between mb-4">
        <input
          type="text"
          placeholder="Buscar Producto"
          className="border border-gray-300 p-2 rounded w-1/2"
        />
        <button onClick={handleAddStock}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Registrar un movimiento
        </button>
      </div>
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
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <RegisterForm/>
        </Modal>
      )}
        </div>
      </div>
    );
  };
  
  export default StockControl;