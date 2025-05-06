import { type NextRequest, NextResponse } from "next/server"

// VidSrc base URLs for fallback
const VIDSRC_BASE_URLS = ["https://vidsrc.icu", "https://vidsrc.stream", "https://vidsrc.me", "https://vidsrc.to"]

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const tmdbId = searchParams.get("tmdbId")
  const type = searchParams.get("type") || "movie"
  const season = searchParams.get("season")
  const episode = searchParams.get("episode")

  if (!tmdbId) {
    return NextResponse.json({ error: "Missing tmdbId parameter" }, { status: 400 })
  }

  // Construct the appropriate URL based on content type
  let embedUrl: string | null = null

  // Try each base URL until we find one that works
  for (const baseUrl of VIDSRC_BASE_URLS) {
    try {
      if (type === "movie") {
        embedUrl = `${baseUrl}/embed/${tmdbId}`
      } else if (type === "tv" && season && episode) {
        embedUrl = `${baseUrl}/embed/tv/${tmdbId}/${season}/${episode}`
      } else {
        return NextResponse.json({ error: "Invalid parameters for TV show" }, { status: 400 })
      }

      // Check if the URL is accessible
      const response = await fetch(embedUrl, {
        method: "HEAD",
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        },
      })

      if (response.ok) {
        // Return the working embed URL
        return NextResponse.json({ embedUrl })
      }
    } catch (error) {
      console.error(`Error checking ${embedUrl}:`, error)
      // Continue to the next base URL
    }
  }

  // If no working URL was found
  return NextResponse.json({ error: "No available streaming sources found" }, { status: 404 })
}
