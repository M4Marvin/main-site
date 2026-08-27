export interface Education {
  degree: string
  school: string
  year: string
}

export interface Profile {
  name: string
  roles: string[]
  tagline: string
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
  reflection?: string
  link?: string
  image?: string
  featured: boolean
}

export interface SkillCategory {
  title: string
  items: string[]
  icon: string
}

export interface LeadershipItem {
  title: string
  subtitle: string
  description: string
}

export interface Publication {
  title: string
  venue?: string
  year?: number
  description: string
  link: string
}

export interface NavItem {
  name: string
  link: string
}

export interface ExperienceItem {
  title: string
  company: string
  location: string
  period: string
  bullets: string[]
  tech: string[]
}

export const profile: Profile = {
  name: "Marvin V Prakash",
  roles: ["Full Stack Architect", "Trading Systems Engineer"],
  tagline:
    "Full Stack Architect / Tech Lead — 3+ years building production trading infrastructure, data pipelines, and web platforms end to end.",
  location: "Abu Dhabi, UAE",
  email: "marvinprakash@gmail.com",
  phone: "+971 553391151",
  github: "https://github.com/M4Marvin",
  linkedin: "https://www.linkedin.com/in/marvin-v-prakash/",
  website: "https://m4marvin.com",
  resumeUrl: "https://files.m4marvin.com/MARVIN_V_PRAKASH_RESUME.pdf",
  education: [
    { degree: "B.Tech + M.S. Dual Degree — Computer Science & Engineering + Computational Biology", school: "Jawaharlal Nehru University", year: "2018–2023" },
  ],
}

export const about = {
  summary:
    "I have 3+ years of experience (Apr 2023–Feb 2026) owning systems end to end: the trading engine, ingestor, and dashboard at Sirius International Holding; an internal market-analysis platform as the solo founding engineer at mFinancialCharts; and the web platform and MLOps at ACBR. I also operate a self-hosted cloud and co-authored a J. Phys. Chem. B paper. I am currently on a planned sabbatical for upskilling, actively looking for work, and available for immediate joining.",
}

