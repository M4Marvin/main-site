import { getPostBySlug, getAllPosts } from "@/lib/blog"
import { createFileRoute, Link, notFound } from "@tanstack/react-router"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Calendar, Tag, ArrowLeft } from "lucide-react"

export const Route = createFileRoute("/blog/$slug")({
  component: BlogPost,
  loader: ({ params }) => {
    const post = getPostBySlug(params.slug)
    if (!post) throw notFound()
    return post
  },
  notFoundComponent: NotFound,
})

function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold">404</h1>
        <p className="mt-2 text-zinc-400">Post not found.</p>
        <Link to="/blog" className="mt-4 inline-block text-blue-400 hover:underline">
          Back to blog
        </Link>
      </div>
    </main>
  )
}

function BlogPost() {
  const post = Route.useLoaderData()
  const allPosts = getAllPosts()
  const currentIndex = allPosts.findIndex((p) => p.slug === post.slug)
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null

  return (
    <main className="min-h-screen bg-black text-white">
      <article className="mx-auto max-w-3xl px-4 pt-32 pb-24">
        <Link
          to="/blog"
          className="mb-8 inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          All posts
        </Link>

        <header className="mb-12">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {post.title}
          </h1>
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
        </header>

        <div className="prose prose-invert max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </div>

        {(prevPost || nextPost) && (
          <nav className="mt-16 flex items-center justify-between border-t border-white/10 pt-8">
            {prevPost ? (
              <Link
                to="/blog/$slug"
                params={{ slug: prevPost.slug }}
                className="group text-left"
              >
                <span className="text-xs text-zinc-500">Previous</span>
                <p className="mt-1 text-sm font-medium group-hover:text-blue-400 transition-colors">
                  {prevPost.title}
                </p>
              </Link>
            ) : (
              <div />
            )}
            {nextPost ? (
              <Link
                to="/blog/$slug"
                params={{ slug: nextPost.slug }}
                className="group text-right"
              >
                <span className="text-xs text-zinc-500">Next</span>
                <p className="mt-1 text-sm font-medium group-hover:text-blue-400 transition-colors">
                  {nextPost.title}
                </p>
              </Link>
            ) : (
              <div />
            )}
          </nav>
        )}
      </article>
    </main>
  )
}
