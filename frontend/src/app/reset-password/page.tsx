"use client";

import { useState } from "react";
import { auth } from "../firebaseConfig.cjs";
import { sendPasswordResetEmail } from "firebase/auth";
import { useRouter } from "next/navigation";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Se ha enviado un enlace para restablecer tu contraseña.");
      setError("");
    } catch (err: any) {
      setError(err.message);
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form onSubmit={handleResetPassword} className="bg-white p-6 rounded shadow-md">
        <h1 className="text-2xl mb-4">Restablecer Contraseña</h1>
        <input
          type="email"
          placeholder="Correo Electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-2 p-2 border rounded w-full"
        />
        {message && <p className="text-green-500 mb-2">{message}</p>}
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded w-full mb-4"
        >
          Restablecer Contraseña
        </button>
        <p className="text-sm">
          ¿Ya tienes una cuenta?{" "}
          <span
            onClick={() => router.push("/login")}
            className="text-blue-500 hover:underline cursor-pointer"
          >
            Iniciar Sesión
          </span>
        </p>
      </form>
    </div>
  );
};

export default ResetPassword;
