"use client"

import { useState, useEffect } from "react"
import { ExternalLink } from "lucide-react"
import { PlayerBuffer } from "@/components/loading-skeletons"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

interface EnhancedMediaPlayerProps {
  type: string
  id: string
  title: string
  season?: number
  episode?: number
}

export default function EnhancedMediaPlayer({ type, id, title, season = 1, episode = 1 }: EnhancedMediaPlayerProps) {
  const [embedUrl, setEmbedUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [frameLoaded, setFrameLoaded] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const fetchEmbedUrl = async () => {
      setIsLoading(true)
      setFrameLoaded(false)
      setError(null)

      try {
        const params = new URLSearchParams({ tmdbId: id, type })

        if (type === "tv") {
          params.append("season", season.toString())
          params.append("episode", episode.toString())
        }

        const response = await fetch(`/api/stream?${params.toString()}`)
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch streaming source")
        }

        setEmbedUrl(data.embedUrl)
      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to load streaming source"
        setError(message)
        toast({ title: "Streaming Error", description: message, variant: "destructive" })
      } finally {
        setIsLoading(false)
      }
    }

    fetchEmbedUrl()
  }, [id, type, season, episode, toast])

  return (
    <div className="flex flex-col gap-2">
    <div className="relative w-full aspect-video bg-black">
      {isLoading ? (
        <PlayerBuffer label="Loading video player..." />
      ) : error ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
          <p className="text-xl font-semibold text-destructive mb-2">Unable to load video</p>
          <p className="text-muted-foreground">{error}</p>
          <Button className="mt-4" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      ) : embedUrl ? (
        <>
          <iframe
            key={embedUrl}
            src={embedUrl}
            title={title}
            onLoad={() => setFrameLoaded(true)}
            className={`absolute inset-0 h-full w-full transition-opacity duration-500 ${frameLoaded ? "opacity-100" : "opacity-0"}`}
            allowFullScreen
            allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
          />
          {!frameLoaded && <PlayerBuffer />}
        </>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-xl">No video source available</p>
        </div>
      )}
    </div>
      {embedUrl && !isLoading && !error && (
        <p className="text-sm text-muted-foreground">
          {"Player not loading? "}
          <a
            href={embedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-medium text-primary underline-offset-4 hover:underline"
          >
            Open in a new tab
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </p>
      )}
    </div>
  )
}
