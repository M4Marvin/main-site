import { createFileRoute } from "@tanstack/react-router"
import { Hero } from "@/components/sections/hero"
import { Work } from "@/components/sections/work"
import { About } from "@/components/sections/about"
import { pageHead } from "@/lib/seo"

export const Route = createFileRoute("/")({
  component: Home,
  head: () => pageHead({ path: "/" }),
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
