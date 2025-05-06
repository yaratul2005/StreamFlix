// VidSrc base URLs for fallback
export const VIDSRC_BASE_URLS = [
  "https://vidsrc.icu",
  "https://vidsrc.stream",
  "https://vidsrc.me",
  "https://vidsrc.to",
]

/**
 * Checks if a URL is accessible
 */
export async function checkUrl(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, {
      method: "HEAD",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    })
    return response.ok
  } catch (error) {
    console.error(`Error checking URL ${url}:`, error)
    return false
  }
}

/**
 * Gets a working embed URL for a movie
 */
export async function getMovieEmbed(tmdbId: string): Promise<string | null> {
  for (const baseUrl of VIDSRC_BASE_URLS) {
    const embedUrl = `${baseUrl}/embed/${tmdbId}`
    if (await checkUrl(embedUrl)) {
      return embedUrl
    }
  }
  return null
}

/**
 * Gets a working embed URL for a TV show episode
 */
export async function getTVEmbed(tmdbId: string, season: number, episode: number): Promise<string | null> {
  for (const baseUrl of VIDSRC_BASE_URLS) {
    const embedUrl = `${baseUrl}/embed/tv/${tmdbId}/${season}/${episode}`
    if (await checkUrl(embedUrl)) {
      return embedUrl
    }
  }
  return null
}
