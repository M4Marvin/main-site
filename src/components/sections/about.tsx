import { Link } from "@tanstack/react-router"
import { profile } from "@/lib/portfolio-data"
import { Reveal } from "@/components/ui/reveal"

const PAPER_URL = "https://pubs.acs.org/doi/10.1021/acs.jpcb.4c07090"
const PHOTO_URL = "https://wsrv.nl/?url=files.m4marvin.com%2Fmarvin_no_bg.png&w=192&h=192&fit=cover&output=png"

export function About() {
  const education = profile.education[0]

  return (
    <section id="about" className="border-t border-zinc-800 py-12">
      <Reveal>
        <h2 className="font-mono text-[13px] text-zinc-500">About</h2>

        <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
          <img
            src={PHOTO_URL}
            alt={profile.name}
            width={96}
            height={96}
            className="size-24 shrink-0 rounded-full object-cover"
          />
          <p className="max-w-[36em] text-[0.98rem] leading-relaxed text-zinc-300">
            I came in through computational biology and stayed for systems that have to keep
            running.
          </p>
        </div>

        <ul className="mt-8 max-w-[36em] space-y-3 font-mono text-[13px] leading-relaxed text-zinc-500">
          {education && (
            <li>
              {education.degree} · {education.school} · {education.year}
            </li>
          )}
          <li>
            Co-authored in{" "}
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
