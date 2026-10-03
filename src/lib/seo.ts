import { profile } from "@/lib/portfolio-data"

export const SITE_URL = "https://m4marvin.com"

export const SITE_DESCRIPTION = profile.tagline

export function pageHead({
  title,
  description,
  path,
}: {
  title?: string
  description?: string
  path?: string
}) {
  // Archive §3: the §3 headline belongs in `<title>` and the OG title. With no
  // page title it reads "Full Stack Architect | Technical Lead — Marvin V Prakash".
  const head = title ?? profile.title
  const fullTitle = head ? `${head} — ${profile.name}` : profile.name
  const desc = description ?? SITE_DESCRIPTION
  const url = path ? `${SITE_URL}${path}` : SITE_URL
  const image = `${SITE_URL}/og.png`

  return {
    meta: [
      { title: fullTitle },
      { name: "description", content: desc },
      { property: "og:title", content: fullTitle },
      { property: "og:description", content: desc },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      { property: "og:image", content: image },
      { property: "og:site_name", content: profile.name },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: fullTitle },
      { name: "twitter:description", content: desc },
      { name: "twitter:image", content: image },
    ],
    links: [{ rel: "canonical", href: url }],
  }
}
