import { Link } from "@tanstack/react-router"
import { profile } from "@/lib/portfolio-data"
import { Reveal } from "@/components/ui/reveal"

const PAPER_URL = "https://pubs.acs.org/doi/10.1021/acs.jpcb.4c07090"
const PHOTO_URL =
  "https://wsrv.nl/?url=files.m4marvin.com%2Fmedia%2Fmarvin_no_bg.png&w=192&h=192&fit=cover&output=png"

export function About() {
  const education = profile.education[0]

  return (
    <section id="about" className="border-t border-zinc-800 py-12">
      <Reveal>
        <h2 className="font-mono text-[11px] tracking-[0.14em] text-zinc-400 uppercase">About</h2>

        <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
          <img
            src={PHOTO_URL}
            alt={profile.name}
            width={96}
            height={96}
            loading="lazy"
            decoding="async"
            className="size-24 shrink-0 rounded-full object-cover"
          />
          <p className="max-w-[36em] text-[0.98rem] leading-relaxed text-zinc-300">
            I'm a senior software engineer with 3+ years building production systems end to end:
            trading infrastructure, market-data platforms, and the data layers AI agents need. At
            Morphotech Data I lead a small team delivering two B2B client engagements — rebuilding
            messy relational data and shipping 15 MCP tools over it. Before that I built the Sirius
            execution engine, ingestor, and dashboard, and a solo charting engine over a Parquet
            lake. I started in computational biology, co-authored a paper in J. Phys. Chem. B, and
            I'm actively looking for senior/staff roles in trading infrastructure, data platforms,
            or AI tooling.
          </p>
        </div>

        <ul className="mt-8 max-w-[36em] space-y-3 font-mono text-[13px] leading-relaxed text-zinc-400">
          {education && (
            <li>
              {education.degree} · {education.school} · {education.year}
            </li>
          )}
          <li>
            Equal-contribution co-author in{" "}
            <a href={PAPER_URL} target="_blank" rel="noopener noreferrer" className="text-link">
              J. Phys. Chem. B
            </a>{" "}
            — hydration free energies via physics-based ML
          </li>
          <li>
            I run a self-hosted cloud —{" "}
            <Link to="/self-hosted-cloud" className="text-link">
              the writeup
            </Link>
          </li>
        </ul>
      </Reveal>
    </section>
  )
}
