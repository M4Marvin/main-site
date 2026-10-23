#!/usr/bin/env node
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises"
import { join } from "node:path"

const SITE_URL = "https://m4marvin.com"
const SITE_NAME = "Marvin V Prakash"
const OUT = "dist"
const BLOG_DIR = "src/content/blog"

const staticMeta = JSON.parse(await readFile("src/lib/route-meta.json", "utf8"))
const shell = await readFile(join(OUT, "index.html"), "utf8")

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
}

function fullTitle(meta) {
  return `${meta.title} — ${SITE_NAME}`
}

function canonical(meta) {
  return meta.path === "/" ? `${SITE_URL}/` : `${SITE_URL}${meta.path}`
}

function replaceOne(html, pattern, replacement) {
  const flags = pattern.flags.includes("g") ? pattern.flags : `${pattern.flags}g`
  const matches = html.match(new RegExp(pattern.source, flags))
  if (!matches || matches.length !== 1) {
    throw new Error(`expected exactly one match for ${pattern}`)
  }
  return html.replace(pattern, replacement)
}

function withMeta(meta, is404 = false) {
  const title = escapeHtml(fullTitle(meta))
  const description = escapeHtml(meta.description)
  const url = canonical(meta)
  const type = meta.type ?? "website"

  let html = shell
  html = replaceOne(
    html,
    /<title data-meta="title">[\s\S]*?<\/title>/,
    `<title data-meta="title">${title}</title>`,
  )
  html = replaceOne(
    html,
    /<meta[^>]*data-meta="description"[^>]*>/,
    `<meta data-meta="description" name="description" content="${description}" />`,
  )
  html = replaceOne(
    html,
    /<meta[^>]*data-meta="og:title"[^>]*>/,
    `<meta data-meta="og:title" property="og:title" content="${title}" />`,
  )
  html = replaceOne(
    html,
    /<meta[^>]*data-meta="og:description"[^>]*>/,
    `<meta data-meta="og:description" property="og:description" content="${description}" />`,
  )
  html = replaceOne(
    html,
    /<meta[^>]*data-meta="og:type"[^>]*>/,
    `<meta data-meta="og:type" property="og:type" content="${type}" />`,
  )
  html = replaceOne(
    html,
    /<meta[^>]*data-meta="og:url"[^>]*>/,
    `<meta data-meta="og:url" property="og:url" content="${url}" />`,
  )
  html = replaceOne(
    html,
    /<meta[^>]*data-meta="twitter:title"[^>]*>/,
    `<meta data-meta="twitter:title" name="twitter:title" content="${title}" />`,
  )
  html = replaceOne(
    html,
    /<meta[^>]*data-meta="twitter:description"[^>]*>/,
    `<meta data-meta="twitter:description" name="twitter:description" content="${description}" />`,
  )

  if (is404) {
    html = replaceOne(html, /<link[^>]*data-meta="canonical"[^>]*>/, "")
    html = html.replace("</head>", '    <meta name="robots" content="noindex" />\n  </head>')
  } else {
    html = replaceOne(
      html,
      /<link[^>]*data-meta="canonical"[^>]*>/,
      `<link data-meta="canonical" rel="canonical" href="${url}" />`,
    )
  }

  return html
}

function slugFromFile(file) {
  return file.replace(/\.md$/, "")
}

function frontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!match) return {}
  const data = {}
  for (const line of match[1].split(/\r?\n/)) {
    const colon = line.indexOf(":")
    if (colon === -1) continue
    const key = line.slice(0, colon).trim()
    let value = line.slice(colon + 1).trim()
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }
    data[key] = value
  }
  return data
}

let written = 0

for (const [path, meta] of Object.entries(staticMeta)) {
  if (path === "/404") continue
  const dir = path === "/" ? OUT : join(OUT, path)
  await mkdir(dir, { recursive: true })
  await writeFile(join(dir, "index.html"), withMeta(meta))
  written += 1
}

const posts = (await readdir(BLOG_DIR)).filter((f) => f.endsWith(".md"))
for (const file of posts) {
  const raw = await readFile(join(BLOG_DIR, file), "utf8")
  const data = frontmatter(raw)
  if (!data.title) continue
  const slug = slugFromFile(file)
  const meta = {
    title: data.title,
    description: data.description ?? "",
    path: `/blog/${slug}`,
    type: "article",
  }
  const dir = join(OUT, "blog", slug)
  await mkdir(dir, { recursive: true })
  await writeFile(join(dir, "index.html"), withMeta(meta))
  written += 1
}

await writeFile(join(OUT, "404.html"), withMeta(staticMeta["/404"], true))
console.log(`wrote ${written} route heads + 404.html`)
