import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "PixelFlow Studio — Discover High-Quality Free Stock Photos & Videos",
  description:
    "Explore millions of free stock photos and royalty-free cinematic videos powered by Pexels API. Features live video previews, high-resolution downloads, and curated collections.",
  keywords: ["PixelFlow", "Stock Photos", "Royalty Free Videos", "Stock Photography", "Free 4K Footage"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
