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
        "prose max-w-none prose-zinc dark:prose-invert",
        "prose-headings:scroll-mt-6 prose-headings:font-medium prose-headings:tracking-[-0.02em] prose-headings:text-zinc-50",
        "prose-h1:text-[1.65rem] prose-h1:leading-tight sm:prose-h1:text-[1.85rem]",
        "prose-h2:mt-10 prose-h2:text-lg sm:prose-h2:text-xl",
        "prose-h3:text-base sm:prose-h3:text-lg",
        "prose-p:text-[0.98rem] prose-p:leading-relaxed prose-p:text-zinc-300",
        "prose-a:font-normal prose-a:text-zinc-400 prose-a:underline prose-a:decoration-transparent prose-a:underline-offset-[0.18em] hover:prose-a:text-zinc-50 hover:prose-a:decoration-current",
        "prose-strong:font-medium prose-strong:text-zinc-50",
        "prose-li:text-zinc-300 prose-li:marker:text-zinc-600",
        "prose-img:rounded-sm prose-img:border prose-img:border-zinc-800",
        "prose-hr:border-zinc-800",
        "prose-figcaption:text-center prose-figcaption:font-mono prose-figcaption:text-[12px] prose-figcaption:text-zinc-500",
        "prose-code:rounded-sm prose-code:bg-zinc-900 prose-code:px-1.5 prose-code:py-0.5 prose-code:font-mono prose-code:text-[0.85em] prose-code:font-normal prose-code:text-zinc-200 prose-code:before:content-none prose-code:after:content-none",
        className,
      )}
    >
      {children}
    </div>
  )
}
