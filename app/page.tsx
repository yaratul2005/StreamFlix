import HeroSlider from "@/components/hero-slider"
import ContentSection from "@/components/content-section"
import { getTrendingMovies, getTrendingTVShows, getTrendingAll } from "@/lib/tmdb"

export default async function Home() {
  // Fetch data for different sections
  const [trendingHero, trendingMovies, trendingTVShows, trendingAll] = await Promise.all([
    getTrendingAll(5),
    getTrendingMovies(10),
    getTrendingTVShows(10),
    getTrendingAll(10),
  ])

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
