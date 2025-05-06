import Image from "next/image"
import { Star, Calendar, Clock, Film, Tv } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import CastSection from "@/components/cast-section"
import SeasonSelector from "@/components/season-selector"

interface MediaDetailsProps {
  details: any
  type: string
}

export default function MediaDetails({ details, type }: MediaDetailsProps) {
  const title = details.title || details.name
  const releaseDate = details.release_date || details.first_air_date
  const releaseYear = releaseDate ? new Date(releaseDate).getFullYear() : "Unknown"
  const runtime = details.runtime || details.episode_run_time?.[0] || 0
  const hours = Math.floor(runtime / 60)
  const minutes = runtime % 60
  const formattedRuntime = runtime ? `${hours > 0 ? `${hours}h ` : ""}${minutes > 0 ? `${minutes}m` : ""}` : "Unknown"

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Poster */}
        <div className="w-full md:w-1/4 flex-shrink-0">
          <div className="relative aspect-[2/3] overflow-hidden rounded-lg shadow-lg animate-pulse-glow">
            <Image
              src={
                details.poster_path
                  ? `https://image.tmdb.org/t/p/w500${details.poster_path}`
                  : "/placeholder.svg?height=450&width=300"
              }
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 25vw"
            />
          </div>
        </div>

        {/* Details */}
        <div className="flex-1 space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="border-primary text-primary">
                {type === "movie" ? "Movie" : "TV Show"}
              </Badge>
              {details.genres?.map((genre: any) => (
                <Badge key={genre.id} variant="secondary">
                  {genre.name}
                </Badge>
              ))}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold font-orbitron">{title}</h1>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                <span>
                  {details.vote_average?.toFixed(1)} ({details.vote_count} votes)
                </span>
              </div>

              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{releaseYear}</span>
              </div>

              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>{formattedRuntime}</span>
              </div>

              {type === "tv" && (
                <div className="flex items-center">
                  <Tv className="h-4 w-4 mr-1" />
                  <span>
                    {details.number_of_seasons} Season{details.number_of_seasons !== 1 ? "s" : ""}
                  </span>
                </div>
              )}
            </div>
          </div>

          <p className="text-base">{details.overview}</p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Button className="gap-2">
              <Film className="h-5 w-5" />
              Watch Now
            </Button>
            <Button variant="outline" className="gap-2">
              Add to Favorites
            </Button>
          </div>
        </div>
      </div>

      <Separator />

      <Tabs defaultValue="about">
        <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-3 md:grid-cols-3">
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="cast">Cast & Crew</TabsTrigger>
          {type === "tv" && <TabsTrigger value="episodes">Episodes</TabsTrigger>}
        </TabsList>

        <TabsContent value="about" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {details.production_companies?.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Production</h3>
                <p>{details.production_companies.map((c: any) => c.name).join(", ")}</p>
              </div>
            )}

            {details.spoken_languages?.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Languages</h3>
                <p>{details.spoken_languages.map((l: any) => l.english_name).join(", ")}</p>
              </div>
            )}
          </div>

          {details.videos?.results?.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Trailers & Videos</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {details.videos.results
                  .filter((video: any) => video.site === "YouTube" && ["Trailer", "Teaser"].includes(video.type))
                  .slice(0, 2)
                  .map((video: any) => (
                    <div key={video.id} className="aspect-video rounded-lg overflow-hidden">
                      <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${video.key}`}
                        title={video.name}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="cast" className="mt-4">
          <CastSection cast={details.credits?.cast} crew={details.credits?.crew} />
        </TabsContent>

        {type === "tv" && (
          <TabsContent value="episodes" className="mt-4">
            <SeasonSelector
              tvId={details.id}
              seasons={details.seasons}
              initialSeason={details.season?.season_number || 1}
            />
          </TabsContent>
        )}
      </Tabs>
    </div>
  )
}
