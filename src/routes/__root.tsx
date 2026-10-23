import { Outlet, createRootRoute, useRouterState } from "@tanstack/react-router"
import { useEffect } from "react"
import { SkipLink } from "@/components/sections/skip-link"
import { SiteHeader } from "@/components/sections/site-header"
import { Footer } from "@/components/sections/footer"
import { PageMark } from "@/components/sections/page-mark"
import { Reveal } from "@/components/ui/reveal"
import { NotFoundPage } from "@/components/sections/not-found"
import { canonicalUrl, fullTitle, getRouteMeta } from "@/lib/route-meta"
import type { RouteMeta } from "@/lib/route-meta"

import "../styles.css"

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFoundPage,
})

function setHead(selector: string, attribute: string, value: string) {
  const el = document.head.querySelector(selector)
  if (el) el.setAttribute(attribute, value)
}

function applyMeta(meta: RouteMeta) {
  document.title = fullTitle(meta)
  setHead('meta[name="description"]', "content", meta.description)
  setHead('meta[property="og:title"]', "content", fullTitle(meta))
  setHead('meta[property="og:description"]', "content", meta.description)
  setHead('meta[property="og:url"]', "content", canonicalUrl(meta))
  setHead('meta[property="og:type"]', "content", meta.type ?? "website")
  setHead('meta[name="twitter:title"]', "content", fullTitle(meta))
  setHead('meta[name="twitter:description"]', "content", meta.description)

  let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (meta.noindex) {
    canonical?.remove()
  } else {
    if (!canonical) {
      canonical = document.createElement("link")
      canonical.rel = "canonical"
      document.head.appendChild(canonical)
    }
    canonical.href = canonicalUrl(meta)
  }

  let robots = document.head.querySelector<HTMLMetaElement>('meta[name="robots"]')
  if (meta.noindex) {
    if (!robots) {
      robots = document.createElement("meta")
      robots.name = "robots"
      document.head.appendChild(robots)
    }
    robots.content = "noindex"
  } else {
    robots?.remove()
  }
}

function useRouteMeta() {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  useEffect(() => {
    applyMeta(getRouteMeta(pathname))
  }, [pathname])
}

function RootComponent() {
  useRouteMeta()
  const home = useRouterState({ select: (s) => s.location.pathname === "/" })

  return (
    <div className="relative isolate min-h-dvh">
      <SkipLink />
      <PageMark compact={!home} />
      <div className="relative z-10 mx-auto flex min-h-dvh w-full max-w-[68rem] flex-col px-6 sm:px-8">
        <Reveal>
          <SiteHeader />
        </Reveal>
        <div className={home ? "flex-1" : "flex-1 max-w-[42rem]"}>
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  )
}
