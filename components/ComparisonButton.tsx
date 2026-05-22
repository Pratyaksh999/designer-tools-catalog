"use client";

import { motion, AnimatePresence } from "framer-motion";
import { GitCompare } from "lucide-react";

interface ComparisonButtonProps {
  count: number;
  onClick: () => void;
}

export default function ComparisonButton({ count, onClick }: ComparisonButtonProps) {
  if (count === 0) return null;

  return (
    <AnimatePresence>
      <motion.button
        initial={{ opacity: 0, scale: 0.5, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.5, y: 20 }}
        whileHover={{ scale: 1.1, y: -5 }}
        whileTap={{ scale: 0.9 }}
        onClick={onClick}
        style={{
          position: "fixed",
          bottom: 100,
          right: 30,
          width: 60,
          height: 60,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
          border: "none",
          cursor: "none",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          boxShadow: "0 8px 24px rgba(139,92,246,0.4)",
          zIndex: 40,
        }}
        title="Compare tools"
      >
        <GitCompare size={24} color="white" strokeWidth={2.5} />
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: "white",
          }}
        >
          {count}
        </motion.span>
      </motion.button>
    </AnimatePresence>
  );
}
