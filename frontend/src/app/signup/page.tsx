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
    <div className="flex flex-col items-center justify-center min-h-screen font-montserrat">
    <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <div className="text-blue-600 flex items-center justify-center">
          <img
            src="../lookStock-icon.png"
            alt="LookStock"
            width={80}
            height={80}
          />
        </div>
      <div className="text-center mb-1 mt-3 flex justify-center">
        <h1 className="text-2xl font-bold">Comenzar con </h1>
        <h1 className="text-2xl font-bold text-blue-500 px-1"> LookStock</h1>
      </div>
      <div className="text-center mb-5 text-lg text-gray-600">
        <h2>Crea una nueva cuenta</h2>
      </div>
      <form onSubmit={handleSignUp} className="flex flex-col space-y-3">
      <input
        type="text"
        placeholder="Nombre"
        value={name}
        onChange={(e) => {
          const onlyLetters = e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
          setName(onlyLetters);
        }}
        className="p-2 border rounded"
        required
      />


        <input
          type="text"
          placeholder="Teléfono"
          value={phone}
          onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
          className="p-2 border rounded"
          required
          pattern="\d{1,10}"
        />
        <input
          type="text"
          placeholder="Rol"
          value={role}
          onChange={(e) => {
            // Filtra solo letras y espacios
            const onlyLetters = e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
            setRole(onlyLetters);
          }}
          className="p-2 border rounded"
          required
        />
        <input
          type="email"
          placeholder="Correo Electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Registrarse
        </button>
        <p className="text-sm text-center">
          ¿Ya tienes una cuenta?{" "}
          <span
            onClick={() => router.push("/login")}
            className="text-blue-500 hover:underline cursor-pointer"
          >
            Inicia Sesión
          </span>
        </p>
      </form>
    </div>
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
