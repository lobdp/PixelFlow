"use client";

import React, { useState, useRef } from "react";
import { ChevronRight, ChevronLeft, Globe } from "lucide-react";

interface TopicItem {
  name: string;
  count: string;
  image: string;
}

interface TrendingTopicsProps {
  onSelectTopic: (topic: string) => void;
  selectedTopic?: string;
}

const TRENDING_INDIA: TopicItem[] = [
  {
    name: "Ganesh Murti",
    count: "4K",
    image: "https://images.pexels.com/photos/5417837/pexels-photo-5417837.jpeg?auto=compress&cs=tinysrgb&w=80",
  },
  {
    name: "Bakery",
    count: "4K",
    image: "https://images.pexels.com/photos/1855214/pexels-photo-1855214.jpeg?auto=compress&cs=tinysrgb&w=80",
  },
  {
    name: "Onam",
    count: "5K",
    image: "https://images.pexels.com/photos/5604944/pexels-photo-5604944.jpeg?auto=compress&cs=tinysrgb&w=80",
  },
  {
    name: "Indian Flag",
    count: "109K",
    image: "https://images.pexels.com/photos/1485657/pexels-photo-1485657.jpeg?auto=compress&cs=tinysrgb&w=80",
  },
  {
    name: "Close-Up",
    count: "725K",
    image: "https://images.pexels.com/photos/2681751/pexels-photo-2681751.jpeg?auto=compress&cs=tinysrgb&w=80",
  },
  {
    name: "Varanasi",
    count: "5K",
    image: "https://images.pexels.com/photos/8141253/pexels-photo-8141253.jpeg?auto=compress&cs=tinysrgb&w=80",
  },
  {
    name: "Shiv Ji",
    count: "5K",
    image: "https://images.pexels.com/photos/12330752/pexels-photo-12330752.jpeg?auto=compress&cs=tinysrgb&w=80",
  },
  {
    name: "Durga Puja",
    count: "5K",
    image: "https://images.pexels.com/photos/9783353/pexels-photo-9783353.jpeg?auto=compress&cs=tinysrgb&w=80",
  },
  {
    name: "Supercar",
    count: "12K",
    image: "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=80",
  },
  {
    name: "Taj Mahal",
    count: "35K",
    image: "https://images.pexels.com/photos/1603650/pexels-photo-1603650.jpeg?auto=compress&cs=tinysrgb&w=80",
  },
];

const TRENDING_GLOBAL: TopicItem[] = [
  {
    name: "Tokyo Night",
    count: "22K",
    image: "https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=80",
  },
  {
    name: "New York City",
    count: "150K",
    image: "https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=80",
  },
  {
    name: "Northern Lights",
    count: "45K",
    image: "https://images.pexels.com/photos/1933316/pexels-photo-1933316.jpeg?auto=compress&cs=tinysrgb&w=80",
  },
  {
    name: "Desert Dunes",
    count: "28K",
    image: "https://images.pexels.com/photos/1001435/pexels-photo-1001435.jpeg?auto=compress&cs=tinysrgb&w=80",
  },
  {
    name: "Paris Eiffel",
    count: "88K",
    image: "https://images.pexels.com/photos/532826/pexels-photo-532826.jpeg?auto=compress&cs=tinysrgb&w=80",
  },
  {
    name: "Ocean Sunset",
    count: "320K",
    image: "https://images.pexels.com/photos/189349/pexels-photo-189349.jpeg?auto=compress&cs=tinysrgb&w=80",
  },
  {
    name: "Deep Space",
    count: "95K",
    image: "https://images.pexels.com/photos/2150/sky-space-dark-galaxy.jpg?auto=compress&cs=tinysrgb&w=80",
  },
];

