"use client"

import { useEffect, useRef, useState } from "react"
import { usePathname, useSearchParams } from "next/navigation"

export default function NavigationProgress() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(false)
  const timer = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey) return
      const anchor = (event.target as HTMLElement).closest("a")
      if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) return
      const url = new URL(anchor.href, window.location.href)
      if (url.origin !== window.location.origin) return
      if (url.pathname === window.location.pathname && url.search === window.location.search) return

      setVisible(true)
      setProgress(12)
      if (timer.current) clearInterval(timer.current)
      timer.current = setInterval(() => {
        setProgress((p) => (p < 85 ? p + (85 - p) * 0.12 : p))
      }, 150)
    }

    document.addEventListener("click", handleClick)
    return () => document.removeEventListener("click", handleClick)
  }, [])

  useEffect(() => {
    if (timer.current) clearInterval(timer.current)
    setProgress(100)
    const hide = setTimeout(() => {
      setVisible(false)
      setProgress(0)
    }, 300)
    return () => clearTimeout(hide)
  }, [pathname, searchParams])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[100] h-0.5"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 300ms ease" }}
    >
      <div
        className="h-full bg-primary shadow-[0_0_10px_hsl(var(--primary))]"
        style={{ width: `${progress}%`, transition: "width 200ms ease-out" }}
      />
    </div>
  )
}
