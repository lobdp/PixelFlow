"use client";

import React, { useState } from "react";
import { Download, Maximize2, ExternalLink, User, Loader2 } from "lucide-react";
import { PexelsPhoto } from "@/types/pexels";
import { downloadMedia } from "@/utils/download";

interface PhotoCardProps {
  photo: PexelsPhoto;
  onSelect: (photo: PexelsPhoto) => void;
}

export default function PhotoCard({ photo, onSelect }: PhotoCardProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isDownloading) return;
    setIsDownloading(true);
    try {
      await downloadMedia(photo.src.original, `pexels-photo-${photo.id}.jpg`);
    } catch (err) {
      console.error("Download failed:", err);
    } finally {
      setTimeout(() => {
        setIsDownloading(false);
      }, 1200);
    }
  };

  return (
    <div
      onClick={() => onSelect(photo)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: "relative",
        borderRadius: "16px",
        overflow: "hidden",
        backgroundColor: photo.avg_color || "#171b26",
        cursor: "pointer",
        transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease",
        transform: isHovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: isHovered
          ? "0 20px 30px -10px rgba(0, 0, 0, 0.6), 0 0 20px rgba(5, 160, 129, 0.25)"
          : "0 4px 14px rgba(0, 0, 0, 0.3)",
        aspectRatio: `${photo.width} / ${photo.height}`,
        width: "100%",
      }}
    >
      {/* Photo Image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={photo.src.large || photo.src.medium}
        alt={photo.alt || `Photo by ${photo.photographer}`}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          transition: "opacity 0.4s ease, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
          opacity: isLoaded ? 1 : 0,
          transform: isHovered ? "scale(1.04)" : "scale(1)",
        }}
      />

      {/* Shimmer Placeholder while loading */}
      {!isLoaded && (
        <div
          className="skeleton-box"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        />
      )}

      {/* Hover Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.2) 50%, rgba(0, 0, 0, 0.4) 100%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "16px",
          opacity: isHovered ? 1 : 0,
          transition: "opacity 0.25s ease",
          pointerEvents: isHovered ? "auto" : "none",
        }}
      >
        {/* Top bar: Expand & Info */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span
            style={{
              fontSize: "0.72rem",
              padding: "4px 8px",
              borderRadius: "6px",
              background: "rgba(0, 0, 0, 0.5)",
              backdropFilter: "blur(8px)",
              color: "#e2e8f0",
              fontWeight: 500,
            }}
          >
            {photo.width} × {photo.height}
          </span>

          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              background: "rgba(0, 0, 0, 0.5)",
              backdropFilter: "blur(8px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
            }}
          >
            <Maximize2 size={15} />
          </div>
        </div>

        {/* Bottom bar: Photographer info and Download action */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
          <a
            href={photo.photographer_url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "#ffffff",
              textDecoration: "none",
              fontSize: "0.88rem",
              fontWeight: 600,
              maxWidth: "70%",
              textShadow: "0 1px 4px rgba(0,0,0,0.8)",
            }}
          >
            <div
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                background: "rgba(5, 160, 129, 0.8)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <User size={14} color="#ffffff" />
            </div>
            <span
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              {photo.photographer}
              <ExternalLink size={11} style={{ opacity: 0.7 }} />
            </span>
          </a>

          <button
            type="button"
            onClick={handleDownload}
            disabled={isDownloading}
            title={isDownloading ? "Downloading..." : "Download Original Photo"}
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #05a081 0%, #00d6a2 100%)",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              cursor: isDownloading ? "wait" : "pointer",
              boxShadow: "0 4px 12px rgba(5, 160, 129, 0.5)",
              transition: "transform 0.2s ease",
            }}
            onMouseEnter={(e) => {
              if (!isDownloading) e.currentTarget.style.transform = "scale(1.1)";
            }}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            {isDownloading ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
          </button>
        </div>
      </div>
    </div>
  );
}
