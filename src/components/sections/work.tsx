import { ArrowRight, ExternalLink, LineChart, TrendingUp, Sparkles } from "lucide-react"
import { Link } from "@tanstack/react-router"
import { Image } from "@unpic/react"
import { BentoGridItem } from "@/components/ui/bento-grid"
import { Badge } from "@/components/ui/badge"
import { SectionHeader } from "@/components/sections/section-header"
import { projects } from "@/lib/portfolio-data"
import { cn } from "@/lib/utils"
import type { Project } from "@/lib/portfolio-data"

function getProjectIcon(slug: string) {
  switch (slug) {
    case "marvfinancialcharts":
      return LineChart
    case "sirius-trading-platform":
      return TrendingUp
    default:
      return Sparkles
  }
}

function getThumbnail(project: Project) {
  if (project.slug === "marvfinancialcharts") {
    return "https://files.m4marvin.com/charts_app/1.png"
  }
  if (project.slug === "sirius-trading-platform") {
    return "/sirius-architecture.svg"
  }
  if (project.slug === "acbr-drug-discovery") {
    return "/acbr-ankalan.webp"
  }
  return null
}

type Action = { label: string; to?: string; href?: string }

function cardAction(project: Project): Action | null {
  if (project.slug === "sirius-trading-platform") {
    return { label: "Read the case study", to: "/work/sirius" }
  }
  if (project.slug === "acbr-drug-discovery" && project.link) {
    return { label: "Open the live tool", href: project.link }
  }
  if (project.link) {
    return { label: "Live demo", href: project.link }
  }
  return null
}

function titleTarget(project: Project): { to?: string; href?: string } {
  if (project.slug === "sirius-trading-platform") return { to: "/work/sirius" }
  if (project.slug === "marvfinancialcharts") return { to: "/footprint-charts" }
  if (project.link) return { href: project.link }
  return {}
}

const focusRing = "rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/40"

function ProjectMeta({ project }: { project: Project }) {
  return (
    <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-neutral-300">
      <span>{project.role}</span>
      {project.period && (
        <>
          <span aria-hidden>·</span>
          <span className="whitespace-nowrap">{project.period}</span>
        </>
      )}
    </div>
  )
}

function TechBadges({ tech }: { tech: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {tech.map((t) => (
        <Badge key={t} variant="secondary" className="border-white/10 bg-white/5 text-xs text-neutral-400">
          {t}
        </Badge>
      ))}
    </div>
  )
}

function ActionButton({ action }: { action: Action }) {
  const cls =
    "inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-blue-400 transition-colors duration-200 hover:border-blue-400/30 hover:bg-blue-400/10 hover:text-blue-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60 active:scale-[0.97]"
  if (action.to) {
    return (
      <Link to={action.to} className={cls}>
        {action.label}
        <ArrowRight className="h-3 w-3" />
      </Link>
    )
  }
  return (
    <a href={action.href} target="_blank" rel="noopener noreferrer" className={cls}>
      <ExternalLink className="h-3 w-3" />
      {action.label}
    </a>
  )
}

function FeaturedCard({ project }: { project: Project }) {
  const Icon = getProjectIcon(project.slug)
  const action = cardAction(project)
  const target = titleTarget(project)

  return (
    <div className="grid grid-cols-1 overflow-hidden rounded-xl border border-white/10 bg-black transition-colors duration-200 hover:border-white/20 md:grid-cols-5">
      <div className="bg-black md:col-span-3">
        <img
          src="/sirius-architecture.svg"
          alt={project.title}
          width={1000}
          height={500}
          decoding="async"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-col justify-center gap-4 p-6 md:col-span-2 md:p-8">
        <Link to={target.to} aria-label={project.title} className={cn("w-fit", focusRing)}>
          <div className="flex items-center gap-2 font-sans text-xl font-bold text-neutral-200 md:text-2xl">
            <Icon className="h-5 w-5 shrink-0 text-neutral-400" aria-hidden />
            <span className="text-neutral-200">{project.title}</span>
          </div>
        </Link>
        <ProjectMeta project={project} />
        <p className="text-sm leading-relaxed text-neutral-300">{project.summary}</p>
        <TechBadges tech={project.tech} />
        {action && <ActionButton action={action} />}
      </div>
    </div>
  )
}

function ProjectCard({ project }: { project: Project }) {
  const Icon = getProjectIcon(project.slug)
  const thumbnail = getThumbnail(project)
  const isExternalImage = !!thumbnail?.startsWith("http")
  const action = cardAction(project)
  const target = titleTarget(project)

  const header = thumbnail ? (
    <div className="relative aspect-[2/1] min-h-[8rem] w-full overflow-hidden rounded-t-xl bg-black">
      {!isExternalImage ? (
        <img
          src={thumbnail}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover/card:scale-105"
          loading="lazy"
          decoding="async"
        />
      ) : (
        <Image
          src={thumbnail}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover/card:scale-105"
          width={800}
          height={400}
          layout="constrained"
          fallback="wsrv"
        />
      )}
    </div>
  ) : null

  const title = (
    <div className="flex items-center gap-2 font-sans font-bold text-neutral-200">
      <Icon className="h-4 w-4 shrink-0 text-neutral-400" aria-hidden />
      <span className="text-neutral-200">{project.title}</span>
    </div>
  )

  const titleNode = target.to ? (
    <Link to={target.to} aria-label={project.title} className={focusRing}>
      {title}
    </Link>
  ) : target.href ? (
    <a
      href={target.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={project.title}
      className={focusRing}
    >
      {title}
    </a>
  ) : (
    title
  )

  const description = (
    <div className={cn("space-y-3", !thumbnail && "pt-5 md:pt-7")}>
      <ProjectMeta project={project} />
      <p className="text-sm leading-relaxed text-neutral-300">{project.summary}</p>
      <TechBadges tech={project.tech} />
      {action && <ActionButton action={action} />}
    </div>
  )

  return (
    <div className="group/card h-full">
      <BentoGridItem
        title={titleNode}
        description={description}
        header={header}
        className="h-full border-white/[0.1] transition-colors duration-200 hover:border-white/20"
      />
    </div>
  )
}

export function Work() {
  const items = projects.filter((p) => p.featured)
  const hero = items.find((p) => p.slug === "sirius-trading-platform")
  const rest = items.filter((p) => p.slug !== "sirius-trading-platform")

  return (
    <section id="work" className="relative bg-black py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeader title="Selected Work" />

        {hero && <FeaturedCard project={hero} />}

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          {rest.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}