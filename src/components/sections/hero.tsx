import { ArrowDown, ExternalLink } from "lucide-react"
import { Spotlight } from "@/components/ui/spotlight"
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect"
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient"
import { AnimatedNumber } from "@/components/ui/animated-number"
import { profile, stats } from "@/lib/portfolio-data"

const roleWords = profile.roles.map((role) => ({
  text: role,
  className: "text-neutral-300",
}))

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-black"
    >
      <div className="absolute inset-0 bg-grid-white/[0.1]" />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

      <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="white" />

      <div className="relative z-20 flex flex-col items-center gap-6 px-4 text-center">
        <h1 className="bg-linear-to-b from-white to-neutral-400 bg-clip-text text-5xl font-bold text-transparent sm:text-7xl md:text-8xl">
          {profile.name}
        </h1>

        <div className="-mt-2">
          <TypewriterEffectSmooth words={roleWords} />
        </div>

        <p className="max-w-2xl text-base leading-relaxed text-neutral-400 sm:text-lg">
          {profile.tagline}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a href="#work">
            <HoverBorderGradient
              containerClassName="rounded-full"
              className="flex items-center gap-2 bg-black px-6 py-3 text-sm font-medium text-white"
            >
              <ArrowDown className="h-4 w-4" /> View Work
            </HoverBorderGradient>
          </a>
          <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer">
            <HoverBorderGradient
              containerClassName="rounded-full"
              className="flex items-center gap-2 bg-black px-6 py-3 text-sm font-medium text-white"
            >
              <ExternalLink className="h-4 w-4" /> Resume
            </HoverBorderGradient>
          </a>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-x-12 gap-y-4 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1">
              <div className="text-2xl font-bold tabular-nums text-white sm:text-3xl">
                {stat.prefix}
                <AnimatedNumber value={stat.value} />
                {stat.suffix}
              </div>
              <span className="text-xs leading-tight text-neutral-500">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
