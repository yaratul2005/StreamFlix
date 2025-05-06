"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronDown, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Skeleton } from "@/components/ui/skeleton"
import { getTVSeasonDetails } from "@/lib/tmdb"

interface SeasonSelectorProps {
  tvId: number
  seasons: any[]
  initialSeason: number
}

export default function SeasonSelector({ tvId, seasons, initialSeason }: SeasonSelectorProps) {
  const [selectedSeason, setSelectedSeason] = useState(initialSeason)
  const [seasonDetails, setSeasonDetails] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchSeasonDetails = async () => {
      setIsLoading(true)
      try {
        const details = await getTVSeasonDetails(tvId.toString(), selectedSeason.toString())
        setSeasonDetails(details)
      } catch (error) {
        console.error("Error fetching season details:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSeasonDetails()
  }, [tvId, selectedSeason])

  const handleSeasonChange = (seasonNumber: number) => {
    setSelectedSeason(seasonNumber)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Episodes</h3>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              Season {selectedSeason}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {seasons
              .filter((season) => season.season_number > 0) // Filter out specials (season 0)
              .map((season) => (
                <DropdownMenuItem key={season.id} onClick={() => handleSeasonChange(season.season_number)}>
                  Season {season.season_number}
                </DropdownMenuItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex gap-4">
              <Skeleton className="h-24 w-40 rounded-md" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-4 w-60" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {seasonDetails?.episodes?.map((episode: any) => (
            <div key={episode.id} className="flex gap-4 p-2 rounded-lg hover:bg-muted/50 transition-colors">
              <div className="relative h-24 w-40 flex-shrink-0 overflow-hidden rounded-md">
                <Image
                  src={
                    episode.still_path
                      ? `https://image.tmdb.org/t/p/w300${episode.still_path}`
                      : "/placeholder.svg?height=135&width=240"
                  }
                  alt={episode.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity">
                  <Button size="sm" asChild>
                    <Link href={`/tv/${tvId}/${selectedSeason}/${episode.episode_number}`}>
                      <Play className="h-4 w-4 mr-1" />
                      Play
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <Link
                    href={`/tv/${tvId}/${selectedSeason}/${episode.episode_number}`}
                    className="font-medium hover:text-primary transition-colors"
                  >
                    {episode.episode_number}. {episode.name}
                  </Link>
                  <div className="text-xs text-muted-foreground">{episode.runtime ? `${episode.runtime} min` : ""}</div>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                  {episode.overview || "No overview available."}
                </p>
                <div className="text-xs text-muted-foreground mt-1">
                  {episode.air_date ? new Date(episode.air_date).toLocaleDateString() : ""}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
