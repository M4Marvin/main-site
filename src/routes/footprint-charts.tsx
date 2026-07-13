import { createFileRoute, Link } from "@tanstack/react-router"
import { ArrowLeft, ExternalLink } from "lucide-react"
import { Image } from "@unpic/react"
import { Typeset } from "@/components/ui/typeset"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export const Route = createFileRoute("/footprint-charts")({
  component: FootprintChartsPage,
})

function Diagram({
  src,
  alt,
  caption,
}: {
  src: string
  alt: string
  caption: string
}) {
  return (
    <figure className="my-8">
      <img
        src={src}
        alt={alt}
        className="w-full rounded-lg border border-white/10"
      />
      <figcaption className="mt-2 text-center text-xs text-neutral-500">
        {caption}
      </figcaption>
    </figure>
  )
}

function FootprintChartsPage() {
  return (
    <main className="relative min-h-screen bg-black text-white">
      <div className="mx-auto max-w-4xl px-4 py-8 md:px-8 md:py-16">
        <div className="mb-12">
          <Link
            to="/"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "-ml-3 gap-2 text-neutral-400 hover:text-white",
            )}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>

        <Typeset>
          <h1>Diving Deep into Footprint Charts: Building the Ultimate Order Flow Tool for Crypto Traders</h1>

          <p>
            A walkthrough of how <code>mFinancialCharts</code> renders per-trade order flow on
            raw HTML5 Canvas, backed by a Python/Polars/Parquet data lake and a FastAPI serving
            layer. Live at{" "}
            <a href="https://charts.m4marvin.com" target="_blank" rel="noopener noreferrer">
              charts.m4marvin.com
              <ExternalLink className="ml-0.5 inline-block h-3 w-3" />
            </a>
            .
          </p>

          <h2>Background</h2>

          <p>
            Footprint charts show the buy/sell volume distribution at every price level inside
            each candle. They are the workhorse of order-flow trading &mdash; used to spot
            absorption, exhaustion, and imbalance zones. TradingView did not support true
            per-trade footprint charts at the time I built this, and there were no usable
            open-source references. So the rendering pipeline, the order-flow algorithms, the
            data lake, and the API were all built from scratch.
          </p>

          <h2>Architecture</h2>

          <p>
            The repo is two halves. <code>backend/</code> is a Python data platform
            (FastAPI + Polars + Typer + Parquet). <code>marvCharts/</code> is a React 18 +
            TypeScript frontend with no charting libraries &mdash; every renderer is raw
            HTML5 Canvas. The data path runs:
            exchange APIs (Binance, Bybit) &rarr; raw trades &rarr; Parquet data lake &rarr;
            FastAPI &rarr; TanStack Query &rarr; Zustand &rarr; Canvas renderer.
          </p>

          <Diagram
            src="/charts-context.svg"
            alt="C4 System Context diagram: a trader uses Cloudflare Edge to reach Marv Financial Charts, which downloads trade data from Binance and Bybit APIs"
            caption="Figure 1. System context (C4 level 1): the trader, the app, and the exchange APIs."
          />

          <p>
            The system boundary is deliberately narrow. A trader hits the app through
            Cloudflare&rsquo;s edge, which terminates TLS and forwards to the VPS over a
            post-quantum tunnel. The only outbound connections are to Binance and
            Bybit&rsquo;s public REST APIs, and those only fire during offline ETL runs
            &mdash; never at request time. The app has no database, no message queue, no
            external cache. The Parquet data lake is the entire persistence layer.
          </p>

          <Diagram
            src="/charts-pipeline.svg"
            alt="Data pipeline diagram showing two phases: Phase A offline ETL from exchange APIs through CLI and Polars into a Parquet data lake, and Phase B online serving from the data lake through FastAPI and Polars to the browser Canvas renderer"
            caption="Figure 2. Data pipeline: offline ETL writes the data lake; online serving reads from it. The two phases never overlap."
          />

          <p>
            The pipeline has two phases that never overlap. Phase A is offline: a Typer
            CLI pulls trade-level CSV archives from the exchange APIs, converts them to
            LZ4-compressed Parquet with Polars, writes them to the hierarchical data lake,
            and builds a file index. Phase B is online: the FastAPI server looks up files
            by date range, reads the relevant Parquet files with Polars, aggregates
            5-second OHLCV to whatever interval the client requested, and returns JSON.
            The browser then renders everything on Canvas 2D. The data lake is the only
            shared state between the two phases.
          </p>

          <Image
            src="https://files.m4marvin.com/charts_app/1.png"
            alt="Full system view: footprint chart with Bollinger Bands, imbalance zones, and ROC indicator"
            width={1600}
            height={950}
            layout="constrained"
            fallback="wsrv"
          />

          <p>
            The screenshot above is what the platform looks like once all the pieces are
            wired together &mdash; footprint bricks, Bollinger Bands, dynamic support/resistance
            lines, imbalance zones, and a ROC oscillator in a separate pane. Everything is
            rendered client-side; the API only ships data.
          </p>

          <h2>The Data Platform</h2>

          <p>
            The data lake is Apache Parquet with LZ4 compression, organized hierarchically:
            <code>{` data/{exchange}/{market}/{symbol}/{YYYY}/{MM}/{DD}/ `}</code>
            with one Parquet file per instrument-day for trades and one for 5-second OHLCV.
            Columnar storage means we only read the columns the renderer actually needs; LZ4
            keeps decompression cheap on time-series data.
          </p>

          <p>
            Aggregation and ingestion use Polars, not Pandas. Lazy evaluation keeps the
            memory footprint flat when scanning a year of trades; vectorized operations make
            the OHLC aggregation fast; Parquet I/O is significantly faster than the Pandas
            equivalent. The trade-off is a smaller ecosystem, but for this workload the
            performance win was decisive.
          </p>

          <p>
            The CLI is built on Typer and exposes 21 commands across 4 groups:{" "}
            <code>etl</code> (download, convert, organize, split), <code>exchange</code>{" "}
            (symbol discovery and exchange metadata), <code>index</code> (build, verify,
            stats), and <code>benchmark</code> (read-performance, compression-sizes). The
            backend itself is 65+ Python files, organized around{" "}
            <code>app/core/</code> (config, logging, exceptions),{" "}
            <code>app/infrastructure/</code> (persistence, exchange integrations, ETL), and{" "}
            <code>app/api/v1/endpoints/</code>.
          </p>

          <Diagram
            src="/charts-container.svg"
            alt="C4 Container diagram: the Hetzner VPS runs a single Docker container with FastAPI serving both the API and the React SPA static files, with a Parquet data lake bind-mounted from the host"
            caption="Figure 3. Container view (C4 level 2): one Docker container, one port, one data lake bind-mount."
          />

          <p>
            The entire app ships as a single Docker container. A multi-stage build
            compiles the React SPA with Vite on a Node image, then copies the built static
            files into a Python 3.14 image alongside the FastAPI backend. Uvicorn serves
            both the API and the static files from port 8006. The Parquet data lake and
            logs are bind-mounted from the host, so the container is stateless and
            rebuildable. On the same VPS as the other services, <code>cloudflared</code>{" "}
            routes traffic to <code>127.0.0.1:8006</code> &mdash; the same pattern every
            other service uses.
          </p>

          <h2>The API</h2>

          <p>
            FastAPI exposes 14 endpoints. The two that matter for footprint charts are{" "}
            <code>GET /ohlc</code> and <code>POST /indicator</code>. The OHLC endpoint takes
            a symbol, time interval, and a <code>footprints</code> flag; when set, it returns
            per-candle bid/ask breakdowns at the requested tick granularity. Pagination is
            built in for the long history views. The indicator endpoint accepts arbitrary
            source columns and computes SMA, EMA, RSI, Bollinger Bands, and ROC server-side,
            so the frontend never recomputes the same series twice.
          </p>

          <Diagram
            src="/charts-backend.svg"
            alt="C4 Level 3 Backend Component diagram: the FastAPI backend is organized in six layers from entry points through API routers, services, utilities, infrastructure, down to data stores"
            caption="Figure 4. Backend components (C4 level 3): six layers, each depending only on the one below."
          />

          <p>
            The backend is a layered Python application. At the top, two entry points:
            Uvicorn for the API server, Typer for the offline CLI. The API layer has six
            routers exposing fourteen endpoints &mdash; the two that carry the real load are{" "}
            <code>GET /ohlc</code> and <code>POST /indicator</code>. Below that, services
            orchestrate business logic: indicator calculations, symbol lookups, file
            indexing, and data lake management. The utility layer is where the Polars work
            happens &mdash; OHLC aggregation, footprint computation, and file-path
            resolution. Infrastructure holds the exchange integrations: an async
            downloader, URL generators, and Parquet file management. At the bottom, the data
            stores: the Parquet data lake, the file index, and cached exchange metadata.
            Each layer only depends on the one below it, which kept the 65-file codebase
            navigable.
          </p>

          <Image
            src="https://files.m4marvin.com/charts_app/2.png"
            alt="Classic footprint chart with Bollinger Bands and imbalance zones"
            width={1600}
            height={950}
            layout="constrained"
            fallback="wsrv"
          />

          <p>
            The view above is the basic footprint output: candles with per-level buy/sell
            bricks, horizontal Bollinger Bands, and imbalance zones marked as colored
            rectangles between bricks where one side dominates the other.
          </p>

          <h2>The Canvas Rendering Engine</h2>

          <p>
            The frontend does not use TradingView, Chart.js, or Recharts. The 11 renderers
            in <code>marvCharts/src/canvas/</code> are all raw HTML5 Canvas 2D: candlesticks,
            footprint charts, line, area, bar, stacked bar, column, full column, step line,
            volume indicator (18 sub-renderings), and indicator data. The footprint renderer
            alone is 682 lines, split between an orchestrator (<code>drawFootprintCharts.ts</code>)
            and ten focused files in <code>footprintUtils/</code> totaling 1,569 lines.
          </p>

          <p>
            The single most important performance trick: separate canvases for hover, chart,
            and axes. A single canvas that re-renders on every mouse move will not hold 60fps
            with thousands of data points. Splitting them means the hover layer can repaint at
            60fps while the chart layer only repaints on viewport or data changes.
          </p>

          <p>
            Other techniques: viewport clipping so we never draw off-screen bricks, batched
            draw calls to minimize state changes, D3 scales used only for coordinate math
            (never for rendering), and explicit high-DPI handling. D3 is loaded only for the
            scale functions; the entire visual layer is custom.
          </p>

          <h2>Footprint Charts: The Algorithm Internals</h2>

          <p>
            The footprint renderer is organized as an orchestrator and a set of small
            algorithm files. <code>calculationUtils.ts</code> holds the actual math: POC,
            VAR, imbalance detection, S/R zone detection, and fill-percentage calculation.
            The other files (<code>POCUtils.ts</code>, <code>ImbalanceUtils.ts</code>,{" "}
            <code>VARPlottingUtils.ts</code>, <code>SRPLottingUtils.ts</code>,{" "}
            <code>extensionUtils.ts</code>, <code>drawingUtils.ts</code>,{" "}
            <code>drawFootprintMarkers.ts</code>, <code>textUtils.ts</code>,{" "}
            <code>commonUtils.ts</code>) handle rendering and color decisions. Each file is
            small enough to read in one sitting, and the orchestrator is just dispatch.
          </p>

          <p>
            <strong>Imbalance detection</strong> walks the per-level arrays and computes
            <code> left[i] - right[i+1] </code>
            and <code> right[i+1] - left[i] </code> against a threshold. The threshold is
            either a fixed value (raw volume delta) or a percentage (relative to the smaller
            side). The result is two boolean arrays &mdash; one for left-side imbalances,
            one for right-side imbalances &mdash; that the rendering layer paints as colored
            zones.
          </p>

          <p>
            <strong>Point of Control (POC)</strong> uses two strategies.{" "}
            <code>getPOCIndices</code> finds the price level with the maximum buy volume and
            the price level with the maximum sell volume separately &mdash; left and right
            POCs can land on different levels. <code>getPOCMarkerIndex</code> finds the
            single level with the maximum combined volume for the marker overlay.
          </p>

          <p>
            <strong>Value Area Range (VAR)</strong> has two algorithms and they give
            meaningfully different results:
          </p>

          <ul>
            <li>
              <code>handleStandardMethod</code> starts at the maximum-volume level and
              expands outward one level at a time, picking whichever adjacent level has the
              higher volume. It stops once accumulated volume reaches the target (e.g. 70% of
              the candle&rsquo;s total). Fast, intuitive, but the resulting band is
              anchored on the POC and grows symmetrically in volume space.
            </li>
            <li>
              <code>handleGreedyMethod</code> uses a sliding window. It finds the
              <em>smallest</em> window whose volume sum meets the target. The result is
              often a tighter band than the standard method, and it is not anchored on the
              POC. This is the one professional traders tend to prefer, because it shows
              where the action actually concentrated.
            </li>
          </ul>

          <p>
            <strong>Support/Resistance zones</strong> are derived from imbalance runs.
            <code>calculateSRZones</code> scans the boolean imbalance arrays and groups
            consecutive <code>true</code> entries into zones, dropping any zone shorter than
            a configurable threshold. Strength zones come from left-side imbalances
            (aggressive buying), resistance zones from right-side imbalances (aggressive
            selling).
          </p>

          <p>
            <strong>Fill percentages and lopsided rendering</strong> drive the brick
            coloring. <code>calculateFillPercentages</code> normalizes each side by its own
            max, then paints each brick with that fill ratio. When <code>lobsidedFormat</code>
            is enabled, the smaller of the two sides at each level is zeroed out &mdash;
            so you only see the dominant side, not both at half-strength. The visual
            effect is a cleaner read on who is winning each level.
          </p>

          <p>
            <strong>Extensions</strong> are drawn by <code>plotAllExtensions</code> and
            project POC and VAR lines forward through subsequent candles until the price
            crosses them &mdash; giving you horizontal levels that survive across candles
            instead of resetting every bar.
          </p>

          <Image
            src="https://files.m4marvin.com/charts_app/3.png"
            alt="Detailed footprint chart showing numeric buy/sell volumes per price level"
            width={1600}
            height={950}
            layout="constrained"
            fallback="wsrv"
          />

          <p>
            The view above is the detailed read: numeric buy/sell volumes at every price
            level, POC markers, imbalance zones in orange/red/blue, and a ROC oscillator
            below. Every number on screen is computed client-side from the bid/ask arrays
            returned by the API.
          </p>

          <h2>State and Data Fetching</h2>

          <p>
            The frontend has 4 Zustand stores: <code>useContainerStore</code> (main app
            state, 46 actions, widget/pane/viewport management),{" "}
            <code>useFavouritesStore</code> (chart-type and interval preferences),{" "}
            <code>useTimeIntervalStore</code> (1m, 5m, 1h, 1d), and{" "}
            <code>useTickIntervalsStore</code> (5 to 10,000 ticks per candle). Splitting
            store responsibilities this way keeps each one small and avoids the prop-drilling
            pain of a single global store.
          </p>

          <p>
            Twelve custom React hooks sit on top of the stores and the API.{" "}
            <code>useOhlcData</code> uses TanStack Query&rsquo;s infinite queries with{" "}
            <code>fetchNextPage</code> and <code>fetchPreviousPage</code> for bidirectional
            scrolling through history. <code>useFootprintData</code> joins the per-level
            bid/ask breakdowns. <code>useIndicatorData</code> parallelizes SMA, EMA, RSI,
            Bollinger, and ROC fetches with <code>Promise.all</code>. Cache TTL is 30
            minutes &mdash; history is immutable, so aggressive caching is safe.
          </p>

          <h2>Configuration</h2>

          <p>
            The <code>FootprintSettings</code> type in <code>drawFootprintCharts.ts</code>
            is the entire surface area: 80+ flags covering display values (16 options per
            side: volume, trades, percentages, quote volume), POC (3 types &times; 4
            display modes &mdash; color fill or highlight &times; with or without marker and
            extension), VAR (standard and greedy, each with 3 quantity types), imbalance
            detection (FIXED or PERCENTAGE), imbalance zones with a minimum-length
            threshold, lopsided format and scale, candle position (left/middle/right), and
            full color control. Everything is persisted to local storage through Zustand.
          </p>

          <Image
            src="https://files.m4marvin.com/charts_app/4.png"
            alt="Footprint Chart Settings panel"
            width={1600}
            height={950}
            layout="constrained"
            fallback="wsrv"
          />

          <p>
            The settings panel above is the live config surface. Every flag in the type
            is reachable from the UI; nothing is hard-coded.
          </p>

          <h2>What I Learned</h2>

          <p>Three things stuck with me from this project:</p>

          <ul>
            <li>
              Data platforms and UIs are different problems. The backend was about
              compression ratios, ETL idempotency, and incremental indexing. The frontend
              was about batching draw calls and not re-allocating on every frame. Keeping
              the boundaries clean made both sides easier to reason about.
            </li>
            <li>
              Canvas performance is mostly about what you <em>don&rsquo;t</em> draw.
              Viewport clipping and multi-canvas layers were worth more than any micro-
              optimization of the draw loop.
            </li>
            <li>
              The two VAR algorithms are not interchangeable. Standard VAR is intuitive and
              fast, but greedy VAR (sliding window) gives a tighter, more honest read on
              where the volume concentrated. The right choice depends on what the trader
              is looking for &mdash; which is why both are exposed.
            </li>
          </ul>

          <hr />

          <p>
            The full technical writeup for the project is in the{" "}
            <Link to="/footprint-charts">mFinancialCharts project overview</Link>, and the
            live charts are at{" "}
            <a href="https://charts.m4marvin.com" target="_blank" rel="noopener noreferrer">
              charts.m4marvin.com
              <ExternalLink className="ml-0.5 inline-block h-3 w-3" />
            </a>
            .
          </p>
        </Typeset>
      </div>
    </main>
  )
}
