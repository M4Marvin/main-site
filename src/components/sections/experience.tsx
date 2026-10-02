import { experiences } from "@/lib/portfolio-data"
import { Reveal } from "@/components/ui/reveal"

export function Experience() {
  return (
    <section id="experience" className="border-t border-zinc-800 py-12">
      <Reveal>
        <h2 className="font-mono text-[13px] text-zinc-500">Experience</h2>
      </Reveal>
      <div className="mt-6 space-y-8">
        {experiences.map((entry) => (
          <Reveal key={entry.company}>
            <article>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-[1.15rem] font-medium tracking-[-0.02em] text-zinc-50 sm:text-xl">
                  {entry.company}
                </h3>
                <p className="font-mono text-[12px] text-zinc-500">{entry.period}</p>
              </div>
              <p className="mt-1 font-mono text-[12px] text-zinc-500">
                {entry.role}
                <span aria-hidden="true"> · </span>
                {entry.mode}
              </p>
              <ul className="mt-4 max-w-[36em] list-disc space-y-2 pl-5 text-[0.98rem] leading-relaxed text-zinc-300 marker:text-zinc-600">
                {entry.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
              <p className="mt-4 font-mono text-[12px] text-zinc-500">{entry.tech.join(" · ")}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
