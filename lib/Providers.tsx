"use client";

import { ThemeProvider } from "./context/ThemeContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import { ToastProvider } from "./context/ToastContext";
import ToastContainer from "@/components/ToastContainer";
import { useToast } from "./context/ToastContext";

function ToastContainerWrapper() {
  const { toasts, removeToast } = useToast();
  return <ToastContainer toasts={toasts} onRemove={removeToast} />;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <FavoritesProvider>
        <ToastProvider>
          {children}
          <ToastContainerWrapper />
        </ToastProvider>
      </FavoritesProvider>
    </ThemeProvider>
  );
}
