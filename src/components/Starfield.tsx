import { useEffect, useRef } from 'react'

/* ── Starfield ─────────────────────────────────────────
   A glittering starfield warping out from (or in toward) the centre, with
   motion streaks and random sparkle flashes.

   Built to stay cheap, because the shader and koi canvas this replaces were
   what made the page stutter on load. The rules it holds to:

     · no per-frame allocation — no gradients, no filters, no template strings
       in the draw loop. Alpha is set through ctx.globalAlpha (a number) rather
       than by building an "rgba(…)" string per star per frame.
     · no ctx.filter, ever. It forces an offscreen surface + blur + composite.
     · streaks come from drawing each star as a line between its previous and
       current projected position — not from alpha-fading the whole canvas,
       which repaints every pixel each frame and smears on resize.
     · one rAF loop with a hard stop, paused when the tab is hidden.
     · prefers-reduced-motion paints a single static frame and never loops.   */

type Direction = 'out' | 'in'

type Props = {
  /** Stars at 1080p; scaled by viewport area and thinned on phones. */
  density?: number
  /** Depth units per second. Higher = faster warp. */
  speed?: number
  direction?: Direction
  className?: string
}

type Star = {
  x: number
  y: number
  z: number
  pz: number
  warm: boolean
  /** seconds until the next sparkle; counts down */
  nextSpark: number
  /** remaining sparkle duration, 0 when not sparkling */
  spark: number
}

const NEAR = 0.05      // respawn once a star passes this close
const FAR = 1          // spawn depth

