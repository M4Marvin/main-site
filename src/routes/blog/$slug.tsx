import { getPostBySlug, getAllPosts } from "@/lib/blog"
import { createFileRoute, Link, notFound } from "@tanstack/react-router"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Typeset } from "@/components/ui/typeset"
import { pageHead } from "@/lib/seo"
import { NotFoundPage } from "@/components/sections/not-found"

export const Route = createFileRoute("/blog/$slug")({
  component: BlogPost,
  loader: ({ params }) => {
    const post = getPostBySlug(params.slug)
    if (!post) throw notFound()
    return post
  },
  head: ({ loaderData }) =>
    pageHead({
      title: loaderData?.title,
      description: loaderData?.description,
      path: loaderData ? `/blog/${loaderData.slug}` : "/blog",
    }),
  notFoundComponent: NotFoundPage,
})

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

function BlogPost() {
  const post = Route.useLoaderData()
  const allPosts = getAllPosts()
  const currentIndex = allPosts.findIndex((p) => p.slug === post.slug)
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null

  return (
    <main id="main" tabIndex={-1} className="pb-8">
      <article>
        <header className="mb-10">
          <h1 className="text-[1.65rem] font-medium tracking-[-0.02em] text-zinc-50 sm:text-[1.85rem]">
            {post.title}
          </h1>
          <p className="mt-3 font-mono text-[12px] text-zinc-500">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden="true"> · </span>
            {post.tags.join(" · ")}
          </p>
        </header>

        <Typeset>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
        </Typeset>
      </article>

      {(prevPost || nextPost) && (
        <nav className="mt-16 flex items-start justify-between gap-8 border-t border-zinc-800 pt-8">
          {prevPost ? (
            <Link to="/blog/$slug" params={{ slug: prevPost.slug }} className="group max-w-[45%] text-left">
              <span className="font-mono text-[12px] text-zinc-500">Previous</span>
              <p className="mt-1 text-sm text-zinc-300 underline decoration-transparent underline-offset-[0.18em] transition-[text-decoration-color] duration-200 group-hover:decoration-current">
                {prevPost.title}
              </p>
            </Link>
          ) : (
            <div />
          )}
          {nextPost ? (
            <Link to="/blog/$slug" params={{ slug: nextPost.slug }} className="group max-w-[45%] text-right">
              <span className="font-mono text-[12px] text-zinc-500">Next</span>
              <p className="mt-1 text-sm text-zinc-300 underline decoration-transparent underline-offset-[0.18em] transition-[text-decoration-color] duration-200 group-hover:decoration-current">
                {nextPost.title}
              </p>
            </Link>
          ) : (
            <div />
          )}
        </nav>
      )}
    </main>
  )
}
