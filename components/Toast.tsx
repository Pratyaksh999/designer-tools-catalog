"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, Info, AlertCircle, X } from "lucide-react";
import { useEffect } from "react";

export interface ToastProps {
  id: string;
  type: "success" | "error" | "info" | "warning";
  message: string;
  onClose: () => void;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const toastConfig = {
  success: {
    icon: CheckCircle,
    gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    bg: "rgba(16, 185, 129, 0.1)",
    border: "rgba(16, 185, 129, 0.3)",
  },
  error: {
    icon: XCircle,
    gradient: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
    bg: "rgba(239, 68, 68, 0.1)",
    border: "rgba(239, 68, 68, 0.3)",
  },
  info: {
    icon: Info,
    gradient: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
    bg: "rgba(59, 130, 246, 0.1)",
    border: "rgba(59, 130, 246, 0.3)",
  },
  warning: {
    icon: AlertCircle,
    gradient: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
    bg: "rgba(245, 158, 11, 0.1)",
    border: "rgba(245, 158, 11, 0.3)",
  },
};

export default function Toast({ id, type, message, onClose, duration = 3000, action }: ToastProps) {
  const config = toastConfig[type];
  const Icon = config.icon;

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, x: 100 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      style={{
        minWidth: 300,
        maxWidth: 400,
        padding: "16px 20px",
        borderRadius: 12,
        background: "white",
        border: `1px solid ${config.border}`,
        boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
        display: "flex",
        alignItems: "center",
        gap: 12,
        marginBottom: 12,
      }}
      className="dark:bg-[#0f1923]"
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          background: config.bg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Icon size={20} style={{ background: config.gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }} />
      </div>

      <div style={{ flex: 1 }}>
        <p style={{ fontSize: 14, fontWeight: 600, margin: 0 }} className="text-gray-900 dark:text-white">
          {message}
        </p>
        {action && (
          <button
            onClick={() => {
              action.onClick();
              onClose();
            }}
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: "#f97316",
              background: "none",
              border: "none",
              padding: 0,
              marginTop: 4,
              cursor: "none",
              textDecoration: "underline",
            }}
          >
            {action.label}
          </button>
        )}
      </div>

      <button
        onClick={onClose}
        style={{
          width: 24,
          height: 24,
          borderRadius: "50%",
          background: "rgba(0,0,0,0.05)",
          border: "none",
          cursor: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          transition: "all 0.2s",
        }}
        className="dark:bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(0,0,0,0.1)] dark:hover:bg-[rgba(255,255,255,0.1)]"
      >
        <X size={12} className="text-gray-600 dark:text-gray-400" />
      </button>
    </motion.div>
  );
}
