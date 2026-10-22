import { CardGridSkeleton } from "@/components/loading-skeletons"

export default function Loading() {
  return (
    <div className="container py-24" aria-busy="true">
      <CardGridSkeleton />
    </div>
  )
}
