"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Trophy } from "lucide-react";
import { Badge } from "@/lib/gamification";

interface BadgeUnlockNotificationProps {
  badge: Badge | null;
  onClose: () => void;
}

export default function BadgeUnlockNotification({ badge, onClose }: BadgeUnlockNotificationProps) {
  if (!badge) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.5, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.5, y: 50 }}
        transition={{ type: "spring", damping: 15, stiffness: 300 }}
        style={{
          position: "fixed",
          bottom: 100,
          left: "50%",
          transform: "translateX(-50%)",
          background: "white",
          borderRadius: 20,
          padding: "24px 32px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.3), 0 0 0 1px rgba(249,115,22,0.2)",
          zIndex: 9999,
          minWidth: 320,
          textAlign: "center",
        }}
        className="dark:bg-[#0f1923]"
      >
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: "spring", damping: 10 }}
          style={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 16px",
            boxShadow: "0 8px 24px rgba(249,115,22,0.4)",
          }}
        >
          <span style={{ fontSize: 32 }}>{badge.icon}</span>
        </motion.div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 8 }}>
          <Trophy size={16} color="#f97316" />
          <span style={{ fontSize: 12, fontWeight: 700, color: "#f97316", textTransform: "uppercase", letterSpacing: "0.5px" }}>
            Badge Unlocked!
          </span>
        </div>

        <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 6 }} className="text-gray-900 dark:text-white">
          {badge.name}
        </h3>

        <p style={{ fontSize: 14, marginBottom: 20 }} className="text-gray-600 dark:text-gray-400">
          {badge.description}
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
          style={{
            padding: "10px 24px",
            borderRadius: 10,
            fontSize: 14,
            fontWeight: 600,
            background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
            color: "white",
            border: "none",
            cursor: "none",
            boxShadow: "0 4px 12px rgba(249,115,22,0.3)",
          }}
        >
          Awesome!
        </motion.button>
      </motion.div>
    </AnimatePresence>
  );
}
