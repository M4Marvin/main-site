import { ExternalLink, LineChart, TrendingUp, Server, Sparkles } from "lucide-react"
import { Link } from "@tanstack/react-router"
import { Image } from "@unpic/react"
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid"
import { Badge } from "@/components/ui/badge"
import { projects } from "@/lib/portfolio-data"
import { cn } from "@/lib/utils"
import type { Project } from "@/lib/portfolio-data"

function getProjectIcon(slug: string) {
  switch (slug) {
    case "marvfinancialcharts":
      return LineChart
    case "qdata-octo":
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
  return project.image
}

function ProjectGradient() {
  return (
    <div className="flex h-full min-h-[8rem] w-full items-center justify-center rounded-t-xl bg-gradient-to-br from-blue-600 via-blue-500 to-violet-600">
      <Sparkles className="h-8 w-8 text-white/60" />
    </div>
  )
}

type CardWrapperProps = {
  href?: string
  to?: string
  className?: string
  children: React.ReactNode
}

function CardWrapper({ href, to, className, children }: CardWrapperProps) {
  const classes = cn(
    "group/card block rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/40",
    className,
  )

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    )
  }

  return <div className={classes}>{children}</div>
}

type ProjectCardProps = {
  project: Project
}

function ProjectCard({ project }: ProjectCardProps) {
  const Icon = getProjectIcon(project.slug)
  const thumbnail = getThumbnail(project)

  const blogHref = project.slug === "marvfinancialcharts" ? "/footprint-charts" : null
  const cardTarget = blogHref ?? project.link ?? null
  const isInternal = !!blogHref
  const isExternal = !isInternal && !!project.link
  const isClickable = !!cardTarget

  const handleDemoClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (project.link) {
      window.open(project.link, "_blank", "noopener,noreferrer")
    }
  }

  const cardClasses = cn(
    "h-full transition-transform duration-200",
    isClickable && "group-hover/card:-translate-y-1",
  )

  const description = (
    <div className="space-y-3">
      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-neutral-500">
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
            className="border-white/10 bg-white/5 text-[10px] text-neutral-400"
          >
            {t}
          </Badge>
        ))}
      </div>
      {project.link && (
        <button
          type="button"
          onClick={handleDemoClick}
          className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-blue-400 transition-colors hover:border-blue-400/30 hover:bg-blue-400/10 hover:text-blue-300"
        >
          <ExternalLink className="h-3 w-3" />
          Live demo
        </button>
      )}
    </div>
  )

  const header = thumbnail ? (
    <div className="relative h-full min-h-[8rem] w-full overflow-hidden rounded-t-xl">
      <Image
        src={thumbnail}
        alt={project.title}
        className="h-full w-full object-cover transition-transform duration-500 group-hover/card:scale-105"
        width={800}
        height={400}
        layout="constrained"
        fallback="wsrv"
      />
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

  const cardInner = (
    <div className={cardClasses}>
      <BentoGridItem
        title={title}
        description={description}
        header={header}
        className={cn(
          "h-full border-white/[0.1] transition-colors duration-200",
          isClickable && "hover:border-white/20",
        )}
      />
    </div>
  )

  return (
    <CardWrapper
      {...(isInternal ? { to: cardTarget as string } : {})}
      {...(isExternal ? { href: cardTarget as string } : {})}
    >
      {cardInner}
    </CardWrapper>
  )
}

export function Work() {
  const featuredProjects = projects.filter((p) => p.featured)

  return (
    <section id="work" className="relative bg-black py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-12">
          <h2 className="bg-gradient-to-b from-white to-neutral-400 bg-clip-text text-4xl font-bold text-transparent">
            Selected Work
          </h2>
          <div className="mt-1 h-1 w-20 rounded-full bg-gradient-to-r from-blue-500 to-violet-500" />
        </div>

        <BentoGrid className="mx-auto max-w-7xl md:auto-rows-auto">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </BentoGrid>
      </div>
    </section>
  )
}
