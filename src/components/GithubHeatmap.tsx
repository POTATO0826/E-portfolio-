/* Ported from https://github.com/AdityaKodez/adityaojha (MIT, (c) 2026 Aditya Ojha)
   Source: components/ui/github-map.tsx + components/skeletons/github-skeleton.tsx

   The grid geometry, month-label drift fix, and legend are his. Four changes:

   1. Cells are coloured by the API's `level` (GitHub's own quantile) instead of
      his raw-count buckets (0/1/2/3/>=4), which saturate at four commits a day
      and so read as a solid wall for anyone with a busy afternoon.
   2. One shared tooltip driven by event delegation, rather than a Radix
      Tooltip root per cell — his version mounts 371 portalled state machines,
      and his TooltipContent also relies on Tailwind v4-only syntax that would
      not compile here. This drops the radix-ui dependency entirely.
   3. The grid is derived from the fetched date range rather than recomputed
      from `new Date()`, so the columns can never drift out of step with the
      data they are drawing.
   4. The grid fits its container. His is a fixed 12px cell behind a hidden
      scrollbar, which on a phone shows six months and looks cut off with no
      hint that it scrolls. Here the cell size is derived from the measured
      width, so all 53 weeks are always visible; the scroll container only
      kicks in below the minimum cell size (~250px wide).                     */

import { useEffect, useMemo, useRef, useState } from 'react'
import { animate, useMotionValue, useMotionValueEvent, useReducedMotion } from 'motion/react'
import useMeasure from 'react-use-measure'
import {
  addDays,
  eachDayOfInterval,
  endOfWeek,
  format,
  startOfWeek,
} from 'date-fns'
import { fetchContributions, type Contribution, type ContributionData } from '../lib/github'

const LEVEL_COLORS = [
  'var(--heatmap-level-0)',
  'var(--heatmap-level-1)',
  'var(--heatmap-level-2)',
  'var(--heatmap-level-3)',
  'var(--heatmap-level-4)',
]

/* Cell geometry, in px. The grid is drawn at BASE_CELL when there is room
   (upstream's w-3 / gap-0.5) and shrinks to fit otherwise. The gap is a
   fixed fraction of the cell so the texture stays the same at every size.
   Month labels are positioned from the same numbers, so nothing drifts. */
const BASE_CELL = 12
const MIN_CELL = 4
const GAP_RATIO = 1 / 6
const LABEL_WIDTH = 30 // px: "Oct" in 10px mono, plus air to the next label

type Geometry = { cell: number; gap: number; step: number; width: number }

function fitGeometry(available: number, cols: number): Geometry {
  // cols cells plus (cols - 1) gaps of GAP_RATIO * cell have to fit in
  // `available`. Before the first measurement `available` is 0: draw at base.
  const fit = available > 0 ? available / (cols + (cols - 1) * GAP_RATIO) : BASE_CELL
  const cell = Math.max(MIN_CELL, Math.min(BASE_CELL, fit))
  const gap = cell * GAP_RATIO
  return { cell, gap, step: cell + gap, width: cols * cell + (cols - 1) * gap }
}

/** Parse a bare YYYY-MM-DD as a local calendar date (upstream helper). `new
    Date('2026-01-01')` would be parsed as UTC and can land a day early. */
function parseLocalDate(iso: string): Date {
  const [year, month, day] = iso.split('-').map(Number)
  return new Date(year, month - 1, day)
}

type Cell = { key: string; count: number; level: number; label: string }
type MonthLabel = { name: string; weekIndex: number }

