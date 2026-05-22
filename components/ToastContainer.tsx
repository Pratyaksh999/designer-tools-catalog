"use client";

import { AnimatePresence } from "framer-motion";
import Toast, { ToastProps } from "./Toast";

interface ToastContainerProps {
  toasts: ToastProps[];
  onRemove: (id: string) => void;
}

export default function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  return (
    <div
      style={{
        position: "fixed",
        top: 80,
        right: 20,
        zIndex: 9999,
        pointerEvents: "none",
      }}
    >
      <AnimatePresence>
        {toasts.map((toast) => (
          <div key={toast.id} style={{ pointerEvents: "auto" }}>
            <Toast {...toast} onClose={() => onRemove(toast.id)} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}
