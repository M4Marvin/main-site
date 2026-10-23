import { Link, useRouterState } from "@tanstack/react-router"
import { profile } from "@/lib/portfolio-data"

export function SiteHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const home = pathname === "/"
  const writing = pathname.startsWith("/blog")
  const work = pathname.startsWith("/work")

  const nameClass =
    "text-[1.75rem] font-medium tracking-[-0.04em] text-zinc-50 sm:text-[2.35rem] sm:leading-none"
  const navItem = "nav-link py-2.5 sm:py-0"

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
        className="flex flex-wrap items-baseline gap-x-4 gap-y-1 font-mono text-[13px] sm:justify-end sm:gap-x-5"
      >
        <a href="/#work" className={navItem} aria-current={work ? "location" : undefined}>
          Work
        </a>
        <Link to="/blog" className={navItem} aria-current={writing ? "page" : undefined}>
          Writing
        </Link>
        <a href={`mailto:${profile.email}`} className={navItem}>
          Email
        </a>
        <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className={navItem}>
          LinkedIn
          <span aria-hidden="true" className="ext-hint ml-1 text-zinc-400">
            ↗
          </span>
        </a>
        <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer" className={navItem}>
          Resume
          <span aria-hidden="true" className="ext-hint ml-1 text-zinc-400">
            ↗
          </span>
        </a>
      </nav>
    </header>
  )
}
