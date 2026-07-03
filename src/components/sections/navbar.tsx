import { useState } from "react"
import { Menu, Github } from "lucide-react"
import { FloatingNav } from "@/components/ui/floating-navbar"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"
import { navItems } from "@/lib/portfolio-data"

const navLinks = navItems.map((item) => ({
  ...item,
  icon: <div className="h-3 w-3 rounded-full bg-gradient-to-r from-blue-400 to-violet-400" />,
}))

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="fixed left-0 right-0 top-0 z-[5000] hidden md:block">
        <FloatingNav navItems={navLinks} />
      </div>

      <div className="fixed left-0 right-0 top-0 z-[5000] flex items-center justify-between px-4 py-3 md:hidden">
        <span className="text-sm font-semibold text-white">Marvin V Prakash</span>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <span
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-black/50 text-white"
                aria-label="Open menu"
              >
                <Menu className="h-4 w-4" />
              </span>
            </SheetTrigger>
            <SheetContent side="right" className="border-white/10 bg-black/95 text-white backdrop-blur-xl">
              <div className="mt-8 flex flex-col gap-2">
                {navItems.map((item) => (
                  <SheetClose key={item.link} asChild>
                    <a
                      href={item.link}
                      className={cn(
                        "rounded-lg px-4 py-3 text-base font-medium transition-colors hover:bg-white/10",
                      )}
                    >
                      {item.name}
                    </a>
                  </SheetClose>
                ))}
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
