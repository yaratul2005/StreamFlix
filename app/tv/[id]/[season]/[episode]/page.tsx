import { Suspense } from "react"
import { notFound } from "next/navigation"
import { getTVDetails, getTVSeasonDetails } from "@/lib/tmdb"
import EnhancedMediaPlayer from "@/components/enhanced-media-player"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface TVEpisodePageProps {
  params: {
    id: string
    season: string
    episode: string
  }
}

export default async function TVEpisodePage({ params }: TVEpisodePageProps) {
  const { id, season, episode } = params
  const seasonNum = Number.parseInt(season)
  const episodeNum = Number.parseInt(episode)

  if (isNaN(seasonNum) || isNaN(episodeNum)) {
    notFound()
  }

  try {
    const [tvDetails, seasonDetails] = await Promise.all([getTVDetails(id), getTVSeasonDetails(id, season)])

    const episodeDetails = seasonDetails.episodes?.find((ep: any) => ep.episode_number === episodeNum)

    if (!episodeDetails) {
      notFound()
    }

    const hasNextEpisode = seasonDetails.episodes?.some((ep: any) => ep.episode_number === episodeNum + 1)

    const hasPrevEpisode = episodeNum > 1

    const hasNextSeason = tvDetails.seasons?.some((s: any) => s.season_number === seasonNum + 1)

    const title = `${tvDetails.name} - S${seasonNum}E${episodeNum}: ${episodeDetails.name}`

    return (
      <div className="pt-16">
        {/* Media Player */}
        <Suspense fallback={<div className="h-[60vh] bg-muted animate-pulse" />}>
          <EnhancedMediaPlayer type="tv" id={id} title={title} season={seasonNum} episode={episodeNum} />
        </Suspense>

        <div className="container py-8 space-y-8">
          {/* Episode Navigation */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">{tvDetails.name}</h1>
              <p className="text-muted-foreground">
                Season {seasonNum}, Episode {episodeNum}: {episodeDetails.name}
              </p>
            </div>

            <div className="flex gap-2">
              {hasPrevEpisode && (
                <Button asChild variant="outline" size="sm">
                  <Link href={`/tv/${id}/${seasonNum}/${episodeNum - 1}`}>
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Previous
                  </Link>
                </Button>
              )}

              {hasNextEpisode ? (
                <Button asChild variant="default" size="sm">
                  <Link href={`/tv/${id}/${seasonNum}/${episodeNum + 1}`}>
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              ) : hasNextSeason ? (
                <Button asChild variant="default" size="sm">
                  <Link href={`/tv/${id}/${seasonNum + 1}/1`}>
                    Next Season
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              ) : null}
            </div>
          </div>

          {/* Episode Details */}
          <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6">
            {episodeDetails.still_path && (
              <div className="aspect-video relative overflow-hidden rounded-lg">
                <img
                  src={`https://image.tmdb.org/t/p/w500${episodeDetails.still_path}`}
                  alt={episodeDetails.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <span>Air Date: {new Date(episodeDetails.air_date).toLocaleDateString()}</span>
                <span>•</span>
                <span>Rating: {episodeDetails.vote_average.toFixed(1)}/10</span>
              </div>

              <p className="text-base">{episodeDetails.overview || "No overview available."}</p>

              <div className="mt-6">
                <Button asChild variant="outline">
                  <Link href={`/tv/${id}`}>Back to Series</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error("Error fetching TV episode details:", error)
    notFound()
  }
}
