import { useState } from "react"
import { Menu, Github, ExternalLink } from "lucide-react"
import { FloatingNav } from "@/components/ui/floating-navbar"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { navItems, profile } from "@/lib/portfolio-data"

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="fixed left-0 right-0 top-0 z-[5000] hidden md:block">
        <FloatingNav navItems={navItems} />
      </div>

      <div className="fixed left-0 right-0 top-0 z-[5000] flex items-center justify-between border-b border-white/10 bg-black/80 px-4 py-3 backdrop-blur-md md:hidden">
        <span className="text-sm font-semibold text-white">Marvin V Prakash</span>
        <div className="flex items-center gap-2">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <button
                  aria-label="Open menu"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/50 text-white"
                />
              }
            >
              <Menu className="h-4 w-4" />
            </SheetTrigger>
            <SheetContent side="right" className="border-white/10 bg-black/95 text-white backdrop-blur-xl">
              <div className="mt-8 flex flex-col gap-2">
                {navItems.map((item) => (
                  <SheetClose
                    key={item.link}
                    render={
                      <a
                        href={item.link}
                        className={cn(
                          "rounded-lg px-4 py-3 text-base font-medium transition-colors hover:bg-white/10",
                        )}
                      />
                    }
                  >
                    {item.name}
                  </SheetClose>
                ))}
                <SheetClose
                  render={
                    <a
                      href={profile.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-linear-to-r from-blue-500 to-violet-500 px-4 py-3 text-base font-medium text-white shadow-lg shadow-blue-600/25 active:scale-[0.97]"
                    />
                  }
                >
                  <ExternalLink className="h-4 w-4" />
                  Resume
                </SheetClose>
                <a
                  href="https://github.com/M4Marvin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg px-4 py-3 text-base font-medium transition-colors hover:bg-white/10"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </>
  )
}