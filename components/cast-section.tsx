import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

interface CastSectionProps {
  cast: any[]
  crew: any[]
}

export default function CastSection({ cast = [], crew = [] }: CastSectionProps) {
  // Group crew by department
  const crewByDepartment = crew?.reduce((acc: Record<string, any[]>, person) => {
    if (!acc[person.department]) {
      acc[person.department] = []
    }
    acc[person.department].push(person)
    return acc
  }, {})

  return (
    <Tabs defaultValue="cast">
      <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-2 md:grid-cols-2">
        <TabsTrigger value="cast">Cast</TabsTrigger>
        <TabsTrigger value="crew">Crew</TabsTrigger>
      </TabsList>

      <TabsContent value="cast" className="mt-4">
        {cast?.length > 0 ? (
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex space-x-4 pb-4">
              {cast.slice(0, 20).map((person) => (
                <div key={`${person.id}-${person.character}`} className="w-[150px] space-y-2">
                  <div className="overflow-hidden rounded-md">
                    <Image
                      src={
                        person.profile_path
                          ? `https://image.tmdb.org/t/p/w185${person.profile_path}`
                          : "/placeholder.svg?height=225&width=150"
                      }
                      alt={person.name}
                      width={150}
                      height={225}
                      className="h-[225px] w-[150px] object-cover transition-all hover:scale-105"
                    />
                  </div>
                  <div className="space-y-1 text-sm">
                    <h4 className="font-medium leading-none">{person.name}</h4>
                    <p className="text-xs text-muted-foreground">{person.character}</p>
                  </div>
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        ) : (
          <p className="text-muted-foreground">No cast information available.</p>
        )}
      </TabsContent>

      <TabsContent value="crew" className="mt-4 space-y-6">
        {Object.keys(crewByDepartment || {}).length > 0 ? (
          Object.entries(crewByDepartment).map(([department, people]) => (
            <div key={department}>
              <h3 className="text-lg font-semibold mb-3">{department}</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {people.map((person) => (
                  <div key={`${person.id}-${person.job}`} className="space-y-1">
                    <h4 className="font-medium leading-none">{person.name}</h4>
                    <p className="text-xs text-muted-foreground">{person.job}</p>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted-foreground">No crew information available.</p>
        )}
      </TabsContent>
    </Tabs>
  )
}
