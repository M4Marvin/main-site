import { MapPin, GraduationCap } from "lucide-react"
import { TracingBeam } from "@/components/ui/tracing-beam"
import { CardSpotlight } from "@/components/ui/card-spotlight"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { profile, about } from "@/lib/portfolio-data"

const quickFacts = [
  { icon: MapPin, label: "Location", value: profile.location },
  { icon: GraduationCap, label: "Education", value: profile.education.map((e) => `${e.degree} (${e.year})`).join(" · ") },
]

export function About() {
  return (
    <section id="about" className="relative bg-black py-20 md:py-32">
      <TracingBeam className="px-6">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12">
            <h2 className="bg-linear-to-b from-white to-neutral-400 bg-clip-text text-4xl font-bold text-transparent">
              About
            </h2>
            <div className="mt-1 h-1 w-20 rounded-full bg-linear-to-r from-blue-500 to-violet-500" />
          </div>

          <CardSpotlight className="border-white/10 bg-black/50 p-8">
            <div className="flex flex-col gap-6 md:flex-row md:gap-8">
              <div className="flex shrink-0 flex-col items-center gap-4">
                <Avatar className="h-24 w-24 border-2 border-white/10">
                  <AvatarFallback className="bg-linear-to-br from-blue-600 to-violet-600 text-2xl text-white">
                    MVP
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="border-white/10 bg-white/5 text-white">
                    {profile.location}
                  </Badge>
                  <Badge variant="secondary" className="border-white/10 bg-white/5 text-white">
                    3+ Years
                  </Badge>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="space-y-3 leading-relaxed text-neutral-300">
                  {about.summary.split(". ").map((sentence, i) => (
                    <p key={i}>{sentence}{i < about.summary.split(". ").length - 1 ? "." : ""}</p>
                  ))}
                </div>
              </div>
            </div>
          </CardSpotlight>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {quickFacts.map((fact) => (
              <CardSpotlight key={fact.label} className="border-white/10 bg-black/50 p-6">
                <div className="flex items-center gap-3">
                  <fact.icon className="h-5 w-5 text-blue-400" />
                  <div>
                    <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider">{fact.label}</p>
                    <p className="mt-0.5 text-sm text-neutral-300">{fact.value}</p>
                  </div>
                </div>
              </CardSpotlight>
            ))}
          </div>
        </div>
      </TracingBeam>
    </section>
  )
}
