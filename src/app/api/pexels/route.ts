import { NextRequest, NextResponse } from "next/server";

const readPexelsJson = async (response: Response) => {
  const body = await response.text();

  if (!body) {
    return {};
  }

  try {
    return JSON.parse(body);
  } catch {
    return { error: body.slice(0, 180) || response.statusText };
  }
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  // Extract apiKey from process.env (primary) or Authorization header (fallback)
  const authHeader = request.headers.get("Authorization") || request.headers.get("x-pexels-api-key") || "";
  const clientKey = authHeader.replace(/^Bearer\s+/i, "").trim();
  const apiKey = (process.env.PEXELS_API_KEY || clientKey || "").trim();

  if (!apiKey) {
    return NextResponse.json(
      { error: "Pexels API key is not configured. Please add PEXELS_API_KEY to your .env.local file." },
      { status: 401 }
    );
  }

  const endpoint = searchParams.get("endpoint") || "photos-search";
  const query = searchParams.get("query") || "";
  const page = searchParams.get("page") || "1";
  const per_page = searchParams.get("per_page") || "24";
  const orientation = searchParams.get("orientation");
  const size = searchParams.get("size");
  const color = searchParams.get("color");

  let pexelsUrl = "";

  if (endpoint === "photos-search") {
    pexelsUrl = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&page=${page}&per_page=${per_page}`;
  } else if (endpoint === "photos-curated") {
    pexelsUrl = `https://api.pexels.com/v1/curated?page=${page}&per_page=${per_page}`;
  } else if (endpoint === "videos-search") {
    pexelsUrl = `https://api.pexels.com/videos/search?query=${encodeURIComponent(query)}&page=${page}&per_page=${per_page}`;
  } else if (endpoint === "videos-popular") {
    pexelsUrl = `https://api.pexels.com/videos/popular?page=${page}&per_page=${per_page}`;
  } else {
    return NextResponse.json({ error: "Invalid endpoint specified." }, { status: 400 });
  }

  if (orientation && orientation !== "all") {
    pexelsUrl += `&orientation=${encodeURIComponent(orientation)}`;
  }
  if (size && size !== "all") {
    pexelsUrl += `&size=${encodeURIComponent(size)}`;
  }
  if (color && color !== "all") {
    pexelsUrl += `&color=${encodeURIComponent(color)}`;
  }

  try {
    const response = await fetch(pexelsUrl, {
      headers: {
        Authorization: apiKey,
      },
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      const errorData = await readPexelsJson(response);

      return NextResponse.json(
        { error: errorData.error || `Pexels API returned ${response.status}: ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await readPexelsJson(response);
    if ("error" in data) {
      return NextResponse.json(
        { error: data.error || "Pexels API returned an unexpected response." },
        { status: 502 }
      );
    }

    return NextResponse.json(data);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to communicate with Pexels API";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
