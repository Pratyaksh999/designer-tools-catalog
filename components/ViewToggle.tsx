"use client";

import { motion } from "framer-motion";
import { Grid3x3, LayoutGrid, List } from "lucide-react";

interface ViewToggleProps {
  view: "comfortable" | "compact" | "list";
  onViewChange: (view: "comfortable" | "compact" | "list") => void;
}

export default function ViewToggle({ view, onViewChange }: ViewToggleProps) {
  const views = [
    { value: "comfortable", icon: LayoutGrid, label: "Comfortable" },
    { value: "compact", icon: Grid3x3, label: "Compact" },
    { value: "list", icon: List, label: "List" },
  ] as const;

  return (
    <div
      style={{
        display: "inline-flex",
        background: "rgba(0,0,0,0.05)",
        borderRadius: 10,
        padding: 3,
        gap: 3,
      }}
      className="dark:bg-[rgba(255,255,255,0.05)]"
    >
      {views.map(({ value, icon: Icon, label }) => {
        const isActive = view === value;
        return (
          <motion.button
            key={value}
            onClick={() => onViewChange(value)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              position: "relative",
              padding: "8px 12px",
              borderRadius: 7,
              fontSize: 13,
              fontWeight: 600,
              whiteSpace: "nowrap",
              transition: "all 0.2s",
              background: isActive ? "#f97316" : "transparent",
              border: "none",
              cursor: "none",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
            className={isActive ? "text-white" : "text-gray-600 dark:text-gray-400"}
            title={label}
          >
            <Icon size={16} />
            <span className="hidden sm:inline">{label}</span>
          </motion.button>
        );
      })}
    </div>
  );
}
