import { profile } from "@/lib/portfolio-data"
import { Reveal } from "@/components/ui/reveal"

export function Hero() {
  return (
    <section id="home" className="pb-16 sm:pb-24">
      <Reveal delay={40}>
        <p className="max-w-[40rem] text-[1.35rem] leading-[1.35] tracking-[-0.02em] text-zinc-100 sm:text-[1.85rem] sm:leading-[1.28]">
          {profile.tagline}
        </p>
      </Reveal>
      <Reveal delay={90}>
        <p className="mt-6 font-mono text-[13px] leading-relaxed text-zinc-500 sm:mt-8">
          {profile.location}
          <span aria-hidden="true"> · </span>
          {profile.status}
        </p>
      </Reveal>
      <Reveal delay={140}>
        <div className="hatch" aria-hidden="true" />
      </Reveal>
    </section>
  )
}
