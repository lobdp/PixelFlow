"use client";

import React, { useState, useEffect, useCallback } from "react";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import MediaTabs from "@/components/MediaTabs";
import PhotoCard from "@/components/PhotoCard";
import VideoCard from "@/components/VideoCard";
import MediaModal from "@/components/MediaModal";
import MasonryGrid from "@/components/MasonryGrid";
import Footer from "@/components/Footer";
import TrendingTopics from "@/components/TrendingTopics";
import {
  MediaType,
  OrientationFilter,
  SizeFilter,
  PexelsPhoto,
  PexelsVideo,
  PexelsPhotosResponse,
  PexelsVideosResponse,
} from "@/types/pexels";
import { Loader2, AlertCircle, RefreshCw, Sparkles, ImageOff, KeyRound, ExternalLink } from "lucide-react";

type PexelsApiResponse = PexelsPhotosResponse | PexelsVideosResponse | { error?: string };

const getApiError = (data: PexelsApiResponse) => {
  return "error" in data ? data.error : undefined;
};

const readPexelsResponse = async (res: Response): Promise<PexelsApiResponse> => {
  const contentType = res.headers.get("content-type") || "";
  const body = await res.text();

  if (!body) {
    return {};
  }

  if (!contentType.includes("application/json")) {
    const isHtml = /^\s*<!doctype\s+html/i.test(body) || /^\s*<html/i.test(body);
    if (isHtml) {
      throw new Error(
        "The media API returned an HTML page instead of JSON. Make sure the Next.js API route is available and restart the dev server if you just added it."
      );
    }

    throw new Error(body.slice(0, 180) || "The media API returned an unexpected response.");
  }

  try {
    return JSON.parse(body) as PexelsApiResponse;
  } catch {
    throw new Error("The media API returned malformed JSON.");
  }
};

