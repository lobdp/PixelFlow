import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const fileUrl = searchParams.get("url");
  const filename = searchParams.get("filename") || "download";

  if (!fileUrl) {
    return NextResponse.json({ error: "Missing 'url' query parameter" }, { status: 400 });
  }

  // Security check: Only allow valid HTTP / HTTPS URLs
  let parsedUrl: URL;
  try {
    parsedUrl = new URL(fileUrl);
    if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
      return NextResponse.json({ error: "Invalid protocol specified" }, { status: 400 });
    }
  } catch {
    return NextResponse.json({ error: "Invalid URL provided" }, { status: 400 });
  }

  try {
    const upstreamResponse = await fetch(fileUrl, {
      redirect: "follow",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "*/*",
      },
    });

    if (!upstreamResponse.ok) {
      return NextResponse.json(
        { error: `Upstream media server returned ${upstreamResponse.status}: ${upstreamResponse.statusText}` },
        { status: upstreamResponse.status }
      );
    }

    const contentType = upstreamResponse.headers.get("content-type") || "application/octet-stream";
    const contentLength = upstreamResponse.headers.get("content-length");

    // Clean filename: remove illegal filesystem characters
    const safeFilename = filename.replace(/[/\\?%*:|"<>]/g, "_");

    const headers = new Headers();
    headers.set("Content-Type", contentType);
    headers.set(
      "Content-Disposition",
      `attachment; filename="${safeFilename}"; filename*=UTF-8''${encodeURIComponent(safeFilename)}`
    );
    if (contentLength) {
      headers.set("Content-Length", contentLength);
    }
    headers.set("Cache-Control", "public, max-age=86400, s-maxage=86400");

    return new Response(upstreamResponse.body, {
      status: 200,
      headers,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to download media file" },
      { status: 500 }
    );
  }
}

