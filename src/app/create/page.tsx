import type { Metadata } from "next";
import AICreateStudio from "@/components/AICreateStudio";

export const metadata: Metadata = {
  title: "AI Studio | PixelFlow",
  description: "Create purposeful AI visuals for banners, campaigns, and creative projects.",
};

export default function CreatePage() {
  return <AICreateStudio />;
}
