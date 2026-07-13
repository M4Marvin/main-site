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
  roles: ["Full Stack Architect"," ",  "Trading Systems Engineer"],
  tagline:
    "I build distributed backends, real-time web apps, and self-hosted infrastructure — from canvas renderers to Cloudflare tunnels. I like owning the whole stack.",
  location: "Abu Dhabi, UAE",
  email: "marvinprakash@gmail.com",
  phone: "+971 553391151",
  github: "https://github.com/M4Marvin",
  linkedin: "https://linkedin.com/in/m4marvin",
  website: "https://m4marvin.com",
  resumeUrl: "https://files.m4marvin.com/MARVIN_V_PRAKASH_RESUME.pdf",
  education: [
    { degree: "M.S. Computational Biology", school: "Jawaharlal Nehru University", year: "2023" },
    { degree: "B.Tech. Computer Science", school: "Jawaharlal Nehru University", year: "2018" },
  ],
}

export const about = {
  summary:
    "I build things end-to-end. The trading platform I work on processes over a hundred thousand TradingView signals a day and has placed five thousand-plus automated trades — real money, not paper trading, which changes how you think about latency. The charts that visualize all of it are raw HTML5 Canvas: eleven custom renderers I wrote because nothing else could do per-trade footprint charts at the time. The data behind them is a Polars pipeline turning millisecond-level exchange trades into a Parquet data lake. I wrote the API, the rendering engine, the ETL, the deploy. All of it. Some of it twice.\n\nOff the clock I run my own cloud. One Hetzner VPS, seven services, everything behind Cloudflare tunnels and a Tailscale mesh between my machines. Git, passwords, photos, monitoring — I don't trust third parties with any of it if I can avoid it. I started in computational biology, actually — there's a published paper on physics-based ML for molecular property prediction in J. Phys. Chem. B if you want to see the weird tangent. I drifted into distributed systems and frontend because the problems there were more interesting and I could ship something and see it work the same day, not six months later. The thread through all of it is the same: I like knowing how every layer works, from the kernel module to the pixel.",
}

