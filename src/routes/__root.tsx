import { HeadContent, Outlet, createRootRoute, useRouterState } from "@tanstack/react-router"
import { SkipLink } from "@/components/sections/skip-link"
import { SiteHeader } from "@/components/sections/site-header"
import { Footer } from "@/components/sections/footer"
import { PageMark } from "@/components/sections/page-mark"
import { Reveal } from "@/components/ui/reveal"
import { NotFoundPage } from "@/components/sections/not-found"
import { pageHead } from "@/lib/seo"

import "../styles.css"

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFoundPage,
  head: () => pageHead({ path: "/" }),
})

function RootComponent() {
  const home = useRouterState({ select: (s) => s.location.pathname === "/" })

  return (
    <div className="relative isolate min-h-dvh">
      <HeadContent />
      <SkipLink />
      <PageMark compact={!home} />
      <div className="relative z-10 mx-auto flex min-h-dvh w-full max-w-[68rem] flex-col px-6 sm:px-8">
        <Reveal>
          <SiteHeader />
        </Reveal>
        <div className={home ? "flex-1" : "flex-1 max-w-3xl"}>
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  )
}
