"use client";

import React from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function Header() {
  return (
    <header className="glass-header">
      <div
        style={{
          maxWidth: "1440px",
          margin: "0 auto",
          padding: "16px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
        }}
      >
        {/* Brand Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #05a081 0%, #06b6d4 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              boxShadow: "0 4px 14px rgba(5, 160, 129, 0.4)",
            }}
          >
            <Sparkles size={20} />
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <h1 style={{ fontSize: "1.25rem", fontWeight: 700, letterSpacing: "-0.02em", color: "#ffffff" }}>
                Pixel<span style={{ color: "#00d6a2", fontWeight: 500 }}>Flow</span>
              </h1>
              <span
                style={{
                  fontSize: "0.68rem",
                  padding: "2px 7px",
                  borderRadius: "9999px",
                  background: "rgba(5, 160, 129, 0.15)",
                  border: "1px solid rgba(5, 160, 129, 0.3)",
                  color: "#00d6a2",
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                }}
              >
                STUDIO
              </span>
            </div>
            <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "1px" }}>
              Curated Royalty-Free Media
            </p>
          </div>
        </div>

        <Link href="/create" className="btn-primary header-create-button">
          <Sparkles size={16} />
          AI Create
        </Link>

      </div>
    </header>
  );
}
