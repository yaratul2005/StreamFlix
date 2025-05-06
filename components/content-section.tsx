import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { MediaCard } from "@/components/media-card"
import type { MediaItem } from "@/types"

interface ContentSectionProps {
  title: string
  items: MediaItem[]
  type?: "movie" | "tv" | "all"
  viewMoreLink?: string
}

export default function ContentSection({ title, items, type = "all", viewMoreLink }: ContentSectionProps) {
  if (!items.length) return null

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold font-orbitron">{title}</h2>
        {viewMoreLink && (
          <Link
            href={viewMoreLink}
            className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            View More <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {items.map((item) => (
          <MediaCard key={item.id} item={item} type={item.media_type || (type as "movie" | "tv" | "all")} />
        ))}
      </div>
    </section>
  )
}
