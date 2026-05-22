"use client";

import { useState } from "react";
import { ExternalLink, Link2, Share2, Eye, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import FavoritesButton from "./FavoritesButton";
import { type Tool } from "@/types";

interface ToolCardProps {
  tool: Tool;
  index: number;
  view?: "comfortable" | "compact" | "list";
  onClick?: (tool: Tool) => void;
  isSelected?: boolean;
  onToggleSelect?: (toolId: string) => void;
}

const categoryColors: Record<string, string> = {
  Animation: "#f97316",
  "Micro-interactions": "#fb923c",
  Components: "#ea580c",
  Documentation: "#f97316",
  "Design-to-Code": "#fb923c",
  Inspiration: "#ea580c"
};

export default function ToolCard({ tool, index, view = "comfortable", onClick, isSelected = false, onToggleSelect }: ToolCardProps) {
  const color = categoryColors[tool.category] || "#00dc82";
  const [showActions, setShowActions] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);

  const isListView = view === "list";
  const isCompact = view === "compact";
  const padding = isCompact ? 16 : 26;

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onToggleSelect) {
      onToggleSelect(tool.id);
    }
  };

  const handleCopyLink = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(tool.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      try {
        await navigator.share({
          title: tool.name,
          text: tool.description,
          url: tool.url,
        });
        setShared(true);
        setTimeout(() => setShared(false), 2000);
      } catch (error) {
        console.error("Failed to share:", error);
      }
    } else {
      // Fallback to copy
      handleCopyLink(e);
    }
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(tool.url, "_blank", "noopener,noreferrer");
  };

  const handleClick = async () => {
    if (onClick) {
      onClick(tool);
    } else {
      try {
        await fetch("/api/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            toolId: tool.id,
            category: tool.category,
            timestamp: new Date().toISOString(),
          }),
        });
      } catch (error) {
        console.error("Failed to track click:", error);
      }
      window.open(tool.url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="tilt-card glow-card bg-[#f8fafc] dark:bg-[#0f1923] border border-[rgba(0,0,0,0.07)] dark:border-[rgba(255,255,255,0.07)]"
      style={{
        padding: padding,
        borderRadius: isCompact ? 14 : 18,
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
        display: isListView ? "flex" : "block",
        flexDirection: isListView ? "row" : undefined,
        alignItems: isListView ? "center" : undefined,
        gap: isListView ? 20 : undefined,
      }}
      onClick={handleClick}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="tilt-shine" />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${color}, transparent)` }} />

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 22,
            background: `${color}15`,
            border: `1px solid ${color}25`
          }}>
            {tool.featured ? "⭐" : "🔧"}
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900 dark:text-white leading-tight">{tool.name}</h3>
            <span style={{ fontSize: 11, fontWeight: 700, color: color }}>{tool.category}</span>
          </div>
        </div>
        <a href={tool.url} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
          style={{
            width: 32,
            height: 32,
            borderRadius: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0,0,0,0.04)",
            textDecoration: "none",
            transition: "all 0.2s"
          }}
          className="text-gray-600 dark:text-gray-400 dark:bg-[rgba(255,255,255,0.06)] hover:dark:bg-[rgba(255,255,255,0.12)]"
        >
          <ExternalLink size={14} />
        </a>
      </div>

      <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{tool.description}</p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
        {tool.tags.slice(0, 3).map(tag => (
          <span key={tag} style={{
            padding: "3px 9px",
            borderRadius: 6,
            fontSize: 11,
            fontWeight: 600,
            background: "#64748b",
            color: "#f1f5f9",
            border: "1px solid #475569"
          }} className="dark:bg-[#1e293b] dark:text-gray-300 dark:border-[#334155]">{tag}</span>
        ))}
      </div>

      {/* Top right actions */}
      <div style={{ position: "absolute", top: 14, right: 14, zIndex: 20, display: "flex", gap: 8, alignItems: "center" }}>
        {onToggleSelect && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.1 }}
            onClick={handleCheckboxClick}
            style={{
              width: 24,
              height: 24,
              borderRadius: 6,
              background: isSelected ? "#8b5cf6" : "rgba(0,0,0,0.04)",
              border: isSelected ? "2px solid #8b5cf6" : "2px solid rgba(0,0,0,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "none",
              transition: "all 0.2s",
            }}
            className="dark:bg-[rgba(255,255,255,0.06)] dark:border-[rgba(255,255,255,0.1)]"
          >
            {isSelected && (
              <motion.svg
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
              >
                <path
                  d="M2 6L5 9L10 3"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </motion.svg>
            )}
          </motion.div>
        )}
        <FavoritesButton toolId={tool.id} />
      </div>

      {/* Quick Actions */}
      <AnimatePresence>
        {showActions && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "absolute",
              bottom: 14,
              right: 14,
              display: "flex",
              gap: 8,
              zIndex: 20,
            }}
          >
            {/* Copy Link */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleCopyLink}
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: copied ? "#10b981" : "#f97316",
                border: "none",
                cursor: "none",
                transition: "all 0.2s",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              }}
              title="Copy link"
            >
              {copied ? <Check size={16} color="white" /> : <Link2 size={16} color="white" />}
            </motion.button>

            {/* Share */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleShare}
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: shared ? "#10b981" : "#f97316",
                border: "none",
                cursor: "none",
                transition: "all 0.2s",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              }}
              title="Share"
            >
              {shared ? <Check size={16} color="white" /> : <Share2 size={16} color="white" />}
            </motion.button>

            {/* Quick View */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleQuickView}
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#f97316",
                border: "none",
                cursor: "none",
                transition: "all 0.2s",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              }}
              title="Open in new tab"
            >
              <Eye size={16} color="white" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
