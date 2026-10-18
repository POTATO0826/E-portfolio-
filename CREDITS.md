# Credits

## adityaojha — components and design tokens

Several components in `src/components/`, the `cn()` helper in `src/lib/utils.ts`,
the reveal helpers in `src/lib/motion.ts`, and the design-token layer in
`src/index.css` are ported from:

**https://github.com/AdityaKodez/adityaojha** — © 2026 Aditya Ojha, MIT License.

Ported files carry a provenance comment naming their upstream path. They were
adapted from Next.js 16 / Tailwind v4 to Vite / Tailwind v3: `@/lib/utils`
imports rewritten to relative paths, `next/image` replaced with `<img>`, Radix
tooltips replaced with a local implementation, `"use client"` directives
dropped, and the light palette folded down to a single dark theme.

**None of his artwork is used here** — no images, no avatar, and not his
signature path. Those are personal identity assets; only code was taken. The
desk-sticker collage (`src/components/DeskStickers.tsx`) borrows his
interaction mechanism — spring pointer-tilt, gesture springs, staggered entrance,
percentage-based collage CSS — while the four stickers in `public/stickers/`
are this site's own renders (source PNGs had a baked-in vignette; it was
flood-filled to transparency from the edges using the cream die-cut border as
the boundary, then trimmed and exported to 720px WebP) and the click sounds are
synthesised with the Web Audio API.

### MIT License (adityaojha)

```
MIT License

Copyright (c) 2026 Aditya Ojha

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## motion-primitives

`src/components/InfiniteSlider.tsx` originates with
**[motion-primitives](https://motion-primitives.com)** (MIT), not with the
portfolio above — that repo vendors it under `components/motion-primitives/`
and added the `useInView` / `useReducedMotion` gating this port keeps.

## Third-party data

The contribution heatmap reads
[github-contributions-api](https://github.com/grubersjoe/github-contributions-api)
by Jonathan Gruber (MIT), a public no-auth proxy for GitHub's contribution
calendar.
