"use client";

import { motion, AnimatePresence } from "framer-motion";
import ToolCard from "./ToolCard";
import { type Tool } from "@/types";
import { PackageSearch } from "lucide-react";

interface ToolGridProps {
  tools: Tool[];
  view?: "comfortable" | "compact" | "list";
  onToolClick?: (tool: Tool) => void;
  selectedTools?: string[];
  onToggleSelect?: (toolId: string) => void;
}

export default function ToolGrid({ tools, view = "comfortable", onToolClick, selectedTools = [], onToggleSelect }: ToolGridProps) {
  if (tools.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-24 text-center"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="p-8 rounded-3xl bg-gradient-to-br from-white/90 to-white/70 dark:from-slate-800/90 dark:to-slate-900/70 backdrop-blur-xl border-2 border-gray-200 dark:border-slate-700 shadow-2xl mb-6"
        >
          <PackageSearch className="w-20 h-20 text-indigo-400 dark:text-indigo-500 mb-4" strokeWidth={1.5} />
        </motion.div>
        <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-3 gradient-text">
          No tools found
        </h3>
        <p className="text-base font-semibold text-gray-600 dark:text-gray-400 max-w-md">
          Try adjusting your search or filters to discover amazing designer tools.
        </p>
      </motion.div>
    );
  }

  const gridClasses = {
    comfortable: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
    compact: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4",
    list: "flex flex-col gap-4",
  };

  return (
    <div className={gridClasses[view]}>
      <AnimatePresence mode="popLayout">
        {tools.map((tool, index) => (
          <ToolCard
            key={tool.id}
            tool={tool}
            index={index}
            view={view}
            onClick={onToolClick}
            isSelected={selectedTools.includes(tool.id)}
            onToggleSelect={onToggleSelect}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
