"use client"

import { useState, useEffect } from "react"
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
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 8000)

    return () => clearInterval(interval)
  }, [currentIndex])

  const nextSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length)
    setTimeout(() => setIsAnimating(false), 500)
  }

  const prevSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length)
    setTimeout(() => setIsAnimating(false), 500)
  }

  if (!items.length) return null

  const currentItem = items[currentIndex]

  return (
    <div className="relative h-[70vh] w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 transition-opacity duration-700 ease-in-out">
        <Image
          src={`https://image.tmdb.org/t/p/original${currentItem.backdrop_path}`}
          alt={currentItem.title || currentItem.name || ""}
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/10" />
      </div>

      {/* Content */}
      <div className="container relative h-full flex flex-col justify-end pb-16 pt-32">
        <div className="max-w-3xl space-y-4 animate-[fadeIn_0.5s_ease-in-out]">
          <Badge variant="outline" className="border-primary text-primary">
            {currentItem.media_type === "movie" ? "Movie" : "TV Show"}
          </Badge>

          <h1 className="text-4xl md:text-6xl font-bold font-orbitron text-glow">
            {currentItem.title || currentItem.name}
          </h1>

          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-500 mr-1 fill-yellow-500" />
              <span>{currentItem.vote_average?.toFixed(1)}</span>
            </div>
            <div>{currentItem.release_date?.split("-")[0] || currentItem.first_air_date?.split("-")[0]}</div>
          </div>

          <p className="text-base md:text-lg text-muted-foreground line-clamp-3">{currentItem.overview}</p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Button asChild size="lg" className="gap-2">
              <Link href={`/${currentItem.media_type}/${currentItem.id}`}>
                <Play className="h-5 w-5" />
                Watch Now
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link href={`/${currentItem.media_type}/${currentItem.id}`}>
                <Info className="h-5 w-5" />
                More Info
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-background/20 hover:bg-background/40"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-8 w-8" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-background/20 hover:bg-background/40"
        onClick={nextSlide}
      >
        <ChevronRight className="h-8 w-8" />
      </Button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {items.map((_, index) => (
          <button
            key={index}
            className={cn(
              "h-1.5 rounded-full transition-all",
              index === currentIndex ? "w-8 bg-primary" : "w-3 bg-muted",
            )}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  )
}
