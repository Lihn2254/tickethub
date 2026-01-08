// components/Modal.tsx
import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    // Semi-transparent background
    <div
      className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4"
      onClick={onClose} // Clicking the background closes the modal
    >
      {/* Modal window */}
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-md relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">
            {title || "Details"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 transition-colors text-4xl font-bold leading-none"
          >
            &times;
          </button>
        </div>

        {/* Content Body */}
        <div className="flex p-4 w-full h-fit justify-center">{children}</div>
      </div>
    </div>
  );
}
