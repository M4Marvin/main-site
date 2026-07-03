import { Calendar, MapPin, Briefcase } from "lucide-react"
import { Timeline } from "@/components/ui/timeline"
import { Badge } from "@/components/ui/badge"
import { experience } from "@/lib/portfolio-data"

export function Experience() {
  const data = experience.map((exp) => ({
    title: exp.title,
    content: (
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-neutral-400">
          <span className="flex items-center gap-1.5 font-medium text-blue-400">
            <Briefcase className="h-3.5 w-3.5" />
            {exp.company}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" />
            {exp.location}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            {exp.period}
          </span>
        </div>

        <ul className="space-y-2">
          {exp.bullets.map((bullet, i) => (
            <li key={i} className="flex gap-2 text-sm leading-relaxed text-neutral-300">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
              {bullet}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-1.5 pt-1">
          {exp.tech.map((t) => (
            <Badge key={t} variant="secondary" className="border-white/10 bg-white/5 text-xs text-neutral-400">
              {t}
            </Badge>
          ))}
        </div>
      </div>
    ),
  }))

  return (
    <section id="experience" className="relative bg-black">
      <Timeline data={data} />
    </section>
  )
}
