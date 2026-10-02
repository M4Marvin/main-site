import { Link } from "@tanstack/react-router"
import { profile } from "@/lib/portfolio-data"

export function Footer() {
  return (
    <footer className="border-t border-zinc-800 pt-8 pb-16">
      <p className="font-mono text-[13px] text-zinc-400">{profile.location}</p>
      <p className="mt-3">
        <a
          href={`mailto:${profile.email}`}
          className="text-[0.98rem] text-zinc-50 underline decoration-zinc-700 underline-offset-[0.18em] transition-[text-decoration-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:decoration-zinc-50"
        >
          {profile.email}
        </a>
      </p>
      <nav aria-label="Contact" className="mt-4 flex flex-wrap gap-x-5 gap-y-1 font-mono text-[13px]">
        <a href={profile.github} target="_blank" rel="noopener noreferrer" className="nav-link">
          GitHub
        </a>
        <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="nav-link">
          LinkedIn
        </a>
        <a href={`tel:${profile.phone.replace(/\s+/g, "")}`} className="nav-link">
          {profile.phone}
        </a>
      </nav>
      <nav aria-label="More" className="mt-8 flex flex-wrap gap-x-5 gap-y-1 font-mono text-[12px]">
        <Link to="/blog" className="nav-link">
          Writing
        </Link>
        <Link to="/self-hosted-cloud" className="nav-link">
          Self-hosted cloud
        </Link>
      </nav>
      <p className="mt-6 font-mono text-[12px] text-zinc-600">
        © {new Date().getFullYear()} {profile.name}
      </p>
    </footer>
  )
}
