export type Category =
  | "All"
  | "Animation"
  | "Micro-interactions"
  | "Components"
  | "Documentation"
  | "Design-to-Code"
  | "Inspiration";

export interface Tool {
  id: string;
  name: string;
  description: string;
  url: string;
  category: Exclude<Category, "All">;
  tags: string[];
  featured?: boolean;
  logo?: string;
  color?: string;
  pricing?: "free" | "paid" | "freemium";
  dateAdded?: string;
  popular?: boolean;
}

export interface ToolsData {
  tools: Tool[];
  categories: string[];
}
