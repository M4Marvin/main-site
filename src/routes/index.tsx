import { createFileRoute } from '@tanstack/react-router'
import { Navbar } from '@/components/sections/navbar'
import { Hero } from '@/components/sections/hero'

import { About } from '@/components/sections/about'
import { Experience } from '@/components/sections/experience'
import { Work } from '@/components/sections/work'
import { Skills } from '@/components/sections/skills'
import { Leadership } from '@/components/sections/leadership'
import { Publications } from '@/components/sections/publications'
import { Contact } from '@/components/sections/contact'
import { Footer } from '@/components/sections/footer'
import { SkipLink } from '@/components/sections/skip-link'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <main id="main" className="relative min-h-screen bg-black text-white">
      <SkipLink />
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Work />
      <Skills />
      <Leadership />
      <Publications />
      <Contact />
      <Footer />
    </main>
  )
}