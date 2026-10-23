import { createFileRoute } from "@tanstack/react-router"
import { Hero } from "@/components/sections/hero"
import { Work } from "@/components/sections/work"
import { About } from "@/components/sections/about"

export const Route = createFileRoute("/")({
  component: Home,
})

function Home() {
  return (
    <main id="main" tabIndex={-1}>
      <Hero />
      <Work />
      <About />
    </main>
  )
}
