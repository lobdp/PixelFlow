"use client";

import React from "react";
import { Sparkles, ArrowUp, Heart, ExternalLink, ShieldCheck, Camera, Video, Compass } from "lucide-react";

interface FooterProps {
  onSelectTag?: (tag: string) => void;
}

export default function Footer({ onSelectTag }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const sampleTags = ["Cyberpunk", "Ocean Waves", "Tokyo Night", "Wildlife", "Minimalist Architecture", "Aerial View"];

  return (
    <footer
      style={{
        marginTop: "100px",
        background: "rgba(10, 14, 22, 0.85)",
        borderTop: "1px solid var(--border-subtle)",
        backdropFilter: "blur(20px)",
        position: "relative",
        zIndex: 10,
      }}
    >
      <div
        style={{
          maxWidth: "1440px",
          margin: "0 auto",
          padding: "64px 24px 36px",
        }}
      >
        {/* Main Footer Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "48px 32px",
            marginBottom: "56px",
          }}
        >
          {/* Brand & Description */}
          <div style={{ maxWidth: "380px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              <div
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "12px",
                  background: "linear-gradient(135deg, #05a081 0%, #06b6d4 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff",
                  boxShadow: "0 4px 16px rgba(5, 160, 129, 0.4)",
                }}
              >
                <Sparkles size={22} />
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ fontSize: "1.35rem", fontWeight: 800, letterSpacing: "-0.03em", color: "#ffffff" }}>
                    Pixel<span style={{ color: "#00d6a2" }}>Flow</span>
                  </span>
                  <span
                    style={{
                      fontSize: "0.68rem",
                      padding: "2px 7px",
                      borderRadius: "9999px",
                      background: "rgba(5, 160, 129, 0.15)",
                      border: "1px solid rgba(5, 160, 129, 0.3)",
                      color: "#00d6a2",
                      fontWeight: 600,
                    }}
                  >
                    STUDIO
                  </span>
                </div>
                <p style={{ fontSize: "0.76rem", color: "var(--text-muted)" }}>
                  Curated Royalty-Free Media Platform
                </p>
              </div>
            </div>

            <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.6, marginBottom: "20px" }}>
              Discover, preview, and download millions of world-class stock photos and cinematic video footage for your creative projects, completely free.
            </p>

            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 14px",
                borderRadius: "10px",
                background: "rgba(255, 255, 255, 0.04)",
                border: "1px solid var(--border-subtle)",
                fontSize: "0.82rem",
                color: "var(--text-muted)",
              }}
            >
              <ShieldCheck size={16} style={{ color: "#00d6a2" }} />
              <span>Free for Commercial & Personal Use</span>
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h4
              style={{
                fontSize: "0.95rem",
                fontWeight: 700,
                color: "#ffffff",
                marginBottom: "18px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <Compass size={16} style={{ color: "#00d6a2" }} /> Explore Content
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
              <li>
                <span
                  style={{
                    color: "var(--text-secondary)",
                    fontSize: "0.88rem",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <Camera size={14} style={{ color: "#06b6d4" }} /> Curated High-Res Photos
                </span>
              </li>
              <li>
                <span
                  style={{
                    color: "var(--text-secondary)",
                    fontSize: "0.88rem",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <Video size={14} style={{ color: "#6366f1" }} /> Cinematic 4K & HD Videos
                </span>
              </li>
              <li>
                <span style={{ color: "var(--text-secondary)", fontSize: "0.88rem" }}>
                  Live Hover Playback Previews
                </span>
              </li>
              <li>
                <span style={{ color: "var(--text-secondary)", fontSize: "0.88rem" }}>
                  Orientation & Size Filters
                </span>
              </li>
              <li>
                <span style={{ color: "var(--text-secondary)", fontSize: "0.88rem" }}>
                  Instant High-Res Downloads
                </span>
              </li>
            </ul>
          </div>

          {/* Popular Search Tags */}
          <div>
            <h4
              style={{
                fontSize: "0.95rem",
                fontWeight: 700,
                color: "#ffffff",
                marginBottom: "18px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <Sparkles size={16} style={{ color: "#00d6a2" }} /> Popular Topics
            </h4>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {sampleTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => {
                    if (onSelectTag) onSelectTag(tag);
                    scrollToTop();
                  }}
                  style={{
                    background: "rgba(255, 255, 255, 0.04)",
                    border: "1px solid var(--border-subtle)",
                    borderRadius: "9999px",
                    padding: "6px 14px",
                    fontSize: "0.82rem",
                    color: "var(--text-secondary)",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(5, 160, 129, 0.5)";
                    e.currentTarget.style.color = "#00d6a2";
                    e.currentTarget.style.background = "rgba(5, 160, 129, 0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--border-subtle)";
                    e.currentTarget.style.color = "var(--text-secondary)";
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.04)";
                  }}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Attribution & Legal */}
          <div>
            <h4
              style={{
                fontSize: "0.95rem",
                fontWeight: 700,
                color: "#ffffff",
                marginBottom: "18px",
              }}
            >
              Attribution & Terms
            </h4>
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.6, marginBottom: "14px" }}>
              All photos and video assets are licensed under the Pexels License. Respect creators by attributing them when required.
            </p>
            <a
              href="https://www.pexels.com/license/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#00d6a2",
                fontSize: "0.85rem",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                fontWeight: 500,
              }}
            >
              <span>Learn about Pexels License</span>
              <ExternalLink size={13} />
            </a>
          </div>
        </div>

        {/* Bottom Copyright & Back to Top */}
        <div
          style={{
            paddingTop: "28px",
            borderTop: "1px solid var(--border-subtle)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.85rem", color: "var(--text-muted)" }}>
            <span>© 2026 PixelFlow Studio. Powered by Pexels API. Made with</span>
            <Heart size={14} style={{ color: "#f43f5e", fill: "#f43f5e" }} />
            <span>for creators worldwide.</span>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="btn-ghost"
            style={{
              padding: "8px 18px",
              fontSize: "0.84rem",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span>Back to Top</span>
            <ArrowUp size={15} />
          </button>
        </div>
      </div>
    </footer>
  );
}
