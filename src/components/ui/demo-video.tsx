import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

/**
 * The Sirius demo video, as `m4marvin.com/work/sirius` and the home page Work card show it.
 *
 * One source, two modes, because the two places want different things. The case study is
 * somewhere a reader has chosen to look, so it waits to be played and keeps its sound and
 * controls. The Work card is one item in a list being skimmed, so it loops silently the way
 * the charting app's thumbnail does — no controls, no sound, nothing to click.
 *
 * The source lives on `files.m4marvin.com` beside the charting app's thumbnails, so the
 * repository does not carry a 2.5 MB binary. It is served with `accept-ranges: bytes`, so
 * seeking works.
 */
export const SIRIUS_DEMO_VIDEO = "https://files.m4marvin.com/sirius_demo/sirius-demo.mp4"

export function DemoVideo({
  title,
  loop = false,
  className,
}: {
  /** Described to assistive tech; the video itself carries no captions. */
  title: string
  /** Loop silently as a preview instead of offering playback controls. */
  loop?: boolean
  className?: string
}) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || !loop) return
    // Same rule the Reveal component follows: if the reader has asked their system to
    // reduce motion, nothing moves on its own.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    // Refused autoplay is not an error worth surfacing; the first frame still shows.
    void el.play().catch(() => {})
  }, [loop])

  return (
    <video
      ref={ref}
      src={SIRIUS_DEMO_VIDEO}
      title={title}
      width={1920}
      height={1080}
      muted={loop}
      loop={loop}
      controls={!loop}
      playsInline
      preload="metadata"
      className={cn("h-auto w-full border border-zinc-800 bg-zinc-950", className)}
    />
  )
}
