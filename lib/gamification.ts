export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress: number;
  requirement: number;
}

export interface GamificationStats {
  toolsViewed: number;
  favoritesCount: number;
  searchesPerformed: number;
  daysVisited: number;
  badges: Badge[];
}

const BADGES: Omit<Badge, "unlocked" | "progress">[] = [
  {
    id: "explorer",
    name: "Explorer",
    description: "Viewed 50 tools",
    icon: "🗺️",
    requirement: 50,
  },
  {
    id: "curator",
    name: "Curator",
    description: "Added 10 favorites",
    icon: "❤️",
    requirement: 10,
  },
  {
    id: "power-user",
    name: "Power User",
    description: "Performed 25 searches",
    icon: "⚡",
    requirement: 25,
  },
  {
    id: "regular",
    name: "Regular",
    description: "Visited 7 days",
    icon: "🔥",
    requirement: 7,
  },
  {
    id: "collector",
    name: "Collector",
    description: "Added 25 favorites",
    icon: "🏆",
    requirement: 25,
  },
  {
    id: "master",
    name: "Master",
    description: "Viewed 100 tools",
    icon: "👑",
    requirement: 100,
  },
];

export function getGamificationStats(): GamificationStats {
  if (typeof window === "undefined") {
    return {
      toolsViewed: 0,
      favoritesCount: 0,
      searchesPerformed: 0,
      daysVisited: 0,
      badges: [],
    };
  }

  const stats = JSON.parse(localStorage.getItem("gamificationStats") || "{}");
  const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

  const currentStats = {
    toolsViewed: stats.toolsViewed || 0,
    favoritesCount: favorites.length,
    searchesPerformed: stats.searchesPerformed || 0,
    daysVisited: stats.daysVisited || 0,
    badges: BADGES.map((badge) => {
      let progress = 0;
      switch (badge.id) {
        case "explorer":
        case "master":
          progress = stats.toolsViewed || 0;
          break;
        case "curator":
        case "collector":
          progress = favorites.length;
          break;
        case "power-user":
          progress = stats.searchesPerformed || 0;
          break;
        case "regular":
          progress = stats.daysVisited || 0;
          break;
      }
      return {
        ...badge,
        progress,
        unlocked: progress >= badge.requirement,
      };
    }),
  };

  return currentStats;
}

export function incrementToolViews() {
  if (typeof window === "undefined") return;

  const stats = JSON.parse(localStorage.getItem("gamificationStats") || "{}");
  stats.toolsViewed = (stats.toolsViewed || 0) + 1;
  localStorage.setItem("gamificationStats", JSON.stringify(stats));
}

export function incrementSearches() {
  if (typeof window === "undefined") return;

  const stats = JSON.parse(localStorage.getItem("gamificationStats") || "{}");
  stats.searchesPerformed = (stats.searchesPerformed || 0) + 1;
  localStorage.setItem("gamificationStats", JSON.stringify(stats));
}

export function trackDailyVisit() {
  if (typeof window === "undefined") return;

  const today = new Date().toDateString();
  const lastVisit = localStorage.getItem("lastVisitDate");

  if (lastVisit !== today) {
    const stats = JSON.parse(localStorage.getItem("gamificationStats") || "{}");
    stats.daysVisited = (stats.daysVisited || 0) + 1;
    localStorage.setItem("gamificationStats", JSON.stringify(stats));
    localStorage.setItem("lastVisitDate", today);
  }
}

export function getNewlyUnlockedBadges(oldStats: GamificationStats, newStats: GamificationStats): Badge[] {
  return newStats.badges.filter((newBadge) => {
    const oldBadge = oldStats.badges.find((b) => b.id === newBadge.id);
    return newBadge.unlocked && oldBadge && !oldBadge.unlocked;
  });
}
