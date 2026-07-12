import { HoverEffect } from "@/components/ui/card-hover-effect"
import { skills } from "@/lib/portfolio-data"

export function Skills() {
  const cardItems = skills.map((cat) => ({
    title: cat.title,
    description: cat.items.join(" · "),
    link: "#skills",
  }))

  return (
    <section id="skills" className="relative bg-black py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-12">
          <h2 className="bg-linear-to-b from-white to-neutral-400 bg-clip-text text-4xl font-bold text-transparent">
            Skills & Tech Stack
          </h2>
          <div className="mt-1 h-1 w-20 rounded-full bg-linear-to-r from-blue-500 to-violet-500" />
        </div>

        <HoverEffect items={cardItems} />
      </div>
    </section>
  )
}
