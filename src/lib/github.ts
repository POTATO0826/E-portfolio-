/* Contribution-calendar data for the heatmap.
   Replaces lib/github.ts from https://github.com/AdityaKodez/adityaojha —
   that version POSTs to GitHub's GraphQL API with a server-side PAT behind
   `import "server-only"`, which cannot work here. This is a static SPA: a token
   put in the bundle would be published in dist/, and unauthenticated GraphQL
   is rejected with a 403.

   So the data comes from grubersjoe's public no-auth proxy instead, which
   sends `Access-Control-Allow-Origin: *` and so is reachable straight from the
   browser. Because that service scrapes profile HTML and carries no SLA, every
   read is wrapped: a localStorage cache first, then the network, then a
   committed snapshot. The section can therefore never fail to render.         */

import snapshot from '../data/contributions.json'

export type Contribution = {
  date: string
  count: number
  /** GitHub's own quantile bucket. Upstream ignores this and re-buckets on raw
      counts (0/1/2/3/>=4), which pins anyone past 4 commits/day to the top
      colour; the heatmap here colours by this instead. */
  level: number
}

export type ContributionData = {
  total: number
  contributions: Contribution[]
  source: 'network' | 'cache' | 'snapshot'
}

const USERNAME = 'POTATO0826'
const ENDPOINT = `https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=last`

const CACHE_KEY = `contrib:${USERNAME}:v1`
const CACHE_TTL = 6 * 60 * 60 * 1000 // 6h — the service itself caches for 1h

type ApiResponse = {
  total?: Record<string, number>
  contributions?: Contribution[]
}

const fromSnapshot = (): ContributionData => ({
  total: snapshot.total.lastYear,
  contributions: snapshot.contributions,
  source: 'snapshot',
})

/** localStorage throws outright in some privacy modes, so every access is guarded. */
function readCache(): ContributionData | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const { at, data } = JSON.parse(raw) as { at: number; data: ContributionData }
    if (Date.now() - at > CACHE_TTL) return null
    if (!data?.contributions?.length) return null
    return { ...data, source: 'cache' }
  } catch {
    return null
  }
}

function writeCache(data: ContributionData) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), data }))
  } catch {
    // Quota or a blocked store — the heatmap works without a cache.
  }
}

export async function fetchContributions(signal?: AbortSignal): Promise<ContributionData> {
  const cached = readCache()
  if (cached) return cached

  try {
    const res = await fetch(ENDPOINT, { signal })
    if (!res.ok) return fromSnapshot()

    const json: ApiResponse = await res.json()
    const contributions = json.contributions ?? []
    if (contributions.length === 0) return fromSnapshot()

    // `?y=last` returns { lastYear: n }; the all-years form keys totals by
    // year, so sum whatever came back rather than assuming the shape.
    const total = Object.values(json.total ?? {}).reduce((a, b) => a + b, 0)

    const data: ContributionData = { total, contributions, source: 'network' }
    writeCache(data)
    return data
  } catch {
    // Offline, aborted, CORS, or the service is down — show the snapshot.
    return fromSnapshot()
  }
}
