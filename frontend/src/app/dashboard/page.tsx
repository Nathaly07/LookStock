"use client";

import React, { useEffect } from "react";
import { useAuth } from "../../context/authContext";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  // Datos de prueba
  const inventoryData = [
    { id: 1, name: "Camisa", category: "Ropa", quantity: 25, price: "$15" },
    { id: 2, name: "Pantalón", category: "Ropa", quantity: 30, price: "$25" },
    { id: 3, name: "Zapatos", category: "Calzado", quantity: 15, price: "$45" },
    { id: 4, name: "Sombrero", category: "Accesorios", quantity: 10, price: "$20" },
  ];

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Dashboard - Inventario</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Cantidad</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          {inventoryData.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>{item.quantity}</td>
              <td>{item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
