"use client";

import { useState } from "react";
import { auth } from "../firebaseConfig.cjs";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Autenticación con Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Obtener el token de Firebase
      const token = await user.getIdToken();

      // Validación del empleado en el backend
      const response = await fetch("http://localhost:4000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      if (response.ok) {
        const { employee } = await response.json();

        // Guardar token y datos del empleado en localStorage
        localStorage.setItem("firebaseToken", token);
        localStorage.setItem("employee", JSON.stringify(employee));

        console.log("Empleado autenticado:", employee);

        // Redirigir al dashboard o página correspondiente
        router.push("/dashboard");
      } else {
        // Manejo de errores del backend
        const errorData = await response.json();
        setError(errorData.message || "Error al validar usuario");
      }
    } catch (err: any) {
      // Manejo de errores de Firebase o red
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md">
        <h1 className="text-2xl mb-4">Iniciar Sesión</h1>
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
          Iniciar Sesión
        </button>
        <p className="text-sm">
          ¿No tienes una cuenta?{" "}
          <span
            onClick={() => router.push("/signup")}
            className="text-blue-500 hover:underline cursor-pointer"
          >
            Regístrate
          </span>
        </p>
        <p className="text-sm mt-2">
          ¿Olvidaste tu contraseña?{" "}
          <span
            onClick={() => router.push("/reset-password")}
            className="text-blue-500 hover:underline cursor-pointer"
          >
            Restablecer Contraseña
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
