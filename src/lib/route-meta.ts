import staticMeta from "./route-meta.json"
import { getAllPosts } from "./blog"
import { SITE_URL } from "./seo"

export interface RouteMeta {
  title: string
  description: string
  path: string
  type?: "website" | "article"
  noindex?: boolean
}

const staticRoutes = staticMeta as Record<string, RouteMeta>

export function normalizePath(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith("/")) return pathname.slice(0, -1)
  return pathname || "/"
}

export function getRouteMeta(pathname: string): RouteMeta {
  const path = normalizePath(pathname)
  if (staticRoutes[path]) return staticRoutes[path]

  if (path.startsWith("/blog/")) {
    const slug = path.slice("/blog/".length)
    const post = getAllPosts().find((p) => p.slug === slug)
    if (post) {
      return {
        title: post.title,
        description: post.description,
        path: `/blog/${post.slug}`,
        type: "article",
      }
    }
  }

  return staticRoutes["/404"]
}

export function fullTitle(meta: RouteMeta): string {
  return `${meta.title} — Marvin V Prakash`
}

export function canonicalUrl(meta: RouteMeta): string {
  return meta.path === "/" ? `${SITE_URL}/` : `${SITE_URL}${meta.path}`
}
