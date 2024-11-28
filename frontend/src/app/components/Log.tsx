'use client';
import React, { useEffect, useState } from 'react';
import { getLogs } from '../api/apiStockControl'; // Asegúrate de que esta función exista en tu archivo de API.
import Modal from './Modal';
import RegisterForm from "./registerForm";

interface Log {
  productName: string;
  employeeName: string;
  type: string;
  quantityChange: number;
  comment: string;
  timestamp: string;
}

const LogsTable = () => {
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const logsData = await getLogs();
        setLogs(logsData);
        setError(null);
      } catch (err) {
        console.error('Error fetching logs:', err);
        setError('Failed to fetch logs.');
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);
  

    if (loading) {
        return <p className="text-center text-gray-500">Cargando movimientos...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    const refreshLogs = async () => {
        try {
          const updatedLogs = await getLogs();
          setLogs(updatedLogs);
        } catch (err) {
          console.error('Error refreshing logs:', err);
          setError('Failed to refresh logs.');
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleAddStock = () => {
    setIsModalOpen(true);
    };

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
                <th className="px-4 py-2">Nombre Producto</th>
                <th className="px-4 py-2">Nombre Empleado</th>
                <th className="px-4 py-2">Tipo movimiento</th>
                <th className="px-4 py-2">Cantidad Cambiada</th>
                <th className="px-4 py-2">Comentario</th>
                <th className="px-4 py-2">Fecha y hora</th>
            </tr>
            </thead>
            <tbody>
            {logs.map((log, index) => (
                <tr key={index} className="text-center border-b hover:bg-gray-100">
                    <td className='px-4 py-2'>{log.productName}</td>
                    <td className='px-4 py-2'>{log.employeeName}</td>
                    <td className='px-4 py-2'>{log.type}</td>
                    <td className='px-4 py-2'>{log.quantityChange}</td>
                    <td className='px-4 py-2'>{log.comment}</td>
                    <td className='px-4 py-2'>{new Date(log.timestamp).toLocaleString()}</td>
                </tr>
            ))}
            </tbody>
        </table>
        {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <RegisterForm onClose={closeModal} refreshLogs={refreshLogs}/>
        </Modal>
            )}
        </div>
    </div>
  );
};

export default LogsTable;