const POPULAR_ITEMS: TopicItem[] = [
  {
    name: "Wallpaper",
    count: "69K",
    image: "https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=80",
  },
  {
    name: "Background",
    count: "583K",
    image: "https://images.pexels.com/photos/255379/pexels-photo-255379.jpeg?auto=compress&cs=tinysrgb&w=80",
  },
  {
    name: "Flowers",
    count: "318K",
    image: "https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg?auto=compress&cs=tinysrgb&w=80",
  },
  {
    name: "Landscape",
    count: "412K",
    image: "https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg?auto=compress&cs=tinysrgb&w=80",
  },
  {
    name: "Nature",
    count: "890K",
    image: "https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=80",
  },
  {
    name: "Architecture",
    count: "150K",
    image: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=80",
  },
  {
    name: "Cityscape",
    count: "240K",
    image: "https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg?auto=compress&cs=tinysrgb&w=80",
  },
  {
    name: "Moody Texture",
    count: "180K",
    image: "https://images.pexels.com/photos/2387793/pexels-photo-2387793.jpeg?auto=compress&cs=tinysrgb&w=80",
  },
];

const TRENDING_ITEMS: TopicItem[] = [
  {
    name: "Autumn Forest",
    count: "481K",
    image: "https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?auto=compress&cs=tinysrgb&w=80",
  },
  {
    name: "Christmas",
    count: "38K",
    image: "https://images.pexels.com/photos/1303081/pexels-photo-1303081.jpeg?auto=compress&cs=tinysrgb&w=80",
  },
  {
    name: "Back To School",
    count: "127K",
    image: "https://images.pexels.com/photos/5088188/pexels-photo-5088188.jpeg?auto=compress&cs=tinysrgb&w=80",
  },
  {
    name: "Cyberpunk",
    count: "35K",
    image: "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=80",
  },
  {
    name: "Wildlife",
    count: "190K",
    image: "https://images.pexels.com/photos/247431/pexels-photo-247431.jpeg?auto=compress&cs=tinysrgb&w=80",
  },
  {
    name: "Drone Aerial",
    count: "82K",
    image: "https://images.pexels.com/photos/1438761/pexels-photo-1438761.jpeg?auto=compress&cs=tinysrgb&w=80",
  },
  {
    name: "Rain Window",
    count: "115K",
    image: "https://images.pexels.com/photos/7002970/pexels-photo-7002970.jpeg?auto=compress&cs=tinysrgb&w=80",
  },
  {
    name: "Neon Lights",
    count: "64K",
    image: "https://images.pexels.com/photos/2246476/pexels-photo-2246476.jpeg?auto=compress&cs=tinysrgb&w=80",
  },
];

