import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

/**
 * The Sirius demo video, as `m4marvin.com/work/sirius` and the home page Work card show it.
 *
 * It behaves like an animated image: muted, looping, no controls, and it starts on its own
 * once it is actually on screen rather than on page load, so a video the reader has not
 * reached is not running somewhere below the fold.
 *
 * Muted is not a preference here, it is the only kind browsers allow: Chrome, Firefox and
 * Safari all refuse to start a video with sound. The score still exists in the file for
 * anywhere the video is played with a real player.
 *
 * Two things keep a silent loop from being hostile. If the reader has asked their system to
 * reduce motion, nothing autoplays and they can start it themselves with a click. And because
 * a loop running longer than five seconds needs a way to stop it, clicking the picture pauses
 * and resumes it — no visible chrome, so it still reads as a GIF.
 *
 * The source lives on `files.m4marvin.com` beside the charting app's thumbnails, so the
 * repository does not carry a 2.5 MB binary. It is served with `accept-ranges: bytes`, so
 * seeking works.
 */
export const SIRIUS_DEMO_VIDEO = "https://files.m4marvin.com/sirius_demo/sirius-demo.mp4"

export function DemoVideo({ title, className }: { title: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Set on the element rather than trusting the attribute, so the browser sees a muted
    // video before it decides whether to allow the play() below.
    el.muted = true

    // Same rule the Reveal component follows: reduced motion means nothing moves on its own.
    // The click handler below is still there, so the reader can start it.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) return

    let started = false
    const start = () => {
      if (started) return
      started = true
      // A refused autoplay is not an error worth surfacing: the first frame still shows.
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

  return (
    <video
      ref={ref}
      src={SIRIUS_DEMO_VIDEO}
      title={title}
      width={1920}
      height={1080}
      muted
      loop
      playsInline
      preload="metadata"
      onClick={(event) => {
        const el = event.currentTarget
        if (el.paused) void el.play().catch(() => {})
        else el.pause()
      }}
      className={cn("h-auto w-full border border-zinc-800 bg-zinc-950", className)}
    />
  )
}
