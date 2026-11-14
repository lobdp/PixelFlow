"use client";

import React, { useState, useEffect } from "react";
import { X, Download, ExternalLink, User, Calendar, Image as ImageIcon, Video as VideoIcon, Loader2 } from "lucide-react";
import { PexelsPhoto, PexelsVideo } from "@/types/pexels";
import { downloadMedia } from "@/utils/download";

interface MediaModalProps {
  media: PexelsPhoto | PexelsVideo | null;
  type: "photo" | "video";
  onClose: () => void;
}

export default function MediaModal({ media, type, onClose }: MediaModalProps) {
  const [downloadingKey, setDownloadingKey] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!media) return null;

  const isPhoto = type === "photo";
  const photo = isPhoto ? (media as PexelsPhoto) : null;
  const video = !isPhoto ? (media as PexelsVideo) : null;

  const handleDownload = async (url: string, filename: string, key: string) => {
    setDownloadingKey(key);
    try {
      await downloadMedia(url, filename);
    } catch (err) {
      console.error("Failed to download media:", err);
    } finally {
      setTimeout(() => {
        setDownloadingKey((prev) => (prev === key ? null : prev));
      }, 1200);
    }
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(3, 5, 8, 0.92)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        animation: "fadeIn 0.25s ease-out",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "1100px",
          maxHeight: "92vh",
          display: "flex",
          flexDirection: "column",
          borderRadius: "20px",
          background: "rgba(17, 24, 39, 0.95)",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          boxShadow: "0 30px 60px -12px rgba(0, 0, 0, 0.8), 0 0 30px rgba(5, 160, 129, 0.2)",
          overflow: "hidden",
        }}
      >
        {/* Modal Top Bar */}
        <div
          style={{
            padding: "16px 24px",
            borderBottom: "1px solid var(--border-subtle)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "rgba(10, 14, 22, 0.7)",
          }}
        >
          {/* Creator Profile */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: isPhoto ? "linear-gradient(135deg, #05a081, #06b6d4)" : "linear-gradient(135deg, #6366f1, #06b6d4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
              }}
            >
              <User size={18} />
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ fontWeight: 600, color: "#ffffff", fontSize: "0.95rem" }}>
                  {isPhoto ? photo?.photographer : video?.user?.name || "Pexels Creator"}
                </span>
                <a
                  href={isPhoto ? photo?.photographer_url : video?.user?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "var(--text-muted)", display: "inline-flex" }}
                  title="View Pexels Profile"
                >
                  <ExternalLink size={14} />
                </a>
              </div>
              <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "4px" }}>
                {isPhoto ? <ImageIcon size={12} /> : <VideoIcon size={12} />}
                {isPhoto ? `Photo ID: ${photo?.id}` : `Video ID: ${video?.id}`}
              </span>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close modal"
            style={{
              background: "rgba(255, 255, 255, 0.08)",
              border: "1px solid var(--border-subtle)",
              borderRadius: "50%",
              width: "36px",
              height: "36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)")}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Media Body */}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
            background: "#07090e",
            overflow: "hidden",
            maxHeight: "calc(92vh - 160px)",
          }}
        >
          {isPhoto && photo && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={photo.src.large2x || photo.src.large || photo.src.original}
              alt={photo.alt || "Pexels Photo"}
              style={{
                maxWidth: "100%",
                maxHeight: "calc(92vh - 180px)",
                objectFit: "contain",
                borderRadius: "10px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.8)",
              }}
            />
          )}

          {!isPhoto && video && (
            <video
              src={video.video_files[0]?.link}
              controls
              autoPlay
              playsInline
              style={{
                maxWidth: "100%",
                maxHeight: "calc(92vh - 180px)",
                borderRadius: "10px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.8)",
                outline: "none",
              }}
            />
          )}
        </div>

        {/* Modal Bottom Bar: Download Options & Attribution */}
        <div
          style={{
            padding: "16px 24px",
            borderTop: "1px solid var(--border-subtle)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "12px",
            background: "rgba(10, 14, 22, 0.7)",
          }}
        >
          {/* Metadata */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
            <span>
              <strong>Dimensions:</strong> {media.width} × {media.height} px
            </span>
            {!isPhoto && video && (
              <span>
                <strong>Duration:</strong> {video.duration}s
              </span>
            )}
          </div>

          {/* Download Options */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
            {isPhoto && photo && (
              <>
                <button
                  type="button"
                  onClick={() => handleDownload(photo.src.medium, `pexels-${photo.id}-medium.jpg`, "photo-medium")}
                  disabled={downloadingKey === "photo-medium"}
                  className="btn-ghost"
                  style={{ fontSize: "0.82rem", padding: "6px 14px" }}
                >
                  {downloadingKey === "photo-medium" ? (
                    <>
                      <Loader2 size={14} className="animate-spin" /> Downloading...
                    </>
                  ) : (
                    <>
                      <Download size={14} /> Medium
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => handleDownload(photo.src.large, `pexels-${photo.id}-large.jpg`, "photo-large")}
                  disabled={downloadingKey === "photo-large"}
                  className="btn-ghost"
                  style={{ fontSize: "0.82rem", padding: "6px 14px" }}
                >
                  {downloadingKey === "photo-large" ? (
                    <>
                      <Loader2 size={14} className="animate-spin" /> Downloading...
                    </>
                  ) : (
                    <>
                      <Download size={14} /> Large
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => handleDownload(photo.src.original, `pexels-${photo.id}-original.jpg`, "photo-original")}
                  disabled={downloadingKey === "photo-original"}
                  className="btn-primary"
                  style={{ fontSize: "0.85rem", padding: "8px 18px" }}
                >
                  {downloadingKey === "photo-original" ? (
                    <>
                      <Loader2 size={15} className="animate-spin" /> Downloading...
                    </>
                  ) : (
                    <>
                      <Download size={15} /> Download Original
                    </>
                  )}
                </button>
              </>
            )}

            {!isPhoto && video && (
              <>
                {video.video_files.slice(0, 3).map((f) => {
                  const key = `video-${f.id}`;
                  const isDownloading = downloadingKey === key;
                  return (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => handleDownload(f.link, `pexels-${video.id}-${f.quality || "video"}.mp4`, key)}
                      disabled={isDownloading}
                      className={f.quality === "hd" ? "btn-primary" : "btn-ghost"}
                      style={{ fontSize: "0.82rem", padding: "6px 14px" }}
                    >
                      {isDownloading ? (
                        <>
                          <Loader2 size={14} className="animate-spin" /> Downloading...
                        </>
                      ) : (
                        <>
                          <Download size={14} /> {f.quality?.toUpperCase() || "MP4"} {f.width ? `(${f.width}p)` : ""}
                        </>
                      )}
                    </button>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
