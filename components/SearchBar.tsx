"use client";

import { Search, X, Clock, TrendingUp } from "lucide-react";
import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { debounce } from "@/lib/utils";

interface SearchBarProps {
  onSearch: (query: string) => void;
  resultCount?: number;
  suggestions?: string[];
}

export default function SearchBar({ onSearch, resultCount, suggestions = [] }: SearchBarProps) {
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("recentSearches");
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse recent searches:", e);
      }
    }
  }, []);

  // Save recent search
  const saveRecentSearch = (query: string) => {
    if (!query.trim()) return;
    const updated = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
  };

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      onSearch(query);
    }, 300),
    [onSearch]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    debouncedSearch(newValue);
  };

  const handleClear = () => {
    setValue("");
    onSearch("");
  };

  const handleSuggestionClick = (suggestion: string) => {
    setValue(suggestion);
    onSearch(suggestion);
    saveRecentSearch(suggestion);
    setIsFocused(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      saveRecentSearch(value);
      setIsFocused(false);
    }
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem("recentSearches");
  };

  const showDropdown = isFocused && (recentSearches.length > 0 || suggestions.length > 0);

  return (
    <div className="relative w-full">
      <form onSubmit={handleSubmit}>
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400" strokeWidth={2} />
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          placeholder="Search tools..."
          className="w-full pl-10 pr-10 py-2 rounded-lg bg-gray-100 dark:bg-[#0f1923] border border-gray-200 dark:border-[rgba(255,255,255,0.07)] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#f97316] focus:border-[#f97316] transition-all text-sm"
          style={{ fontSize: 14 }}
        />
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-gray-200 dark:hover:bg-[rgba(255,255,255,0.06)] transition-colors"
            aria-label="Clear search"
          >
            <X className="w-3.5 h-3.5 text-gray-400" strokeWidth={2} />
          </button>
        )}

        {/* Result count badge */}
        {value && typeof resultCount === "number" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute -top-2 -right-2 bg-[#f97316] text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-lg"
          >
            {resultCount}
          </motion.div>
        )}
      </form>

      {/* Dropdown with suggestions and recent searches */}
      <AnimatePresence>
        {showDropdown && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-[#0f1923] border border-gray-200 dark:border-[rgba(255,255,255,0.07)] rounded-lg shadow-xl overflow-hidden z-50"
            style={{ maxHeight: 300, overflowY: "auto" }}
          >
            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <div className="p-2 border-b border-gray-200 dark:border-[rgba(255,255,255,0.07)]">
                <div className="flex items-center justify-between px-2 py-1 mb-1">
                  <div className="flex items-center gap-2">
                    <Clock size={12} className="text-gray-400" />
                    <span className="text-xs font-semibold text-gray-500 dark:text-gray-400" style={{ textTransform: "uppercase", letterSpacing: "0.5px" }}>
                      Recent
                    </span>
                  </div>
                  <button
                    onClick={clearRecentSearches}
                    className="text-xs text-gray-400 hover:text-[#f97316] transition-colors"
                  >
                    Clear
                  </button>
                </div>
                {recentSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(search)}
                    className="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-[rgba(255,255,255,0.05)] rounded text-sm text-gray-700 dark:text-gray-300 transition-colors"
                  >
                    {search}
                  </button>
                ))}
              </div>
            )}

            {/* Suggestions */}
            {suggestions.length > 0 && (
              <div className="p-2">
                <div className="flex items-center gap-2 px-2 py-1 mb-1">
                  <TrendingUp size={12} className="text-gray-400" />
                  <span className="text-xs font-semibold text-gray-500 dark:text-gray-400" style={{ textTransform: "uppercase", letterSpacing: "0.5px" }}>
                    Suggestions
                  </span>
                </div>
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-[rgba(255,255,255,0.05)] rounded text-sm text-gray-700 dark:text-gray-300 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
