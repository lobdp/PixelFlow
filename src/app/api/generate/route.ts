import { NextResponse } from "next/server";

const getProviderSize = (requestedSize: string | undefined) => {
  if (!requestedSize || requestedSize === "auto") return "auto";
  const [width, height] = requestedSize.split("x").map(Number);
  if (!width || !height) return "auto";

  const ratio = width / height;
  if (ratio > 1.2) return "1536x1024";
  if (ratio < 0.8) return "1024x1536";
  return "1024x1024";
};

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Add OPENAI_API_KEY to .env.local to enable AI image generation." },
      { status: 503 }
    );
  }

  try {
    const { prompt, style, size, canvas } = (await request.json()) as {
      prompt?: string;
      style?: string;
      size?: string;
      canvas?: string;
    };

    if (!prompt?.trim()) {
      return NextResponse.json({ error: "A prompt is required." }, { status: 400 });
    }

    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-image-1",
        prompt: `${style || "Realistic"} style: ${prompt.trim()}${canvas ? `, designed for an exact ${canvas} canvas` : ""}`,
        size: getProviderSize(size),
        quality: "medium",
        n: 1,
      }),
    });

    const data = (await response.json()) as {
      data?: Array<{ b64_json?: string; url?: string }>;
      error?: { message?: string };
    };

    if (!response.ok) {
      return NextResponse.json(
        { error: data.error?.message || "The image provider rejected the request." },
        { status: response.status }
      );
    }

    const generatedImage = data.data?.[0];
    const imageUrl = generatedImage?.b64_json
      ? `data:image/png;base64,${generatedImage.b64_json}`
      : generatedImage?.url;

    if (!imageUrl) {
      return NextResponse.json({ error: "The image provider returned no image." }, { status: 502 });
    }

    return NextResponse.json({ imageUrl });
  } catch {
    return NextResponse.json({ error: "Unable to generate the image right now." }, { status: 500 });
  }
}
