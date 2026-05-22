"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Tool } from "@/types";

interface RecommendationsSectionProps {
  tools: Tool[];
  onToolClick: (tool: Tool) => void;
}

const categoryColors: Record<string, string> = {
  Animation: "#f97316",
  "Micro-interactions": "#fb923c",
  Components: "#ea580c",
  Documentation: "#f97316",
  "Design-to-Code": "#fb923c",
  Inspiration: "#ea580c"
};

export default function RecommendationsSection({ tools, onToolClick }: RecommendationsSectionProps) {
  if (tools.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={{
        marginTop: 80,
        padding: "40px 0",
        borderTop: "1px solid rgba(0,0,0,0.08)",
      }}
      className="dark:border-[rgba(255,255,255,0.08)]"
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}>
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 12,
            background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 12px rgba(249,115,22,0.3)",
          }}
        >
          <Sparkles size={24} color="white" />
        </div>
        <div>
          <h3 style={{ fontSize: 24, fontWeight: 800, marginBottom: 4 }} className="text-gray-900 dark:text-white">
            Recommended for You
          </h3>
          <p style={{ fontSize: 14 }} className="text-gray-600 dark:text-gray-400">
            Based on your favorites and browsing
          </p>
        </div>
      </div>

      {/* Tools Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
        {tools.map((tool, index) => {
          const color = categoryColors[tool.category] || "#f97316";

          return (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              onClick={() => onToolClick(tool)}
              style={{
                padding: 20,
                borderRadius: 16,
                background: "white",
                border: "1px solid rgba(0,0,0,0.08)",
                cursor: "none",
                transition: "all 0.2s",
              }}
              className="dark:bg-[#0f1923] dark:border-[rgba(255,255,255,0.08)] hover:shadow-lg"
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: `${color}15`,
                    border: `1px solid ${color}25`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 20,
                  }}
                >
                  🔧
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 2 }} className="text-gray-900 dark:text-white">
                    {tool.name}
                  </div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: color }}>
                    {tool.category}
                  </div>
                </div>
              </div>

              <p style={{ fontSize: 13, lineHeight: 1.6, marginBottom: 12 }} className="text-gray-600 dark:text-gray-400">
                {tool.description.slice(0, 100)}...
              </p>

              <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                {tool.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    style={{
                      padding: "2px 6px",
                      borderRadius: 4,
                      fontSize: 10,
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
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
