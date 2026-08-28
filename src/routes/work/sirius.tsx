import { createFileRoute } from "@tanstack/react-router"
import { SkipLink } from "@/components/sections/skip-link"
import { PageHeader } from "@/components/sections/page-header"
import { Typeset } from "@/components/ui/typeset"

export const Route = createFileRoute("/work/sirius")({
  component: SiriusPage,
})

function SiriusPage() {
  return (
    <main id="main" tabIndex={-1} className="relative min-h-screen bg-black text-white">
      <SkipLink />
      <div className="mx-auto max-w-4xl px-4 py-8 md:px-8 md:py-16">
        <PageHeader backTo="/" backLabel="Back to Home" />

        <Typeset>
          <h1>Sirius — Algorithmic Trading Infrastructure</h1>

          <p className="mt-2 text-xs font-medium tracking-wider text-neutral-400 uppercase">
            Algorithmic Trading Infrastructure Engineer · Sirius International Holding · Abu Dhabi, UAE · Apr 2025 – Feb 2026
          </p>

          <p>
            Signals in, orders out, 200ms later. Traders design the strategies — I built the
            platform that executes them, every layer, solo.
          </p>

          <figure className="my-8">
            <img
              src="/sirius-architecture.svg"
              alt="Architecture: TradingView webhooks and proprietary signals flow through the ingestor to 50 execution systems, with a monitoring dashboard"
              width={1000}
              height={500}
              decoding="async"
              className="rounded-xl border border-white/10"
            />
            <figcaption className="mt-2 text-center text-xs text-neutral-400">
              Signals → ingestor (auth · validate · route) → 50 execution systems → dashboard.
            </figcaption>
          </figure>

          <h2>The constraint</h2>

          <p>
            The MetaTrader 5 Python API is clunky, old, and unreliable — no robust trading
            system can sit directly on it. I designed a custom mt5-client wrapper by hand: OOP
            design, full error handling, price and spread conditions. It became essential to
            the platform&apos;s reliability.
          </p>

          <h2>Core trading engine (owned end-to-end)</h2>

          <ul>
            <li>Executes trades per algorithm from raw signals.</li>
            <li>
              Strategy logic (grids, pyramiding, reversals) is designed by the traders — I
              built the machine that executes them, not the strategies.
            </li>
            <li>
              Risk controls at every layer: dynamic position sizing, circuit breakers,
              multi-channel alerting.
            </li>
            <li>Every signal carries a correlation ID traceable end-to-end.</li>
            <li>Dual logging — on-system + Postgres.</li>
          </ul>

          <h2>The Ingestor (custom message queue)</h2>

          <p>
            The only server exposed to the internet. It receives TradingView webhooks plus
            proprietary signal sources, authenticates, validates, and routes each signal to
            the correct execution system. Routing is exposed as a REST API, and the ingestor
            accepts traffic only from Cloudflare IPs.
          </p>

          <h2>Trading dashboard</h2>

          <p>
            Live monitoring and control, still in daily use at the desk. Execution reports,
            signal-quality stats, strategy performance, inter-strategy correlation. Deliberately
            dynamic — new stat views without rework. Built with TanStack Start, Tailwind,
            TanStack Query, Polars + Parquet, and Postgres.
          </p>

          <h2>Infrastructure (built with one coworker)</h2>

          <p>
            AWS VPC, certificates, and Cloudflare IP filtering — only verified signal sources
            reach the ingestor.
          </p>

          <h2>Scale &amp; operations</h2>

          <ul>
            <li>50 execution systems — 50 Windows machines on AWS (MT5 Python is Windows-only), each running its own algorithm version on its own account.</li>
            <li>5 brokers, 20–25 instruments across metals, crypto, energy, forex.</li>
            <li>200ms signal-to-trade.</li>
            <li>106,185+ signals processed; 5,000+ trades per day (average).</li>
            <li>Mon–Fri, holding periods of hours to days — systematic execution, not HFT.</li>
            <li>Onboarded 6 engineers over the tenure.</li>
          </ul>

          <p>
            This is an internal platform for a private company — no public screenshots exist.
            The architecture above is the tour.
          </p>
        </Typeset>
      </div>
    </main>
  )
}