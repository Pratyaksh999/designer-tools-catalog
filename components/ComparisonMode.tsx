"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Check, ExternalLink } from "lucide-react";
import { type Tool } from "@/types";
import { useEffect } from "react";

interface ComparisonModeProps {
  tools: Tool[];
  isOpen: boolean;
  onClose: () => void;
  onRemoveTool: (toolId: string) => void;
}

const categoryColors: Record<string, string> = {
  Animation: "#f97316",
  "Micro-interactions": "#fb923c",
  Components: "#ea580c",
  Documentation: "#f97316",
  "Design-to-Code": "#fb923c",
  Inspiration: "#ea580c"
};

export default function ComparisonMode({ tools, isOpen, onClose, onRemoveTool }: ComparisonModeProps) {
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

  if (!tools.length) return null;

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
              background: "rgba(0,0,0,0.7)",
              backdropFilter: "blur(8px)",
              zIndex: 200,
            }}
          />

          {/* Comparison Modal */}
          <div
            style={{
              position: "fixed",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 201,
              padding: 20,
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: 1200,
                width: "100%",
                maxHeight: "90vh",
                background: "white",
                borderRadius: 24,
                overflow: "hidden",
                boxShadow: "0 24px 64px rgba(0,0,0,0.4)",
              }}
              className="dark:bg-[#0f1923]"
            >
              {/* Header */}
              <div
                style={{
                  padding: "24px 32px",
                  borderBottom: "1px solid rgba(0,0,0,0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
                className="dark:border-[rgba(255,255,255,0.08)]"
              >
                <div>
                  <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 4 }} className="text-gray-900 dark:text-white">
                    Compare Tools
                  </h2>
                  <p style={{ fontSize: 14 }} className="text-gray-600 dark:text-gray-400">
                    {tools.length} tools selected
                  </p>
                </div>
                <button
                  onClick={onClose}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: "rgba(0,0,0,0.05)",
                    border: "none",
                    cursor: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  className="dark:bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(0,0,0,0.1)] dark:hover:bg-[rgba(255,255,255,0.1)]"
                >
                  <X size={20} className="text-gray-600 dark:text-gray-400" />
                </button>
              </div>

              {/* Comparison Table */}
              <div style={{ overflowX: "auto", overflowY: "auto", maxHeight: "calc(90vh - 100px)" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead style={{ position: "sticky", top: 0, zIndex: 10 }}>
                    <tr className="bg-gray-50 dark:bg-[#1a1a1a]">
                      <th
                        style={{
                          padding: "16px 24px",
                          textAlign: "left",
                          fontSize: 13,
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                          borderBottom: "2px solid rgba(0,0,0,0.08)",
                          position: "sticky",
                          left: 0,
                          zIndex: 11,
                        }}
                        className="text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-[#1a1a1a] dark:border-[rgba(255,255,255,0.08)]"
                      >
                        Feature
                      </th>
                      {tools.map((tool) => (
                        <th
                          key={tool.id}
                          style={{
                            padding: "16px 24px",
                            textAlign: "center",
                            minWidth: 200,
                            borderBottom: "2px solid rgba(0,0,0,0.08)",
                          }}
                          className="dark:border-[rgba(255,255,255,0.08)]"
                        >
                          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                            <div
                              style={{
                                width: 48,
                                height: 48,
                                borderRadius: 12,
                                background: `${categoryColors[tool.category] || "#f97316"}15`,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: 24,
                              }}
                            >
                              🔧
                            </div>
                            <div style={{ fontSize: 14, fontWeight: 700 }} className="text-gray-900 dark:text-white">
                              {tool.name}
                            </div>
                            <button
                              onClick={() => onRemoveTool(tool.id)}
                              style={{
                                fontSize: 12,
                                fontWeight: 600,
                                color: "#ef4444",
                                background: "none",
                                border: "none",
                                cursor: "none",
                                textDecoration: "underline",
                              }}
                            >
                              Remove
                            </button>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {/* Category */}
                    <tr className="border-b border-gray-200 dark:border-[rgba(255,255,255,0.08)]">
                      <td
                        style={{
                          padding: "16px 24px",
                          fontSize: 14,
                          fontWeight: 600,
                          position: "sticky",
                          left: 0,
                          zIndex: 1,
                        }}
                        className="text-gray-900 dark:text-white bg-white dark:bg-[#0f1923]"
                      >
                        Category
                      </td>
                      {tools.map((tool) => (
                        <td key={tool.id} style={{ padding: "16px 24px", textAlign: "center" }}>
                          <span
                            style={{
                              padding: "4px 12px",
                              borderRadius: 8,
                              fontSize: 12,
                              fontWeight: 700,
                              background: `${categoryColors[tool.category] || "#f97316"}15`,
                              color: categoryColors[tool.category] || "#f97316",
                            }}
                          >
                            {tool.category}
                          </span>
                        </td>
                      ))}
                    </tr>

                    {/* Description */}
                    <tr className="border-b border-gray-200 dark:border-[rgba(255,255,255,0.08)]">
                      <td
                        style={{
                          padding: "16px 24px",
                          fontSize: 14,
                          fontWeight: 600,
                          position: "sticky",
                          left: 0,
                          zIndex: 1,
                        }}
                        className="text-gray-900 dark:text-white bg-white dark:bg-[#0f1923]"
                      >
                        Description
                      </td>
                      {tools.map((tool) => (
                        <td key={tool.id} style={{ padding: "16px 24px" }}>
                          <p style={{ fontSize: 13, lineHeight: 1.6 }} className="text-gray-700 dark:text-gray-300">
                            {tool.description}
                          </p>
                        </td>
                      ))}
                    </tr>

                    {/* Pricing */}
                    <tr className="border-b border-gray-200 dark:border-[rgba(255,255,255,0.08)]">
                      <td
                        style={{
                          padding: "16px 24px",
                          fontSize: 14,
                          fontWeight: 600,
                          position: "sticky",
                          left: 0,
                          zIndex: 1,
                        }}
                        className="text-gray-900 dark:text-white bg-white dark:bg-[#0f1923]"
                      >
                        Pricing
                      </td>
                      {tools.map((tool) => (
                        <td key={tool.id} style={{ padding: "16px 24px", textAlign: "center" }}>
                          <span
                            style={{
                              padding: "4px 12px",
                              borderRadius: 8,
                              fontSize: 12,
                              fontWeight: 700,
                              background: tool.pricing === "free" ? "#10b98115" : "#f9731615",
                              color: tool.pricing === "free" ? "#10b981" : "#f97316",
                              textTransform: "uppercase",
                            }}
                          >
                            {tool.pricing || "N/A"}
                          </span>
                        </td>
                      ))}
                    </tr>

                    {/* Tags */}
                    <tr className="border-b border-gray-200 dark:border-[rgba(255,255,255,0.08)]">
                      <td
                        style={{
                          padding: "16px 24px",
                          fontSize: 14,
                          fontWeight: 600,
                          position: "sticky",
                          left: 0,
                          zIndex: 1,
                        }}
                        className="text-gray-900 dark:text-white bg-white dark:bg-[#0f1923]"
                      >
                        Tags
                      </td>
                      {tools.map((tool) => (
                        <td key={tool.id} style={{ padding: "16px 24px" }}>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center" }}>
                            {tool.tags.slice(0, 4).map((tag) => (
                              <span
                                key={tag}
                                style={{
                                  padding: "3px 8px",
                                  borderRadius: 6,
                                  fontSize: 11,
                                  fontWeight: 600,
                                  background: "#64748b",
                                  color: "#f1f5f9",
                                }}
                                className="dark:bg-[#1e293b] dark:text-gray-300"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </td>
                      ))}
                    </tr>

                    {/* Link */}
                    <tr>
                      <td
                        style={{
                          padding: "16px 24px",
                          fontSize: 14,
                          fontWeight: 600,
                          position: "sticky",
                          left: 0,
                          zIndex: 1,
                        }}
                        className="text-gray-900 dark:text-white bg-white dark:bg-[#0f1923]"
                      >
                        Visit
                      </td>
                      {tools.map((tool) => (
                        <td key={tool.id} style={{ padding: "16px 24px", textAlign: "center" }}>
                          <motion.a
                            href={tool.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 6,
                              padding: "8px 16px",
                              borderRadius: 10,
                              fontSize: 13,
                              fontWeight: 600,
                              background: "#f97316",
                              color: "white",
                              textDecoration: "none",
                              cursor: "none",
                            }}
                          >
                            Visit
                            <ExternalLink size={14} />
                          </motion.a>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
