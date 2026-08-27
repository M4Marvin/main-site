import { HoverEffect } from "@/components/ui/card-hover-effect"
import { SectionHeader } from "@/components/sections/section-header"
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
        <SectionHeader title="Skills & Tech Stack" />

        <HoverEffect items={cardItems} layoutId="skillsHover" />
      </div>
    </section>
  )
}