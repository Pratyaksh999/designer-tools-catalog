"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Share2, Tag } from "lucide-react";
import { type Tool } from "@/types";
import FavoritesButton from "./FavoritesButton";
import { useEffect } from "react";

interface ToolPreviewModalProps {
  tool: Tool | null;
  isOpen: boolean;
  onClose: () => void;
  onTagClick: (tag: string) => void;
  similarTools?: Tool[];
}

const categoryColors: Record<string, string> = {
  Animation: "#f97316",
  "Micro-interactions": "#fb923c",
  Components: "#ea580c",
  Documentation: "#f97316",
  "Design-to-Code": "#fb923c",
  Inspiration: "#ea580c"
};

export default function ToolPreviewModal({ tool, isOpen, onClose, onTagClick, similarTools = [] }: ToolPreviewModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
      return () => window.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen, onClose]);

  if (!tool) return null;

  const color = categoryColors[tool.category] || "#f97316";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.6)",
              backdropFilter: "blur(8px)",
              zIndex: 200,
            }}
          />

          {/* Modal */}
          <div
            style={{
              position: "fixed",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 201,
              padding: 20,
              overflowY: "auto",
            }}
            onClick={onClose}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: 700,
                width: "100%",
                maxHeight: "90vh",
                borderRadius: 24,
                overflow: "hidden",
                boxShadow: "0 24px 64px rgba(0,0,0,0.3)",
                position: "relative",
              }}
              className="bg-white dark:bg-[#0f1923]"
            >
              {/* Header gradient */}
              <div
                style={{
                  height: 4,
                  background: `linear-gradient(90deg, ${color}, transparent)`,
                }}
              />

              {/* Close button */}
              <button
                onClick={onClose}
                style={{
                  position: "absolute",
                  top: 20,
                  right: 20,
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: "rgba(0,0,0,0.05)",
                  border: "none",
                  cursor: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 10,
                  transition: "all 0.2s",
                }}
                className="dark:bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(0,0,0,0.1)] dark:hover:bg-[rgba(255,255,255,0.1)]"
              >
                <X size={20} className="text-gray-600 dark:text-gray-400" />
              </button>

              {/* Content */}
              <div style={{ padding: "32px", overflowY: "auto", maxHeight: "calc(90vh - 4px)" }}>
                {/* Icon + Title */}
                <div style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 24 }}>
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: 16,
                      background: `${color}15`,
                      border: `2px solid ${color}25`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 32,
                      flexShrink: 0,
                    }}
                  >
                    {tool.featured ? "⭐" : "🔧"}
                  </div>

                  <div style={{ flex: 1 }}>
                    <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }} className="text-gray-900 dark:text-white">
                      {tool.name}
                    </h2>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: color }}>{tool.category}</span>
                      {tool.pricing && (
                        <span
                          style={{
                            padding: "2px 8px",
                            borderRadius: 6,
                            fontSize: 11,
                            fontWeight: 700,
                            background: tool.pricing === "free" ? "#10b98115" : "#f9731615",
                            color: tool.pricing === "free" ? "#10b981" : "#f97316",
                            textTransform: "uppercase",
                          }}
                        >
                          {tool.pricing}
                        </span>
                      )}
                    </div>
                  </div>

                  <div style={{ flexShrink: 0 }}>
                    <FavoritesButton toolId={tool.id} size="large" />
                  </div>
                </div>

                {/* Description */}
                <p style={{ fontSize: 16, lineHeight: 1.7, marginBottom: 24 }} className="text-gray-700 dark:text-gray-300">
                  {tool.description}
                </p>

                {/* Tags */}
                <div style={{ marginBottom: 24 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                    <Tag size={16} className="text-gray-400" />
                    <span style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px" }} className="text-gray-500">
                      Tags
                    </span>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {tool.tags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => {
                          onTagClick(tag);
                          onClose();
                        }}
                        style={{
                          padding: "6px 12px",
                          borderRadius: 8,
                          fontSize: 13,
                          fontWeight: 600,
                          background: "#64748b",
                          color: "#f1f5f9",
                          border: "1px solid #475569",
                          cursor: "none",
                          transition: "all 0.2s",
                        }}
                        className="dark:bg-[#1e293b] dark:text-gray-300 dark:border-[#334155] hover:bg-[#f97316] hover:border-[#f97316] dark:hover:bg-[#f97316]"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Similar Tools */}
                {similarTools.length > 0 && (
                  <div style={{ marginBottom: 24 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }} className="text-gray-900 dark:text-white">
                      Similar Tools
                    </h3>
                    <div style={{ display: "grid", gap: 12 }}>
                      {similarTools.slice(0, 3).map((similar) => (
                        <div
                          key={similar.id}
                          style={{
                            padding: 12,
                            borderRadius: 12,
                            border: "1px solid",
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                          }}
                          className="bg-gray-50 border-gray-200 dark:bg-[rgba(255,255,255,0.02)] dark:border-[rgba(255,255,255,0.05)]"
                        >
                          <div
                            style={{
                              width: 40,
                              height: 40,
                              borderRadius: 10,
                              background: `${categoryColors[similar.category] || "#f97316"}15`,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: 18,
                            }}
                          >
                            🔧
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }} className="text-gray-900 dark:text-white">
                              {similar.name}
                            </div>
                            <div style={{ fontSize: 12 }} className="text-gray-600 dark:text-gray-400">
                              {similar.category}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div style={{ display: "flex", gap: 12, paddingTop: 24, borderTop: "1px solid" }} className="border-gray-200 dark:border-[rgba(255,255,255,0.08)]">
                  <motion.a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      flex: 1,
                      padding: "14px 24px",
                      borderRadius: 12,
                      fontSize: 15,
                      fontWeight: 700,
                      background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
                      color: "white",
                      border: "none",
                      cursor: "none",
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                      boxShadow: "0 4px 12px rgba(249,115,22,0.3)",
                    }}
                  >
                    Visit Tool
                    <ExternalLink size={18} />
                  </motion.a>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={async () => {
                      if (navigator.share) {
                        await navigator.share({ title: tool.name, url: tool.url });
                      } else {
                        await navigator.clipboard.writeText(tool.url);
                      }
                    }}
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 12,
                      background: "rgba(0,0,0,0.05)",
                      border: "none",
                      cursor: "none",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    className="dark:bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(0,0,0,0.08)] dark:hover:bg-[rgba(255,255,255,0.08)]"
                  >
                    <Share2 size={18} className="text-gray-600 dark:text-gray-400" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
