import { getAllPosts } from "@/lib/blog"
import { createFileRoute, Link } from "@tanstack/react-router"
import { pageHead } from "@/lib/seo"

export const Route = createFileRoute("/blog/")({
  component: BlogIndex,
  head: () =>
    pageHead({
      title: "Writing",
      description: "Engineering notes on recovery, hardware, and the systems on this site.",
      path: "/blog",
    }),
})

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

function BlogIndex() {
  const posts = getAllPosts()

  return (
    <main id="main" tabIndex={-1} className="pb-8">
      <header className="pb-10">
        <h1 className="text-[1.65rem] font-medium tracking-[-0.02em] text-zinc-50 sm:text-[1.85rem]">
          Writing
        </h1>
        <p className="mt-3 text-[0.98rem] leading-relaxed text-zinc-400">
          Engineering notes — recovery, hardware, and the systems on this site.
        </p>
      </header>

      <ul>
        {posts.map((post) => (
          <li key={post.slug} className="border-t border-zinc-800 py-6">
            <Link to="/blog/$slug" params={{ slug: post.slug }} className="group block">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h2 className="text-[1.05rem] font-medium tracking-[-0.015em] text-zinc-50 underline decoration-transparent underline-offset-[0.18em] transition-[text-decoration-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:decoration-current">
                  {post.title}
                </h2>
                <time dateTime={post.date} className="font-mono text-[12px] text-zinc-500">
                  {formatDate(post.date)}
                </time>
              </div>
              <p className="mt-2 max-w-[36em] text-[0.95rem] leading-relaxed text-zinc-400">
                {post.description}
              </p>
              <p className="mt-2 font-mono text-[12px] text-zinc-600">{post.tags.join(" · ")}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
