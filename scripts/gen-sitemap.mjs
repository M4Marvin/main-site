#!/usr/bin/env node
import { readdir, readFile, writeFile } from "node:fs/promises"
import { join } from "node:path"

const SITE_URL = "https://m4marvin.com"
const BLOG_DIR = "src/content/blog"
const OUT = "public/sitemap.xml"

const STATIC_PATHS = [
  "/",
  "/blog",
  "/work/acbr",
  "/work/sirius",
  "/work/charts",
  "/self-hosted-cloud",
]

function loc(path) {
  return path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`
}

function escapeXml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;")
}

function urlEntry(path, lastmod) {
  const last = lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ""
  return `  <url>\n    <loc>${escapeXml(loc(path))}</loc>${last}\n  </url>`
}

function parseDate(raw) {
  const match = raw.match(/^date:\s*"?(\d{4}-\d{2}-\d{2})"?/m)
  return match?.[1] ?? null
}

async function blogUrls() {
  const files = (await readdir(BLOG_DIR)).filter((f) => f.endsWith(".md"))
  const urls = []
  for (const file of files) {
    const raw = await readFile(join(BLOG_DIR, file), "utf8")
    urls.push({
      path: `/blog/${file.replace(/\.md$/, "")}`,
      lastmod: parseDate(raw),
    })
  }
  return urls.sort((a, b) => a.path.localeCompare(b.path))
}

const posts = await blogUrls()
const urls = [...STATIC_PATHS.map((path) => ({ path, lastmod: null })), ...posts]

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => urlEntry(u.path, u.lastmod)).join("\n")}
</urlset>
`

await writeFile(OUT, xml)
console.log(`wrote ${OUT} (${urls.length} urls)`)
