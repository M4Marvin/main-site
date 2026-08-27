import { Users, Target, Trophy } from "lucide-react"
import { SectionHeader } from "@/components/sections/section-header"
import { leadership } from "@/lib/portfolio-data"

const icons = [Users, Target, Trophy]

export function Leadership() {
  return (
    <section id="leadership" className="relative bg-black py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeader title="Leadership" />

        <div className="grid gap-6 md:grid-cols-3">
          {leadership.map((item, i) => {
            const Icon = icons[i % icons.length]
            return (
              <div
                key={item.title}
                className="flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors duration-200 hover:border-white/20"
              >
                <div>
                  <Icon className="mb-4 h-8 w-8 text-blue-400" />
                  <h3 className="text-xl font-bold text-white">{item.title}</h3>
                  <p className="mt-1 text-sm font-medium text-blue-300">{item.subtitle}</p>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-neutral-300">{item.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}