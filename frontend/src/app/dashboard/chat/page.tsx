;"use client";

import Chat from "../../components/Chat";

const ChatPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full h-full">
        <Chat />
      </div>
    </div>
  );
};

export default ChatPage;