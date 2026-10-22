const TMDB_BASE_URL = "https://api.themoviedb.org/3"

export async function fetchFromTMDB(endpoint: string, params: Record<string, string> = {}) {
  const apiKey = process.env.TMDB_API_KEY?.trim()
  if (!apiKey) {
    throw new Error("TMDB_API_KEY environment variable is not set")
  }

  // TMDB issues two credentials: a short v3 "API Key" (query param) and a long
  // v4 "API Read Access Token" (JWT, Bearer header). Accept either.
  const isReadAccessToken = apiKey.startsWith("eyJ")

  const queryParams = new URLSearchParams(isReadAccessToken ? params : { api_key: apiKey, ...params })

  const url = `${TMDB_BASE_URL}${endpoint}?${queryParams}`

  const response = await fetch(url, {
    headers: isReadAccessToken ? { Authorization: `Bearer ${apiKey}`, accept: "application/json" } : undefined,
    next: { revalidate: 3600 },
  })

  if (!response.ok) {
    throw new Error(`TMDB API error: ${response.status}`)
  }

  return response.json()
}

export async function getTrendingMovies(limit = 20) {
  const data = await fetchFromTMDB("/trending/movie/week")
  const movies = data.results.slice(0, limit).map((movie: any) => ({
    ...movie,
    media_type: "movie",
  }))
  return movies
}

export async function getTrendingTVShows(limit = 20) {
  const data = await fetchFromTMDB("/trending/tv/week")
  const shows = data.results.slice(0, limit).map((show: any) => ({
    ...show,
    media_type: "tv",
  }))
  return shows
}

export async function getTrendingAll(limit = 20) {
  const data = await fetchFromTMDB("/trending/all/week")
  return data.results.slice(0, limit)
}

export async function getMovieDetails(id: string) {
  return fetchFromTMDB(`/movie/${id}`, {
    append_to_response: "videos,credits,similar,recommendations",
  })
}

export async function getTVDetails(id: string) {
  return fetchFromTMDB(`/tv/${id}`, {
    append_to_response: "videos,credits,similar,recommendations,season/1",
  })
}

export async function getTVSeasonDetails(id: string, seasonNumber: string) {
  return fetchFromTMDB(`/tv/${id}/season/${seasonNumber}`)
}

export async function searchContent(query: string, page = "1") {
  return fetchFromTMDB("/search/multi", {
    query,
    page,
    include_adult: "false",
  })
}

export async function getGenres(type: "movie" | "tv") {
  const data = await fetchFromTMDB(`/genre/${type}/list`)
  return data.genres
}

export async function getContentByGenre(type: "movie" | "tv", genreId: string, page = "1") {
  return fetchFromTMDB(`/discover/${type}`, {
    with_genres: genreId,
    page,
    sort_by: "popularity.desc",
  })
}
