"use client";

import React from "react";
import { Image as ImageIcon, Video as VideoIcon, SlidersHorizontal } from "lucide-react";
import { MediaType, OrientationFilter, SizeFilter } from "@/types/pexels";

interface MediaTabsProps {
  activeTab: MediaType;
  onTabChange: (tab: MediaType) => void;
  orientation: OrientationFilter;
  onOrientationChange: (orientation: OrientationFilter) => void;
  size: SizeFilter;
  onSizeChange: (size: SizeFilter) => void;
  totalResults?: number;
  isSearch: boolean;
}

export default function MediaTabs({
  activeTab,
  onTabChange,
  orientation,
  onOrientationChange,
  size,
  onSizeChange,
  totalResults,
  isSearch,
}: MediaTabsProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "16px",
        padding: "16px 0",
        borderBottom: "1px solid var(--border-subtle)",
        marginBottom: "28px",
      }}
    >
      {/* Tab Switcher */}
      <div
        style={{
          display: "inline-flex",
          background: "rgba(255, 255, 255, 0.05)",
          padding: "4px",
          borderRadius: "9999px",
          border: "1px solid var(--border-subtle)",
        }}
      >
        <button
          type="button"
          onClick={() => onTabChange("photos")}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 20px",
            borderRadius: "9999px",
            fontSize: "0.9rem",
            fontWeight: 600,
            border: "none",
            cursor: "pointer",
            transition: "all 0.25s ease",
            background: activeTab === "photos" ? "linear-gradient(135deg, #05a081 0%, #06b6d4 100%)" : "transparent",
            color: activeTab === "photos" ? "#ffffff" : "var(--text-secondary)",
            boxShadow: activeTab === "photos" ? "0 4px 14px rgba(5, 160, 129, 0.35)" : "none",
          }}
        >
          <ImageIcon size={16} />
          <span>Photos</span>
        </button>

        <button
          type="button"
          onClick={() => onTabChange("videos")}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 20px",
            borderRadius: "9999px",
            fontSize: "0.9rem",
            fontWeight: 600,
            border: "none",
            cursor: "pointer",
            transition: "all 0.25s ease",
            background: activeTab === "videos" ? "linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)" : "transparent",
            color: activeTab === "videos" ? "#ffffff" : "var(--text-secondary)",
            boxShadow: activeTab === "videos" ? "0 4px 14px rgba(99, 102, 241, 0.35)" : "none",
          }}
        >
          <VideoIcon size={16} />
          <span>Videos</span>
        </button>
      </div>

      {/* Stats and Filter Controls */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
        {typeof totalResults === "number" && totalResults > 0 && (
          <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginRight: "6px" }}>
            {totalResults.toLocaleString()} {isSearch ? "results" : "curated"}
          </span>
        )}

        {/* Orientation Filter */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
          <SlidersHorizontal size={14} style={{ color: "var(--text-muted)" }} />
          <select
            value={orientation}
            onChange={(e) => onOrientationChange(e.target.value as OrientationFilter)}
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              color: "var(--text-secondary)",
              border: "1px solid var(--border-subtle)",
              borderRadius: "8px",
              padding: "6px 12px",
              fontSize: "0.82rem",
              outline: "none",
              cursor: "pointer",
            }}
          >
            <option value="all">All Orientations</option>
            <option value="landscape">Landscape</option>
            <option value="portrait">Portrait</option>
            <option value="square">Square</option>
          </select>
        </div>

        {/* Size Filter */}
        <select
          value={size}
          onChange={(e) => onSizeChange(e.target.value as SizeFilter)}
          style={{
            background: "rgba(255, 255, 255, 0.05)",
            color: "var(--text-secondary)",
            border: "1px solid var(--border-subtle)",
            borderRadius: "8px",
            padding: "6px 12px",
            fontSize: "0.82rem",
            outline: "none",
            cursor: "pointer",
          }}
        >
          <option value="all">All Sizes</option>
          <option value="large">Large</option>
          <option value="medium">Medium</option>
          <option value="small">Small</option>
        </select>
      </div>
    </div>
  );
}
