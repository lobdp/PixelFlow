"use client";

import React, { useState, useRef } from "react";
import { Play, Pause, Download, Maximize2, ExternalLink, User, Loader2 } from "lucide-react";
import { PexelsVideo } from "@/types/pexels";
import { downloadMedia } from "@/utils/download";

interface VideoCardProps {
  video: PexelsVideo;
  onSelect: (video: PexelsVideo) => void;
}

export default function VideoCard({ video, onSelect }: VideoCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Find a suitable preview video file (preferably SD or lowest resolution for smooth instant playback)
  const previewFile =
    video.video_files.find((f) => f.quality === "sd") ||
    video.video_files.find((f) => f.width && f.width <= 960) ||
    video.video_files[0];

  // Best video file for download
  const downloadFile =
    video.video_files.find((f) => f.quality === "hd") ||
    video.video_files.find((f) => (f.width ?? 0) >= 1920) ||
    video.video_files[0];

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => {
            // Autoplay could be restricted or interrupted
            setIsPlaying(false);
          });
      }
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!downloadFile || isDownloading) return;
    setIsDownloading(true);
    try {
      await downloadMedia(downloadFile.link, `pexels-video-${video.id}.mp4`);
    } catch (err) {
      console.error("Video download failed:", err);
    } finally {
      setTimeout(() => {
        setIsDownloading(false);
      }, 1200);
    }
  };

  return (
    <div
      onClick={() => onSelect(video)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        position: "relative",
        borderRadius: "16px",
        overflow: "hidden",
        backgroundColor: "#11141d",
        cursor: "pointer",
        transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease",
        transform: isHovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: isHovered
          ? "0 20px 30px -10px rgba(0, 0, 0, 0.7), 0 0 24px rgba(99, 102, 241, 0.3)"
          : "0 4px 14px rgba(0, 0, 0, 0.35)",
        aspectRatio: `${video.width || 16} / ${video.height || 9}`,
        width: "100%",
      }}
    >
      {/* Poster Thumbnail */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={video.image}
        alt={`Video by ${video.user?.name || "Pexels Creator"}`}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          position: "absolute",
          top: 0,
          left: 0,
          opacity: isPlaying ? 0 : 1,
          transition: "opacity 0.3s ease",
        }}
      />

      {/* Video Preview Element */}
      {previewFile && (
        <video
          ref={videoRef}
          src={previewFile.link}
          loop
          muted
          playsInline
          preload="none"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            opacity: isPlaying ? 1 : 0,
            transition: "opacity 0.3s ease",
          }}
        />
      )}

      {/* Shimmer Placeholder */}
      {!isLoaded && (
        <div
          className="skeleton-box"
          style={{
            position: "absolute",
            inset: 0,
          }}
        />
      )}

      {/* Duration & Quality Badges (Always visible when not hovering) */}
      <div
        style={{
          position: "absolute",
          bottom: "12px",
          right: "12px",
          display: isHovered ? "none" : "flex",
          alignItems: "center",
          gap: "6px",
          pointerEvents: "none",
        }}
      >
        <span
          style={{
            fontSize: "0.75rem",
            fontWeight: 600,
            color: "#ffffff",
            background: "rgba(0, 0, 0, 0.75)",
            backdropFilter: "blur(6px)",
            padding: "3px 8px",
            borderRadius: "6px",
            display: "inline-flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <Play size={10} fill="#ffffff" />
          {formatDuration(video.duration)}
        </span>
      </div>

      {/* Hover Overlay Controls */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.1) 50%, rgba(0, 0, 0, 0.4) 100%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "16px",
          opacity: isHovered ? 1 : 0,
          transition: "opacity 0.25s ease",
          pointerEvents: isHovered ? "auto" : "none",
        }}
      >
        {/* Top bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span
            style={{
              fontSize: "0.72rem",
              padding: "4px 8px",
              borderRadius: "6px",
              background: "rgba(99, 102, 241, 0.3)",
              border: "1px solid rgba(99, 102, 241, 0.5)",
              color: "#c7d2fe",
              fontWeight: 600,
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            {video.width >= 1920 ? "HD 1080p" : "SD"} • {formatDuration(video.duration)}
          </span>

          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              background: "rgba(0, 0, 0, 0.6)",
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

        {/* Center Live Indicator */}
        <div
          style={{
            alignSelf: "center",
            background: "rgba(0, 0, 0, 0.6)",
            padding: "8px 16px",
            borderRadius: "9999px",
            backdropFilter: "blur(8px)",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "0.8rem",
            color: "#ffffff",
          }}
        >
          {isPlaying ? (
            <>
              <Pause size={14} fill="#00d6a2" color="#00d6a2" />
              <span>Preview Playing</span>
            </>
          ) : (
            <>
              <Play size={14} fill="#ffffff" />
              <span>Hovering Preview</span>
            </>
          )}
        </div>

        {/* Bottom bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
          {video.user && (
            <a
              href={video.user.url}
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
              }}
            >
              <div
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  background: "rgba(99, 102, 241, 0.8)",
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
                {video.user.name}
                <ExternalLink size={11} style={{ opacity: 0.7 }} />
              </span>
            </a>
          )}

          {downloadFile && (
            <button
              type="button"
              onClick={handleDownload}
              disabled={isDownloading}
              title={isDownloading ? "Downloading..." : "Download Video File"}
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)",
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
                cursor: isDownloading ? "wait" : "pointer",
                boxShadow: "0 4px 12px rgba(99, 102, 241, 0.4)",
                transition: "transform 0.2s ease",
              }}
              onMouseEnter={(e) => {
                if (!isDownloading) e.currentTarget.style.transform = "scale(1.1)";
              }}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              {isDownloading ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
