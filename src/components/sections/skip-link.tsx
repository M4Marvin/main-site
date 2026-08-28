import type { MouseEvent } from "react"

export function SkipLink() {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    const main = document.getElementById("main")
    if (main) {
      e.preventDefault()
      main.focus()
      main.scrollIntoView()
    }
  }

  return (
    <a
      href="#main"
      onClick={handleClick}
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[6000] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-black"
    >
      Skip to content
    </a>
  )
}