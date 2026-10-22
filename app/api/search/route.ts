import { NextResponse } from "next/server"
import { searchContent } from "@/lib/tmdb"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("q")?.trim()
  const page = searchParams.get("page") || "1"

  if (!query) {
    return NextResponse.json({ error: "Missing q parameter" }, { status: 400 })
  }

  try {
    const data = await searchContent(query.slice(0, 200), page)
    return NextResponse.json(data)
  } catch (error) {
    console.error("Search failed:", error)
    return NextResponse.json({ error: "Search is currently unavailable" }, { status: 502 })
  }
}
