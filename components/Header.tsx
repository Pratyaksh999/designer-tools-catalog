"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SearchBar from "./SearchBar";
import ThemeToggle from "./ThemeToggle";

interface HeaderProps {
  onSearch: (query: string) => void;
  resultCount?: number;
  suggestions?: string[];
}

export default function Header({ onSearch, resultCount, suggestions }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: scrolled ? "rgba(255,255,255,0.95)" : "transparent",
        backdropFilter: "blur(20px) saturate(180%)",
        borderBottom: scrolled ? "1px solid rgba(0,0,0,0.08)" : "1px solid transparent",
        transition: "all 0.3s"
      }}
      className="dark:bg-[rgba(2,8,23,0.95)] dark:border-[rgba(255,255,255,0.07)]"
    >
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 16px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
        {/* Logo */}
        <motion.a
          href="#"
          whileHover={{ scale: 1.05 }}
          style={{ fontSize: 16, fontWeight: 800, textDecoration: "none", flexShrink: 0 }}
          className="md:text-lg"
        >
          <span style={{ color: "#f97316" }}>Design</span>
          <span className="text-gray-900 dark:text-white text-3d-dark hidden sm:inline">Hour</span>
          <span className="text-gray-900 dark:text-white text-3d-dark sm:hidden">H</span>
        </motion.a>

        {/* Search */}
        <div style={{ flex: 1, maxWidth: 500 }}>
          <SearchBar onSearch={onSearch} resultCount={resultCount} suggestions={suggestions} />
        </div>

        {/* Theme Toggle */}
        <ThemeToggle />
      </div>
    </nav>
  );
}
