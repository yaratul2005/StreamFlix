import Image from "next/image"
import Link from "next/link"
import { Play, Star, Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { MediaItem } from "@/types"

interface MediaCardProps {
  item: MediaItem
  type: "movie" | "tv" | "all"
}

export function MediaCard({ item, type }: MediaCardProps) {
  const mediaType = item.media_type || type
  const href = `/${mediaType === "all" ? item.media_type || "movie" : mediaType}/${item.id}`

  return (
    <div className="media-card group">
      <div className="aspect-[2/3] relative overflow-hidden rounded-lg">
        <Image
          src={
            item.poster_path
              ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
              : "/placeholder.svg?height=450&width=300"
          }
          alt={item.title || item.name || "Media"}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
        />

        <div className="media-card-overlay">
          <div className="space-y-2 w-full">
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="bg-background/50 backdrop-blur-sm">
                {item.media_type === "tv" || type === "tv" ? "TV Show" : "Movie"}
              </Badge>
              <div className="flex items-center bg-background/50 backdrop-blur-sm rounded-md px-1.5 py-0.5 text-xs">
                <Star className="h-3 w-3 text-yellow-500 fill-yellow-500 mr-1" />
                {item.vote_average?.toFixed(1)}
              </div>
            </div>

            <div className="flex gap-2">
              <Button asChild size="sm" className="w-full">
                <Link href={href}>
                  <Play className="h-4 w-4 mr-1" />
                  Watch
                </Link>
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8 bg-background/50 backdrop-blur-sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-2">
        <Link href={href} className="line-clamp-1 font-medium hover:text-primary transition-colors">
          {item.title || item.name}
        </Link>
        <p className="text-xs text-muted-foreground">
          {item.release_date?.split("-")[0] || item.first_air_date?.split("-")[0] || "Unknown"}
        </p>
      </div>
    </div>
  )
}
