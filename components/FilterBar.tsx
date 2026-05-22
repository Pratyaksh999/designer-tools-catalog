"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useTheme } from "@/lib/context/ThemeContext";

interface FilterBarProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  showFavorites: boolean;
  onToggleFavorites: () => void;
  favoritesCount: number;
  pricingFilter: "all" | "free" | "paid";
  onPricingChange: (filter: "all" | "free" | "paid") => void;
}

export default function FilterBar({
  categories,
  activeCategory,
  onCategoryChange,
  showFavorites,
  onToggleFavorites,
  favoritesCount,
  pricingFilter,
  onPricingChange,
}: FilterBarProps) {
  const { theme } = useTheme();
  const allCategories = ["All", ...categories];
  const hoverBg = theme === "dark" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)";

  // Active filters array
  const activeFilters: Array<{ label: string; onRemove: () => void }> = [];

  if (showFavorites) {
    activeFilters.push({
      label: "Favorites",
      onRemove: onToggleFavorites,
    });
  }

  if (activeCategory !== "All" && !showFavorites) {
    activeFilters.push({
      label: activeCategory,
      onRemove: () => onCategoryChange("All"),
    });
  }

  if (pricingFilter !== "all") {
    activeFilters.push({
      label: pricingFilter === "free" ? "Free" : "Paid",
      onRemove: () => onPricingChange("all"),
    });
  }

  const clearAllFilters = () => {
    onCategoryChange("All");
    onPricingChange("all");
    if (showFavorites) onToggleFavorites();
  };

  return (
    <div className="sticky top-[64px] z-40 bg-white/95 dark:bg-[rgba(2,8,23,0.95)] backdrop-blur-xl border-b border-gray-200 dark:border-[rgba(255,255,255,0.07)] py-3 md:py-4" style={{ backdropFilter: "blur(20px) saturate(180%)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 16px" }}>
        {/* Pricing filter row */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, overflowX: "auto" }} className="scrollbar-hide">
          <span className="text-xs font-semibold text-gray-500 dark:text-gray-500 whitespace-nowrap" style={{ textTransform: "uppercase", letterSpacing: "0.5px" }}>Pricing</span>
          <div style={{
            position: "relative",
            display: "inline-flex",
            background: theme === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
            borderRadius: 10,
            padding: 3,
            gap: 3
          }}>
            {["all", "free", "paid"].map((filter) => {
              const isActive = pricingFilter === filter;
              return (
                <button
                  key={filter}
                  onClick={() => onPricingChange(filter as "all" | "free" | "paid")}
                  style={{
                    position: "relative",
                    padding: "6px 12px",
                    borderRadius: 7,
                    fontSize: 12,
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                    transition: "all 0.2s",
                    background: isActive ? "#f97316" : "transparent",
                    border: "none",
                    textTransform: "capitalize",
                    zIndex: 1
                  }}
                  className={`md:text-sm md:px-4 ${isActive ? "text-white" : "text-gray-600 dark:text-gray-400"}`}
                >
                  {filter === "all" ? "All" : filter}
                </button>
              );
            })}
          </div>
        </div>

        {/* Categories row */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
          {/* Favorites chip */}
          <button
            onClick={onToggleFavorites}
            style={{
              position: "relative",
              padding: "6px 12px",
              borderRadius: 10,
              fontSize: 13,
              fontWeight: showFavorites ? 700 : 500,
              whiteSpace: "nowrap",
              transition: "all 0.2s",
              background: showFavorites ? "transparent" : "transparent",
              border: "none"
            }}
            className={`md:text-sm md:px-4 ${showFavorites ? "text-gray-900 dark:text-white" : "text-gray-600 dark:text-gray-400"}`}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = hoverBg;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
          >
            Favorites {favoritesCount > 0 && `(${favoritesCount})`}
            {showFavorites && (
              <motion.span
                layoutId="filter-pill"
                style={{
                  position: "absolute",
                  bottom: 4,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 4,
                  height: 4,
                  borderRadius: "50%",
                  background: "#f97316",
                  display: "block"
                }}
              />
            )}
          </button>

          {/* Category chips */}
          {allCategories.map((category) => {
            const isActive = activeCategory === category && !showFavorites;
            return (
              <button
                key={category}
                onClick={() => onCategoryChange(category)}
                style={{
                  position: "relative",
                  padding: "6px 12px",
                  borderRadius: 10,
                  fontSize: 13,
                  fontWeight: isActive ? 700 : 500,
                  whiteSpace: "nowrap",
                  transition: "all 0.2s",
                  background: "transparent",
                  border: "none"
                }}
                className={`md:text-sm md:px-4 ${isActive ? "text-gray-900 dark:text-white" : "text-gray-600 dark:text-gray-400"}`}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = hoverBg;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                }}
              >
                {category}
                {isActive && (
                  <motion.span
                    layoutId="filter-pill"
                    style={{
                      position: "absolute",
                      bottom: 4,
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: 4,
                      height: 4,
                      borderRadius: "50%",
                      background: "#f97316",
                      display: "block"
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Active filter chips */}
        {activeFilters.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 12, flexWrap: "wrap" }}
          >
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-500" style={{ textTransform: "uppercase", letterSpacing: "0.5px" }}>
              Active:
            </span>
            {activeFilters.map((filter, index) => (
              <motion.div
                key={filter.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: index * 0.05 }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "4px 10px",
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: 600,
                  background: "#f97316",
                  color: "white",
                  border: "none",
                }}
              >
                {filter.label}
                <button
                  onClick={filter.onRemove}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(255,255,255,0.2)",
                    border: "none",
                    borderRadius: "50%",
                    width: 16,
                    height: 16,
                    cursor: "none",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.2)";
                  }}
                >
                  <X size={10} />
                </button>
              </motion.div>
            ))}
            {activeFilters.length > 1 && (
              <button
                onClick={clearAllFilters}
                className="text-xs font-semibold text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                style={{
                  textDecoration: "underline",
                  background: "none",
                  border: "none",
                  cursor: "none",
                  transition: "color 0.2s",
                }}
              >
                Clear all
              </button>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
