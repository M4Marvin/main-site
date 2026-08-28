import { Link } from "@tanstack/react-router"
import { ArrowLeft } from "lucide-react"

export function PageHeader({ backTo, backLabel }: { backTo: string; backLabel: string }) {
  return (
    <header className="mb-10 flex items-center justify-between border-b border-white/5 pb-4">
      <Link
        to="/"
        className="rounded text-base font-semibold text-white transition-colors hover:text-blue-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60"
      >
        Marvin V Prakash
      </Link>
      <Link
        to={backTo}
        className="inline-flex items-center gap-1.5 rounded text-base text-zinc-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60"
      >
        <ArrowLeft className="h-4 w-4" />
        {backLabel}
      </Link>
    </header>
  )
}