export function CardGridSkeleton({ count = 10 }: { count?: number }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="shimmer h-7 w-48 rounded-md" />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="flex flex-col gap-2">
            <div className="shimmer aspect-[2/3] rounded-lg" />
            <div className="shimmer h-4 w-3/4 rounded" />
            <div className="shimmer h-3 w-1/3 rounded" />
          </div>
        ))}
      </div>
    </div>
  )
}

export function PlayerBuffer({ label = "Buffering..." }: { label?: string }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black" role="status">
      <div className="relative h-16 w-16">
        <div className="absolute inset-0 rounded-full border-4 border-primary/20" />
        <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-primary" />
        <div className="absolute inset-3 animate-pulse rounded-full bg-primary/20" />
      </div>
      <span className="text-sm text-muted-foreground">{label}</span>
      <div className="h-1 w-40 overflow-hidden rounded-full bg-muted">
        <div className="buffer-bar h-full w-1/3 rounded-full bg-primary" />
      </div>
    </div>
  )
}
