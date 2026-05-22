import { Tool } from "@/types";

export function getRecommendations(
  currentTool: Tool,
  allTools: Tool[],
  favorites: string[],
  limit: number = 3
): Tool[] {
  // Score each tool based on similarity
  const scored = allTools
    .filter((tool) => tool.id !== currentTool.id)
    .map((tool) => {
      let score = 0;

      // Same category gets high score
      if (tool.category === currentTool.category) {
        score += 50;
      }

      // Shared tags
      const sharedTags = tool.tags.filter((tag) =>
        currentTool.tags.includes(tag)
      );
      score += sharedTags.length * 10;

      // Favorited tools get bonus
      if (favorites.includes(tool.id)) {
        score += 20;
      }

      // Popular tools get small bonus
      if (tool.popular) {
        score += 5;
      }

      return { tool, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return scored.map((s) => s.tool);
}

export function getPersonalizedRecommendations(
  allTools: Tool[],
  favorites: string[],
  recentlyViewed: string[],
  limit: number = 6
): Tool[] {
  if (favorites.length === 0) {
    // No favorites, return popular tools
    return allTools.filter((t) => t.popular).slice(0, limit);
  }

  const favoriteTools = allTools.filter((t) => favorites.includes(t.id));

  // Get categories and tags from favorites
  const favoriteCategories = favoriteTools.map((t) => t.category);
  const favoriteTags = favoriteTools.flatMap((t) => t.tags);

  // Score tools
  const scored = allTools
    .filter((tool) => !favorites.includes(tool.id) && !recentlyViewed.includes(tool.id))
    .map((tool) => {
      let score = 0;

      // Match favorite categories
      if (favoriteCategories.includes(tool.category)) {
        score += 30;
      }

      // Match favorite tags
      const matchedTags = tool.tags.filter((tag) => favoriteTags.includes(tag));
      score += matchedTags.length * 10;

      // Popular bonus
      if (tool.popular) {
        score += 15;
      }

      // Free tools get slight boost
      if (tool.pricing === "free" || tool.pricing === "freemium") {
        score += 5;
      }

      return { tool, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return scored.map((s) => s.tool);
}

export function getCollaborativeFiltering(
  currentToolId: string,
  allTools: Tool[],
  clickData: Record<string, string[]> // toolId -> [toolIds viewed in same session]
): Tool[] {
  // Simple collaborative filtering: "users who viewed X also viewed Y"
  const relatedToolIds = clickData[currentToolId] || [];

  // Count occurrences
  const counts: Record<string, number> = {};
  relatedToolIds.forEach((id) => {
    counts[id] = (counts[id] || 0) + 1;
  });

  // Sort by frequency
  const sorted = Object.entries(counts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([id]) => id);

  return allTools.filter((t) => sorted.includes(t.id));
}
