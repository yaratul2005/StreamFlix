"use client"

import { useState, useEffect } from "react"
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

interface MediaPlayerProps {
  type: string
  id: string
  title: string
  season?: number
  episode?: number
}

export default function MediaPlayer({ type, id, title, season = 1, episode = 1 }: MediaPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(80)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isControlsVisible, setIsControlsVisible] = useState(true)
  const [hideControlsTimeout, setHideControlsTimeout] = useState<NodeJS.Timeout | null>(null)

  // Mock video source URL based on type and ID
  const videoSrc =
    type === "movie" ? `https://vidsrc.icu/embed/${id}` : `https://vidsrc.icu/embed/tv/${id}/${season}/${episode}`

  useEffect(() => {
    // Mock video duration
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
  }

  const handleMuteToggle = () => {
    setIsMuted(!isMuted)
  }

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0])
    if (value[0] === 0) {
      setIsMuted(true)
    } else if (isMuted) {
      setIsMuted(false)
    }
  }

  const handleProgressChange = (value: number[]) => {
    setProgress(value[0])
  }

  const handleFullscreenToggle = () => {
    setIsFullscreen(!isFullscreen)
  }

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
      className={cn("relative w-full bg-black", isFullscreen ? "fixed inset-0 z-50" : "aspect-video")}
      onMouseMove={handleMouseMove}
    >
      {/* Video Player */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* In a real implementation, this would be a video element or iframe */}
        {/* For this demo, we'll show a placeholder with the video title */}
        <div className="text-center p-4">
          <h2 className="text-xl font-semibold mb-2">{title}</h2>
          <p className="text-muted-foreground">{type === "movie" ? "Movie" : `Season ${season}, Episode ${episode}`}</p>
          <p className="mt-4 text-sm text-muted-foreground">
            This is a demo player. In a real implementation, the video would be loaded from:
          </p>
          <code className="mt-2 block text-xs bg-muted p-2 rounded">{videoSrc}</code>
        </div>
      </div>

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
