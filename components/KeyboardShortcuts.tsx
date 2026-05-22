"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Keyboard, X } from "lucide-react";

interface KeyboardShortcutsProps {
  onFocusSearch: () => void;
  onClearFilters: () => void;
}

export default function KeyboardShortcuts({ onFocusSearch, onClearFilters }: KeyboardShortcutsProps) {
  const [showHints, setShowHints] = useState(false);
  const [hasSeenHints, setHasSeenHints] = useState(false);

  useEffect(() => {
    // Show hints on first visit
    const seen = localStorage.getItem("keyboardHintsSeen");
    if (!seen) {
      setTimeout(() => setShowHints(true), 2000);
    } else {
      setHasSeenHints(true);
    }

    // Keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // "/" to focus search
      if (e.key === "/" && !["INPUT", "TEXTAREA"].includes((e.target as HTMLElement).tagName)) {
        e.preventDefault();
        onFocusSearch();
      }

      // "Escape" to clear filters
      if (e.key === "Escape") {
        onClearFilters();
      }

      // "?" to show shortcuts
      if (e.key === "?" && !["INPUT", "TEXTAREA"].includes((e.target as HTMLElement).tagName)) {
        e.preventDefault();
        setShowHints(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onFocusSearch, onClearFilters]);

  const handleClose = () => {
    setShowHints(false);
    setHasSeenHints(true);
    localStorage.setItem("keyboardHintsSeen", "true");
  };

  const shortcuts = [
    { key: "/", description: "Focus search" },
    { key: "Esc", description: "Clear all filters" },
    { key: "?", description: "Show keyboard shortcuts" },
  ];

  return (
    <>
      {/* Toggle button */}
      {hasSeenHints && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowHints(true)}
          style={{
            position: "fixed",
            bottom: 30,
            left: 30,
            width: 50,
            height: 50,
            borderRadius: "50%",
            background: "rgba(0,0,0,0.05)",
            border: "1px solid rgba(0,0,0,0.1)",
            cursor: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 40,
            transition: "all 0.2s",
          }}
          className="dark:bg-[rgba(255,255,255,0.05)] dark:border-[rgba(255,255,255,0.1)] hover:bg-[rgba(249,115,22,0.1)] dark:hover:bg-[rgba(249,115,22,0.1)]"
          title="Keyboard shortcuts (?)"
        >
          <Keyboard size={20} className="text-gray-600 dark:text-gray-400" />
        </motion.button>
      )}

      {/* Hints modal */}
      <AnimatePresence>
        {showHints && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.5)",
                backdropFilter: "blur(4px)",
                zIndex: 100,
              }}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                background: "white",
                borderRadius: 20,
                padding: 32,
                maxWidth: 400,
                width: "90%",
                boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
                zIndex: 101,
              }}
              className="dark:bg-[#0f1923]"
            >
              <button
                onClick={handleClose}
                style={{
                  position: "absolute",
                  top: 16,
                  right: 16,
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: "rgba(0,0,0,0.05)",
                  border: "none",
                  cursor: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s",
                }}
                className="dark:bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(0,0,0,0.1)] dark:hover:bg-[rgba(255,255,255,0.1)]"
              >
                <X size={16} className="text-gray-600 dark:text-gray-400" />
              </button>

              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Keyboard size={24} color="white" />
                </div>
                <div>
                  <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }} className="text-gray-900 dark:text-white">
                    Keyboard Shortcuts
                  </h3>
                  <p style={{ fontSize: 13 }} className="text-gray-500 dark:text-gray-400">
                    Navigate faster with keyboard
                  </p>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {shortcuts.map((shortcut, index) => (
                  <motion.div
                    key={shortcut.key}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "12px 16px",
                      borderRadius: 10,
                      background: "rgba(0,0,0,0.03)",
                    }}
                    className="dark:bg-[rgba(255,255,255,0.03)]"
                  >
                    <span style={{ fontSize: 14, fontWeight: 500 }} className="text-gray-700 dark:text-gray-300">
                      {shortcut.description}
                    </span>
                    <kbd
                      style={{
                        padding: "4px 10px",
                        borderRadius: 6,
                        fontSize: 13,
                        fontWeight: 700,
                        fontFamily: "monospace",
                        background: "rgba(0,0,0,0.08)",
                        border: "1px solid rgba(0,0,0,0.1)",
                      }}
                      className="text-gray-700 dark:text-gray-300 dark:bg-[rgba(255,255,255,0.08)] dark:border-[rgba(255,255,255,0.1)]"
                    >
                      {shortcut.key}
                    </kbd>
                  </motion.div>
                ))}
              </div>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                onClick={handleClose}
                style={{
                  marginTop: 24,
                  width: "100%",
                  padding: "12px",
                  borderRadius: 10,
                  fontSize: 14,
                  fontWeight: 600,
                  background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
                  color: "white",
                  border: "none",
                  cursor: "none",
                  transition: "all 0.2s",
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Got it!
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
