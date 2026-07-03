import { Github, Linkedin, Mail } from "lucide-react"
import { profile, navItems } from "@/lib/portfolio-data"

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-black">
      <div className="absolute inset-0 bg-grid-white/[0.05]" />

      <div className="relative mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
        <div className="mb-12 text-center">
          <h2 className="text-[3rem] leading-none font-bold text-neutral-800 sm:text-[6rem] md:text-[8rem] dark:text-neutral-800">
            MARVIN
          </h2>
          <div className="mx-auto mt-2 h-px w-40 bg-linear-to-r from-transparent via-blue-500 to-transparent" />
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <h3 className="mb-3 text-sm font-semibold text-white uppercase tracking-wider">Navigation</h3>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.link}>
                  <a href={item.link} className="text-sm text-neutral-400 transition-colors hover:text-white">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-white uppercase tracking-wider">Social</h3>
            <div className="flex flex-col gap-2">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-neutral-400 transition-colors hover:text-white"
              >
                <Github className="h-4 w-4" /> GitHub
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-neutral-400 transition-colors hover:text-white"
              >
                <Linkedin className="h-4 w-4" /> LinkedIn
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-2 text-sm text-neutral-400 transition-colors hover:text-white"
              >
                <Mail className="h-4 w-4" /> Email
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-white uppercase tracking-wider">Built With</h3>
            <p className="text-sm leading-relaxed text-neutral-500">
              React 19 · TanStack Router · shadcn/ui · Aceternity UI · Tailwind CSS v4 · Vite · motion
            </p>
          </div>
        </div>

        <div className="mt-12 border-t border-white/5 pt-8 text-center">
          <p className="text-xs text-neutral-600">
            &copy; {new Date().getFullYear()} Marvin V Prakash. Built with love in Abu Dhabi.
          </p>
        </div>
      </div>
    </footer>
  )
}