export const projects: Project[] = [
  {
    slug: "qdata-octo",
    title: "Qdata-Octo — Algorithmic Trading Platform",
    summary:
      "Production algorithmic trading platform. 106,185+ TradingView signals and 5,000+ automated trades a day. Real money, real consequences. Second engineering hire.",
    role: "Algorithmic Trading Infrastructure Engineer",
    org: "Qdata-Octo",
    period: "Aug 2025 – Feb 2026",
    location: "Abu Dhabi, UAE",
    story: [
      "Second engineering hire. Co-developed the platform from scratch with one other engineer.",
      "106,185+ TradingView signals and 5,000+ automated trades a day across multiple accounts. Every edge case mattered. Every failure mode had to be thought through.",
    ],
    contributions: [
      {
        label: "Trade execution engine",
        text: "FastAPI talking to MetaTrader 5. Parallel multi-account execution, grid-based strategies, dynamic position sizing. Enterprise-grade security from day one — when money is on the line you do not cut corners.",
      },
      {
        label: "Signal ingestion pipeline",
        text: "Real-time, zero race conditions, dual-database persistence. Adapted to evolving webhook formats as TradingView changed their schemas, without missing a beat.",
      },
      {
        label: "Monitoring dashboard",
        text: "React + TanStack Start. Real-time account visibility, historical trade analytics, operational insights.",
      },
      {
        label: "Risk management",
        text: "Automated circuit breakers, multi-channel alerting. The safety net that stops things before they burn.",
      },
      {
        label: "Team",
        text: "Onboarded and mentored 6 engineers. Got them shipping production features within two weeks. Established the platform's engineering standards.",
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
      "Real-time crypto charting platform with a custom HTML5 Canvas engine — 11 renderers, footprint charts, 60fps. Built solo, from scratch. Live at charts.m4marvin.com.",
    role: "Sole Engineer",
    org: "Personal Project (Contract)",
    period: "Jan 2024 – May 2024",
    location: "Remote",
    story: [
      "Contract job. Client wanted footprint charts for crypto — per-trade level visualization showing buy/sell activity at every price level inside each candle. TradingView did not have footprint charts when I built this. No references.",
      "Designed and implemented the whole thing alone: backend, frontend, rendering engine, deployment.",
    ],
    contributions: [
      {
        label: "Backend",
        text: "Raw trade data from Binance and Bybit APIs, per-trade level processing for max accuracy. Polars (Rust DataFrame) for processing, Parquet with LZ4 compression for storage. 3,664 parquet files across 818 symbols, ~6GB.",
      },
      {
        label: "API",
        text: "FastAPI, 14 endpoints: OHLC data, technical indicators (SMA, EMA, RSI, Bollinger Bands, ROC), symbol metadata, file discovery. CLI with 21 commands across 4 groups for ETL, exchange ops, indexing, benchmarking.",
      },
      {
        label: "Frontend",
        text: "React + TypeScript. Entire charting engine built on raw HTML5 Canvas. 11 custom canvas renderers. No TradingView, no Chart.js, no Recharts.",
      },
      {
        label: "Footprint chart",
        text: "80+ configurable settings. 16 display values (buy/sell volume, trades, percentages, quote volume). Point of Control markers. Value Area Range with standard and greedy algorithms. Imbalance detection with thresholds and zone plotting. Support/resistance detection. 6 marker types. Asymmetric volume coloring. Candle positioning (left/middle/right).",
      },
      {
        label: "Performance",
        text: "Separate canvases for hover, chart, axes — one canvas kills performance with re-renders. Custom grid system. Text auto-hides below font size 6 to hold 60fps. Felt more like building a game than a webpage.",
      },
    ],
    tech: ["Python", "FastAPI", "React", "TypeScript", "Polars", "Parquet", "HTML5 Canvas", "Zustand", "React Query"],
    reflection:
      "No references. No team. Learned everything by doing — backend architecture, canvas rendering, optimization, deployment. Gave up several times. No guide existed for most of it.",
    link: "https://charts.m4marvin.com",
    image: "/charts-screenshot.png",
    featured: true,
  },
  {
    slug: "self-hosted-infrastructure",
    title: "Self-Hosted Infrastructure",
    summary:
      "My personal cloud. Two machines, two Cloudflare tunnels, no third parties holding my data. Git, photos, passwords, monitoring — all self-hosted.",
    role: "Sole Operator",
    org: "Personal",
    period: "Ongoing",
    location: "Abu Dhabi, UAE",
    story: [
      "My personal cloud. Two machines, two Cloudflare tunnels, no third parties holding my data.",
    ],
    contributions: [
      {
        label: "VPS (Hetzner)",
        text: "4 vCPU, 8GB RAM, 76GB disk, Ubuntu. Forgejo (self-hosted Git, git.m4marvin.com), Vaultwarden (passwords, vault.m4marvin.com), Uptime Kuma (monitoring, status.m4marvin.com), Copyparty (file server for resume PDF, screenshots, site images, files.m4marvin.com). All bound to 127.0.0.1 — no public ports except SSH on a non-standard port.",
      },
      {
        label: "Beast (Arch Desktop)",
        text: "Intel Core Ultra 9, 93GB RAM, Arc Pro 130T GPU. Immich (self-hosted Google Photos, 40k+ photos, ML search + facial recognition via OpenVINO on the Arc GPU, photos.m4marvin.com), mFinancialCharts (charts.m4marvin.com), Forgejo runner (CI/CD on 16 cores, Docker-in-Docker), Jellyfin (tailnet-only).",
      },
      {
        label: "Cloudflare tunnels",
        text: "Two tunnels, no open ports on either machine. Systemd services, not containers. Cloudflare handles TLS and DDoS. I handle everything else.",
      },
    ],
    tech: ["Docker", "Cloudflare Tunnels", "Forgejo", "Immich", "Vaultwarden", "Uptime Kuma", "Linux", "Arch"],
    reflection:
      "I like owning my data. Git repos, passwords, photos, financial charts, files, media — all on hardware I control, behind tunnels that do not expose attack surface.",
    link: "https://git.m4marvin.com",
    featured: true,
  },
  {
    slug: "laboratory-websites",
    title: "Laboratory Websites Ecosystem",
    summary:
      "Research showcase platform for a university lab. Next.js + FastAPI, AI model hosting, mobile-first.",
    role: "Full-Stack Developer",
    org: "Jawaharlal Nehru University",
    period: "Nov 2024 – Jul 2025",
    location: "New Delhi, India",
    story: [
      "Research showcase platform for a university lab. Computational research tools made accessible and cross-device.",
    ],
    contributions: [
      {
        label: "Frontend",
        text: "Next.js + React + Tailwind. Responsive, mobile-first, custom animations.",
      },
      {
        label: "Backend",
        text: "FastAPI services: AI model hosting, data encryption, email automation, background task processing, real-time research model APIs.",
      },
      {
        label: "Integration",
        text: "Computational research tools wired into a mobile-first interface for accessibility and cross-device performance.",
      },
    ],
    tech: ["Next.js", "React", "FastAPI", "Tailwind CSS", "AI Model Hosting"],
    featured: false,
  },
  {
    slug: "secure-cloud-storage",
    title: "Secure Cloud Storage Platform",
    summary:
      "Encrypted file storage with biometric auth — face recognition, liveness detection, AES/RSA. Dockerized.",
    role: "Full-Stack Developer",
    org: "Personal",
    period: "Aug 2023 – Dec 2023",
    location: "Remote",
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
  { title: "ML & Performance", items: ["ONNX Runtime", "MediaPipe", "XGBoost", "Face Recognition", "HTML5 Canvas (60 FPS)"], icon: "Brain" },
]

export const leadership: LeadershipItem[] = [
  {
    title: "President & Director of Technology",
    subtitle: "Co.L.D. Computer Science Club, JNU",
    description: "Grew membership from 50 to 250+. Ran 12+ hackathons, workshops, and technical events.",
  },
  {
    title: "Engineering Mentorship",
    subtitle: "JNU & Qdata-Octo",
    description:
      "Mentored 50+ undergrads in DSA and full-stack (90%+ satisfaction). Guided 6 engineers through production architecture, deployment, and standards at Qdata-Octo.",
  },
  {
    title: "Technical Leadership",
    subtitle: "Qdata-Octo, Abu Dhabi",
    description:
      "Onboarded 6 engineers to full productivity in two weeks. Set engineering standards for a platform running 5,000+ automated trades daily.",
  },
]

export const publications: Publication[] = [
  {
    title:
      "Physics-Based Machine Learning to Predict Hydration Free Energies for Small Molecules with a Minimal Number of Descriptors: Interpretable and Accurate",
    venue: "J. Phys. Chem. B (ACS), 129(5), 1640–1647",
    year: 2025,
    description:
      "A six-descriptor physics-based ML model (XGBoost) hits 0.74 kcal/mol MAE on FreeSolv. Uses Generalized Born electrostatics, polar surface area, log P, hydrogen bond donors/acceptors, and rotatable bonds — fully interpretable with no black-box features.",
    link: "https://pubs.acs.org/doi/10.1021/acs.jpcb.4c07090",
  },
  {
    title: "HAC-Net: Hybrid Deep Learning Architecture",
    description:
      "Hybrid deep learning architecture for protein-ligand binding affinity prediction — convolutional + attention mechanisms for molecular interaction modeling.",
    link: "#",
  },
  {
    title: "Coarse-Grained Force Field for Protein-ssDNA Interactions",
    venue: "M.S. Research, JNU",
    year: 2023,
    description:
      "Coarse-grained simulation framework for protein-ssDNA interactions — lower computational cost, maintained accuracy.",
    link: "#",
  },
]

export interface Stat {
  value: number
  suffix?: string
  prefix?: string
  label: string
}

export const stats: Stat[] = [
  { value: 106185, suffix: "+", label: "TradingView signals processed" },
  { value: 5000, suffix: "+", label: "Automated trades per day" },
  { value: 11, label: "Custom canvas renderers" },
  { value: 60, suffix: "fps", label: "Charting engine performance" },
]

export const experience: ExperienceItem[] = [
  {
    title: "Algorithmic Trading Infrastructure Engineer",
    company: "Qdata-Octo",
    location: "Abu Dhabi, UAE",
    period: "Aug 2025 – Feb 2026",
    bullets: [
      "Co-developed a production-grade algorithmic trading platform from scratch as the second engineering hire, enabling 106,185+ TradingView signals and 5,000+ automated trades daily across multiple accounts.",
      "Built a high-performance trade execution engine using FastAPI and MetaTrader 5, supporting parallel multi-account execution, grid-based strategies, dynamic position sizing, and enterprise-grade security.",
      "Developed a resilient, real-time signal ingestion pipeline with zero race conditions and dual-database persistence, ensuring seamless adaptation to evolving webhook formats.",
      "Created a live monitoring dashboard with React and TanStack Start, providing real-time account visibility, historical trade analytics, and operational insights.",
      "Strengthened platform resilience with advanced risk management controls, automated circuit breakers, and multi-channel alerting.",
      "Accelerated team productivity by mentoring 6 engineers, enabling them to ship their first production features within two weeks.",
    ],
    tech: ["Python", "FastAPI", "React", "TanStack Start", "MetaTrader 5", "PostgreSQL"],
  },
  {
    title: "Full-Stack Developer",
    company: "mFinancialCharts (Personal Project)",
    location: "Remote",
    period: "Jan 2024 – May 2024",
    bullets: [
      "Developed a real-time HTML5 Canvas charting engine achieving 60 FPS (sub-16ms), enabling smooth multi-asset technical analysis and dynamic scaling.",
      "Designed and launched a high-performance multi-asset financial analytics platform using React, Zustand, and React Context with scalable state management.",
      "Built a production-ready data processing framework with Polars (Rust) and Parquet storage, automating daily Binance market data ingestion while minimising memory.",
      "Crafted a FastAPI backend with optimised database indexing, advanced technical indicator calculations, and bidirectional infinite data loading via React Query.",
      "Automated end-to-end daily ETL workflows delivering instant access to thousands of historical candlestick records across multiple timeframes.",
    ],
    tech: ["Python", "FastAPI", "React", "TypeScript", "Polars", "Parquet", "HTML5 Canvas", "Zustand", "React Query"],
  },
  {
    title: "Full-Stack Developer",
    company: "Laboratory Websites Ecosystem",
    location: "New Delhi, India",
    period: "Nov 2024 – Jul 2025",
    bullets: [
      "Engineered a research showcase platform using Next.js, React, FastAPI, and Tailwind CSS, delivering a responsive experience with custom animations.",
      "Developed secure backend services with AI model hosting, data encryption, email automation, background task processing, and real-time research model APIs.",
      "Crafted a mobile-first, responsive interface that seamlessly integrated computational research tools, enhancing accessibility and cross-device performance.",
    ],
    tech: ["Next.js", "React", "FastAPI", "Tailwind CSS", "AI Model Hosting"],
  },
  {
    title: "Full-Stack Developer",
    company: "Secure Cloud Storage Platform",
    location: "Remote",
    period: "Aug 2023 – Dec 2023",
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
  { name: "About", link: "#about" },
  { name: "Work", link: "#work" },
  { name: "Skills", link: "#skills" },
  { name: "Contact", link: "#contact" },
]
