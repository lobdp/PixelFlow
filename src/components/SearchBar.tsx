"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, X, Sparkles } from "lucide-react";

interface SearchBarProps {
  initialQuery?: string;
  onSearch: (query: string) => void;
  isLoading?: boolean;
}

const POPULAR_TAGS = [
  "Cyberpunk",
  "Ocean Waves",
  "Tokyo Night",
  "Wildlife & Animals",
  "Minimalist Architecture",
  "Deep Space Nebula",
  "Autumn Forest",
  "Portrait Photography",
];

export default function SearchBar({ initialQuery = "", onSearch, isLoading = false }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const isUserTyping = useRef(false);

  // Sync external initialQuery changes
  useEffect(() => {
    if (!isUserTyping.current) {
      setSearchTerm(initialQuery);
    }
  }, [initialQuery]);

  // Auto-Filter: Debounced real-time search as user types
  useEffect(() => {
    if (!isUserTyping.current) return;

    const timer = setTimeout(() => {
      onSearch(searchTerm.trim());
      isUserTyping.current = false;
    }, 450);

    return () => clearTimeout(timer);
  }, [searchTerm, onSearch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    isUserTyping.current = false;
    onSearch(searchTerm.trim());
  };

  const handleClear = () => {
    isUserTyping.current = false;
    setSearchTerm("");
    onSearch("");
  };

  const handleTagClick = (tag: string) => {
    isUserTyping.current = false;
    setSearchTerm(tag);
    onSearch(tag);
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "860px",
        margin: "0 auto",
        position: "relative",
      }}
    >
      {/* Main Search Input Bar */}
      <form onSubmit={handleSubmit} style={{ position: "relative", width: "100%" }}>
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            background: "rgba(18, 24, 38, 0.85)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            borderRadius: "9999px",
            padding: "6px 8px 6px 20px",
            boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.5), 0 0 20px rgba(5, 160, 129, 0.1)",
            backdropFilter: "blur(16px)",
            transition: "all 0.25s ease",
          }}
        >
          <Search size={22} style={{ color: "#00d6a2", flexShrink: 0, marginRight: "12px" }} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              isUserTyping.current = true;
              setSearchTerm(e.target.value);
            }}
            placeholder="Search photos & videos (auto-filters as you type)..."
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              color: "#ffffff",
              fontSize: "1.05rem",
              padding: "10px 0",
            }}
          />

          {searchTerm && (
            <button
              type="button"
              onClick={handleClear}
              aria-label="Clear search"
              style={{
                background: "rgba(255, 255, 255, 0.08)",
                border: "none",
                borderRadius: "50%",
                width: "28px",
                height: "28px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--text-muted)",
                cursor: "pointer",
                marginRight: "10px",
                transition: "all 0.2s",
              }}
            >
              <X size={16} />
            </button>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary"
            style={{
              padding: "12px 26px",
              fontSize: "0.95rem",
              borderRadius: "9999px",
              flexShrink: 0,
            }}
          >
            <span>Search</span>
          </button>
        </div>
      </form>

    </div>
  );
}
