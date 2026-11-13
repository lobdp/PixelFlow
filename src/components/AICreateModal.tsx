"use client";

import { FormEvent, useEffect, useState } from "react";
import { Download, Loader2, Sparkles, X } from "lucide-react";

interface AICreateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const styles = ["Realistic", "Cinematic", "Illustration", "3D Render", "Anime"];
const ratios = [
  { label: "Square", value: "1024x1024" },
  { label: "Portrait", value: "1024x1536" },
  { label: "Landscape", value: "1536x1024" },
];
const useCases = ["Website hero banner", "Social media post", "Ads poster", "Product campaign", "Blog / editorial", "Presentation"];
const purposes = ["Promote a product", "Set a mood", "Show a lifestyle", "Explain a concept", "Build a brand visual", "Create a background"];
const positions = ["Centered subject", "Subject on the left", "Subject on the right", "Wide scene with open space", "Close-up detail"];
const overlayOptions = ["No text overlay", "Text overlay on image", "UI / product mockup space"];
const textSpaces = ["Left side", "Right side", "Top area", "Bottom area", "No reserved space"];
const moods = ["Clean and bright", "Bold and energetic", "Premium and elegant", "Warm and friendly", "Dark and dramatic", "Calm and minimal"];

interface SelectFieldProps {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

function SelectField({ label, value, options, onChange }: SelectFieldProps) {
  return (
    <label className="ai-select-field">
      <span className="ai-field-label">{label}</span>
      <select className="ai-select" value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => <option key={option}>{option}</option>)}
      </select>
    </label>
  );
}

export default function AICreateModal({ isOpen, onClose }: AICreateModalProps) {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("Realistic");
  const [size, setSize] = useState("1024x1024");
  const [useCase, setUseCase] = useState(useCases[0]);
  const [purpose, setPurpose] = useState(purposes[0]);
  const [position, setPosition] = useState(positions[0]);
  const [overlay, setOverlay] = useState(overlayOptions[1]);
  const [textSpace, setTextSpace] = useState(textSpaces[0]);
  const [mood, setMood] = useState(moods[0]);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const masterPrompt = [
    prompt.trim() || "A compelling visual scene",
    `created for a ${useCase.toLowerCase()}`,
    `to ${purpose.toLowerCase()}`,
    `${style.toLowerCase()} style with a ${mood.toLowerCase()} mood`,
    `composition: ${position.toLowerCase()}`,
    overlay.toLowerCase(),
    textSpace === "No reserved space" ? "do not reserve copy space" : `leave clean negative space on the ${textSpace.toLowerCase()} for readable text`,
    "professional composition, strong visual hierarchy, polished details, no watermark",
  ].join(", ");

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!prompt.trim()) {
      setError("Describe the main subject or idea first.");
      return;
    }
    setIsGenerating(true);
    setError(null);
    setImageUrl(null);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: masterPrompt, style, size }),
      });
      const data = (await response.json()) as { imageUrl?: string; error?: string };
      if (!response.ok) throw new Error(data.error || "Image generation failed.");
      setImageUrl(data.imageUrl || null);
    } catch (generationError) {
      setError(generationError instanceof Error ? generationError.message : "Image generation failed.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!imageUrl) return;
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = "pixelflow-ai-image.png";
    link.click();
  };

  return (
    <div className="ai-modal-backdrop" onClick={onClose}>
      <section className="ai-modal" onClick={(event) => event.stopPropagation()} aria-labelledby="ai-modal-title">
        <div className="ai-modal-header">
          <div>
            <div className="ai-modal-kicker"><Sparkles size={14} /> AI Studio</div>
            <h2 id="ai-modal-title">Create an image</h2>
            <p>Build a creative brief, then turn it into a production-ready visual.</p>
          </div>
          <button type="button" className="icon-button" onClick={onClose} aria-label="Close AI Studio"><X size={20} /></button>
        </div>

        <form onSubmit={handleSubmit}>
          <label className="ai-field-label" htmlFor="ai-prompt">What should the image show?</label>
          <textarea id="ai-prompt" className="modern-input ai-prompt" value={prompt} onChange={(event) => setPrompt(event.target.value)} placeholder="A confident founder presenting a new eco-friendly product..." rows={3} />

          <div className="ai-form-grid">
            <SelectField label="What is this for?" value={useCase} options={useCases} onChange={setUseCase} />
            <SelectField label="What should it communicate?" value={purpose} options={purposes} onChange={setPurpose} />
            <SelectField label="Subject position" value={position} options={positions} onChange={setPosition} />
            <SelectField label="Text / design space" value={overlay} options={overlayOptions} onChange={setOverlay} />
            <SelectField label="Where should text go?" value={textSpace} options={textSpaces} onChange={setTextSpace} />
            <SelectField label="Visual mood" value={mood} options={moods} onChange={setMood} />
          </div>

          <div className="ai-options-grid">
            <div><span className="ai-field-label">Style</span><div className="ai-choice-list">{styles.map((option) => <button key={option} type="button" className={`ai-choice ${style === option ? "is-selected" : ""}`} onClick={() => setStyle(option)}>{option}</button>)}</div></div>
            <div><span className="ai-field-label">Aspect ratio</span><div className="ai-choice-list">{ratios.map((option) => <button key={option.value} type="button" className={`ai-choice ${size === option.value ? "is-selected" : ""}`} onClick={() => setSize(option.value)}>{option.label}</button>)}</div></div>
          </div>

          <details className="ai-master-prompt"><summary>View generated master prompt</summary><p>{masterPrompt}</p></details>
          {error && <p className="ai-error" role="alert">{error}</p>}
          {imageUrl && (
            <div className="ai-result">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imageUrl} alt={masterPrompt} />
              <button type="button" className="btn-ghost ai-download" onClick={handleDownload}><Download size={15} /> Download</button>
            </div>
          )}

          <div className="ai-modal-actions"><button type="button" className="btn-ghost" onClick={onClose}>Cancel</button><button type="submit" className="btn-primary" disabled={isGenerating}>{isGenerating ? <><Loader2 size={16} className="spin" /> Creating...</> : <><Sparkles size={16} /> Generate image</>}</button></div>
        </form>
      </section>
    </div>
  );
}
