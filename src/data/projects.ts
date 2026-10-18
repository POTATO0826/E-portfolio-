// Project data, lifted out of designs/Design5.tsx so the components that render
// it don't have to import the page. The hackathon list holds only the entries
// that placed; the other events are summarised in the ledger label.

export type Project = {
  meta: string
  name: string
  icon: string
  desc: string
  tech: string[]
  github: string
  accent: string
  award?: string
  /** Where the hackathon physically happened. */
  location?: { label: string; lat: number; lng: number }
}

// Accents rebalanced for a dark ground — the paper-tone versions went muddy
// below 20% luminance, so each one is lifted until it reads as ink-on-glass.
export const INDIGO = '#7d93d8'
export const TERRA  = '#e8785c'
export const SAGE   = '#9db884'
export const GOLD   = '#e0b357'

const KL        = { label: 'Kuala Lumpur, Malaysia',    lat: 3.139,  lng: 101.687 }
const SUBANG    = { label: 'Subang Jaya, Malaysia',     lat: 3.0653, lng: 101.6075 }
const KATHMANDU = { label: 'Kathmandu, Nepal',          lat: 27.717, lng: 85.324 }

export const hackathonProjects: Project[] = [
  {
    meta: 'MUBA 2026 · Malaysia 🇲🇾',
    name: 'ThetaDuel',
    icon: '⚔️',
    desc: 'Options trading is a wall of greeks that scares off everyone who isn\'t already a quant. ThetaDuel turns it into a 1v1 duel: draw a box on a live price chart and the box *is* the option — its dimensions are the strikes, and the premium is quoted straight off the Thetanuts book rather than invented by us. Two players draw blind against the same asset, then both boxes reveal on one chart and whoever\'s lands at expiry takes the pool. Every match is fully determined by (lobby, seed), so a link replays exactly what its sender saw.',
    tech: ['Bun', 'React', 'Solidity', 'Thetanuts SDK'],
    github: 'https://github.com/POTATO0826/MUBA',
    accent: GOLD,
    award: '🥈 1st Runner-Up · Thetanuts AI Track',
    location: KL,
  },
  {
    meta: 'DevLeague 2026 · TalentLabs · Malaysia 🇲🇾',
    name: 'ChadBuddy',
    icon: '📉',
    desc: 'Advisors don\'t lose clients to bad advice — they lose them to dropped threads. ChadBuddy reads the Telegram history an advisor already has, finds the relationships quietly going cold, and names the exact message that proves it. Every claim on screen traces back to a real quote or it never gets shown. Lives as a transparent pill floating above whatever you\'re working in.',
    tech: ['Astro', 'Convex', 'Tauri', 'Telegram'],
    github: 'https://github.com/POTATO0826/CHADBUDD',
    accent: GOLD,
    award: '🏆 Bonus Track Winner · Superteam MY',
    location: KL,
  },
  {
    meta: 'IIMS Hackathon 2026 · Nepal 🇳🇵',
    name: 'Finchpoint',
    icon: '🐔',
    desc: 'An AI that watches your chickens so you don\'t have to. Coop cameras count the flock and flag anyone acting off, then every morning Finch drops a coop check-up straight into WhatsApp or Telegram — who to check on first, how warm they are, plus a snapshot as proof. Ask it anything about your flock and it actually knows your farm, not just chicken facts.',
    tech: ['Computer Vision', 'Convex', 'WhatsApp Bot', 'React'],
    github: 'https://github.com/POTATO0826/IIMS-Hackathon',
    accent: GOLD,
    award: '🏆 Champion · Open Track',
    location: KATHMANDU,
  },
  {
    meta: 'ImagineHack 2026 · Malaysia 🇲🇾',
    name: 'MEETU',
    icon: '🤝',
    desc: 'An AI-powered CRM built for independent financial advisors. It ingests WhatsApp conversations and news, then automatically extracts the signals that matter — life events, follow-ups, and per-client talking points — and surfaces them in a calm, editorial workspace. The goal: advisors stop losing clients simply because a thread slipped through the cracks.',
    tech: ['Next.js', 'React', 'Convex', 'AI SDK'],
    github: 'https://github.com/POTATO0826/MEETU',
    accent: GOLD,
    award: '🏆 Champion · Track 1 (AAG × ASG)',
    location: SUBANG,
  },
]

export const sideProjects: Project[] = [
  {
    meta: 'Side Project · Mobile',
    name: 'Doku',
    icon: '📄',
    desc: 'A document scanner that turns physical paperwork into clean, structured Excel sheets or shareable PDFs in a single tap — useful for digitising forms, receipts, and records on the go.',
    tech: ['Flutter', 'Dart', 'OCR'],
    github: 'https://github.com/POTATO0826/Doku',
    accent: INDIGO,
  },
  {
    meta: 'Side Project · 3D Web',
    name: 'Sakura',
    icon: '🌸',
    desc: 'An interactive 3D web experience — and installable PWA — where a cherry blossom blooms in a moonlit garden. Snow and petals fall, a glowing seed descends, a branch grows and unfurls, and five petals open into a luminous flower. Drag to orbit the camera or tap the blossom for a burst of heart particles, all set to an optional lofi soundtrack. Every visual is procedurally generated — no pre-made models or images.',
    tech: ['Three.js', 'TypeScript', 'GSAP', 'PWA'],
    github: 'https://github.com/POTATO0826/Flower-',
    accent: TERRA,
  },
]
