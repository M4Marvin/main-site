import { HoverEffect } from "@/components/ui/card-hover-effect"
import { SectionHeader } from "@/components/sections/section-header"
import { publications } from "@/lib/portfolio-data"

export function Publications() {
  return (
    <section id="publications" className="relative bg-black py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeader title="Publications & Research" />

        <HoverEffect items={publications} layoutId="publicationsHover" />
      </div>
    </section>
  )
}