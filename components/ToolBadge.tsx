"use client";

import { motion } from "framer-motion";
import { Flame, Sparkles, Star } from "lucide-react";

interface ToolBadgeProps {
  type: "popular" | "new" | "featured";
}

const badgeConfig = {
  popular: {
    icon: Flame,
    label: "Popular",
    gradient: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
    shadow: "0 2px 8px rgba(249,115,22,0.4)",
  },
  new: {
    icon: Sparkles,
    label: "New",
    gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    shadow: "0 2px 8px rgba(16,185,129,0.4)",
  },
  featured: {
    icon: Star,
    label: "Featured",
    gradient: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
    shadow: "0 2px 8px rgba(139,92,246,0.4)",
  },
};

export default function ToolBadge({ type }: ToolBadgeProps) {
  const config = badgeConfig[type];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: -5 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        padding: "4px 8px",
        borderRadius: 6,
        fontSize: 11,
        fontWeight: 700,
        color: "white",
        background: config.gradient,
        boxShadow: config.shadow,
        textTransform: "uppercase",
        letterSpacing: "0.3px",
      }}
    >
      <Icon size={12} />
      {config.label}
    </motion.div>
  );
}
