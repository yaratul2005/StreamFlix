import HeroSlider from "@/components/hero-slider"
import ContentSection from "@/components/content-section"
import { getTrendingMovies, getTrendingTVShows, getTrendingAll } from "@/lib/tmdb"

export default async function Home() {
  let data
  try {
    data = await Promise.all([getTrendingAll(5), getTrendingMovies(10), getTrendingTVShows(10), getTrendingAll(10)])
  } catch (error) {
    console.error("Failed to load TMDB content:", error)
    return (
      <div className="container flex min-h-[60vh] flex-col items-center justify-center gap-3 text-center">
        <h1 className="text-2xl font-bold">Content is temporarily unavailable</h1>
        <p className="max-w-md text-muted-foreground">
          {"We couldn't load movies and shows from TMDB. Make sure the TMDB_API_KEY environment variable is set to a valid key."}
        </p>
      </div>
    )
  }

  const [trendingHero, trendingMovies, trendingTVShows, trendingAll] = data

  return (
    <div className="flex flex-col gap-8 pb-10">
      <HeroSlider items={trendingHero} />

      <div className="container space-y-10">
        <ContentSection title="Trending Movies" items={trendingMovies} type="movie" viewMoreLink="/movies" />

        <ContentSection title="Popular TV Shows" items={trendingTVShows} type="tv" viewMoreLink="/tv" />

        <ContentSection title="Recommended For You" items={trendingAll} viewMoreLink="/discover" />
      </div>
    </div>
  )
}
