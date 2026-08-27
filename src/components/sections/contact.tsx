import { Mail, Github, Linkedin, Phone } from "lucide-react"
import { SectionHeader } from "@/components/sections/section-header"
import { profile } from "@/lib/portfolio-data"

const secondaryLinks = [
  { href: profile.github, label: "GitHub", icon: Github, external: true },
  { href: profile.linkedin, label: "LinkedIn", icon: Linkedin, external: true },
  { href: `tel:${profile.phone.replace(/\s+/g, "")}`, label: profile.phone, icon: Phone },
]

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-black py-24 md:py-32">
      <div className="mx-auto flex max-w-3xl flex-col items-center px-4 text-center">
        <SectionHeader title="Let's build something." />

        <p className="-mt-6 max-w-md text-center text-sm leading-relaxed text-neutral-400 md:text-base">
          Open to opportunities and collaborations. Reach out if you&apos;d like to work together.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 rounded-lg bg-linear-to-r from-blue-500 to-violet-500 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-blue-600/25 transition-all duration-200 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60 active:scale-[0.97]"
          >
            <Mail className="h-4 w-4" />
            {profile.email}
          </a>

          {secondaryLinks.map(({ href, label, icon: Icon, external }) => (
            <a
              key={label}
              href={href}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-6 py-3 text-sm font-medium text-white transition-all duration-200 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60 active:scale-[0.97]"
            >
              <Icon className="h-4 w-4" />
              {label}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}