function buildWeeks(contributions: Contribution[]) {
  const byDate = new Map(contributions.map(c => [c.date, c]))

  const first = parseLocalDate(contributions[0].date)
  const last = parseLocalDate(contributions[contributions.length - 1].date)

  const days = eachDayOfInterval({
    start: startOfWeek(first, { weekStartsOn: 0 }),
    end: endOfWeek(last, { weekStartsOn: 0 }),
  })

  const weeks: Cell[][] = []
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(
      days.slice(i, i + 7).map(day => {
        const key = format(day, 'yyyy-MM-dd')
        const hit = byDate.get(key)
        return {
          key,
          count: hit?.count ?? 0,
          level: hit?.level ?? 0,
          label: format(day, 'PPP'),
        }
      }),
    )
  }

  // One label per month, on the first column whose week starts in that month,
  // so every label sits exactly over its own columns. Upstream instead held a
  // new label back until three columns had passed, which slid it a week off.
  // The leading partial month is kept only when it is at least three columns
  // wide; otherwise its name would crowd the first full month.
  const labels: MonthLabel[] = []
  let cursor = startOfWeek(first, { weekStartsOn: 0 })
  for (let i = 0; i < weeks.length; i++) {
    const name = format(cursor, 'MMM')
    if (labels[labels.length - 1]?.name !== name) labels.push({ name, weekIndex: i })
    cursor = addDays(cursor, 7)
  }
  if (labels.length > 1 && labels[1].weekIndex < 3) labels.shift()

  return { weeks, labels }
}

/** Thin the month labels for the current cell size: when a month's worth of
    columns is narrower than a label, show every second (or third…) month so
    the rhythm stays even, and drop a last label that would hang past the
    grid's right edge. */
function visibleLabels(labels: MonthLabel[], geo: Geometry) {
  const monthWidth = geo.step * 4.33
  const every = Math.max(1, Math.ceil(LABEL_WIDTH / monthWidth))
  return labels.filter(
    (label, i) => i % every === 0 && label.weekIndex * geo.step + LABEL_WIDTH <= geo.width + geo.gap,
  )
}

/* ── Skeleton ──────────────────────────────────────────
   Upstream's github-skeleton.tsx. Same column count and the same fitted
   geometry as the real grid, so nothing shifts on load.                    */
