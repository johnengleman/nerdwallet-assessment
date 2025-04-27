"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const modalRoot =
    typeof document !== "undefined"
      ? document.getElementById("modal-root")
      : null;

  if (!modalRoot) return null;

  return createPortal(
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/25"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white border-2 border-gray-200 rounded shadow-lg"
      >
        {children}
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;
