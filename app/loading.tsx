import { CardGridSkeleton } from "@/components/loading-skeletons"

export default function Loading() {
  return (
    <div className="flex flex-col gap-8 pb-10" aria-busy="true">
      <div className="shimmer h-[70vh] w-full" />
      <div className="container flex flex-col gap-10">
        <CardGridSkeleton />
      </div>
    </div>
  )
}
