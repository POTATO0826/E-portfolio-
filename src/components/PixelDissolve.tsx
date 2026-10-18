/* Ported from https://github.com/AdityaKodez/adityaojha (MIT, (c) 2026 Aditya Ojha)
   Source: components/ui/pixel-dissolve.tsx

   Pixelated fade: a checkerboard dither whose density steps up toward the
   edge, so content dissolves into pixels instead of only blurring away.
   Token driven — the squares are `--muted`.

   Two changes from upstream: an optional `className` so the same component can
   be used as an in-page divider rather than only the fixed bottom band, and
   `oklch(var(--muted))` in place of a bare `var(--muted)` — the token holds
   bare oklch channels here so Tailwind can inject an alpha channel into it
   (see src/index.css), which means a raw var() is not a complete colour. */

/* Five discrete alpha bands (bottom to top). Band height stays a multiple of
   the 4px checker cell so the dither steps align to whole pixel rows. */
const DISSOLVE_MASK =
  'linear-gradient(to top, black 0% 20%, rgba(0,0,0,0.8) 20% 40%, rgba(0,0,0,0.6) 40% 60%, rgba(0,0,0,0.4) 60% 80%, rgba(0,0,0,0.2) 80% 100%)'

export function PixelDissolve({
  height = '40px',
  className = 'pointer-events-none absolute inset-x-0 bottom-0 z-20',
}: {
  height?: string
  className?: string
}) {
  return (
    <div
      aria-hidden="true"
      className={className}
      style={{
        height,
        // 8px tile of 4px quadrant squares: one repeating-conic quadrant pair
        // per tile produces the 2x2 checkerboard.
        backgroundImage:
          'repeating-conic-gradient(oklch(var(--muted)) 0% 25%, transparent 0% 50%)',
        backgroundSize: '8px 8px',
        WebkitMaskImage: DISSOLVE_MASK,
        maskImage: DISSOLVE_MASK,
      }}
    />
  )
}
