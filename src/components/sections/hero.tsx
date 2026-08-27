import { Link } from "@tanstack/react-router"
import { ArrowDown, ExternalLink, PenLine } from "lucide-react"
import { profile, stats } from "@/lib/portfolio-data"

const roleLine = profile.roles.filter((role) => role.trim() !== "").join(" · ")

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-black"
    >
      <div className="absolute inset-0 bg-grid-white/[0.1]" />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

      <div className="hero-fade-up relative z-20 flex flex-col items-center gap-6 px-4 text-center">
        <h1 className="bg-linear-to-b from-white to-neutral-400 bg-clip-text text-5xl font-bold tracking-tight text-transparent sm:text-7xl md:text-8xl">
          {profile.name}
        </h1>

        <p
          className="bg-linear-to-r from-white to-blue-400/80 bg-clip-text text-base font-semibold tracking-tight text-transparent sm:text-xl md:text-2xl"
          aria-label={roleLine}
        >
          {roleLine}
        </p>

        <p className="max-w-2xl text-base leading-relaxed text-neutral-400 sm:text-lg">
          {profile.tagline}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#work"
            className="inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-6 py-3 text-sm font-medium text-white ring-1 ring-white/15 transition-all duration-200 hover:bg-white/10 hover:ring-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60 active:scale-[0.97]"
          >
            <ArrowDown className="h-4 w-4" /> View Work
          </a>
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-blue-500 to-violet-500 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-blue-600/25 transition-all duration-200 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60 active:scale-[0.97]"
          >
            <ExternalLink className="h-4 w-4" /> Resume
          </a>
        </div>

        <Link
          to="/blog"
          className="mt-5 flex items-center gap-1.5 rounded-full border border-white/10 bg-transparent px-3 py-2 text-xs text-neutral-400 transition-colors duration-200 hover:border-white/30 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60 active:scale-[0.97]"
        >
          <PenLine className="h-3.5 w-3.5" /> Blog
        </Link>

        <div className="mt-8 grid grid-cols-2 gap-x-12 gap-y-4 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1">
              <div className="text-2xl font-bold tabular-nums text-white sm:text-3xl">
                {stat.prefix}
                {stat.value.toLocaleString()}
                {stat.suffix}
              </div>
              <span className="text-xs leading-tight text-neutral-400">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}