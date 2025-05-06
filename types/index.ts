export interface MediaItem {
  id: number
  title?: string
  name?: string
  poster_path: string | null
  backdrop_path: string | null
  overview: string
  vote_average: number
  release_date?: string
  first_air_date?: string
  media_type?: "movie" | "tv"
  genre_ids: number[]
}

export interface Genre {
  id: number
  name: string
}

export interface VideoItem {
  id: string
  key: string
  name: string
  site: string
  type: string
}

export interface CastMember {
  id: number
  name: string
  character: string
  profile_path: string | null
}

export interface CrewMember {
  id: number
  name: string
  job: string
  department: string
  profile_path: string | null
}

export interface Episode {
  id: number
  name: string
  overview: string
  still_path: string | null
  air_date: string
  episode_number: number
  season_number: number
  vote_average: number
}

export interface Season {
  id: number
  name: string
  overview: string
  poster_path: string | null
  air_date: string
  season_number: number
  episode_count: number
}
