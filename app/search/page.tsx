"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { SearchIcon, Film, Tv, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MediaCard } from "@/components/media-card"
import { searchContent } from "@/lib/tmdb"
import type { MediaItem } from "@/types"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const query = searchParams.get("q") || ""
  const [searchQuery, setSearchQuery] = useState(query)
  const [results, setResults] = useState<MediaItem[]>([])
  const [filteredResults, setFilteredResults] = useState<MediaItem[]>([])
  const [activeTab, setActiveTab] = useState("all")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (query) {
      performSearch(query)
    }
  }, [query])

  useEffect(() => {
    if (activeTab === "all") {
      setFilteredResults(results)
    } else {
      setFilteredResults(results.filter((item) => (item.media_type || "").toLowerCase() === activeTab))
    }
  }, [results, activeTab])

  const performSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return

    setIsLoading(true)
    try {
      const data = await searchContent(searchQuery)
      // Filter out people and only keep movies and tv shows
      const filteredData = data.results.filter((item: any) => item.media_type === "movie" || item.media_type === "tv")
      setResults(filteredData)
    } catch (error) {
      console.error("Error searching content:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
  }

  return (
    <div className="container py-20 space-y-6">
      <div className="max-w-2xl mx-auto space-y-2">
        <h1 className="text-3xl font-bold font-orbitron text-center">Search</h1>
        <p className="text-muted-foreground text-center">Find your favorite movies, TV shows, and more</p>

        <form onSubmit={handleSearch} className="flex gap-2 mt-4">
          <Input
            type="search"
            placeholder="Search for movies, TV shows..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
          <Button type="submit">
            <SearchIcon className="h-4 w-4 mr-2" />
            Search
          </Button>
        </form>
      </div>

      {query && (
        <div className="space-y-6">
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Results for "{query}"</h2>
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="movie" className="flex items-center gap-1">
                  <Film className="h-4 w-4" />
                  Movies
                </TabsTrigger>
                <TabsTrigger value="tv" className="flex items-center gap-1">
                  <Tv className="h-4 w-4" />
                  TV Shows
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all" className="mt-6">
              {renderResults()}
            </TabsContent>
            <TabsContent value="movie" className="mt-6">
              {renderResults()}
            </TabsContent>
            <TabsContent value="tv" className="mt-6">
              {renderResults()}
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  )

  function renderResults() {
    if (isLoading) {
      return (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )
    }

    if (filteredResults.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No results found. Try a different search term.</p>
        </div>
      )
    }

    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredResults.map((item) => (
          <MediaCard
            key={`${item.id}-${item.media_type}`}
            item={item}
            type={item.media_type as "movie" | "tv" | "all"}
          />
        ))}
      </div>
    )
  }
}
