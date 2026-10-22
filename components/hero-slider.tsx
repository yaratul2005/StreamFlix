"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Play, Info, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { MediaItem } from "@/types"

interface HeroSliderProps {
  items: MediaItem[]
}

export default function HeroSlider({ items }: HeroSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const count = items.length

  const goTo = useCallback((index: number) => setCurrentIndex(((index % count) + count) % count), [count])

  useEffect(() => {
    if (paused || count < 2) return
    const timeout = setTimeout(() => goTo(currentIndex + 1), 8000)
    return () => clearTimeout(timeout)
  }, [currentIndex, paused, count, goTo])

  if (!count) return null

  const currentItem = items[currentIndex]
  const mediaType = currentItem.media_type || "movie"

  return (
    <section
      className="relative h-[70vh] w-full overflow-hidden"
      aria-roledescription="carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {items.map((item, index) => (
        <div
          key={item.id}
          aria-hidden={index !== currentIndex}
          className={cn(
            "absolute inset-0 transition-[opacity,transform] duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]",
            index === currentIndex ? "scale-100 opacity-100" : "scale-105 opacity-0",
          )}
        >
          {item.backdrop_path && (
            <Image
              src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
              alt=""
              fill
              priority={index === 0}
              className="object-cover object-center"
            />
          )}
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/10" />

      <div className="container relative flex h-full flex-col justify-end pb-16 pt-32">
        <div key={currentItem.id} className="flex max-w-3xl animate-[fadeIn_0.6s_ease-out] flex-col gap-4">
          <Badge variant="outline" className="w-fit border-primary text-primary">
            {mediaType === "movie" ? "Movie" : "TV Show"}
          </Badge>

          <h1 className="font-orbitron text-4xl font-bold text-glow md:text-6xl">{currentItem.title || currentItem.name}</h1>

          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center">
              <Star className="mr-1 h-4 w-4 fill-yellow-500 text-yellow-500" aria-hidden="true" />
              <span>{currentItem.vote_average?.toFixed(1)}</span>
            </div>
            <div>{currentItem.release_date?.split("-")[0] || currentItem.first_air_date?.split("-")[0]}</div>
          </div>

          <p className="line-clamp-3 text-base text-muted-foreground md:text-lg">{currentItem.overview}</p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Button asChild size="lg" className="gap-2 transition-transform active:scale-95">
              <Link href={`/${mediaType}/${currentItem.id}`}>
                <Play className="h-5 w-5" />
                Watch Now
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2 transition-transform active:scale-95">
              <Link href={`/${mediaType}/${currentItem.id}`}>
                <Info className="h-5 w-5" />
                More Info
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <Button
        variant="ghost"
        size="icon"
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 h-12 w-12 -translate-y-1/2 rounded-full bg-background/20 transition-all hover:bg-background/40 active:scale-90"
        onClick={() => goTo(currentIndex - 1)}
      >
        <ChevronLeft className="h-8 w-8" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        aria-label="Next slide"
        className="absolute right-4 top-1/2 h-12 w-12 -translate-y-1/2 rounded-full bg-background/20 transition-all hover:bg-background/40 active:scale-90"
        onClick={() => goTo(currentIndex + 1)}
      >
        <ChevronRight className="h-8 w-8" />
      </Button>

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {items.map((item, index) => (
          <button
            key={item.id}
            type="button"
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentIndex}
            className={cn(
              "h-1.5 rounded-full transition-all duration-500 ease-out",
              index === currentIndex ? "w-8 bg-primary" : "w-3 bg-muted hover:bg-muted-foreground",
            )}
            onClick={() => goTo(index)}
          />
        ))}
      </div>
    </section>
  )
}