export default function Starfield({
  density = 440,
  speed = 0.13,
  direction = 'out',
  className = 'fixed inset-0 z-0 pointer-events-none',
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const isMobile = window.matchMedia('(max-width: 768px), (pointer: coarse)').matches
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // DPR is capped hard. A full-screen canvas at native DPR on a high-density
    // display is several times the fill cost for detail nobody can see in a
    // 1px star.
    const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1 : 1.5)

    let W = 0
    let H = 0
    let cx = 0
    let cy = 0
    let k = 0            // projection scale
    let stars: Star[] = []

    const rand = (a: number, b: number) => a + Math.random() * (b - a)

    function spawn(s: Star, initial: boolean) {
      // Rejection-sample away from dead centre. Stars born at (0,0) sit on the
      // vanishing point and crawl, which reads as a stuck pixel.
      let x = 0
      let y = 0
      do {
        x = rand(-1, 1)
        y = rand(-1, 1)
      } while (x * x + y * y < 0.01)

      s.x = x
      s.y = y
      // Outward: start far and fly at the viewer. Inward: start near and recede.
      // `initial` scatters the first population through the whole depth range so
      // the field doesn't arrive as one visible wave.
      s.z = initial ? rand(NEAR + 0.05, FAR) : direction === 'out' ? FAR : NEAR + 0.05
      s.pz = s.z
      s.warm = Math.random() < 0.18      // a minority of warm stars keeps it from going flat blue
      s.nextSpark = rand(1.5, 14)
      s.spark = 0
    }

    function resize() {
      const w = window.innerWidth
      const h = window.innerHeight
      // Mobile browsers fire resize every time the URL bar collapses. Ignore
      // height-only jitter or the canvas reallocates mid-scroll and stutters.
      if (isMobile && w === W && Math.abs(h - H) < 120) return

      W = w
      H = h
      cx = W / 2
      cy = H / 2
      k = Math.min(W, H) * 0.5

      canvas!.width = Math.floor(W * dpr)
      canvas!.height = Math.floor(H * dpr)
      canvas!.style.width = W + 'px'
      canvas!.style.height = H + 'px'
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx!.lineCap = 'round'

      // Scale the population to the viewport so a phone isn't drawing a
      // desktop-sized field into a fraction of the area. The exponent softens
      // it: scaling linearly by area leaves a phone at ~16% of the desktop
      // count, which reads as an empty sky rather than a denser one.
      const area = (W * H) / (1920 * 1080)
      const target = Math.max(90, Math.round(density * Math.pow(area, 0.7) * (isMobile ? 0.7 : 1)))

      if (target > stars.length) {
        while (stars.length < target) {
          const s: Star = { x: 0, y: 0, z: 0, pz: 0, warm: false, nextSpark: 0, spark: 0 }
          spawn(s, true)
          stars.push(s)
        }
      } else if (target < stars.length) {
        stars.length = target
      }
    }

    resize()

    function step(dt: number) {
      const dz = speed * dt
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i]
        s.pz = s.z
        s.z += direction === 'out' ? -dz : dz

        if (s.z <= NEAR || s.z > FAR) {
          spawn(s, false)
          continue
        }

        if (s.spark > 0) {
          s.spark -= dt
        } else {
          s.nextSpark -= dt
          if (s.nextSpark <= 0) {
            s.spark = rand(0.10, 0.26)
            s.nextSpark = rand(2.5, 16)
          }
        }
      }
    }

    function render() {
      ctx!.clearRect(0, 0, W, H)

      // Two passes so strokeStyle is set twice per frame instead of per star.
      // globalAlpha and lineWidth are cheap numeric sets; strokeStyle parses a
      // colour, so it's the one worth batching.
      for (let pass = 0; pass < 2; pass++) {
        const warmPass = pass === 1
        ctx!.strokeStyle = warmPass ? '#ffd9a8' : '#dce7ff'

        for (let i = 0; i < stars.length; i++) {
          const s = stars[i]
          if (s.warm !== warmPass) continue

          const sx = (s.x / s.z) * k + cx
          const sy = (s.y / s.z) * k + cy

          // Cull once it leaves the frame — but only when travelling outward,
          // since an inbound star legitimately starts outside and flies in.
          if (sx < -40 || sx > W + 40 || sy < -40 || sy > H + 40) {
            if (direction === 'out') spawn(s, false)
            continue
          }

          const px = (s.x / s.pz) * k + cx
          const py = (s.y / s.pz) * k + cy

          // Depth 0 (far) → 1 (near). Squared so distant stars stay genuinely
          // faint and the field reads as depth rather than noise.
          const depth = 1 - (s.z - NEAR) / (FAR - NEAR)
          const d2 = depth * depth

          const sparking = s.spark > 0
          ctx!.globalAlpha = Math.min(1, (0.14 + d2 * 0.74) * (sparking ? 2.2 : 1))
          ctx!.lineWidth = 0.8 + d2 * 2.7 + (sparking ? 1 : 0)

          ctx!.beginPath()
          ctx!.moveTo(px, py)
          // A star that hasn't moved yet still needs a visible dot, so give
          // zero-length streaks a hair of length.
          ctx!.lineTo(sx, sy === py && sx === px ? sy + 0.01 : sy)
          ctx!.stroke()

          // Sparkle flash — a small cross of light on top of the streak.
          if (sparking && depth > 0.25) {
            const r = 2.2 + d2 * 4.4
            ctx!.globalAlpha = Math.min(1, 0.55 + d2 * 0.45)
            ctx!.lineWidth = 0.9
            ctx!.beginPath()
            ctx!.moveTo(sx - r, sy)
            ctx!.lineTo(sx + r, sy)
            ctx!.moveTo(sx, sy - r)
            ctx!.lineTo(sx, sy + r)
            ctx!.stroke()
          }
        }
      }

      ctx!.globalAlpha = 1
    }

    // Reduced motion: one still frame, no loop, no pointer or visibility hooks.
    if (reduceMotion) {
      const onResizeStatic = () => { resize(); render() }
      window.addEventListener('resize', onResizeStatic)
      render()
      return () => window.removeEventListener('resize', onResizeStatic)
    }

    window.addEventListener('resize', resize)

    let animId = 0
    let paused = false
    let last = performance.now()
    const minFrameMs = isMobile ? 1000 / 30 : 0

    function frame(now: number) {
      animId = requestAnimationFrame(frame)
      const elapsed = now - last
      if (elapsed < minFrameMs) return
      last = now
      // Clamp so a backgrounded tab doesn't resume by teleporting the field.
      step(Math.min(elapsed / 1000, 0.05))
      render()
    }
    animId = requestAnimationFrame(frame)

    function onVisibility() {
      if (document.hidden) {
        if (!paused) { cancelAnimationFrame(animId); paused = true }
      } else if (paused) {
        paused = false
        last = performance.now()
        animId = requestAnimationFrame(frame)
      }
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [density, speed, direction])

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />
}
