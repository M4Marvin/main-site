export interface Education {
  degree: string
  school: string
  year: string
}

export interface Profile {
  name: string
  title: string
  tagline: string
  status: string
  location: string
  email: string
  phone: string
  github: string
  linkedin: string
  website: string
  resumeUrl: string
  education: Education[]
}

export interface Contribution {
  label: string
  text: string
}

export interface Stat {
  value: string
  label: string
}

export interface Project {
  slug: string
  title: string
  summary: string
  role: string
  org: string
  period: string
  location: string
  story: string[]
  contributions: Contribution[]
  tech: string[]
  // Optional on purpose. A card with no defensible number should render no stat
  // row rather than carry an invented one (archive §13: real proof, no filler).
  stats?: Stat[]
  reflection?: string
  link?: string
  image?: string
  featured: boolean
}

export const profile: Profile = {
  name: "Marvin V Prakash",
  // Archive §3: the ONE public headline string, settled 2026-10-03. It is the
  // search target. The held title stays visible in `status` below and in the
  // Morphotech work card — headline = target, experience = held. Do not also
  // render a Sirius function ("Trading Systems Engineer") as a co-equal title.
  title: "Full Stack Architect | Technical Lead",
  tagline:
    "I build real-time systems end to end — trading infrastructure, market-data platforms, and AI integrations that turn messy, duplicated data into tools agents can use.",
  status: "Senior Software Engineer at Morphotech Data",
  // Archive location rule: this site's markets are Gulf/Europe/US-remote, where the
  // label is Abu Dhabi, UAE. Bangalore is the India-facing label (gens/main only).
  location: "Abu Dhabi, UAE",
  email: "marvinprakash@gmail.com",
  phone: "+971 553391151",
  github: "https://github.com/M4Marvin",
  linkedin: "https://www.linkedin.com/in/marvin-v-prakash/",
  website: "https://m4marvin.com",
  resumeUrl: "https://files.m4marvin.com/MARVIN_V_PRAKASH_RESUME.pdf",
  education: [
    {
      degree: "B.Tech + M.S. Dual Degree — Computer Science & Engineering + Computational Biology",
      school: "Jawaharlal Nehru University",
      year: "2018–2023",
    },
  ],
}