export default function Home() {
  // Explorer State - default search is empty
  const [activeTab, setActiveTab] = useState<MediaType>("photos");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [orientation, setOrientation] = useState<OrientationFilter>("all");
  const [size, setSize] = useState<SizeFilter>("all");

  // Media Data State
  const [photos, setPhotos] = useState<PexelsPhoto[]>([]);
  const [videos, setVideos] = useState<PexelsVideo[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalResults, setTotalResults] = useState<number>(0);

  // Status & UI State
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [missingEnvKey, setMissingEnvKey] = useState<boolean>(false);

  // Modal State
  const [selectedMedia, setSelectedMedia] = useState<PexelsPhoto | PexelsVideo | null>(null);
  const [modalType, setModalType] = useState<"photo" | "video">("photo");

  // Main Fetch Function
  const fetchMedia = useCallback(
    async (currentPage: number, append = false) => {
      if (append) {
        setIsLoadingMore(true);
      } else {
        setIsLoading(true);
      }
      setError(null);
      setMissingEnvKey(false);

      try {
        let endpoint = "";
        if (activeTab === "photos") {
          endpoint = searchQuery ? "photos-search" : "photos-curated";
        } else {
          endpoint = searchQuery ? "videos-search" : "videos-popular";
        }

        let url = `/api/pexels?endpoint=${endpoint}&page=${currentPage}&per_page=24`;
        if (searchQuery) {
          url += `&query=${encodeURIComponent(searchQuery)}`;
        }
        if (orientation !== "all") {
          url += `&orientation=${encodeURIComponent(orientation)}`;
        }
        if (size !== "all") {
          url += `&size=${encodeURIComponent(size)}`;
        }

        const res = await fetch(url);
        const data = await readPexelsResponse(res);

        if (!res.ok) {
          const apiError = getApiError(data);
          if (res.status === 401 || (apiError && apiError.includes(".env.local"))) {
            setMissingEnvKey(true);
          }
          throw new Error(apiError || `Error ${res.status}: Failed to load media`);
        }

        if (activeTab === "photos") {
          const photoData = data as PexelsPhotosResponse;
          setPhotos((prev) => (append ? [...prev, ...photoData.photos] : photoData.photos));
          setTotalResults(photoData.total_results || 0);
        } else {
          const videoData = data as PexelsVideosResponse;
          setVideos((prev) => (append ? [...prev, ...videoData.videos] : videoData.videos));
          setTotalResults(videoData.total_results || 0);
        }

        setPage(currentPage);
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "An unexpected error occurred while fetching media.";
        setError(msg);
      } finally {
        setIsLoading(false);
        setIsLoadingMore(false);
      }
    },
    [activeTab, searchQuery, orientation, size]
  );

  // Trigger fetch when tab, query, or filters change
  useEffect(() => {
    const timeout = window.setTimeout(() => fetchMedia(1, false), 0);
    return () => window.clearTimeout(timeout);
  }, [activeTab, searchQuery, orientation, size, fetchMedia]);

  // Load More Handler
  const handleLoadMore = () => {
    fetchMedia(page + 1, true);
  };

  const handlePhotoClick = (photo: PexelsPhoto) => {
    setSelectedMedia(photo);
    setModalType("photo");
  };

  const handleVideoClick = (video: PexelsVideo) => {
    setSelectedMedia(video);
    setModalType("video");
  };

  return (
    <div style={{ minHeight: "100vh", position: "relative" }}>
      {/* Dynamic Ambient Background Glows */}
      <div className="ambient-bg">
        <div className="ambient-orb-1" />
        <div className="ambient-orb-2" />
        <div className="ambient-orb-3" />
      </div>

      {/* Global Navigation Header */}
      <Header />

      <main style={{ position: "relative", zIndex: 10, maxWidth: "1440px", margin: "0 auto", padding: "32px 24px 80px" }}>
        {/* Missing API Key Warning Callout */}
        {missingEnvKey && (
          <div
            style={{
              marginBottom: "32px",
              padding: "20px 24px",
              borderRadius: "16px",
              background: "rgba(245, 158, 11, 0.12)",
              border: "1px solid rgba(245, 158, 11, 0.35)",
              color: "#fef3c7",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.4)",
              animation: "fadeIn 0.4s ease-out",
            }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
              <KeyRound size={24} style={{ color: "#f59e0b", flexShrink: 0, marginTop: "2px" }} />
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#fbbf24", marginBottom: "6px" }}>
                  Pexels API Key Needed in .env.local
                </h3>
                <p style={{ fontSize: "0.9rem", color: "#e2e8f0", lineHeight: 1.6, marginBottom: "10px" }}>
                  Please set your Pexels API key inside the project&apos;s <code style={{ background: "rgba(0,0,0,0.4)", padding: "2px 6px", borderRadius: "4px", color: "#38bdf8" }}>.env.local</code> file:
                </p>
                <div
                  style={{
                    background: "rgba(0, 0, 0, 0.5)",
                    padding: "10px 14px",
                    borderRadius: "8px",
                    fontFamily: "monospace",
                    fontSize: "0.88rem",
                    color: "#00d6a2",
                    marginBottom: "12px",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    userSelect: "all",
                  }}
                >
                  PEXELS_API_KEY=your_actual_pexels_api_key_here
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap" }}>
                  <button
                    onClick={() => fetchMedia(1, false)}
                    className="btn-primary"
                    style={{ fontSize: "0.85rem", padding: "8px 18px" }}
                  >
                    <RefreshCw size={14} /> I&apos;ve added the key, Reload
                  </button>
                  <a
                    href="https://www.pexels.com/api/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "#38bdf8",
                      fontSize: "0.85rem",
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                      fontWeight: 500,
                    }}
                  >
                    Get a free API key from Pexels
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Hero & Search Bar Section */}
        <section style={{ marginBottom: "32px" }}>
          <div style={{ textAlign: "center", marginBottom: "28px" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "4px 14px",
                borderRadius: "9999px",
                background: "rgba(5, 160, 129, 0.12)",
                border: "1px solid rgba(5, 160, 129, 0.3)",
                fontSize: "0.82rem",
                color: "#00d6a2",
                fontWeight: 600,
                marginBottom: "12px",
              }}
            >
              <Sparkles size={14} /> Unlimited High-Res Stock Media
            </div>
            <h2
              style={{
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: "#ffffff",
                lineHeight: 1.2,
              }}
            >
              {searchQuery ? (
                <>
                  Results for <span style={{ color: "#00d6a2" }}>&ldquo;{searchQuery}&rdquo;</span>
                </>
              ) : (
                <>
                  Explore Trending <span style={{ color: "#00d6a2" }}>{activeTab === "photos" ? "Photos" : "Videos"}</span>
                </>
              )}
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "1rem", marginTop: "8px" }}>
              Search and preview millions of royalty-free assets directly from Pexels
            </p>
          </div>

          {/* Interactive Search Bar */}
          <SearchBar
            initialQuery={searchQuery}
            onSearch={(q) => setSearchQuery(q)}
            isLoading={isLoading}
          />

          {/* Trending in India, Popular & Trending Section */}
          <TrendingTopics
            onSelectTopic={(topic) => setSearchQuery(topic)}
            selectedTopic={searchQuery}
          />
        </section>

        {/* Media Tabs & Filters */}
        <MediaTabs
          activeTab={activeTab}
          onTabChange={(tab) => setActiveTab(tab)}
          orientation={orientation}
          onOrientationChange={setOrientation}
          size={size}
          onSizeChange={setSize}
          totalResults={totalResults}
          isSearch={Boolean(searchQuery)}
        />

        {/* General Error Banner (if not missing env key) */}
        {error && !missingEnvKey && (
          <div
            style={{
              padding: "16px 20px",
              borderRadius: "14px",
              background: "rgba(244, 63, 94, 0.15)",
              border: "1px solid rgba(244, 63, 94, 0.4)",
              color: "#fda4af",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "12px",
              marginBottom: "32px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <AlertCircle size={20} style={{ flexShrink: 0 }} />
              <span style={{ fontSize: "0.95rem" }}>{error}</span>
            </div>
            <button
              onClick={() => fetchMedia(1, false)}
              className="btn-ghost"
              style={{ padding: "6px 14px", fontSize: "0.85rem" }}
            >
              <RefreshCw size={14} /> Retry
            </button>
          </div>
        )}

        {/* Loading Skeletons */}
        {isLoading && (
          <div style={{ display: "flex", gap: "20px", width: "100%" }}>
            {[
              [340, 240, 380],
              [260, 420, 280],
              [400, 290, 250],
              [310, 360, 300],
            ].map((colHeights, cIdx) => (
              <div key={cIdx} style={{ display: "flex", flexDirection: "column", gap: "20px", flex: 1, minWidth: 0 }}>
                {colHeights.map((h, hIdx) => (
                  <div
                    key={hIdx}
                    className="skeleton-box"
                    style={{
                      height: `${h}px`,
                      borderRadius: "16px",
                      width: "100%",
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        )}

        {/* Empty Results State */}
        {!isLoading && !error && ((activeTab === "photos" && photos.length === 0) || (activeTab === "videos" && videos.length === 0)) && (
          <div
            style={{
              textAlign: "center",
              padding: "80px 20px",
              background: "rgba(18, 24, 38, 0.4)",
              borderRadius: "20px",
              border: "1px dashed var(--border-subtle)",
            }}
          >
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "50%",
                background: "rgba(255, 255, 255, 0.05)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--text-muted)",
                marginBottom: "16px",
              }}
            >
              <ImageOff size={32} />
            </div>
            <h3 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#ffffff", marginBottom: "8px" }}>
              No {activeTab} found
            </h3>
            <p style={{ color: "var(--text-muted)", maxWidth: "400px", margin: "0 auto 20px" }}>
              We couldn&apos;t find any matches for &ldquo;{searchQuery}&rdquo;. Try another search keyword or adjust your filters.
            </p>
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="btn-primary"
                style={{ padding: "10px 24px" }}
              >
                Clear Search & View Trending
              </button>
            )}
          </div>
        )}

        {/* Photo Results Grid with True Masonry */}
        {!isLoading && activeTab === "photos" && photos.length > 0 && (
          <div>
            <MasonryGrid
              items={photos}
              gap={20}
              getAspectRatio={(p) => p.width / p.height}
              renderItem={(photo) => (
                <PhotoCard photo={photo} onSelect={handlePhotoClick} />
              )}
            />

            {/* Load More Button */}
            {totalResults > photos.length && (
              <div style={{ textAlign: "center", marginTop: "48px" }}>
                <button
                  type="button"
                  onClick={handleLoadMore}
                  disabled={isLoadingMore}
                  className="btn-primary"
                  style={{
                    padding: "14px 36px",
                    fontSize: "1rem",
                    borderRadius: "9999px",
                    boxShadow: "0 10px 25px rgba(5, 160, 129, 0.35)",
                  }}
                >
                  {isLoadingMore ? (
                    <>
                      <Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} />
                      <span>Loading more photos...</span>
                    </>
                  ) : (
                    <span>Load More Photos</span>
                  )}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Video Results Grid with True Masonry */}
        {!isLoading && activeTab === "videos" && videos.length > 0 && (
          <div>
            <MasonryGrid
              items={videos}
              gap={20}
              getAspectRatio={(v) => (v.width && v.height) ? (v.width / v.height) : (16 / 9)}
              renderItem={(video) => (
                <VideoCard video={video} onSelect={handleVideoClick} />
              )}
            />

            {/* Load More Button */}
            {totalResults > videos.length && (
              <div style={{ textAlign: "center", marginTop: "48px" }}>
                <button
                  type="button"
                  onClick={handleLoadMore}
                  disabled={isLoadingMore}
                  className="btn-primary"
                  style={{
                    background: "linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)",
                    padding: "14px 36px",
                    fontSize: "1rem",
                    borderRadius: "9999px",
                    boxShadow: "0 10px 25px rgba(99, 102, 241, 0.35)",
                  }}
                >
                  {isLoadingMore ? (
                    <>
                      <Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} />
                      <span>Loading more videos...</span>
                    </>
                  ) : (
                    <span>Load More Videos</span>
                  )}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Lightbox / Fullscreen Modal */}
        <MediaModal
          media={selectedMedia}
          type={modalType}
          onClose={() => setSelectedMedia(null)}
        />
      </main>

      {/* Modern Footer */}
      <Footer onSelectTag={(tag) => setSearchQuery(tag)} />
    </div>
  );
}
