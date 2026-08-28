import { useEffect } from "react"
import { Link } from "@tanstack/react-router"

export function NotFoundPage() {
  useEffect(() => {
    document.title = "Page not found — Marvin V Prakash"
  }, [])

  return (
    <main id="main" tabIndex={-1} className="pb-16">
      <h1 className="text-[1.65rem] font-medium tracking-[-0.02em] text-zinc-50">Page not found</h1>
      <p className="mt-3 max-w-[32em] text-[0.98rem] leading-relaxed text-zinc-400">
        That URL doesn’t exist. The work, the writing, and a way to email me are still here.
      </p>
      <nav className="mt-6 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[13px]">
        <Link to="/" className="text-link">
          Home
        </Link>
        <a href="/#work" className="text-link">
          Work
        </a>
        <Link to="/blog" className="text-link">
          Writing
        </Link>
      </nav>
    </main>
  )
}
