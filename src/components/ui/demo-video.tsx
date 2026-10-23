import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

/**
 * The Sirius demo video, as `m4marvin.com/work/sirius` shows it.
 *
 * The source is a 1080x1920 (9:16) walkthrough. The home card uses a 16:9
 * still (`/sirius-card.webp`) instead of playing this portrait file in a wide
 * card, so the page never reserves a 16:9 box and then jumps to a two-screen
 * tall video. Here it is capped and centred, with a poster and a keyboard
 * play/pause control.
 *
 * Muted is not a preference: Chrome, Firefox and Safari all refuse to start a
 * video with sound. The score still exists in the file for a real player.
 *
 * Two things keep a silent loop from being hostile: reduced motion means
 * nothing autoplays, and clicking/pressing Space on the focused video pauses
 * and resumes it. `controls` is not used so it still reads as an animated
 * image, not a player.
 */
export const SIRIUS_DEMO_VIDEO = "https://files.m4marvin.com/media/sirius-demo-vertical.mp4"
export const SIRIUS_DEMO_POSTER = "/sirius-poster.webp"

export function DemoVideo({ title, className }: { title: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Set on the element rather than trusting the attribute, so the browser sees a muted
    // video before it decides whether to allow the play() below.
    el.muted = true

    // Same rule the Reveal component follows: reduced motion means nothing moves on its own.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) return

    let started = false
    const start = () => {
      if (started) return
      started = true
      // A refused autoplay is not an error worth surfacing: the poster still shows.
      void el.play().catch(() => {})
    }

    // Fire once the video is meaningfully on screen, and only the first time: after that the
    // reader owns it, so a pause is never undone behind their back.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) start()
      },
      { threshold: 0.25 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const toggle = () => {
    const el = ref.current
    if (!el) return
    if (el.paused) void el.play().catch(() => {})
    else el.pause()
  }

  return (
    <video
      ref={ref}
      src={SIRIUS_DEMO_VIDEO}
      poster={SIRIUS_DEMO_POSTER}
      title={title}
      aria-label={`${title} — play or pause`}
      width={1080}
      height={1920}
      muted
      loop
      playsInline
      preload="none"
      tabIndex={0}
      role="button"
      onClick={toggle}
      onKeyDown={(event) => {
        if (event.key === " " || event.key === "Enter") {
          event.preventDefault()
          toggle()
        }
      }}
      className={cn(
        "mx-auto block h-auto max-h-[36rem] w-auto max-w-full cursor-pointer border border-zinc-800 bg-zinc-950",
        className,
      )}
    />
  )
}
