import { createFileRoute, Link } from "@tanstack/react-router"
import { Typeset } from "@/components/ui/typeset"
import { SignalFlow } from "@/components/sections/signal-flow"
import { pageHead } from "@/lib/seo"
import { profile } from "@/lib/portfolio-data"

export const Route = createFileRoute("/work/sirius")({
  component: SiriusPage,
  head: () =>
    pageHead({
      title: "Sirius",
      description:
        "Algorithmic trading infrastructure: 200ms signal-to-trade, 5,000+ trades a day, 106,185+ signals. Execution engine, ingestor, and desk dashboard — built end to end.",
      path: "/work/sirius",
    }),
})

function SiriusPage() {
  return (
    <main id="main" tabIndex={-1} className="pb-8">
      <Typeset>
        <h1>Sirius — Algorithmic Trading Infrastructure</h1>

        <p className="mt-2 !font-mono !text-[12px] !tracking-normal !text-zinc-500">
          Algorithmic Trading Infrastructure Engineer · Sirius International Holding · Abu Dhabi,
          UAE · Apr 2025 – Feb 2026
        </p>

        <p>
          Signals in, orders out, 200ms later. Traders design the strategies — I built the
          platform that executes them.
        </p>

        <figure className="my-8 not-prose">
          <SignalFlow />
          <figcaption className="mt-2 text-center font-mono text-[12px] text-zinc-500">
            Signals → ingestor (auth · validate · route) → 50 execution systems → dashboard.
          </figcaption>
        </figure>

        <h2>What I owned</h2>

        <p>
          Traders designed the strategy logic — grids, pyramiding, reversals. I did not. I built
          the machine that takes a signal and turns it into an order: the execution engine, the
          ingestor, and the monitoring dashboard, each of those layers solo. AWS VPC, certificates,
          and Cloudflare IP filtering were built with one coworker. Over the tenure I onboarded six
          engineers onto that production stack.
        </p>

        <h2>The constraint</h2>

        <p>
          The MetaTrader 5 Python API is clunky, old, and unreliable — no robust trading system
          can sit directly on it. I designed a custom mt5-client wrapper by hand: OOP design, full
          error handling, price and spread conditions. It became essential to the platform&apos;s
          reliability.
        </p>

        <h2>200ms</h2>

        <p>
          Signal-to-trade is the interval from a signal arriving at the ingestor (authenticated
          and validated) to the execution engine submitting the order to the broker API. It is
          not exchange round-trip, and it is not fill confirmation. 5,000+ trades a day average;
          106,185+ signals processed across the platform. Holding periods of hours to days,
          Monday to Friday — systematic execution, not HFT.
        </p>

        <h2>Core trading engine</h2>

        <ul>
          <li>Executes trades per algorithm from raw signals.</li>
          <li>
            Risk controls at every layer: dynamic position sizing, circuit breakers, multi-channel
            alerting.
          </li>
          <li>Every signal carries a correlation ID traceable end-to-end.</li>
          <li>Dual logging — on-system + Postgres.</li>
        </ul>

        <h2>The Ingestor</h2>

        <p>
          The only server exposed to the internet. It receives TradingView webhooks plus
          proprietary signal sources, authenticates, validates, and routes each signal to the
          correct execution system. Routing is exposed as a REST API, and the ingestor accepts
          traffic only from Cloudflare IPs.
        </p>

        <h2>Trading dashboard</h2>

        <p>
          Live monitoring and control, still in daily use at the desk. Execution reports,
          signal-quality stats, strategy performance, inter-strategy correlation. Deliberately
          dynamic — new stat views without rework. Built with TanStack Start, Tailwind, TanStack
          Query, Polars + Parquet, and Postgres.
        </p>

        <h2>Scale</h2>

        <ul>
          <li>
            50 execution systems — 50 Windows machines on AWS (MT5 Python is Windows-only), each
            running its own algorithm version on its own account.
          </li>
          <li>5 brokers, 20–25 instruments across metals, crypto, energy, forex.</li>
        </ul>

        <p>
          This is an internal platform for a private company, so there is no public UI to click.
          The architecture above is the tour. For a system you can open, see the{" "}
          <Link to="/work/charts">charting engine</Link>
          — or email me at{" "}
          <a href={`mailto:${profile.email}`}>{profile.email}</a>.
        </p>
      </Typeset>
    </main>
  )
}
