"use client";

import { useState } from "react";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, text: "Hola, ¿cómo estás?", sender: "usuario2", time: "10:00 AM" },
    { id: 2, text: "¡Hola! Estoy bien, gracias. ¿Y tú?", sender: "usuario1", time: "10:01 AM" },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: message,
        sender: "usuario1",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([...messages, newMessage]);
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto p-4 border rounded-lg bg-gray-100">
      <h2 className="text-xl font-bold mb-4">Chat</h2>
      <div className="flex-1 overflow-y-scroll mb-4 p-2 border rounded-lg bg-white">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-2 my-2 rounded-lg ${
              msg.sender === "usuario1" ? "bg-[#5570F1] text-white text-right" : "bg-transparent text-left border border-gray-300"
            }`}
          >
            <p className="font-bold">{msg.sender}</p>
            <p>{msg.text}</p>
            <p className="text-xs text-gray-500">{msg.time}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Escribe un mensaje..."
          className="flex-1 p-2 border rounded-l-lg"
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded-r-lg">
          Enviar
        </button>
      </form>
    </div>
  );
};

export default Chat;