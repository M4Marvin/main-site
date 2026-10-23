import { profile } from "@/lib/portfolio-data"
import { Reveal } from "@/components/ui/reveal"

export function Hero() {
  return (
    <section id="home" className="pb-10 sm:pb-14">
      {/* Archive §3 headline, above the tagline per §13 order: title, tagline,
          status. The tagline must not restate the title. */}
      <Reveal delay={40}>
        <p className="font-mono text-[13px] tracking-[0.02em] text-zinc-400">{profile.title}</p>
      </Reveal>
      <Reveal delay={65}>
        <p className="mt-4 max-w-[40rem] text-[1.35rem] leading-[1.35] tracking-[-0.02em] text-zinc-100 sm:text-[1.85rem] sm:leading-[1.28]">
          {profile.tagline}
        </p>
      </Reveal>
      <Reveal delay={90}>
        <p className="mt-6 font-mono text-[13px] leading-relaxed text-zinc-400 sm:mt-8">
          {profile.location}
          <span aria-hidden="true"> · </span>
          {profile.status}
        </p>
        <p className="mt-2 font-mono text-[13px] leading-relaxed text-zinc-400">{profile.scope}</p>
        <p className="mt-1 font-mono text-[13px] leading-relaxed text-zinc-400">
          {profile.availability}
        </p>
        <div className="mt-4 flex flex-wrap items-baseline gap-x-5 gap-y-1 font-mono text-[13px]">
          <a href={`mailto:${profile.email}`} className="text-link">
            Email ↗
          </a>
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-link"
          >
            Resume ↗
          </a>
          <a href="/#work" className="text-link">
            Selected work →
          </a>
        </div>
      </Reveal>
      <Reveal delay={140}>
        <div className="hatch" aria-hidden="true" />
      </Reveal>
    </section>
  )
}
