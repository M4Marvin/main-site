import { Link } from "@tanstack/react-router"
import type { ReactNode } from "react"
import { projects } from "@/lib/portfolio-data"
import type { Project, Stat } from "@/lib/portfolio-data"
import { Reveal } from "@/components/ui/reveal"
import { RebuildFlow } from "@/components/sections/signal-flow"

function getThumbnail(project: Project) {
  if (project.slug === "mfinancialcharts") {
    return "https://files.m4marvin.com/media/charts_app/1.png"
  }
  if (project.slug === "acbr-drug-discovery") {
    return "/acbr-ankalan.webp"
  }
  return null
}

type Action = { label: string; to?: string; href?: string }

function cardAction(project: Project): Action | null {
  if (project.slug === "morphotech-data") {
    return { label: "Case study", to: "/work/morphotech" }
  }
  if (project.slug === "sirius-trading-platform") {
    return { label: "Case study", to: "/work/sirius" }
  }
  if (project.slug === "acbr-drug-discovery") {
    return { label: "Case study", to: "/work/acbr" }
  }
  if (project.slug === "mfinancialcharts") {
    return { label: "Live demo", href: project.link }
  }
  return null
}

function titleTarget(project: Project): { to?: string } {
  if (project.slug === "morphotech-data") return { to: "/work/morphotech" }
  if (project.slug === "sirius-trading-platform") return { to: "/work/sirius" }
  if (project.slug === "acbr-drug-discovery") return { to: "/work/acbr" }
  if (project.slug === "mfinancialcharts") return { to: "/work/charts" }
  return {}
}

function Title({ project }: { project: Project }) {
  const target = titleTarget(project)
  const className =
    "text-[1.15rem] font-medium tracking-[-0.02em] text-zinc-50 underline decoration-zinc-600 underline-offset-[0.18em] transition-[text-decoration-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:decoration-current sm:text-xl"

  if (target.to) {
    return (
      <Link to={target.to} className={className}>
        {project.title}
      </Link>
    )
  }
  return (
    <span className="text-[1.15rem] font-medium tracking-[-0.02em] text-zinc-50 sm:text-xl">
      {project.title}
    </span>
  )
}

function ActionLink({ action }: { action: Action }) {
  if (action.to) {
    return (
      <Link to={action.to} className="text-link font-mono text-[13px]">
        {action.label} <span className="action-hint">→</span>
      </Link>
    )
  }
  return (
    <a
      href={action.href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-link font-mono text-[13px]"
    >
      {action.label} <span className="ext-hint">↗</span>
    </a>
  )
}

function Stats({ stats }: { stats: Stat[] }) {
  return (
    <dl
      className={`mt-6 grid grid-cols-1 gap-4 ${stats.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-3"}`}
    >
      {stats.map((stat) => (
        <div key={stat.label} className="flex flex-col-reverse">
          <dt className="mt-1.5 font-mono text-[12px] text-zinc-400">{stat.label}</dt>
          <dd className="font-mono text-[1.65rem] leading-none tabular-nums tracking-tight text-zinc-50 sm:text-[2rem]">
            {stat.value}
          </dd>
        </div>
      ))}
    </dl>
  )
}

function Caption({ children }: { children: ReactNode }) {
  return <figcaption className="mt-2 font-mono text-[12px] text-zinc-400">{children}</figcaption>
}

function ProjectFigure({ project }: { project: Project }) {
  if (project.slug === "morphotech-data") {
    return (
      <figure className="mt-6">
        <RebuildFlow />
        <Caption>From messy client data to agent-ready tools.</Caption>
      </figure>
    )
  }

  if (project.slug === "sirius-trading-platform") {
    // The source video is 1080x1920 (a phone-shaped walkthrough); using it in a
    // wide card would either letterbox or jump to a two-screen-tall block. The
    // card shows the pipeline still; the case study keeps the full video.
    return (
      <figure className="mt-6">
        <img
          src="/sirius-card.webp"
          alt="Sirius pipeline: TradingView webhooks and proprietary signals, through Cloudflare and the ingestor, to 50 execution systems and the monitoring dashboard"
          width={1080}
          height={608}
          loading="lazy"
          decoding="async"
          className="h-auto w-full border border-zinc-800"
        />
        <Caption>Signals → ingestor → 50 execution systems → dashboard.</Caption>
      </figure>
    )
  }

  const thumbnail = getThumbnail(project)
  if (!thumbnail) return null
  const isAcbr = project.slug === "acbr-drug-discovery"
  const width = 1600
  const height = isAcbr ? 567 : 950
  const imgClass = "h-auto w-full border border-zinc-800"

  return (
    <figure className="mt-6">
      <img
        src={thumbnail}
        alt={
          isAcbr
            ? "ACBR Ankalan: prediction, virtual screening, Tanimoto similarity, and QED drug-likeness"
            : "Per-trade footprint chart with imbalance zones and indicators"
        }
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        className={imgClass}
      />
      <Caption>
        {isAcbr
          ? "ACBR Ankalan: prediction, screening, Tanimoto, QED."
          : "Per-trade footprints, imbalance zones, indicators-on-indicators."}
      </Caption>
    </figure>
  )
}

function ProjectArticle({ project }: { project: Project }) {
  const action = cardAction(project)

  return (
    <article className="py-10">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3>
          <Title project={project} />
        </h3>
        <p className="font-mono text-[12px] text-zinc-400">{project.period}</p>
      </div>

      <p className="mt-1 font-mono text-[12px] text-zinc-400">
        {project.role}
        <span aria-hidden="true"> · </span>
        {project.org}
      </p>

      <p className="mt-4 max-w-[36em] text-[0.98rem] leading-relaxed text-zinc-300">
        {project.summary}
      </p>

      {project.stats && project.stats.length > 0 && <Stats stats={project.stats} />}

      <ProjectFigure project={project} />

      <div className="mt-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
        <p className="font-mono text-[12px] text-zinc-400">{project.tech.join(" · ")}</p>
        {action && <ActionLink action={action} />}
      </div>
    </article>
  )
}

export function Work() {
  const items = projects.filter((p) => p.featured)

  return (
    <section id="work" className="pt-2 pb-4">
      <Reveal>
        <h2 className="font-mono text-[11px] tracking-[0.14em] text-zinc-400 uppercase">Work</h2>
      </Reveal>
      <div className="mt-4 divide-y divide-zinc-800">
        {items.map((project, i) => (
          <Reveal key={project.slug} delay={i * 40}>
            <ProjectArticle project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
