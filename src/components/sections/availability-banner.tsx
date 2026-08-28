export function AvailabilityBanner() {
  return (
    <a
      href="#contact"
      className="availability-banner inline-flex max-w-full items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-neutral-300 transition-colors duration-200 hover:border-white/20 hover:bg-white/[0.07] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/40 sm:text-sm"
    >
      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" aria-hidden />
      <span>Available now · Architect / Tech Lead · Abu Dhabi</span>
    </a>
  )
}