export default function TrendingTopics({ onSelectTopic, selectedTopic = "" }: TrendingTopicsProps) {
  const [isGlobal, setIsGlobal] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const popularScrollRef = useRef<HTMLDivElement>(null);
  const trendingScrollRef = useRef<HTMLDivElement>(null);

  const activeTrendingList = isGlobal ? TRENDING_GLOBAL : TRENDING_INDIA;

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const amount = direction === "left" ? -350 : 350;
      scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  const scrollPopular = (direction: "left" | "right") => {
    if (popularScrollRef.current) {
      const amount = direction === "left" ? -280 : 280;
      popularScrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  const scrollTrending = (direction: "left" | "right") => {
    if (trendingScrollRef.current) {
      const amount = direction === "left" ? -280 : 280;
      trendingScrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  const renderPill = (item: TopicItem) => {
    const isSelected = selectedTopic.toLowerCase() === item.name.toLowerCase();

    return (
      <button
        key={item.name}
        type="button"
        onClick={() => onSelectTopic(item.name)}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "10px",
          background: isSelected ? "rgba(5, 160, 129, 0.22)" : "rgba(255, 255, 255, 0.05)",
          border: isSelected ? "1px solid #00d6a2" : "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: "9999px",
          padding: "5px 16px 5px 5px",
          cursor: "pointer",
          flexShrink: 0,
          transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
          boxShadow: isSelected ? "0 0 15px rgba(5, 160, 129, 0.3)" : "none",
        }}
        onMouseEnter={(e) => {
          if (!isSelected) {
            e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.25)";
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.09)";
            e.currentTarget.style.transform = "translateY(-1px)";
          }
        }}
        onMouseLeave={(e) => {
          if (!isSelected) {
            e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
            e.currentTarget.style.transform = "translateY(0)";
          }
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            objectFit: "cover",
            display: "block",
            border: "1px solid rgba(255, 255, 255, 0.15)",
          }}
          onError={(e) => {
            (e.target as HTMLElement).style.display = "none";
          }}
        />
        <span
          style={{
            fontSize: "0.88rem",
            fontWeight: 600,
            color: isSelected ? "#00d6a2" : "#f1f5f9",
            whiteSpace: "nowrap",
          }}
        >
          {item.name}
        </span>
        <span
          style={{
            fontSize: "0.75rem",
            color: "var(--text-muted)",
            fontWeight: 500,
            whiteSpace: "nowrap",
          }}
        >
          {item.count}
        </span>
      </button>
    );
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "1280px",
        margin: "24px auto 0",
        display: "flex",
        flexDirection: "column",
        gap: "14px",
      }}
    >
      {/* 1. Top Section: Trending in India / Around the World */}
      <div
        className="glass-card"
        style={{
          borderRadius: "18px",
          padding: "16px 20px",
          background: "rgba(18, 24, 38, 0.6)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          backdropFilter: "blur(16px)",
          position: "relative",
        }}
      >
        {/* Section Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "14px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "0.95rem", fontWeight: 700, color: "#ffffff" }}>
              {isGlobal ? "Trending Worldwide" : "Trending in"}
            </span>
            {!isGlobal && (
              <span
                style={{
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  color: "#00d6a2",
                  background: "rgba(5, 160, 129, 0.15)",
                  padding: "2px 7px",
                  borderRadius: "6px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                🇮🇳 India
              </span>
            )}
            {isGlobal && (
              <span
                style={{
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  color: "#38bdf8",
                  background: "rgba(56, 189, 248, 0.15)",
                  padding: "2px 7px",
                  borderRadius: "6px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <Globe size={11} /> Global
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={() => setIsGlobal(!isGlobal)}
            style={{
              background: "none",
              border: "none",
              color: "var(--text-secondary)",
              fontSize: "0.82rem",
              fontWeight: 500,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              padding: "4px 8px",
              borderRadius: "6px",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
          >
            <span>{isGlobal ? "Trending in India" : "Around the world"}</span>
            <ChevronRight size={14} />
          </button>
        </div>

        {/* Scrollable Pills Container */}
        <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
          {/* Scroll Left Button */}
          <button
            type="button"
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            style={{
              position: "absolute",
              left: "-12px",
              zIndex: 2,
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              background: "rgba(18, 24, 38, 0.95)",
              border: "1px solid rgba(255, 255, 255, 0.18)",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(0,0,0,0.6)",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#00d6a2";
              e.currentTarget.style.transform = "scale(1.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.18)";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <ChevronLeft size={16} />
          </button>

          <div
            ref={scrollRef}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              overflowX: "auto",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              padding: "4px 2px",
              width: "100%",
            }}
          >
            {activeTrendingList.map(renderPill)}
          </div>

          {/* Scroll Right Button */}
          <button
            type="button"
            onClick={() => scroll("right")}
            aria-label="Scroll right"
            style={{
              position: "absolute",
              right: "-12px",
              zIndex: 2,
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              background: "rgba(18, 24, 38, 0.95)",
              border: "1px solid rgba(255, 255, 255, 0.18)",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(0,0,0,0.6)",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#00d6a2";
              e.currentTarget.style.transform = "scale(1.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.18)";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* 2. Bottom Two Sections: Popular & Trending Side-by-Side with Scroll Arrows */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "14px",
        }}
      >
        {/* Popular Card with Scroll Arrows */}
        <div
          className="glass-card"
          style={{
            borderRadius: "18px",
            padding: "16px 20px",
            background: "rgba(18, 24, 38, 0.6)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            backdropFilter: "blur(16px)",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "14px",
            }}
          >
            <span style={{ fontSize: "0.95rem", fontWeight: 700, color: "#ffffff" }}>
              Popular
            </span>
            <button
              type="button"
              onClick={() => onSelectTopic("Popular Wallpaper")}
              style={{
                background: "none",
                border: "none",
                color: "var(--text-secondary)",
                fontSize: "0.82rem",
                fontWeight: 500,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <span>See more</span>
              <ChevronRight size={14} />
            </button>
          </div>

          {/* Scrollable Container with Left and Right Arrows */}
          <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
            <button
              type="button"
              onClick={() => scrollPopular("left")}
              aria-label="Scroll Popular left"
              style={{
                position: "absolute",
                left: "-12px",
                zIndex: 2,
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                background: "rgba(18, 24, 38, 0.95)",
                border: "1px solid rgba(255, 255, 255, 0.18)",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(0,0,0,0.6)",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#00d6a2";
                e.currentTarget.style.transform = "scale(1.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.18)";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              <ChevronLeft size={15} />
            </button>

            <div
              ref={popularScrollRef}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                overflowX: "auto",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                padding: "4px 2px",
                width: "100%",
              }}
            >
              {POPULAR_ITEMS.map(renderPill)}
            </div>

            <button
              type="button"
              onClick={() => scrollPopular("right")}
              aria-label="Scroll Popular right"
              style={{
                position: "absolute",
                right: "-12px",
                zIndex: 2,
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                background: "rgba(18, 24, 38, 0.95)",
                border: "1px solid rgba(255, 255, 255, 0.18)",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(0,0,0,0.6)",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#00d6a2";
                e.currentTarget.style.transform = "scale(1.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.18)";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              <ChevronRight size={15} />
            </button>
          </div>
        </div>

        {/* Trending Card with Scroll Arrows */}
        <div
          className="glass-card"
          style={{
            borderRadius: "18px",
            padding: "16px 20px",
            background: "rgba(18, 24, 38, 0.6)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            backdropFilter: "blur(16px)",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "14px",
            }}
          >
            <span style={{ fontSize: "0.95rem", fontWeight: 700, color: "#ffffff" }}>
              Trending
            </span>
            <button
              type="button"
              onClick={() => onSelectTopic("Trending")}
              style={{
                background: "none",
                border: "none",
                color: "var(--text-secondary)",
                fontSize: "0.82rem",
                fontWeight: 500,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <span>See more</span>
              <ChevronRight size={14} />
            </button>
          </div>

          {/* Scrollable Container with Left and Right Arrows */}
          <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
            <button
              type="button"
              onClick={() => scrollTrending("left")}
              aria-label="Scroll Trending left"
              style={{
                position: "absolute",
                left: "-12px",
                zIndex: 2,
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                background: "rgba(18, 24, 38, 0.95)",
                border: "1px solid rgba(255, 255, 255, 0.18)",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(0,0,0,0.6)",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#00d6a2";
                e.currentTarget.style.transform = "scale(1.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.18)";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              <ChevronLeft size={15} />
            </button>

            <div
              ref={trendingScrollRef}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                overflowX: "auto",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                padding: "4px 2px",
                width: "100%",
              }}
            >
              {TRENDING_ITEMS.map(renderPill)}
            </div>

            <button
              type="button"
              onClick={() => scrollTrending("right")}
              aria-label="Scroll Trending right"
              style={{
                position: "absolute",
                right: "-12px",
                zIndex: 2,
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                background: "rgba(18, 24, 38, 0.95)",
                border: "1px solid rgba(255, 255, 255, 0.18)",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(0,0,0,0.6)",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#00d6a2";
                e.currentTarget.style.transform = "scale(1.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.18)";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
