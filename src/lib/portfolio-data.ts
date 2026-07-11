export const profile = {
  name: "Marvin V Prakash",
  roles: ["Full Stack Architect", "·", "Trading Systems Engineer"],
  tagline: "Results-driven Full Stack Architect with 3+ years designing high-performance, cloud-native platforms, distributed backends, and real-time web applications.",
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
    "Full Stack Architect with deep expertise in Python, FastAPI, React, and distributed systems. Co-architected a production algorithmic trading platform processing 106,185+ TradingView signals and 5,000+ automated trades daily. Built real-time financial charting engines, research platforms with AI model hosting, and secure cloud storage systems with biometric authentication. Recognised for technical leadership, mentoring 50+ students and 6 engineers, and scaling community from 50 to 250+ members.",
}

export const experience = [
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

export const featuredProjects = [
  {
    title: "Algorithmic Trading Platform",
    description: "Production-grade platform processing 106,185+ TradingView signals and 5,000+ trades daily across multiple accounts. FastAPI execution engine with real-time signal ingestion, risk management, and React monitoring dashboard.",
    tech: ["FastAPI", "MetaTrader 5", "React", "TanStack Start", "PostgreSQL", "Python"],
    featured: true,
  },
  {
    title: "marvFinancialCharts",
    description: "60 FPS HTML5 Canvas charting engine. Multi-asset technical analysis platform with Polars/Parquet data pipeline, FastAPI backend, and 3,664+ parquet files indexed across 818 Binance symbols.",
    tech: ["React", "FastAPI", "Polars", "Parquet", "HTML5 Canvas", "Binance API"],
    link: "https://charts.m4marvin.com",
    featured: false,
    image: "/charts-screenshot.png",
  },
  {
    title: "Self-Hosted Infrastructure",
    description: "Personal cloud: Forgejo (Git), Immich (photos), Vaultwarden (passwords), Uptime Kuma (monitoring), all served through Cloudflare tunnels with Docker on Hetzner VPS + Arch desktop.",
    tech: ["Docker", "Cloudflare", "Forgejo", "Immich", "Vaultwarden", "Linux"],
    link: "https://git.m4marvin.com",
    featured: false,
    minimal: true,
  },
]

export const skillCategories = [
  {
    title: "Languages",
    description: "Python, TypeScript, JavaScript, SQL",
    icon: "Code2",
  },
  {
    title: "Frameworks",
    description: "FastAPI, Flask, React, Next.js, TanStack Start, React Query, Zustand, Tailwind CSS",
    icon: "Layers",
  },
  {
    title: "Architecture",
    description: "Microservices, REST APIs, Distributed Systems, Event-Driven Architecture, Async Python, System Design, Algorithmic Trading",
    icon: "Boxes",
  },
  {
    title: "Cloud & DevOps",
    description: "AWS, Cloudflare, Docker, CI/CD Pipelines, DigitalOcean, Heroku, Git, GitHub",
    icon: "Cloud",
  },
  {
    title: "Data Engineering",
    description: "PostgreSQL, SQLAlchemy, Polars (Rust), Pandas, NumPy, Parquet, ETL Pipelines",
    icon: "Database",
  },
  {
    title: "ML & Performance",
    description: "ONNX Runtime, MediaPipe, XGBoost, Face Recognition, HTML5 Canvas (60 FPS)",
    icon: "Brain",
  },
]

export const leadership = [
  {
    title: "President & Director of Technology",
    subtitle: "Co.L.D. Computer Science Club, JNU",
    description: "Grew membership from 50 to 250+ through strategic community initiatives. Organised and led 12+ hackathons, workshops, and technical events promoting innovation and collaborative software development.",
  },
  {
    title: "Engineering Mentorship",
    subtitle: "Jawaharlal Nehru University & Qdata-Octo",
    description: "Mentored 50+ undergraduate students in Data Structures, Algorithms, and Full Stack Development, achieving 90%+ learner satisfaction. Guided junior engineers through production system architecture, deployment workflows, and best practices.",
  },
  {
    title: "Technical Leadership",
    subtitle: "Qdata-Octo, Abu Dhabi",
    description: "Onboarded and mentored 6 software engineers to full productivity within two weeks. Established engineering standards for a production algorithmic trading platform running 5,000+ automated trades daily.",
  },
]

export const publications = [
  {
    title: "Physics-Based Machine Learning to Predict Hydration Free Energies",
    description: "Published in The Journal of Physical Chemistry B (ACS), January 2025. Developed computational methods bridging physics-based modeling and machine learning for molecular property prediction.",
    link: "#",
  },
  {
    title: "HAC-Net: Hybrid Deep Learning Architecture",
    description: "Developed a novel hybrid deep learning architecture for protein-ligand binding affinity prediction, combining convolutional and attention-based mechanisms for molecular interaction modeling.",
    link: "#",
  },
  {
    title: "Coarse-Grained Force Field for Protein-ssDNA Interactions",
    description: "M.S. research project: Designed a novel coarse-grained simulation framework for studying protein-ssDNA interactions at the molecular level, reducing computational cost while maintaining accuracy.",
    link: "#",
  },
]

export const navItems = [
  { name: "About", link: "#about" },
  { name: "Experience", link: "#experience" },
  { name: "Work", link: "#work" },
  { name: "Skills", link: "#skills" },
  { name: "Contact", link: "#contact" },
]
