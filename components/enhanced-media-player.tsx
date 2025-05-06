"use client"

import { useState, useEffect, useRef } from "react"
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize, Settings, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"

interface EnhancedMediaPlayerProps {
  type: string
  id: string
  title: string
  season?: number
  episode?: number
}

export default function EnhancedMediaPlayer({ type, id, title, season = 1, episode = 1 }: EnhancedMediaPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(80)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isControlsVisible, setIsControlsVisible] = useState(true)
  const [hideControlsTimeout, setHideControlsTimeout] = useState<NodeJS.Timeout | null>(null)
  const [embedUrl, setEmbedUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const playerRef = useRef<HTMLDivElement>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const { toast } = useToast()

  useEffect(() => {
    const fetchEmbedUrl = async () => {
      setIsLoading(true)
      setError(null)

      try {
        // Construct the query parameters
        const params = new URLSearchParams({
          tmdbId: id,
          type: type,
        })

        if (type === "tv") {
          params.append("season", season.toString())
          params.append("episode", episode.toString())
        }

        // Fetch the embed URL from our API
        const response = await fetch(`/api/stream?${params.toString()}`)
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch streaming source")
        }

        setEmbedUrl(data.embedUrl)
      } catch (err) {
        console.error("Error fetching embed URL:", err)
        setError(err instanceof Error ? err.message : "An unknown error occurred")
        toast({
          title: "Streaming Error",
          description: err instanceof Error ? err.message : "Failed to load streaming source",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchEmbedUrl()
  }, [id, type, season, episode, toast])

  // Mock video duration
  useEffect(() => {
    setDuration(Math.floor(Math.random() * 7200) + 3600) // Random duration between 1-3 hours

    // Auto-hide controls after 3 seconds
    const timeout = setTimeout(() => {
      if (isPlaying) {
        setIsControlsVisible(false)
      }
    }, 3000)

    setHideControlsTimeout(timeout)

    return () => {
      if (hideControlsTimeout) {
        clearTimeout(hideControlsTimeout)
      }
    }
  }, [isPlaying])

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
    setIsControlsVisible(true)

    if (hideControlsTimeout) {
      clearTimeout(hideControlsTimeout)
    }

    if (!isPlaying) {
      const timeout = setTimeout(() => {
        setIsControlsVisible(false)
      }, 3000)
      setHideControlsTimeout(timeout)
    }

    // In a real implementation, we would send a message to the iframe
    // to control playback, but this depends on the embed player's API
  }

  const handleMuteToggle = () => {
    setIsMuted(!isMuted)
    // In a real implementation, we would send a message to the iframe
  }

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0])
    if (value[0] === 0) {
      setIsMuted(true)
    } else if (isMuted) {
      setIsMuted(false)
    }
    // In a real implementation, we would send a message to the iframe
  }

  const handleProgressChange = (value: number[]) => {
    setProgress(value[0])
    // In a real implementation, we would send a message to the iframe
  }

  const handleFullscreenToggle = () => {
    if (!playerRef.current) return

    if (!document.fullscreenElement) {
      playerRef.current.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`)
      })
    } else {
      document.exitFullscreen()
    }
  }

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])

  const handleMouseMove = () => {
    setIsControlsVisible(true)

    if (hideControlsTimeout) {
      clearTimeout(hideControlsTimeout)
    }

    if (isPlaying) {
      const timeout = setTimeout(() => {
        setIsControlsVisible(false)
      }, 3000)
      setHideControlsTimeout(timeout)
    }
  }

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = Math.floor(seconds % 60)

    return [hours > 0 ? hours : null, minutes, secs]
      .filter(Boolean)
      .map((unit) => unit!.toString().padStart(2, "0"))
      .join(":")
  }

  return (
    <div
      ref={playerRef}
      className={cn("relative w-full bg-black", isFullscreen ? "fixed inset-0 z-50" : "aspect-video")}
      onMouseMove={handleMouseMove}
    >
      {/* Video Player */}
      {isLoading ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <span className="ml-2 text-lg">Loading video player...</span>
        </div>
      ) : error ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
          <p className="text-xl font-semibold text-destructive mb-2">Unable to load video</p>
          <p className="text-muted-foreground">{error}</p>
          <Button className="mt-4" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      ) : embedUrl ? (
        <iframe
          ref={iframeRef}
          src={embedUrl}
          className="absolute inset-0 w-full h-full"
          allowFullScreen
          allow="autoplay; encrypted-media; picture-in-picture"
        ></iframe>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-xl">No video source available</p>
        </div>
      )}

      {/* Controls Overlay */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 transition-opacity duration-300",
          isControlsVisible ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
      >
        {/* Top Bar */}
        <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between">
          <h3 className="text-white font-medium truncate max-w-md">{title}</h3>

          <div className="flex items-center gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white">
                  <Settings className="h-5 w-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-56" align="end">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Quality</h4>
                    <div className="grid grid-cols-3 gap-1">
                      <Button size="sm" variant="outline" className="text-xs">
                        1080p
                      </Button>
                      <Button size="sm" variant="outline" className="text-xs">
                        720p
                      </Button>
                      <Button size="sm" variant="outline" className="text-xs">
                        480p
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Playback Speed</h4>
                    <div className="grid grid-cols-4 gap-1">
                      <Button size="sm" variant="outline" className="text-xs">
                        0.5x
                      </Button>
                      <Button size="sm" variant="outline" className="text-xs">
                        1x
                      </Button>
                      <Button size="sm" variant="outline" className="text-xs">
                        1.5x
                      </Button>
                      <Button size="sm" variant="outline" className="text-xs">
                        2x
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Center Play/Pause Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-16 w-16 rounded-full bg-background/20 hover:bg-background/40"
          onClick={handlePlayPause}
        >
          {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
        </Button>

        {/* Bottom Controls */}
        <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
          {/* Progress Bar */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-white">{formatTime(progress)}</span>
            <Slider
              value={[progress]}
              max={duration}
              step={1}
              onValueChange={handleProgressChange}
              className="flex-1"
            />
            <span className="text-xs text-white">{formatTime(duration)}</span>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={handlePlayPause}>
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </Button>

              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={handleMuteToggle}>
                  {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                </Button>
                <Slider
                  value={[isMuted ? 0 : volume]}
                  max={100}
                  step={1}
                  onValueChange={handleVolumeChange}
                  className="w-24"
                />
              </div>
            </div>

            <Button variant="ghost" size="icon" onClick={handleFullscreenToggle}>
              {isFullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
