import { Suspense } from "react"
import { notFound } from "next/navigation"
import { getMovieDetails, getTVDetails } from "@/lib/tmdb"
import MediaDetails from "@/components/media-details"
import EnhancedMediaPlayer from "@/components/enhanced-media-player"
import ContentSection from "@/components/content-section"
import { Skeleton } from "@/components/ui/skeleton"

interface MediaPageProps {
  params: {
    type: string
    id: string
  }
}

export default async function MediaPage({ params }: MediaPageProps) {
  const { type, id } = params

  if (type !== "movie" && type !== "tv") {
    notFound()
  }

  try {
    const details = type === "movie" ? await getMovieDetails(id) : await getTVDetails(id)

    const similarContent = details.similar?.results || []

    return (
      <div className="pt-16">
        {/* Media Player */}
        <Suspense fallback={<div className="h-[60vh] bg-muted animate-pulse" />}>
          <EnhancedMediaPlayer type={type} id={id} title={details.title || details.name} />
        </Suspense>

        <div className="container py-8 space-y-8">
          {/* Media Details */}
          <Suspense fallback={<Skeleton className="h-[400px] w-full" />}>
            <MediaDetails details={details} type={type} />
          </Suspense>

          {/* Similar Content */}
          {similarContent.length > 0 && (
            <Suspense fallback={<Skeleton className="h-[300px] w-full" />}>
              <ContentSection
                title="You May Also Like"
                items={similarContent.map((item: any) => ({ ...item, media_type: type }))}
                type={type as "movie" | "tv"}
              />
            </Suspense>
          )}
        </div>
      </div>
    )
  } catch (error) {
    console.error("Error fetching media details:", error)
    notFound()
  }
}
