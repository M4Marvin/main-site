import { Github, Linkedin, Mail, Phone } from "lucide-react"
import { Link } from "@tanstack/react-router"
import { profile } from "@/lib/portfolio-data"

export function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-black">
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <p className="text-base font-semibold text-white">Marvin V Prakash</p>

          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-base text-neutral-400">
            <a href="#work" className="rounded transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60">
              Work
            </a>
            <Link to="/blog" className="rounded transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60">
              Blog
            </Link>
            <Link to="/footprint-charts" className="rounded transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60">
              Footprint Charts
            </Link>
            <Link to="/self-hosted-cloud" className="rounded transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60">
              Self-Hosted Cloud
            </Link>
          </nav>

          <div className="flex items-center gap-5 text-neutral-400">
            <a
              href={`mailto:${profile.email}`}
              aria-label="Email"
              className="rounded transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60"
            >
              <Mail className="h-4 w-4" />
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="rounded transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="rounded transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href={`tel:${profile.phone.replace(/\s+/g, "")}`}
              aria-label="Phone"
              className="rounded transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60"
            >
              <Phone className="h-4 w-4" />
            </a>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-neutral-400">
          &copy; {new Date().getFullYear()} Marvin V Prakash.
        </p>
      </div>
    </footer>
  )
}