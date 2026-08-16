import { getAllPosts } from "@/lib/blog"
import { createFileRoute, Link } from "@tanstack/react-router"
import { Calendar, Tag, ArrowLeft } from "lucide-react"

export const Route = createFileRoute("/blog/")({ component: BlogIndex })

function BlogIndex() {
  const posts = getAllPosts()

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-3xl px-4 pt-32 pb-24">
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to main
        </Link>

        <div className="mb-16">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Blog
          </h1>
          <p className="mt-4 text-lg text-zinc-400">
            Notes on Linux, Hyprland, and building things.
          </p>
        </div>

        <div className="space-y-8">
          {posts.map((post) => (
            <Link
              key={post.slug}
              to="/blog/$slug"
              params={{ slug: post.slug }}
              className="group block rounded-xl border border-white/10 bg-white/[0.02] p-6 transition-colors hover:border-white/20 hover:bg-white/[0.04]"
            >
              <h2 className="text-xl font-semibold group-hover:text-blue-400 transition-colors">
                {post.title}
              </h2>
              <p className="mt-2 text-zinc-400">{post.description}</p>
              <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-zinc-500">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <span className="flex items-center gap-1.5">
                  <Tag className="h-3.5 w-3.5" />
                  <span className="flex gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-white/5 px-2 py-0.5 text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
