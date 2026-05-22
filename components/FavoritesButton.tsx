"use client";

import { Heart } from "lucide-react";
import { useFavorites } from "@/lib/context/FavoritesContext";
import { useToast } from "@/lib/context/ToastContext";
import { motion } from "framer-motion";
import { triggerConfetti } from "@/lib/microInteractions";

interface FavoritesButtonProps {
  toolId: string;
  size?: "small" | "large";
}

export default function FavoritesButton({ toolId, size = "small" }: FavoritesButtonProps) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const { showToast } = useToast();
  const favorited = isFavorite(toolId);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (favorited) {
      removeFavorite(toolId);
      showToast({
        type: "info",
        message: "Removed from favorites",
        action: {
          label: "Undo",
          onClick: () => addFavorite(toolId),
        },
      });
    } else {
      const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
      addFavorite(toolId);

      // Trigger confetti on 10th favorite
      if (favorites.length + 1 === 10) {
        const rect = e.currentTarget.getBoundingClientRect();
        setTimeout(() => {
          triggerConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2);
        }, 200);
        showToast({
          type: "success",
          message: "🎉 10 favorites! You're building a great collection!",
        });
      } else {
        showToast({
          type: "success",
          message: "Added to favorites!",
        });
      }
    }
  };

  const iconSize = size === "large" ? 16 : 13;
  const padding = size === "large" ? 8 : 6;

  return (
    <motion.button
      onClick={handleClick}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.9 }}
      style={{
        padding,
        borderRadius: 8,
        background: favorited ? "rgba(239, 68, 68, 0.1)" : "rgba(0,0,0,0.04)",
        border: favorited ? "1px solid rgba(239, 68, 68, 0.2)" : "1px solid rgba(0,0,0,0.06)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.2s",
        cursor: "none"
      }}
      className="dark:bg-[rgba(255,255,255,0.06)] dark:border-[rgba(255,255,255,0.1)]"
      aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
    >
      <Heart
        size={iconSize}
        className={`transition-colors ${
          favorited
            ? "fill-red-500 text-red-500"
            : "text-gray-500 dark:text-gray-400"
        }`}
        strokeWidth={2}
      />
    </motion.button>
  );
}
