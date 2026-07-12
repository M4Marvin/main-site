import { cn } from "@/lib/utils"

export function Typeset({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "prose prose-gray dark:prose-invert max-w-none",
        "prose-headings:scroll-mt-24 prose-headings:font-bold prose-headings:tracking-tight",
        "prose-h1:text-4xl prose-h1:md:text-5xl",
        "prose-h2:mt-12 prose-h2:text-2xl prose-h2:md:text-3xl",
        "prose-h3:text-xl prose-h3:md:text-2xl",
        "prose-p:leading-7 prose-p:text-neutral-300",
        "prose-a:text-blue-400 prose-a:no-underline hover:prose-a:text-blue-300",
        "prose-strong:text-white",
        "prose-li:text-neutral-300 prose-li:marker:text-neutral-500",
        "prose-img:rounded-xl prose-img:border prose-img:border-white/10",
        "prose-hr:border-white/10",
        "prose-code:rounded prose-code:bg-white/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm prose-code:font-normal prose-code:text-neutral-200 prose-code:before:content-none prose-code:after:content-none",
        className,
      )}
    >
      {children}
    </div>
  )
}
