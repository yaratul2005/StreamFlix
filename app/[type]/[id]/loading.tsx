import { CardGridSkeleton, PlayerBuffer } from "@/components/loading-skeletons"

export default function Loading() {
  return (
    <div className="pt-16" aria-busy="true">
      <div className="relative aspect-video w-full">
        <PlayerBuffer label="Loading..." />
      </div>
      <div className="container flex flex-col gap-8 py-8">
        <div className="flex flex-col gap-6 md:flex-row">
          <div className="shimmer aspect-[2/3] w-48 shrink-0 rounded-lg" />
          <div className="flex flex-1 flex-col gap-3">
            <div className="shimmer h-9 w-2/3 rounded-md" />
            <div className="shimmer h-4 w-1/3 rounded" />
            <div className="shimmer h-4 w-full rounded" />
            <div className="shimmer h-4 w-5/6 rounded" />
          </div>
        </div>
        <CardGridSkeleton count={5} />
      </div>
    </div>
  )
}