function HeatmapSkeleton({ cols, geo }: { cols: number; geo: Geometry }) {
  return (
    <div className="animate-pulse" aria-hidden="true">
      {/* Stands in for the caption line so the section doesn't jump. */}
      <div className="mx-auto mb-4 h-10 w-56 rounded-md bg-muted sm:h-12" />
      <div className="mx-auto flex flex-col gap-2" style={{ width: geo.width }}>
        <div className="mb-1 flex h-4 w-full justify-between gap-2">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="h-3 w-6 rounded-md bg-muted" />
          ))}
        </div>
        <div className="flex" style={{ gap: geo.gap }}>
          {Array.from({ length: cols }).map((_, i) => (
            <div key={i} className="flex flex-col" style={{ gap: geo.gap }}>
              {Array.from({ length: 7 }).map((_, j) => (
                <div
                  key={j}
                  className="bg-muted"
                  style={{ width: geo.cell, height: geo.cell, borderRadius: geo.cell >= 8 ? 2 : 1 }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── Animated total ────────────────────────────────────
   Counts up from zero once the data lands — the one motion-graphics beat in
   this section. Under reduced motion it just shows the number.             */
function AnimatedTotal({ value }: { value: number }) {
  const reduceMotion = useReducedMotion()
  const mv = useMotionValue(0)
  const [shown, setShown] = useState(reduceMotion ? value : 0)

  useMotionValueEvent(mv, 'change', v => setShown(Math.round(v)))

  useEffect(() => {
    if (reduceMotion) {
      setShown(value)
      return
    }
    const controls = animate(mv, value, { duration: 1.4, ease: [0.22, 1, 0.36, 1] })
    return () => controls.stop()
  }, [value, reduceMotion, mv])

  return <span className="display-serif text-4xl sm:text-5xl text-zinc-50 tabular-nums">{shown.toLocaleString()}</span>
}

export function GithubHeatmap() {
  const [data, setData] = useState<ContributionData | null>(null)
  const [tip, setTip] = useState<{ x: number; y: number; text: string } | null>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  // The measured box is the block the grid lives in, so its width is exactly
  // the room the grid has. ResizeObserver-backed: rotating a phone refits.
  const [measureRef, { width: available }] = useMeasure()

  useEffect(() => {
    const ac = new AbortController()
    fetchContributions(ac.signal).then(setData)
    return () => ac.abort()
  }, [])

  const grid = useMemo(
    () => (data?.contributions.length ? buildWeeks(data.contributions) : null),
    [data],
  )

  const cols = grid?.weeks.length ?? 53
  const geo = fitGeometry(available, cols)
  const labels = grid ? visibleLabels(grid.labels, geo) : []
  const radius = geo.cell >= 8 ? 2 : 1

  // One listener for the whole grid instead of 371. The cell carries its own
  // copy as data attributes so no lookup by index is needed.
  const onOver = (e: React.MouseEvent<HTMLDivElement>) => {
    const cell = (e.target as HTMLElement).closest<HTMLElement>('[data-day]')
    const host = gridRef.current
    if (!cell || !host) return setTip(null)

    const a = cell.getBoundingClientRect()
    const b = host.getBoundingClientRect()
    setTip({
      x: a.left - b.left + a.width / 2,
      y: a.top - b.top,
      text: cell.dataset.day!,
    })
  }

  return (
    <div className="relative" ref={gridRef}>
      <div ref={measureRef}>
        {!grid || !data ? (
          <HeatmapSkeleton cols={cols} geo={geo} />
        ) : (
          <>
            {/* Caption, grid and legend share one centre line. */}
            <div className="mb-4 flex flex-wrap items-baseline justify-center gap-x-3 gap-y-1 text-center">
              <AnimatedTotal value={data.total} />
              <span className="text-sm text-zinc-400">
                contributions in the last year
                <a
                  href="https://github.com/POTATO0826"
                  target="_blank"
                  rel="noreferrer"
                  className="ml-2 font-mono text-xs text-zinc-500 underline-offset-4 hover:text-zinc-300 hover:underline"
                >
                  @POTATO0826
                </a>
              </span>
            </div>
            {/* The grid is sized to fit, so this only scrolls below MIN_CELL,
                and because auto margins collapse to zero on overflow it
                degrades to a left-anchored scroll there. */}
            <div
              className="overflow-x-auto overflow-y-hidden no-scrollbar"
              onMouseOver={onOver}
              onMouseLeave={() => setTip(null)}
            >
              {/* role=img with a summary label: 371 focusable cells would be a
                  screen-reader trap, and the total is the part that carries meaning. */}
              <div
                className="mx-auto"
                style={{ width: geo.width }}
                role="img"
                aria-label={`${data.total} GitHub contributions in the last year`}
              >
                <div className="relative mb-2 h-4 w-full">
                  {labels.map(month => (
                    <span
                      key={`${month.name}-${month.weekIndex}`}
                      className="absolute whitespace-nowrap font-mono text-[10px] text-muted-foreground"
                      style={{ left: month.weekIndex * geo.step }}
                    >
                      {month.name}
                    </span>
                  ))}
                </div>

                <div className="flex" style={{ gap: geo.gap }}>
                  {grid.weeks.map((week, i) => (
                    <div key={i} className="flex flex-col" style={{ gap: geo.gap }}>
                      {week.map(day => (
                        <div
                          key={day.key}
                          data-day={`${day.label}: ${day.count} contribution${day.count === 1 ? '' : 's'}`}
                          style={{
                            width: geo.cell,
                            height: geo.cell,
                            borderRadius: radius,
                            backgroundColor: LEVEL_COLORS[day.level] ?? LEVEL_COLORS[0],
                          }}
                        />
                      ))}
                    </div>
                  ))}
                </div>

                {/* Legend is inside the sized block so it is exactly as wide
                    as the grid and sits flush with its right edge. */}
                <div className="mt-2 flex items-center justify-end gap-1 font-mono text-[10px] text-zinc-500">
                  <span>Less</span>
                  {LEVEL_COLORS.map((c, i) => (
                    <div key={i} className="h-2 w-2 rounded-[1px]" style={{ backgroundColor: c }} />
                  ))}
                  <span>More</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {tip && (
        <div
          role="tooltip"
          className="pointer-events-none absolute z-30 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-md border bg-popover px-2 py-1 text-[11px] text-popover-foreground shadow-lg"
          style={{ left: tip.x, top: tip.y - 6 }}
        >
          {tip.text}
        </div>
      )}
    </div>
  )
}
