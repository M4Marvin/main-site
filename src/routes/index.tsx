import { createFileRoute } from '@tanstack/react-router'
import { Navbar } from '@/components/sections/navbar'
import { Hero } from '@/components/sections/hero'
import { AvailabilityBanner } from '@/components/sections/availability-banner'
import { Work } from '@/components/sections/work'
import { About } from '@/components/sections/about'
import { Contact } from '@/components/sections/contact'
import { Footer } from '@/components/sections/footer'
import { SkipLink } from '@/components/sections/skip-link'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <main id="main" tabIndex={-1} className="relative min-h-screen bg-black text-white">
      <SkipLink />
      <Navbar />
      <div className="pt-20 md:pt-24">
        <AvailabilityBanner />
      </div>
      <Hero />
      <Work />
      <About />
      <Contact />
      <Footer />
    </main>
  )
}