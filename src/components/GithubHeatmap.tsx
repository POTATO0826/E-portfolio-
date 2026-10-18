/* Ported from https://github.com/AdityaKodez/adityaojha (MIT, (c) 2026 Aditya Ojha)
   Source: components/ui/github-map.tsx + components/skeletons/github-skeleton.tsx

   The grid geometry, month-label drift fix, and legend are his. Three changes:

   1. Cells are coloured by the API's `level` (GitHub's own quantile) instead of
      his raw-count buckets (0/1/2/3/>=4), which saturate at four commits a day
      and so read as a solid wall for anyone with a busy afternoon.
   2. One shared tooltip driven by event delegation, rather than a Radix
      Tooltip root per cell — his version mounts 371 portalled state machines,
      and his TooltipContent also relies on Tailwind v4-only syntax that would
      not compile here. This drops the radix-ui dependency entirely.
   3. The grid is derived from the fetched date range rather than recomputed
      from `new Date()`, so the columns can never drift out of step with the
      data they are drawing.                                                  */

import { useEffect, useMemo, useRef, useState } from 'react'
import { animate, useMotionValue, useMotionValueEvent, useReducedMotion } from 'motion/react'
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

/* Cell geometry. The month labels are positioned with these two numbers, so
   they have to change together or the labels slide off their columns. */
const CELL = 0.75 // rem, = w-3
const GAP = 0.125 // rem, = gap-0.5

/** Parse a bare YYYY-MM-DD as a local calendar date (upstream helper). `new
    Date('2026-01-01')` would be parsed as UTC and can land a day early. */
function parseLocalDate(iso: string): Date {
  const [year, month, day] = iso.split('-').map(Number)
  return new Date(year, month - 1, day)
}

type Cell = { key: string; count: number; level: number; label: string }

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

  // Month labels, with upstream's drift guard: only start a new label when the
  // month actually changed AND at least three columns have passed, so narrow
  // months don't stack their names on top of each other.
  const labels: { name: string; weekIndex: number }[] = []
  let cursor = startOfWeek(first, { weekStartsOn: 0 })
  for (let i = 0; i < weeks.length; i++) {
    const name = format(cursor, 'MMM')
    const prev = labels[labels.length - 1]
    if (!prev || (prev.name !== name && i - prev.weekIndex >= 3)) {
      labels.push({ name, weekIndex: i })
    }
    cursor = addDays(cursor, 7)
  }

  return { weeks, labels }
}

/* ── Skeleton ──────────────────────────────────────────
   Upstream's github-skeleton.tsx, which is zero-dependency Tailwind and ports
   as-is. Same 53x7 geometry as the real grid so nothing shifts on load.     */
function HeatmapSkeleton() {
  return (
    <div className="p-2 overflow-hidden animate-pulse" aria-hidden="true">
      <div className="flex w-max mx-auto flex-col gap-2">
        <div className="flex w-full justify-between gap-2 mb-1 h-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="h-3 w-6 rounded-md bg-muted" />
          ))}
        </div>
        <div className="flex gap-0.5">
          {Array.from({ length: 53 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-1">
              {Array.from({ length: 7 }).map((_, j) => (
                <div key={j} className="w-3 h-3 rounded-sm bg-muted" />
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

  useEffect(() => {
    const ac = new AbortController()
    fetchContributions(ac.signal).then(setData)
    return () => ac.abort()
  }, [])

  const grid = useMemo(
    () => (data?.contributions.length ? buildWeeks(data.contributions) : null),
    [data],
  )

  if (!grid || !data) return <HeatmapSkeleton />

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
      {/* Caption, grid and legend share one centre line. The grid is w-max +
          mx-auto: centred when it fits, and because auto margins collapse to
          zero on overflow it degrades to a left-anchored scroll on phones. */}
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
      <div
        className="p-2 overflow-x-auto overflow-y-hidden no-scrollbar"
        onMouseOver={onOver}
        onMouseLeave={() => setTip(null)}
      >
        {/* role=img with a summary label: 371 focusable cells would be a
            screen-reader trap, and the total is the part that carries meaning. */}
        <div
          className="flex w-max mx-auto"
          role="img"
          aria-label={`${data.total} GitHub contributions in the last year`}
        >
          <div className="relative">
            <div className="relative h-4 w-full mb-2">
              {grid.labels.map(month => (
                <span
                  key={`${month.name}-${month.weekIndex}`}
                  className="text-[10px] font-mono text-muted-foreground absolute whitespace-nowrap"
                  style={{ left: `calc(${month.weekIndex} * (${CELL}rem + ${GAP}rem))` }}
                >
                  {month.name}
                </span>
              ))}
            </div>

            <div className="flex gap-0.5">
              {grid.weeks.map((week, i) => (
                <div key={i} className="flex flex-col gap-1">
                  {week.map(day => (
                    <div
                      key={day.key}
                      data-day={`${day.label}: ${day.count} contribution${day.count === 1 ? '' : 's'}`}
                      className="w-3 h-3 rounded-sm"
                      style={{ backgroundColor: LEVEL_COLORS[day.level] ?? LEVEL_COLORS[0] }}
                    />
                  ))}
                </div>
              ))}
            </div>

            {/* Legend lives inside the w-max block so it is exactly as wide
                as the grid and sits flush with its right edge. */}
            <div className="mt-2 flex items-center justify-end gap-1 text-[10px] font-mono text-zinc-500">
              <span>Less</span>
              {LEVEL_COLORS.map((c, i) => (
                <div key={i} className="w-2 h-2 rounded-[1px]" style={{ backgroundColor: c }} />
              ))}
              <span>More</span>
            </div>
          </div>
        </div>
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
