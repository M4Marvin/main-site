import { ExternalLink, ArrowUpRight, Sparkles } from "lucide-react"
import { Image } from "@unpic/react"
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid"
import { Badge } from "@/components/ui/badge"
import { featuredProjects } from "@/lib/portfolio-data"
import { cn } from "@/lib/utils"

function ProjectGradient({ index }: { index: number }) {
  const gradients = [
    "from-blue-600 via-blue-500 to-violet-600",
    "from-violet-600 via-purple-500 to-fuchsia-600",
    "from-zinc-700 via-zinc-600 to-zinc-500",
  ]
  return (
    <div
      className={cn(
        "flex h-full min-h-[8rem] w-full items-center justify-center rounded-t-xl bg-linear-to-br",
        gradients[index % gradients.length],
      )}
    >
      <Sparkles className="h-8 w-8 text-white/60" />
    </div>
  )
}

export function Work() {
  const gridItems = featuredProjects.map((project, i) => ({
    title: project.title,
    description: (
      <div className="space-y-3">
        <p className="text-sm leading-relaxed">{project.description}</p>
        <div className="flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <Badge key={t} variant="secondary" className="border-white/10 bg-white/5 text-[10px] text-neutral-400">
              {t}
            </Badge>
          ))}
        </div>
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-medium text-blue-400 transition-colors hover:text-blue-300"
          >
            {project.link.replace("https://", "").replace(".m4marvin.com", "")}
            <ExternalLink className="h-3 w-3" />
          </a>
        )}
      </div>
    ),
    header: project.image ? (
      <Image
        src={project.image}
        alt={project.title}
        className="h-full min-h-[8rem] w-full rounded-t-xl object-cover"
        width={800}
        height={400}
        layout="constrained"
      />
    ) : (
      <ProjectGradient index={i} />
    ),
    icon: project.link ? <ArrowUpRight className="h-4 w-4 text-neutral-500" /> : <Sparkles className="h-4 w-4 text-neutral-500" />,
    className: "",
  }))

  return (
    <section id="work" className="relative bg-black py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-12">
          <h2 className="bg-linear-to-b from-white to-neutral-400 bg-clip-text text-4xl font-bold text-transparent">
            Selected Work
          </h2>
          <div className="mt-1 h-1 w-20 rounded-full bg-linear-to-r from-blue-500 to-violet-500" />
        </div>

        <BentoGrid className="mx-auto max-w-7xl md:auto-rows-auto">
          {gridItems.map((item, i) => (
            <BentoGridItem
              key={i}
              title={item.title}
              description={item.description}
              header={item.header}
              icon={item.icon}
              className={item.className}
            />
          ))}
        </BentoGrid>
      </div>
    </section>
  )
}
