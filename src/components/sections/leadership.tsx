"use client"

import { Trophy, Users, Target } from "lucide-react"
import { WobbleCard } from "@/components/ui/wobble-card"
import { leadership } from "@/lib/portfolio-data"

const icons = [Users, Target, Trophy]
const bgColors = [
  "bg-linear-to-br from-blue-900 via-blue-950 to-black",
  "bg-linear-to-br from-violet-900 via-violet-950 to-black",
  "bg-linear-to-br from-indigo-900 via-indigo-950 to-black",
]

export function Leadership() {
  return (
    <section id="leadership" className="relative bg-black py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-12">
          <h2 className="bg-linear-to-b from-white to-neutral-400 bg-clip-text text-4xl font-bold text-transparent">
            Leadership
          </h2>
          <div className="mt-1 h-1 w-20 rounded-full bg-linear-to-r from-blue-500 to-violet-500" />
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {leadership.map((item, i) => {
            const Icon = icons[i % icons.length]
            return (
              <WobbleCard key={i} containerClassName={bgColors[i % bgColors.length]} className="min-h-[280px]">
                <div className="flex h-full flex-col justify-between">
                  <div>
                    <Icon className="mb-4 h-8 w-8 text-blue-400" />
                    <h3 className="text-xl font-bold text-white">{item.title}</h3>
                    <p className="mt-1 text-sm font-medium text-blue-300">{item.subtitle}</p>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-neutral-300">{item.description}</p>
                </div>
              </WobbleCard>
            )
          })}
        </div>
      </div>
    </section>
  )
}
