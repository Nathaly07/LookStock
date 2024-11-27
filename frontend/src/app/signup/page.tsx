"use client";

import { useState } from "react";
import { auth } from "../firebaseConfig.cjs";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false); // Estado para el modal
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Crear usuario con Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();

      // Registrar usuario en el backend
      const response = await fetch("http://localhost:4000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token, // Token de autenticación
          name,
          phone,
          role,
        }),
      });

      if (response.ok) {
        setShowModal(true); // Mostrar el modal
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Error en el registro");
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    router.push("/login"); // Redirigir al login tras cerrar el modal
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form onSubmit={handleSignUp} className="bg-white p-6 rounded shadow-md">
        <h1 className="text-2xl mb-4">Comenzar con LookStock</h1>
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-2 p-2 border rounded w-full"
        />
        <input
          type="text"
          placeholder="Teléfono"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="mb-2 p-2 border rounded w-full"
        />
        <input
          type="text"
          placeholder="Rol"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="mb-2 p-2 border rounded w-full"
        />
        <input
          type="email"
          placeholder="Correo Electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-2 p-2 border rounded w-full"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-2 p-2 border rounded w-full"
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded w-full mb-4"
        >
          Registrarse
        </button>
        <p className="text-sm">
          ¿Ya tienes una cuenta?{" "}
          <span
            onClick={() => router.push("/login")}
            className="text-blue-500 hover:underline cursor-pointer"
          >
            Inicia Sesión
          </span>
        </p>
      </form>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-md max-w-sm text-center">
            <h2 className="text-xl font-bold mb-4">¡Registro exitoso!</h2>
            <p className="mb-4">Tu cuenta ha sido creada con éxito. Puedes iniciar sesión ahora.</p>
            <button
              onClick={closeModal}
              className="bg-blue-500 text-white p-2 rounded w-full"
            >
              Ir al login
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUp;
