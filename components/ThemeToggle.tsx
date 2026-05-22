"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/lib/context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleTheme}
      style={{
        width: 36,
        height: 36,
        borderRadius: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        transition: "all 0.2s"
      }}
      className="border border-gray-200 dark:border-[rgba(255,255,255,0.1)] bg-gray-100 dark:bg-[rgba(255,255,255,0.05)] text-gray-600 dark:text-yellow-300"
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={theme === "dark" ? "sun" : "moon"}
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 90, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}
