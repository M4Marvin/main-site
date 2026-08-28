export function AvailabilityBanner() {
  return (
    <a
      href="#contact"
      className="availability-banner flex flex-col items-center justify-center gap-0.5 border-b border-white/10 bg-white/[0.02] px-4 py-2.5 text-center text-xs font-medium leading-snug text-neutral-300 transition-colors duration-200 hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-400/40 sm:text-sm"
    >
      <span className="flex items-center gap-2">
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" aria-hidden />
        Open to Architect / Tech Lead roles · Abu Dhabi, UAE
      </span>
      <span>Immediate joining · Full-time or contractor</span>
    </a>
  )
}