import { Link, useRouterState } from "@tanstack/react-router"
import { profile } from "@/lib/portfolio-data"

export function SiteHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const home = pathname === "/"
  const writing = pathname.startsWith("/blog")

  const nameClass =
    "text-[1.75rem] font-medium tracking-[-0.04em] text-zinc-50 sm:text-[2.35rem] sm:leading-none"

  return (
    <header className="flex flex-col gap-3 pt-10 pb-8 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6 sm:pt-16 sm:pb-12">
      {home ? (
        <h1 className={nameClass}>{profile.name}</h1>
      ) : (
        <Link to="/" className={`${nameClass} name-link`}>
          {profile.name}
        </Link>
      )}

      <nav
        aria-label="Primary"
        className="flex flex-wrap items-baseline gap-x-5 gap-y-1 font-mono text-[13px] sm:justify-end"
      >
        <a href="/#work" className="nav-link">
          Work
        </a>
        <Link to="/blog" className="nav-link" aria-current={writing ? "page" : undefined}>
          Writing
        </Link>
        <a href={`mailto:${profile.email}`} className="nav-link">
          Email
        </a>
        <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="nav-link">
          LinkedIn
          <span aria-hidden="true" className="ext-hint ml-1 text-zinc-600">
            ↗
          </span>
        </a>
        <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer" className="nav-link">
          Resume
          <span aria-hidden="true" className="ext-hint ml-1 text-zinc-600">
            ↗
          </span>
        </a>
      </nav>
    </header>
  )
}
