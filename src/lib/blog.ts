export interface BlogPost {
  slug: string
  title: string
  date: string
  description: string
  tags: string[]
  content: string
}

const postModules = import.meta.glob<string>("/src/content/blog/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
})

function parseSlug(path: string): string {
  return path.split("/").pop()?.replace(/\.md$/, "") ?? ""
}

function parseFrontmatter(raw: string): {
  data: Record<string, any>
  content: string
} {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/)
  if (!match) return { data: {}, content: raw }

  const yamlBlock = match[1]
  const content = raw.slice(match[0].length)
  const data: Record<string, any> = {}

  for (const line of yamlBlock.split(/\r?\n/)) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith("#")) continue
    const colonIdx = trimmed.indexOf(":")
    if (colonIdx === -1) continue
    const key = trimmed.slice(0, colonIdx).trim()
    let value: unknown = trimmed.slice(colonIdx + 1).trim()

    if (typeof value === "string") {
      if (value.startsWith("[") && value.endsWith("]")) {
        try { value = JSON.parse(value) } catch { /* keep as string */ }
      } else if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1)
      }
    }
    data[key] = value
  }

  return { data, content }
}

const allPosts: BlogPost[] = Object.entries(postModules)
  .map(([path, raw]) => {
    const { data, content } = parseFrontmatter(raw)
    return {
      slug: parseSlug(path),
      title: data.title ?? "",
      date: data.date ?? "",
      description: data.description ?? "",
      tags: data.tags ?? [],
      content,
    }
  })
  .sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  )

export function getAllPosts(): BlogPost[] {
  return allPosts
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return allPosts.find((p) => p.slug === slug)
}
