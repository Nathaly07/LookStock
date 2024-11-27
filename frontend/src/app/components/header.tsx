"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname(); // Obtén la ruta actual

  const handleLogout = () => {
    // Eliminar el token del localStorage
    localStorage.removeItem("firebaseToken");

    // Redirigir al usuario al login
    router.push("/login");
  };

  return (
    <header className="p-3 bg-white shadow-md">
      <div className="justify-between flex items-center">
        <div className="text-blue-600 font-nico text-[24px] flex items-center">
          <img
            src="../lookStock-icon.png"
            alt="LookStock"
            width={63}
            height={63}
          />
          <span className="ml-4">LookStock</span>
        </div>
        {/* Ocultar el botón si la ruta es /login o /signup */}
        {pathname !== "/login" && pathname !== "/signup" && (
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg bg-white hover:bg-blue-600 hover:text-white transition-all"
          >
            Cerrar Sesión
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
