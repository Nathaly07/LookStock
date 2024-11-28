'use client';
import React, { useState, useEffect } from "react";
import { getAllProducts } from '../api/apiProducts';
import { createLog } from '../api/apiStockControl';
import { useAuth } from '../../context/authContext';

interface AddLogsProps {
  onClose: () => void;
  refreshLogs: () => void;
}

interface Product {
  id: string;
  name: string;
  stock: number; // Asegúrate de que esta propiedad exista en los datos del producto
}

const RegisterForm = ({ onClose, refreshLogs }: AddLogsProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState({
    productId: "",
    type: "",
    quantityChange: 0,
    comment: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Obtener el usuario logueado desde el contexto de autenticación
  const { user } = useAuth();

  // Datos del usuario logueado
  const [employeeId, setEmployeeId] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productList = await getAllProducts();
        setProducts(productList);

        if (user) {
          setEmployeeId(user.uid);
        }
      } catch (error) {
        console.error("Error al cargar productos o usuario:", error);
      }
    };

    fetchProducts();
  }, [user]);

  // Manejar cambios en los campos del formulario
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Validar cantidad si se está modificando el campo quantityChange
    if (name === "quantityChange" && form.productId) {
      const selectedProduct = products.find((p) => p.id === form.productId);
      if (selectedProduct && Number(value) > selectedProduct.stock) {
        setError(`La cantidad no puede exceder ${selectedProduct.stock}`);
      } else {
        setError(null);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!employeeId) {
      console.error("Empleado no encontrado.");
      return;
    }

    const selectedProduct = products.find((p) => p.id === form.productId);
    if (selectedProduct && form.quantityChange > selectedProduct.stock) {
      setError(`La cantidad no puede exceder ${selectedProduct.stock}`);
      setLoading(false);
      return;
    }

    try {
      await createLog({
        productId: form.productId,
        employeeId: employeeId,
        type: form.type,
        quantityChange: Number(form.quantityChange),
        comment: form.comment,
      });

      refreshLogs();
      onClose();
    } catch (error) {
      console.error("Error al registrar el movimiento:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen font-montserrat">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Registrar Movimiento</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="productId" className="block text-gray-700">Nombre del Producto</label>
            <select
              id="productId"
              name="productId"
              value={form.productId}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full rounded mt-2"
              required
            >
              <option value="" disabled>Seleccione un producto</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name} (Stock: {product.stock})
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="type" className="block text-gray-700">Tipo de Movimiento</label>
            <select
              id="type"
              name="type"
              value={form.type}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full rounded mt-2"
              required
            >
              <option value="" disabled>Seleccione el tipo</option>
              <option value="Entrada">Entrada</option>
              <option value="Salida">Salida</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="quantityChange" className="block text-gray-700">Cantidad</label>
            <input
              type="number"
              id="quantityChange"
              name="quantityChange"
              value={form.quantityChange}
              onChange={(e) => {
                const value = Number(e.target.value);
                if (value < 0 || isNaN(value)) {
                  setError("Por favor, ingrese solo números positivos.");
                } else {
                  setError(""); // Limpia el error si la entrada es válida
                  setForm((prev) => ({
                    ...prev,
                    quantityChange: value,
                  }));
                }
              }}
              className="border border-gray-300 p-2 w-full rounded mt-2"
              placeholder="Ejemplo: 10"
              required
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="comment" className="block text-gray-700">Comentario</label>
            <input
              type="text"
              id="comment"
              name="comment"
              value={form.comment}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full rounded mt-2"
              placeholder="Escriba un comentario"
            />
          </div>

          <div className="flex justify-between">
            <button
              type="submit"
              className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition w-full mr-2 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Guardando..." : "Registrar"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg bg-white hover:bg-gray-300 w-full"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
