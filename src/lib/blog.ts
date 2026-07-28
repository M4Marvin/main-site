import matter from "gray-matter"

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

const allPosts: BlogPost[] = Object.entries(postModules)
  .map(([path, raw]) => {
    const { data, content } = matter(raw)
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
