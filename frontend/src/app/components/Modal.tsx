// components/Modal.tsx
import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-700 bg-opacity-50 z-50">
      <div className="p-6 w-1/3">
        {/* <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 text-xl"
        >
          X
        </button> */}
        {children}
      </div>
    </div>
  );
};

export default Modal;
