"use client";

import { useState, useEffect } from "react";
import { io } from "socket.io-client";

interface Message {
  name: string;
  message: string;
  timestamp: string;
}

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const token = typeof window !== "undefined" ? localStorage.getItem("firebaseToken") : "";
  const employee = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("employee") || "{}") : {};

  useEffect(() => {
    if (!token) {
      console.error("Token no encontrado. Por favor inicia sesión.");
      return;
    }

    // Conexión al servidor WebSocket
    const socket = io("http://localhost:4000", {
      query: { token }, // Enviar token como query para autenticación
    });

    // Cargar historial de mensajes al abrir el chat
    socket.on("loadMessages", (data: Message[]) => {
      console.log("Mensajes cargados:", data);
      setMessages(data); // Actualizar el estado con el historial
    });

    // Escuchar nuevos mensajes
    socket.on("receiveMessage", (data: Message) => {
      console.log("Nuevo mensaje recibido:", data);
      setMessages((prev) => [...prev, data]); // Añadir el nuevo mensaje al estado
    });

    return () => {
      socket.disconnect(); // Desconectar el socket al desmontar el componente
    };
  }, [token]);

  const sendMessage = () => {
    if (!message.trim()) return; // Evitar enviar mensajes vacíos

    const socket = io("http://localhost:4000", {
      query: { token },
    });

    // Emitir el mensaje al servidor
    socket.emit("sendMessage", {
      name: employee.name, // Nombre del usuario actual
      message,
      timestamp: new Date().toISOString(), // Fecha actual
    });

    setMessage(""); // Limpiar el campo de entrada
  };

  return (
    <div className="flex flex-col items-center min-h-screen">
      <div className="w-full max-w-lg p-4 bg-white rounded shadow-md">
        <h1 className="text-2xl mb-4">Chat</h1>
        <div className="mb-4 h-64 overflow-y-auto border rounded p-2">
          {messages.map((msg, idx) => (
            <div key={idx} className="mb-2">
              <strong>{msg.name}:</strong> {msg.message}{" "}
              <span className="text-xs text-gray-500">{new Date(msg.timestamp).toLocaleString()}</span>
            </div>
          ))}
        </div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Escribe un mensaje"
          className="mb-2 p-2 border rounded w-full"
        />
        <button onClick={sendMessage} className="bg-blue-500 text-white p-2 rounded w-full">
          Enviar
        </button>
      </div>
    </div>
  );
};

export default Chat;
