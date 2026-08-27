import { ExternalLink, LineChart, TrendingUp, Server, Sparkles } from "lucide-react"
import { Link } from "@tanstack/react-router"
import { Image } from "@unpic/react"
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid"
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
    case "self-hosted-infrastructure":
      return Server
    default:
      return Sparkles
  }
}

function getThumbnail(project: Project) {
  if (project.slug === "marvfinancialcharts") {
    return "https://files.m4marvin.com/charts_app/1.png"
  }
  if (project.slug === "self-hosted-infrastructure") {
    return "/infra-diagram.svg"
  }
  return project.image
}

function ProjectGradient() {
  return (
    <div className="flex h-full min-h-[8rem] w-full items-center justify-center rounded-t-xl bg-gradient-to-br from-blue-600 via-blue-500 to-violet-600">
      <Sparkles className="h-8 w-8 text-white/60" />
    </div>
  )
}

type CardLinkProps = {
  to?: string
  href?: string
  className?: string
  children: React.ReactNode
}

function CardLink({ to, href, className, children }: CardLinkProps) {
  if (to) {
    return (
      <Link to={to} className={className}>
        {children}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    )
  }
  return <>{children}</>
}

type ProjectCardProps = {
  project: Project
}

function ProjectCard({ project }: ProjectCardProps) {
  const Icon = getProjectIcon(project.slug)
  const thumbnail = getThumbnail(project)

  const blogHref =
    project.slug === "marvfinancialcharts"
      ? "/footprint-charts"
      : project.slug === "self-hosted-infrastructure"
        ? "/self-hosted-cloud"
        : null
  const cardTarget = blogHref ?? project.link ?? null
  const isInternal = !!blogHref
  const isClickable = !!cardTarget

  const linkProps = isClickable
    ? isInternal
      ? { to: cardTarget as string }
      : { href: cardTarget as string }
    : {}

  const cardClasses = cn(
    "h-full transition-transform duration-200",
    isClickable && "group/card cursor-pointer hover:-translate-y-1 active:scale-[0.98]",
  )

  const description = (
    <div className="space-y-3">
      <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-neutral-400">
        <span>{project.role}</span>
        {project.period && (
          <>
            <span aria-hidden>·</span>
            <span>{project.period}</span>
          </>
        )}
      </div>
      <p className="text-sm leading-relaxed text-neutral-300">{project.summary}</p>
      <div className="flex flex-wrap gap-1.5">
        {project.tech.map((t) => (
          <Badge
            key={t}
            variant="secondary"
            className="border-white/10 bg-white/5 text-xs text-neutral-400"
          >
            {t}
          </Badge>
        ))}
      </div>
      {project.link && (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-blue-400 transition-colors duration-200 hover:border-blue-400/30 hover:bg-blue-400/10 hover:text-blue-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60 active:scale-[0.97]"
        >
          <ExternalLink className="h-3 w-3" />
          Live demo
        </a>
      )}
    </div>
  )

  const isSvg = thumbnail?.toLowerCase().endsWith(".svg")

  const header = thumbnail ? (
    <div className="relative aspect-[2/1] min-h-[8rem] w-full overflow-hidden rounded-t-xl bg-black">
      {isSvg ? (
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
  ) : (
    <ProjectGradient />
  )

  const title = (
    <div className="flex items-center gap-2 font-sans font-bold text-neutral-200">
      <Icon className="h-4 w-4 text-neutral-400" aria-hidden />
      <span>{project.title}</span>
    </div>
  )

  const focusRing = "rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/40"

  const titleNode = isClickable ? (
    <CardLink {...linkProps} className={focusRing}>
      {title}
    </CardLink>
  ) : (
    title
  )

  const headerNode = isClickable ? (
    <CardLink {...linkProps} className={focusRing}>
      {header}
    </CardLink>
  ) : (
    header
  )

  return (
    <div className={cardClasses}>
      <BentoGridItem
        title={titleNode}
        description={description}
        header={headerNode}
        className={cn(
          "h-full border-white/[0.1] transition-colors duration-200",
          isClickable && "hover:border-white/20",
        )}
      />
    </div>
  )
}

export function Work() {
  const featuredProjects = projects.filter((p) => p.featured)

  return (
    <section id="work" className="relative bg-black py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeader title="Selected Work" />

        <BentoGrid className="mx-auto max-w-7xl md:auto-rows-auto">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </BentoGrid>
      </div>
    </section>
  )
}