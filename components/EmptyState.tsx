"use client";

import { motion } from "framer-motion";
import { Search, Frown } from "lucide-react";

interface EmptyStateProps {
  searchQuery?: string;
  hasFilters: boolean;
  onClearFilters: () => void;
}

export default function EmptyState({ searchQuery, hasFilters, onClearFilters }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 20px",
        textAlign: "center",
      }}
    >
      {/* Animated icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        style={{
          width: 120,
          height: 120,
          borderRadius: "50%",
          background: "linear-gradient(135deg, rgba(249,115,22,0.1) 0%, rgba(251,146,60,0.05) 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 24,
          border: "2px dashed rgba(249,115,22,0.3)",
        }}
        className="dark:bg-[rgba(249,115,22,0.05)]"
      >
        {searchQuery ? (
          <Search size={48} className="text-gray-400 dark:text-gray-500" />
        ) : (
          <Frown size={48} className="text-gray-400 dark:text-gray-500" />
        )}
      </motion.div>

      {/* Message */}
      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}
        className="text-gray-900 dark:text-white"
      >
        {searchQuery ? `No results for "${searchQuery}"` : "No tools found"}
      </motion.h3>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        style={{ fontSize: 14, marginBottom: 24, maxWidth: 400 }}
        className="text-gray-600 dark:text-gray-400"
      >
        {searchQuery
          ? "Try adjusting your search or filters to find what you're looking for."
          : hasFilters
          ? "No tools match your current filters. Try adjusting or clearing them."
          : "There are no tools available at the moment."}
      </motion.p>

      {/* Actions */}
      {hasFilters && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          onClick={onClearFilters}
          style={{
            padding: "12px 24px",
            borderRadius: 12,
            fontSize: 14,
            fontWeight: 600,
            background: "#f97316",
            color: "white",
            border: "none",
            cursor: "none",
            transition: "all 0.2s",
            boxShadow: "0 4px 12px rgba(249,115,22,0.3)",
          }}
          whileHover={{ scale: 1.05, boxShadow: "0 6px 20px rgba(249,115,22,0.4)" }}
          whileTap={{ scale: 0.95 }}
        >
          Clear all filters
        </motion.button>
      )}

      {/* Suggestions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        style={{ marginTop: 32 }}
      >
        <p className="text-xs text-gray-500 dark:text-gray-500 mb-8" style={{ textTransform: "uppercase", letterSpacing: "0.5px" }}>
          Suggestions
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
          <span
            className="text-sm text-gray-600 dark:text-gray-400 bg-[rgba(0,0,0,0.03)] dark:bg-[rgba(255,255,255,0.05)]"
            style={{ padding: "6px 12px", borderRadius: 8 }}
          >
            • Try different keywords
          </span>
          <span
            className="text-sm text-gray-600 dark:text-gray-400 bg-[rgba(0,0,0,0.03)] dark:bg-[rgba(255,255,255,0.05)]"
            style={{ padding: "6px 12px", borderRadius: 8 }}
          >
            • Browse all categories
          </span>
          <span
            className="text-sm text-gray-600 dark:text-gray-400 bg-[rgba(0,0,0,0.03)] dark:bg-[rgba(255,255,255,0.05)]"
            style={{ padding: "6px 12px", borderRadius: 8 }}
          >
            • Check your spelling
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}
