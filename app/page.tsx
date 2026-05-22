"use client";

import { useState, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import FilterBar from "@/components/FilterBar";
import ToolGrid from "@/components/ToolGrid";
import CustomCursor from "@/components/CustomCursor";
import EmptyState from "@/components/EmptyState";
import ViewToggle from "@/components/ViewToggle";
import ScrollToTop from "@/components/ScrollToTop";
import KeyboardShortcuts from "@/components/KeyboardShortcuts";
import SortDropdown, { SortOption } from "@/components/SortDropdown";
import ToolPreviewModal from "@/components/ToolPreviewModal";
import SkeletonCard from "@/components/SkeletonCard";
import { useFavorites } from "@/lib/context/FavoritesContext";
import { useToast } from "@/lib/context/ToastContext";
import ComparisonMode from "@/components/ComparisonMode";
import ComparisonButton from "@/components/ComparisonButton";
import OnboardingTour from "@/components/OnboardingTour";
import ParallaxBackground from "@/components/ParallaxBackground";
import BadgeUnlockNotification from "@/components/BadgeUnlockNotification";
import RecommendationsSection from "@/components/RecommendationsSection";
import { triggerConfetti, createRipple } from "@/lib/microInteractions";
import { getGamificationStats, incrementToolViews, trackDailyVisit, getNewlyUnlockedBadges, Badge } from "@/lib/gamification";
import { getPersonalizedRecommendations } from "@/lib/recommendations";
import toolsData from "@/data/tools.json";
import { type Tool } from "@/types";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [showFavorites, setShowFavorites] = useState(false);
  const [pricingFilter, setPricingFilter] = useState<"all" | "free" | "paid">("all");
  const [viewMode, setViewMode] = useState<"comfortable" | "compact" | "list">("comfortable");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedForComparison, setSelectedForComparison] = useState<string[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  const [unlockedBadge, setUnlockedBadge] = useState<Badge | null>(null);
  const [gamificationStats, setGamificationStats] = useState(getGamificationStats());
  const { favorites } = useFavorites();
  const { showToast } = useToast();
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Track daily visit
  useMemo(() => {
    trackDailyVisit();
  }, []);

  // Simulate loading
  useMemo(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const tools = toolsData.tools as Tool[];
  const categories = toolsData.categories;

  // Generate search suggestions based on popular tags and categories
  const searchSuggestions = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const query = searchQuery.toLowerCase();
    const suggestions = new Set<string>();

    // Add matching categories
    categories.forEach(cat => {
      if (cat.toLowerCase().includes(query)) {
        suggestions.add(cat);
      }
    });

    // Add matching tags
    tools.forEach(tool => {
      tool.tags.forEach(tag => {
        if (tag.toLowerCase().includes(query) && suggestions.size < 5) {
          suggestions.add(tag);
        }
      });
    });

    return Array.from(suggestions).slice(0, 5);
  }, [searchQuery, tools, categories]);

  // Filter, search, and sort logic
  const filteredAndSortedTools = useMemo(() => {
    let result = tools;

    // Show favorites
    if (showFavorites) {
      result = result.filter((tool) => favorites.includes(tool.id));
    } else if (activeCategory !== "All") {
      // Filter by category
      result = result.filter((tool) => tool.category === activeCategory);
    }

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (tool) =>
          tool.name.toLowerCase().includes(query) ||
          tool.description.toLowerCase().includes(query) ||
          tool.category.toLowerCase().includes(query) ||
          tool.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Pricing filter
    if (pricingFilter !== "all") {
      result = result.filter((tool) =>
        tool.pricing === pricingFilter ||
        (pricingFilter === "free" && tool.pricing === "freemium")
      );
    }

    // Sort
    switch (sortBy) {
      case "newest":
        result = result.sort((a, b) => {
          const dateA = a.dateAdded ? new Date(a.dateAdded).getTime() : 0;
          const dateB = b.dateAdded ? new Date(b.dateAdded).getTime() : 0;
          return dateB - dateA;
        });
        break;
      case "alphabetical":
        result = result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "popular":
        result = result.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));
        break;
      case "most-favorited":
        // For now, just randomize since we don't have favorite counts per tool
        result = [...result];
        break;
    }

    return result;
  }, [tools, activeCategory, searchQuery, showFavorites, favorites, pricingFilter, sortBy]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setShowFavorites(false);
  };

  const handleToggleFavorites = () => {
    setShowFavorites(!showFavorites);
    setActiveCategory("All");
  };

  const clearAllFilters = () => {
    setActiveCategory("All");
    setPricingFilter("all");
    setShowFavorites(false);
    setSearchQuery("");
  };

  const hasActiveFilters = activeCategory !== "All" || pricingFilter !== "all" || showFavorites;

  const focusSearch = () => {
    const input = document.querySelector('input[type="text"]') as HTMLInputElement;
    if (input) input.focus();
  };

  const handleToolClick = (tool: Tool) => {
    setSelectedTool(tool);
    setIsModalOpen(true);

    // Track view and check for badge unlock
    const oldStats = gamificationStats;
    incrementToolViews();
    const newStats = getGamificationStats();
    setGamificationStats(newStats);

    const newBadges = getNewlyUnlockedBadges(oldStats, newStats);
    if (newBadges.length > 0) {
      setUnlockedBadge(newBadges[0]);
      // Trigger confetti at screen center
      setTimeout(() => {
        triggerConfetti(window.innerWidth / 2, window.innerHeight / 2);
      }, 300);
    }
  };

  const handleToggleComparison = (toolId: string) => {
    setSelectedForComparison((prev) => {
      if (prev.includes(toolId)) {
        return prev.filter((id) => id !== toolId);
      } else {
        if (prev.length >= 4) {
          showToast({
            type: "warning",
            message: "You can compare up to 4 tools at once",
          });
          return prev;
        }
        return [...prev, toolId];
      }
    });
  };

  const comparisonTools = tools.filter((t) => selectedForComparison.includes(t.id));

  const recommendedTools = useMemo(() => {
    return getPersonalizedRecommendations(tools, favorites, [], 6);
  }, [tools, favorites]);

  const handleTagClick = (tag: string) => {
    setSearchQuery(tag);
    showToast({
      type: "info",
      message: `Filtering by "${tag}"`,
    });
  };

  const similarTools = useMemo(() => {
    if (!selectedTool) return [];
    return tools
      .filter((t) => t.id !== selectedTool.id && t.category === selectedTool.category)
      .slice(0, 3);
  }, [selectedTool, tools]);

  return (
    <div className="min-h-screen bg-white dark:bg-[#020817] spotlight-section" style={{ position: "relative" }}>
      {/* Parallax background with depth */}
      <ParallaxBackground />

      <CustomCursor />
      <OnboardingTour />
      <Header
        onSearch={setSearchQuery}
        resultCount={filteredAndSortedTools.length}
        suggestions={searchSuggestions}
      />
      <FilterBar
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
        showFavorites={showFavorites}
        onToggleFavorites={handleToggleFavorites}
        favoritesCount={favorites.length}
        pricingFilter={pricingFilter}
        onPricingChange={setPricingFilter}
      />

      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "96px 20px", position: "relative", zIndex: 1 }}>
        {/* Section header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ marginBottom: 56 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
            <span style={{ color: "#f97316", fontFamily: "monospace", fontSize: 14, fontWeight: 700 }}>01.</span>
            <div style={{ height: 1, flex: 1, background: "linear-gradient(to right, rgba(249,115,22,0.3), transparent)" }} />
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: 12 }}>
            <h2 style={{ fontSize: "clamp(28px,4vw,42px)", fontWeight: 900, letterSpacing: "-1px" }}>
              <span style={{ color: "#f97316" }}>Designer</span> <span className="text-gray-900 dark:text-white text-3d-dark">Tools</span>
            </h2>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <SortDropdown value={sortBy} onChange={setSortBy} />
              <ViewToggle view={viewMode} onViewChange={setViewMode} />
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {showFavorites ? (
              <>{filteredAndSortedTools.length} favorited</>
            ) : searchQuery.trim() ? (
              <>{filteredAndSortedTools.length} results for "{searchQuery}"</>
            ) : (
              <>{filteredAndSortedTools.length} tools{activeCategory !== "All" && ` in ${activeCategory}`}</>
            )}
          </p>
        </motion.div>

        {/* Tool grid, loading, or empty state */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <SkeletonCard key={i} index={i} />
            ))}
          </div>
        ) : filteredAndSortedTools.length > 0 ? (
          <>
            <ToolGrid
              tools={filteredAndSortedTools}
              view={viewMode}
              onToolClick={handleToolClick}
              selectedTools={selectedForComparison}
              onToggleSelect={handleToggleComparison}
            />

            {/* Recommendations */}
            {recommendedTools.length > 0 && (
              <RecommendationsSection tools={recommendedTools} onToolClick={handleToolClick} />
            )}
          </>
        ) : (
          <EmptyState
            searchQuery={searchQuery.trim()}
            hasFilters={hasActiveFilters}
            onClearFilters={clearAllFilters}
          />
        )}
      </main>

      {/* Scroll to top button */}
      <ScrollToTop />

      {/* Comparison button */}
      <ComparisonButton
        count={selectedForComparison.length}
        onClick={() => setShowComparison(true)}
      />

      {/* Keyboard shortcuts */}
      <KeyboardShortcuts
        onFocusSearch={focusSearch}
        onClearFilters={clearAllFilters}
      />

      {/* Tool Preview Modal */}
      <ToolPreviewModal
        tool={selectedTool}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onTagClick={handleTagClick}
        similarTools={similarTools}
      />

      {/* Comparison Mode */}
      <ComparisonMode
        tools={comparisonTools}
        isOpen={showComparison}
        onClose={() => setShowComparison(false)}
        onRemoveTool={(toolId) => {
          setSelectedForComparison((prev) => prev.filter((id) => id !== toolId));
        }}
      />

      {/* Badge Unlock Notification */}
      {unlockedBadge && (
        <BadgeUnlockNotification
          badge={unlockedBadge}
          onClose={() => setUnlockedBadge(null)}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-[rgba(255,255,255,0.07)] mt-24" style={{ position: "relative", zIndex: 10 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 20px", textAlign: "center" }}>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            {tools.length} tools curated for designers · Made with <span style={{ color: "#f97316" }}>♥</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