export const projects: Project[] = [
  {
    slug: "sirius-trading-platform",
    title: "Sirius International Holding — Algorithmic Trading Platform",
    summary:
      "Production algorithmic trading platform. 106,185+ signals processed and 5,000+ automated trades per day on average. Second engineering hire.",
    role: "Algorithmic Trading Infrastructure Engineer",
    org: "Sirius International Holding",
    period: "Apr 2025 – Feb 2026",
    location: "Abu Dhabi, UAE",
    story: [
      "Second engineering hire. Built the core trading engine and signal ingestor solo end to end, and built the trading dashboard solo; AWS, VPC, and Cloudflare infrastructure were shared with one coworker.",
      "Processed 106,185+ signals and averaged 5,000+ automated trades per day across 50 Windows systems, with 200ms end-to-end latency and zero downtime for four months.",
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
    tech: ["Python", "FastAPI", "React", "TanStack Start", "MetaTrader 5", "PostgreSQL"],
    reflection: "Real money, real risk, real consequences. Not a side project or a demo.",
    featured: true,
  },
  {
    slug: "marvfinancialcharts",
    title: "mFinancialCharts",
    summary:
      "Internal market-analysis tool for ~5 traders with custom multi-canvas footprint charts, a 4TB compressed data lake, and p99 60fps performance. Live at charts.m4marvin.com.",
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
    tech: ["Python", "FastAPI", "React", "TypeScript", "Polars", "Parquet", "HTML5 Canvas", "Zustand", "React Query"],
    reflection:
      "Built the data pipeline and charting engine around the hardest case—Bitcoin's high-volume trade stream—so the same system could serve every supported instrument and timeframe.",
    link: "https://charts.m4marvin.com",
    image: "/charts-screenshot.png",
    featured: true,
  },
  {
    slug: "self-hosted-infrastructure",
    title: "Self-Hosted Infrastructure",
    summary:
      "My personal cloud. Two machines, one Cloudflare tunnel, and zero exposed ports. Git, photos, passwords, monitoring, files, charts, and chat are self-hosted.",
    role: "Sole Operator",
    org: "Personal",
    period: "Ongoing",
    location: "Abu Dhabi, UAE",
    story: [
      "My personal cloud. Two machines, one Cloudflare tunnel, and zero exposed ports.",
    ],
    contributions: [
      {
        label: "VPS (Hetzner)",
        text: "Hetzner VPS with 4 vCPU Skylake, 7.6GB RAM, 76GB disk, and Ubuntu 24.04. Forgejo, Vaultwarden, Uptime Kuma, Copyparty, the portfolio, charts, chat, and Beszel run with containers bound to 127.0.0.1; SSH uses port 3232.",
      },
      {
        label: "Beast (Arch Desktop)",
        text: "Beast runs Arch on an Intel Core Ultra 9 with 93GB RAM and an Arc Pro 130T GPU. Immich uses OpenVINO on the Arc GPU and Jellyfin is tailnet-only; backups move over Tailscale.",
      },
      {
        label: "Cloudflare tunnels",
        text: "One systemd-managed Cloudflare tunnel, zero exposed ports, UFW default-deny, fail2ban, AIDE daily integrity checks, unattended-upgrades, and nightly backup-vps.sh.",
      },
    ],
    tech: ["Docker", "Cloudflare Tunnels", "Forgejo", "Immich", "Vaultwarden", "Uptime Kuma", "Linux", "Arch"],
    reflection:
      "I like owning my data. Git repos, passwords, photos, financial charts, files, media — all on hardware I control, behind tunnels that do not expose attack surface.",
    link: "https://git.m4marvin.com",
    featured: true,
  },
  {
    slug: "acbr-drug-discovery",
    title: "ACBR Drug Discovery Web Server",
    summary:
      "Open-source web server for target-driven early-stage drug discovery, serving bioactivity prediction, virtual screening, Tanimoto similarity, and drug-likeness QED via RDKit.",
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
    tech: ["Next.js", "React", "FastAPI", "Tailwind CSS", "RDKit", "MLOps"],
    link: "https://bic.acbr.du.ac.in/",
    featured: true,
  },
  {
    slug: "secure-cloud-storage",
    title: "Secure Cloud Storage Platform",
    summary:
      "Encrypted file storage with biometric auth — face recognition, liveness detection, AES/RSA. Dockerized.",
    role: "Full-Stack Developer",
    org: "Client Work",
    period: "Apr 2023 – Jul 2023",
    location: "New Delhi, India",
    story: [
      "Encrypted file storage with biometric authentication. Identity verification, not just passwords.",
    ],
    contributions: [
      {
        label: "Backend",
        text: "Flask, end-to-end encrypted file storage, secure user access.",
      },
      {
        label: "Auth",
        text: "Face Recognition + Liveness Detection, 256-bit AES/RSA encryption for data protection and identity verification.",
      },
      {
        label: "Inference",
        text: "ONNX Runtime + MediaPipe for computer vision. Faster, lighter, more accurate.",
      },
      {
        label: "Deployment",
        text: "Dockerized for seamless deployment and secure integration within client networks.",
      },
    ],
    tech: ["Python", "Flask", "ONNX Runtime", "MediaPipe", "Docker", "AES/RSA Encryption"],
    featured: false,
  },
]

export const skills: SkillCategory[] = [
  { title: "Languages", items: ["Python", "TypeScript", "JavaScript", "SQL"], icon: "Code2" },
  { title: "Frameworks", items: ["FastAPI", "Flask", "React", "Next.js", "TanStack Start", "React Query", "Zustand", "Tailwind CSS"], icon: "Layers" },
  { title: "Architecture", items: ["Microservices", "REST", "Distributed Systems", "Event-Driven", "Async Python", "System Design", "Algorithmic Trading"], icon: "Boxes" },
  { title: "Cloud & DevOps", items: ["Cloudflare", "Docker", "CI/CD", "Forgejo", "Linux", "Git", "GitHub"], icon: "Cloud" },
  { title: "Data Engineering", items: ["PostgreSQL", "SQLAlchemy", "Polars", "Pandas", "NumPy", "Parquet", "ETL Pipelines"], icon: "Database" },
  { title: "ML & Performance", items: ["ONNX Runtime", "MediaPipe", "Model Serving (MLOps)", "RDKit", "Face Recognition", "HTML5 Canvas (60 FPS)"], icon: "Brain" },
]

export const leadership: LeadershipItem[] = [
  {
    title: "President & Director of Technology",
    subtitle: "Co.L.D. Computer Science Club, JNU",
    description: "Grew membership from 50 to 250+. Ran 12+ hackathons, workshops, and technical events.",
  },
  {
    title: "Engineering Mentorship",
    subtitle: "JNU & Sirius International Holding",
    description:
      "Mentored 50+ undergrads in DSA and full-stack (90%+ satisfaction). Guided 6 engineers through production architecture, deployment, and standards at Sirius International Holding.",
  },
  {
    title: "Technical Leadership",
    subtitle: "Sirius International Holding, Abu Dhabi",
    description:
      "Onboarded 6 engineers and set engineering standards for a platform averaging 5,000+ automated trades daily.",
  },
]

export const publications: Publication[] = [
  {
    title:
      "Physics-Based Machine Learning to Predict Hydration Free Energies for Small Molecules with a Minimal Number of Descriptors: Interpretable and Accurate",
    venue: "J. Phys. Chem. B (ACS), 129(5), 1640–1647",
    year: 2025,
    description:
      "A six-descriptor physics-based ML model achieves 0.74 kcal/mol MAE on FreeSolv. Equal contribution with Ajeet Kumar Yadav. Uses Generalized Born electrostatics, polar surface area, log P, hydrogen bond donors/acceptors, and rotatable bonds.",
    link: "https://pubs.acs.org/doi/10.1021/acs.jpcb.4c07090",
  },
  {
    title: "Coarse-Grained Force Field for Protein-ssDNA Interactions",
    venue: "M.S. Research, JNU",
    year: 2023,
    description:
      "Coarse-grained simulation framework for protein-ssDNA interactions — lower computational cost, maintained accuracy.",
    link: "",
  },
]

export interface Stat {
  value: number
  suffix?: string
  prefix?: string
  label: string
}

export const stats: Stat[] = [
  { value: 200, suffix: "ms", label: "End-to-end signal-to-trade latency" },
  { value: 5000, suffix: "+", label: "Automated trades per day (average)" },
  { value: 50, label: "Trading systems in production" },
  { value: 4, suffix: "", label: "Months zero downtime" },
]

export const experience: ExperienceItem[] = [
  {
    title: "Algorithmic Trading Infrastructure Engineer",
    company: "Sirius International Holding",
    location: "Abu Dhabi, UAE",
    period: "Apr 2025 – Feb 2026",
    bullets: [
      "Built the core trading engine and signal ingestor solo end to end as the second engineering hire, and built the trading dashboard solo; shared AWS, VPC, and Cloudflare infrastructure with one coworker.",
      "Processed 106,185+ signals and averaged 5,000+ automated trades per day across 50 Windows systems, with 200ms end-to-end latency and zero downtime for four months.",
      "Built a custom mt5-client wrapper around the MetaTrader 5 Python API to execute trader-designed strategies across 5 brokers and 20–25 assets, with dynamic position sizing and robust trade and market-condition handling.",
      "Built the custom REST-based ingestor with authentication, validation, routing, correlation-ID logging, dual logging to each system and Postgres, and layer-level risk controls and alerting.",
      "Created the React and TanStack Start dashboard for live account monitoring, execution reports, signal-quality statistics, strategy performance, and inter-strategy correlation.",
      "Onboarded and mentored 6 engineers over the tenure and established production engineering standards.",
    ],
    tech: ["Python", "FastAPI", "React", "TanStack Start", "MetaTrader 5", "PostgreSQL"],
  },
  {
    title: "Full-Stack Developer",
    company: "mFinancialCharts",
    location: "New Delhi, India",
    period: "Aug 2023 – Sep 2024",
    bullets: [
      "Built a custom multi-canvas HTML5 charting engine with virtualization, Zustand state management, 1-second timeframes, and p99 60fps on Firefox and Chrome with thousands of objects.",
      "Built fully custom footprint charts, candles, OHLCV indicators, and indicators-on-indicators for an internal tool used by ~5 traders.",
      "Automated daily Binance and Bybit ingestion from Binance's public S3 bucket with SHA verification into all_trades and 5s_candles; Bitcoin handled 2M average daily trades and 30M peaks.",
      "Processed every Binance instrument (~1100 spot and ~900 futures) into Parquet with LZ4 compression in a custom in-house data lake containing ~4TB compressed data, using Polars via Python.",
      "Built the FastAPI data delivery layer with bulk candle requests and smaller footprint-data chunks for responsive infinite loading.",
    ],
    tech: ["Python", "FastAPI", "React", "TypeScript", "Polars", "Parquet", "HTML5 Canvas", "Zustand", "React Query"],
  },
  {
    title: "Full-Stack Developer",
    company: "ACBR (Ambedkar Center for Biomedical Research), University of Delhi",
    location: "New Delhi, India",
    period: "Sep 2024 – Mar 2025",
    bullets: [
      "Sole engineer for an open-source target-driven early-stage drug-discovery web server using Next.js, React, FastAPI, and Tailwind CSS.",
      "Optimized and deployed/served lab-built trained models for bioactivity prediction and virtual screening; did not train or tune the models.",
      "Implemented Tanimoto similarity and drug-likeness QED via RDKit and built the website for the lab's model-backed platform.",
    ],
    tech: ["Next.js", "React", "FastAPI", "Tailwind CSS", "AI Model Hosting"],
  },
  {
    title: "Full-Stack Developer",
    company: "Secure Cloud Storage Platform",
    location: "New Delhi, India",
    period: "Apr 2023 – Jul 2023",
    bullets: [
      "Built a secure cloud storage platform using Flask with end-to-end encrypted file storage and secure user access.",
      "Integrated advanced authentication: Face Recognition, Liveness Detection, and 256-bit AES/RSA encryption for data protection and identity verification.",
      "Optimised computer vision inference using ONNX Runtime and MediaPipe, improving authentication speed and accuracy while reducing resource consumption.",
      "Containerised the application with Docker for seamless deployment and secure integration within client network environments.",
    ],
    tech: ["Python", "Flask", "ONNX Runtime", "MediaPipe", "Docker", "AES/RSA Encryption"],
  },
]

export const navItems: NavItem[] = [
  { name: "Work", link: "#work" },
  { name: "Experience", link: "#experience" },
  { name: "Skills", link: "#skills" },
  { name: "Contact", link: "#contact" },
  { name: "Blog", link: "/blog" },
]
