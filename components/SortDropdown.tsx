"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpDown, Check } from "lucide-react";

export type SortOption = "newest" | "alphabetical" | "popular" | "most-favorited";

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "newest", label: "Newest First" },
  { value: "alphabetical", label: "A-Z" },
  { value: "popular", label: "Most Popular" },
  { value: "most-favorited", label: "Most Favorited" },
];

export default function SortDropdown({ value, onChange }: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = sortOptions.find((opt) => opt.value === value);

  return (
    <div ref={dropdownRef} style={{ position: "relative" }}>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "8px 16px",
          borderRadius: 10,
          fontSize: 14,
          fontWeight: 600,
          background: "rgba(0,0,0,0.05)",
          border: "1px solid rgba(0,0,0,0.1)",
          cursor: "none",
          transition: "all 0.2s",
        }}
        className="text-gray-700 dark:text-gray-300 dark:bg-[rgba(255,255,255,0.05)] dark:border-[rgba(255,255,255,0.1)] hover:bg-[rgba(0,0,0,0.08)] dark:hover:bg-[rgba(255,255,255,0.08)]"
      >
        <ArrowUpDown size={16} style={{ transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.3s" }} />
        <span className="hidden sm:inline">{selectedOption?.label}</span>
        <span className="sm:hidden">Sort</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "absolute",
              top: "calc(100% + 8px)",
              right: 0,
              minWidth: 200,
              background: "white",
              borderRadius: 12,
              padding: 8,
              boxShadow: "0 12px 32px rgba(0,0,0,0.15)",
              border: "1px solid rgba(0,0,0,0.1)",
              zIndex: 50,
            }}
            className="dark:bg-[#0f1923] dark:border-[rgba(255,255,255,0.1)]"
          >
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px 12px",
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: value === option.value ? 600 : 500,
                  background: "transparent",
                  border: "none",
                  cursor: "none",
                  textAlign: "left",
                  transition: "all 0.2s",
                }}
                className="text-gray-700 dark:text-gray-300 hover:bg-[rgba(0,0,0,0.05)] dark:hover:bg-[rgba(255,255,255,0.05)]"
              >
                {option.label}
                {value === option.value && <Check size={16} color="#f97316" strokeWidth={3} />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
