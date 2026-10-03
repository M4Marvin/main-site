type FlowStep = { title: string; note: string | null }

const REBUILD_STEPS: FlowStep[] = [
  { title: "Client data", note: "messy · duplicated" },
  { title: "Rebuild & migrate", note: "schema · dedupe" },
  { title: "MCP servers", note: "query · search · write" },
  { title: "AI agents", note: null },
]

function Flow({ steps }: { steps: FlowStep[] }) {
  return (
    <ol className="grid grid-cols-1 gap-2 sm:grid-cols-4 sm:gap-3">
      {steps.map((step, i) => (
        <li key={step.title} className="relative">
          <div className="flex h-full flex-col justify-center border border-zinc-800 px-4 py-5 text-center">
            <p className="text-[0.95rem] font-medium tracking-[-0.015em] text-zinc-50">
              {step.title}
            </p>
            {step.note && (
              <p className="mt-1 font-mono text-[11px] text-zinc-500 sm:whitespace-nowrap">
                {step.note}
              </p>
            )}
          </div>
          {i < steps.length - 1 && (
            <span
              aria-hidden="true"
              className="flex justify-center py-0.5 font-mono text-[12px] text-zinc-600 sm:absolute sm:top-1/2 sm:right-[-0.65rem] sm:z-10 sm:translate-x-0 sm:-translate-y-1/2 sm:py-0"
            >
              <span className="sm:hidden">↓</span>
              <span className="hidden sm:inline">→</span>
            </span>
          )}
        </li>
      ))}
    </ol>
  )
}

/** The Morphotech card's four-step rebuild diagram, on the home page Work list. */
export function RebuildFlow() {
  return <Flow steps={REBUILD_STEPS} />
}
