"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Play, Star, Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { MediaItem } from "@/types"

interface MediaCardProps {
  item: MediaItem
  type: "movie" | "tv" | "all"
}

export function MediaCard({ item, type }: MediaCardProps) {
  const [loaded, setLoaded] = useState(false)
  const resolvedType = item.media_type || (type === "all" ? "movie" : type)
  const href = `/${resolvedType}/${item.id}`
  const title = item.title || item.name || "Media"
  const year = item.release_date?.split("-")[0] || item.first_air_date?.split("-")[0] || "Unknown"

  return (
    <div className="media-card group">
      <Link
        href={href}
        prefetch
        aria-label={`Watch ${title}`}
        className="relative block aspect-[2/3] overflow-hidden rounded-lg bg-muted outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        {!loaded && <div className="shimmer absolute inset-0" aria-hidden="true" />}
        <Image
          src={
            item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : "/placeholder.svg?height=450&width=300"
          }
          alt={title}
          fill
          onLoad={() => setLoaded(true)}
          className={cn(
            "object-cover transition-[transform,opacity] duration-500 ease-out group-hover:scale-110",
            loaded ? "opacity-100" : "opacity-0",
          )}
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
        />

        <div className="media-card-overlay">
          <div className="flex w-full flex-col gap-3">
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="bg-background/50 backdrop-blur-sm">
                {resolvedType === "tv" ? "TV Show" : "Movie"}
              </Badge>
              <div className="flex items-center rounded-md bg-background/50 px-1.5 py-0.5 text-xs backdrop-blur-sm">
                <Star className="mr-1 h-3 w-3 fill-yellow-500 text-yellow-500" aria-hidden="true" />
                {item.vote_average?.toFixed(1)}
              </div>
            </div>
            <span className="inline-flex h-9 w-full items-center justify-center gap-1 rounded-md bg-primary text-sm font-medium text-primary-foreground transition-transform duration-200 group-active:scale-95">
              <Play className="h-4 w-4 fill-current" aria-hidden="true" />
              Watch
            </span>
          </div>
        </div>

        <span
          className="pointer-events-none absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 scale-50 items-center justify-center rounded-full bg-primary/90 text-primary-foreground opacity-0 shadow-lg transition-all duration-300 ease-out group-hover:scale-100 group-hover:opacity-100"
          aria-hidden="true"
        >
          <Play className="ml-0.5 h-6 w-6 fill-current" />
        </span>
      </Link>

      <button
        type="button"
        aria-label={`Add ${title} to watchlist`}
        className="absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-md border border-border/60 bg-background/60 opacity-0 backdrop-blur-sm transition-all duration-200 hover:bg-primary hover:text-primary-foreground focus-visible:opacity-100 active:scale-90 group-hover:opacity-100"
      >
        <Plus className="h-4 w-4" aria-hidden="true" />
      </button>

      <div className="mt-2">
        <Link href={href} className="line-clamp-1 font-medium transition-colors hover:text-primary">
          {title}
        </Link>
        <p className="text-xs text-muted-foreground">{year}</p>
      </div>
    </div>
  )
}