export const projects: Project[] = [
  // Current role, so it leads the Work list (reverse-chronological).
  // The morphotechdata.com link is company evidence only — never attach an
  // individual-contribution claim to it (archive §5.1, §11.37).
  {
    slug: "morphotech-data",
    title: "Morphotech Data — AI-Integrated B2B Solutions",
    summary:
      "Client data arrives messy and duplicated, and the stack around it can't support AI — so I rebuild the relational schema, dedupe, and migrate first, then expose it to agents as MCP tools. Embedded with the client, owned end to end.",
    role: "Senior Software Engineer",
    org: "Morphotech Data",
    period: "Apr 2026 – Present",
    location: "Remote",
    story: [],
    contributions: [],
    tech: ["TypeScript", "PostgreSQL", "MCP", "AI SDK", "AWS"],
    stats: [
      { value: "~5 hrs", label: "Saved / employee / week" },
      { value: "2", label: "Client engagements delivered" },
    ],
    link: "https://morphotechdata.com",
    featured: true,
  },
  {
    slug: "sirius-trading-platform",
    title: "Sirius — Algorithmic Trading Platform",
    summary:
      "Traders design the strategies; I built the platform that executes them — execution engine, signal ingestor, monitoring dashboard — end to end, solo.",
    role: "Algorithmic Trading Infrastructure Engineer",
    org: "Sirius International Holding",
    period: "Apr 2025 – Feb 2026",
    location: "Abu Dhabi, UAE",
    story: [
      "The MetaTrader 5 Python API is clunky, old, and unreliable — no robust trading system can sit directly on it. I designed a custom mt5-client wrapper by hand: OOP design, full error handling, price and spread conditions. It became essential to the platform's reliability.",
      "The ingestor is the only server exposed to the internet — it authenticates, validates, and routes every signal, and accepts traffic only from Cloudflare IPs.",
      "The monitoring dashboard is still in daily use at the desk, with execution reports, signal-quality stats, strategy performance, and inter-strategy correlation.",
    ],
    contributions: [
      {
        label: "Trade execution engine",
        text: "Built the core execution engine with a custom mt5-client wrapper around the MetaTrader 5 Python API. It executes trader-designed strategies across 5 brokers and 20–25 assets, with dynamic position sizing, risk controls, circuit breakers, and multi-channel alerting.",
      },
      {
        label: "Signal ingestion pipeline",
        text: "Built the custom message-queue-style ingestor solo: authenticates, validates, and routes TradingView and proprietary signals through a REST API, with correlation-ID tracing, dual logging to each system and Postgres, and layer-level risk controls and alerting.",
      },
      {
        label: "Monitoring dashboard",
        text: "Built the React + TanStack Start dashboard solo for live account monitoring, execution reports, signal-quality statistics, strategy performance, and inter-strategy correlation.",
      },
      {
        label: "Risk management",
        text: "Implemented dynamic position sizing, circuit breakers, and multi-channel alerting across the engine and ingestor.",
      },
      {
        label: "Team",
        text: "Onboarded and mentored 6 engineers over the tenure, establishing production engineering standards.",
      },
    ],
    tech: ["Python", "FastAPI", "MetaTrader 5", "PostgreSQL"],
    stats: [
      { value: "200ms", label: "Signal-to-trade" },
      { value: "5,000+", label: "Trades / day" },
      { value: "106,185+", label: "Signals processed" },
    ],
    reflection: "Real money, real risk, real consequences. Not a side project or a demo.",
    featured: true,
  },
  {
    slug: "acbr-drug-discovery",
    title: "ACBR Drug Discovery Web Server",
    summary:
      "Designed and built the web platform that deploys and serves the lab's ML models for early-stage drug discovery — virtual screening, Tanimoto similarity, QED drug-likeness.",
    role: "Sole Engineer — ML & Web Platform",
    org: "ACBR (Ambedkar Center for Biomedical Research), University of Delhi",
    period: "Sep 2024 – Mar 2025",
    location: "New Delhi, India",
    story: [
      "Models were built by the lab; my role was optimization, MLOps for deploying and serving trained models, and the website.",
    ],
    contributions: [
      {
        label: "Frontend",
        text: "Designed and developed the Next.js + React + Tailwind website for the open-source server.",
      },
      {
        label: "Backend",
        text: "Built FastAPI services to deploy and serve the lab's trained models for bioactivity prediction and virtual screening.",
      },
      {
        label: "Integration",
        text: "Integrated Tanimoto similarity and RDKit QED drug-likeness analysis into the web platform.",
      },
    ],
    tech: ["Next.js", "FastAPI", "RDKit", "Docker"],
    // No count of targets: archive §5.4 says only "various cancer and virus
    // targets". An unsourced "4" was removed 2026-10-03 rather than published.
    link: "https://bic.acbr.du.ac.in",
    featured: true,
  },
  {
    slug: "mfinancialcharts",
    title: "mFinancialCharts",
    summary:
      "Built solo for a five-person trading desk: Bitcoin alone averages 2M trades a day, so the charting engine renders per-trade footprints at p99 60fps — with 4TB of compressed Parquet behind it.",
    role: "Founding Engineer",
    org: "mFinancialCharts",
    period: "Aug 2023 – Sep 2024",
    location: "New Delhi, India",
    story: [
      "Solo founding engineer for an internal market-analysis tool used by ~5 traders, designed for granular crypto data processing and visualization.",
      "Built the backend, frontend, custom charting engine, data pipeline, and deployment end to end; the tool supports 1-second timeframes, candles, indicators, indicators-on-indicators, and fully custom footprint charts.",
    ],
    contributions: [
      {
        label: "Backend",
        text: "Downloaded every Binance instrument and Bybit trades daily from Binance's public S3 bucket with SHA checksum verification. Built all_trades and 5s_candles from Bitcoin's 2M average daily trades (30M peaks), covering ~1100 spot and ~900 futures instruments, with LZ4 compression and ~4TB of compressed Parquet data in a custom in-house data lake.",
      },
      {
        label: "API",
        text: "FastAPI data delivery with bulk candle requests and smaller footprint-data chunks for responsive infinite loading; Polars via Python reads the Parquet data lake.",
      },
      {
        label: "Frontend",
        text: "React + TypeScript charting engine built with multiple HTML5 canvases for chart, axes, and hover layers, with Zustand state management and virtualization.",
      },
      {
        label: "Footprint chart",
        text: "Fully custom footprint charts show per-price-level volume, trade counts, buy/sell delta, imbalance zones, lopsided formats, and variance, alongside candles and indicators-on-indicators.",
      },
      {
        label: "Performance",
        text: "Multi-canvas rendering, virtualization, and dynamic multi-pane/multi-axis layouts achieved p99 60fps on Firefox and Chrome with thousands of objects on screen.",
      },
    ],
    tech: ["React", "TypeScript", "HTML5 Canvas", "Polars"],
    stats: [
      { value: "p99 60fps", label: "Chart render" },
      { value: "4TB", label: "Compressed Parquet" },
      { value: "2M", label: "BTC trades / day" },
    ],
    reflection:
      "Built the data pipeline and charting engine around the hardest case—Bitcoin's high-volume trade stream—so the same system could serve every supported instrument and timeframe.",
    link: "https://charts.m4marvin.com",
    featured: true,
  },
]
