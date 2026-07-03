import { Mail, Github, Linkedin } from "lucide-react"
import { LampContainer } from "@/components/ui/lamp"
import { MagneticButton } from "@/components/ui/magnetic-button"
import { profile } from "@/lib/portfolio-data"

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-slate-950">
      <LampContainer>
        <div className="flex flex-col items-center gap-6">
          <h2 className="text-center text-3xl font-bold tracking-tight text-white md:text-5xl">
            Let&apos;s build something.
          </h2>
          <p className="max-w-md text-center text-sm leading-relaxed text-neutral-400 md:text-base">
            Open to opportunities and collaborations. Reach out if you&apos;d like to work together.
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
            <MagneticButton>
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-neutral-200"
              >
                <Mail className="h-4 w-4" />
                {profile.email}
              </a>
            </MagneticButton>

            <MagneticButton>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg border border-white/10 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
            </MagneticButton>

            <MagneticButton>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg border border-white/10 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
            </MagneticButton>
          </div>
        </div>
      </LampContainer>
    </section>
  )
}
