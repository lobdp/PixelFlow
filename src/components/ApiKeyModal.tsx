"use client";

import React, { useState } from "react";
import { KeyRound, Eye, EyeOff, Sparkles, ExternalLink, ArrowRight, ShieldCheck, Loader2 } from "lucide-react";

interface ApiKeyModalProps {
  onApiKeySubmit: (key: string) => Promise<boolean> | boolean;
  isVerifying?: boolean;
}

export default function ApiKeyModal({ onApiKeySubmit, isVerifying = false }: ApiKeyModalProps) {
  const [inputKey, setInputKey] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [validating, setValidating] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanKey = inputKey.trim();

    if (!cleanKey) {
      setErrorMessage("Please enter a valid Pexels API key.");
      return;
    }

    setErrorMessage("");
    setValidating(true);

    try {
      const isValid = await onApiKeySubmit(cleanKey);
      if (!isValid) {
        setErrorMessage("Invalid Pexels API key or connection failed. Please verify your key.");
      }
    } catch {
      setErrorMessage("Failed to validate API key. Please check your network and try again.");
    } finally {
      setValidating(false);
    }
  };

  const isLoading = validating || isVerifying;

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "calc(100vh - 80px)",
      padding: "24px 16px",
      position: "relative",
      zIndex: 10,
    }}>
      <div
        className="glass-card"
        style={{
          width: "100%",
          maxWidth: "520px",
          padding: "40px 36px",
          borderRadius: "24px",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          background: "rgba(13, 17, 23, 0.8)",
          backdropFilter: "blur(24px)",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 40px rgba(5, 160, 129, 0.15)",
          animation: "fadeIn 0.5s ease-out",
        }}
      >
        {/* Header Badge */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
          <div style={{
            width: "48px",
            height: "48px",
            borderRadius: "14px",
            background: "linear-gradient(135deg, rgba(5, 160, 129, 0.25) 0%, rgba(6, 182, 212, 0.2) 100%)",
            border: "1px solid rgba(5, 160, 129, 0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#00d6a2",
          }}>
            <KeyRound size={24} />
          </div>
          <div>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "3px 10px",
              borderRadius: "9999px",
              background: "rgba(5, 160, 129, 0.15)",
              border: "1px solid rgba(5, 160, 129, 0.3)",
              fontSize: "0.75rem",
              fontWeight: 600,
              color: "#00d6a2",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              marginBottom: "4px",
            }}>
              <Sparkles size={12} /> Authentication
            </div>
            <h1 style={{ fontSize: "1.6rem", fontWeight: 700, color: "#ffffff", lineHeight: 1.2 }}>
              Pexels Explorer
            </h1>
          </div>
        </div>

        <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: "28px" }}>
          Paste your Pexels API key below to unlock millions of high-resolution stock photos and videos.
        </p>

        {/* Input Form */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div>
            <label
              htmlFor="pexels-api-key"
              style={{
                display: "block",
                fontSize: "0.85rem",
                fontWeight: 600,
                color: "var(--text-secondary)",
                marginBottom: "8px",
                letterSpacing: "0.02em",
              }}
            >
              PEXELS API KEY
            </label>
            <div style={{ position: "relative" }}>
              <input
                id="pexels-api-key"
                type={showKey ? "text" : "password"}
                value={inputKey}
                onChange={(e) => {
                  setInputKey(e.target.value);
                  if (errorMessage) setErrorMessage("");
                }}
                placeholder="Paste your 56-character Pexels API key here..."
                className="modern-input"
                style={{
                  paddingRight: "50px",
                  fontSize: "0.9rem",
                  fontFamily: showKey ? "inherit" : "monospace",
                  letterSpacing: showKey ? "normal" : "0.15em",
                }}
                autoFocus
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                aria-label={showKey ? "Hide API Key" : "Show API Key"}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  color: "var(--text-muted)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "6px",
                  borderRadius: "6px",
                  transition: "color 0.2s",
                }}
              >
                {showKey ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {errorMessage && (
              <div style={{
                marginTop: "10px",
                padding: "10px 14px",
                borderRadius: "10px",
                background: "rgba(244, 63, 94, 0.12)",
                border: "1px solid rgba(244, 63, 94, 0.3)",
                color: "#fb7185",
                fontSize: "0.85rem",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}>
                <span>⚠️ {errorMessage}</span>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading || !inputKey.trim()}
            className="btn-primary"
            style={{
              width: "100%",
              padding: "14px 24px",
              fontSize: "1rem",
              borderRadius: "14px",
              marginTop: "6px",
            }}
          >
            {isLoading ? (
              <>
                <Loader2 size={18} className="animate-spin" style={{ animation: "spin 1s linear infinite" }} />
                <span>Verifying Key...</span>
              </>
            ) : (
              <>
                <span>Submit & Explore</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        {/* Security & Memory note */}
        <div style={{
          marginTop: "24px",
          padding: "14px 16px",
          borderRadius: "12px",
          background: "rgba(255, 255, 255, 0.03)",
          border: "1px solid var(--border-subtle)",
          display: "flex",
          gap: "12px",
          alignItems: "flex-start",
        }}>
          <ShieldCheck size={18} style={{ color: "#00d6a2", flexShrink: 0, marginTop: "2px" }} />
          <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", lineHeight: 1.5 }}>
            <strong style={{ color: "var(--text-secondary)" }}>Session-Only Memory:</strong> Your API key is held strictly in memory state. It is never written to localStorage or cookies and will clear when you close the tab.
          </p>
        </div>

        {/* Pexels API link */}
        <div style={{
          marginTop: "20px",
          textAlign: "center",
          fontSize: "0.85rem",
          color: "var(--text-muted)",
        }}>
          Don&apos;t have an API key?{" "}
          <a
            href="https://www.pexels.com/api/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#00d6a2",
              textDecoration: "none",
              fontWeight: 500,
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            Get a free Pexels API Key
            <ExternalLink size={13} />
          </a>
        </div>
      </div>
    </div>
  );
}
