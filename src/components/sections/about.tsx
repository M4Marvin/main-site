import { GraduationCap, BookOpen, Users, Server } from "lucide-react"
import { Link } from "@tanstack/react-router"
import { CardSpotlight } from "@/components/ui/card-spotlight"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SectionHeader } from "@/components/sections/section-header"
import { profile, about } from "@/lib/portfolio-data"

const PAPER_URL = "https://pubs.acs.org/doi/10.1021/acs.jpcb.4c07090"

const educationText = profile.education.map((e) => `${e.degree} (${e.year})`).join(" · ")

export function About() {
  return (
    <section id="about" className="relative bg-black py-20 md:py-32">
      <div className="mx-auto max-w-4xl px-6">
        <SectionHeader title="About" />

        <CardSpotlight className="border-white/10 bg-black/50 p-8">
          <div className="flex flex-col items-center gap-6 md:flex-row md:gap-8">
            <div className="shrink-0">
              <div className="rounded-full bg-white/10 p-1">
                <Avatar className="h-32 w-32 border-2 border-white/10">
                  <AvatarImage
                    src="https://wsrv.nl/?url=files.m4marvin.com%2Fmarvin_no_bg.png&w=256&h=256&fit=cover&output=png"
                    alt={profile.name}
                  />
                  <AvatarFallback className="bg-linear-to-br from-blue-600 to-violet-600 text-2xl text-white">
                    MVP
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>

            <div className="flex flex-col justify-center gap-4">
              <div className="space-y-4 leading-relaxed text-neutral-300">
                {about.summary.split("\n\n").map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </CardSpotlight>

        <CardSpotlight className="border-white/10 bg-black/50 p-6">
              <div className="flex items-center gap-3">
                <GraduationCap className="h-5 w-5 shrink-0 text-blue-400" />
                <div>
                  <p className="text-xs font-medium text-neutral-400 uppercase tracking-wider">Education</p>
                  <p className="mt-0.5 text-sm text-neutral-300">{educationText}</p>
                </div>
              </div>
            </CardSpotlight>

        <div className="mt-8 flex flex-col gap-3 rounded-md border border-white/10 bg-white/[0.02] p-6 text-sm text-neutral-300">
          <p className="flex items-start gap-3">
            <BookOpen className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" aria-hidden />
            <span>
              Co-authored in{" "}
              <a
                href={PAPER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-blue-400 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60"
              >
                J. Phys. Chem. B
              </a>{" "}
              — hydration free energies via physics-based ML
            </span>
          </p>
          <p className="flex items-start gap-3">
            <Users className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" aria-hidden />
            <span>Onboarded 6 engineers at Sirius · mentored 50+ students at JNU</span>
          </p>
          <p className="flex items-start gap-3">
            <Server className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" aria-hidden />
            <span>
              I run my own self-hosted cloud —{" "}
              <Link
                to="/self-hosted-cloud"
                className="font-medium text-blue-400 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60"
              >
                read the writeup
              </Link>
            </span>
          </p>
        </div>
      </div>
    </section>
  )
}