import { useState, useEffect, useRef } from 'react'
import Starfield from '../components/Starfield'

// Dark editorial portfolio on a plain black ground.
//
// Motion system (per animation-systems + fixing-motion-performance):
//   · tokens live in CSS custom properties (--dur-*, --ease-*) so every surface
//     shares one vocabulary instead of ad-hoc durations
//   · reveals are IntersectionObserver-driven and fire ONCE — never scroll-polled
//   · only transform + opacity are animated; no layout or paint properties
//   · every hover effect is behind @media (hover: hover) so phones don't get
//     stuck in a hover state after a tap
//   · prefers-reduced-motion collapses everything to instant

const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons'
const skills = [
  { name: 'Flutter',    icon: `${DEVICON}/flutter/flutter-original.svg`,                              desc: 'Cross-platform UI' },
  { name: 'React',      icon: `${DEVICON}/react/react-original.svg`,                                  desc: 'Web interfaces' },
  { name: 'Java',       icon: `${DEVICON}/java/java-original.svg`,                                    desc: 'Backend systems' },
  { name: 'Firebase',   icon: `${DEVICON}/firebase/firebase-plain.svg`,                               desc: 'Cloud services' },
  { name: 'Dart',       icon: `${DEVICON}/dart/dart-original.svg`,                                    desc: 'Mobile-first' },
  { name: 'TypeScript', icon: `${DEVICON}/typescript/typescript-original.svg`,                        desc: 'Type-safe JS' },
  { name: 'Python',     icon: `${DEVICON}/python/python-original.svg`,                                desc: 'Data & scripts' },
  // The devicon "original" AWS wordmark is near-black type and disappears on a
  // black ground; the "plain" variant is solid #f90. Rust's devicon is likewise
  // black, so it comes from Simple Icons with an explicit light fill instead.
  { name: 'AWS',        icon: `${DEVICON}/amazonwebservices/amazonwebservices-plain-wordmark.svg`,    desc: 'Cloud infra' },
  { name: 'Git',        icon: `${DEVICON}/git/git-original.svg`,                                      desc: 'Version control' },
  { name: 'Convex',     icon: 'https://cdn.simpleicons.org/convex/8ea0c4',                             desc: 'Realtime backend' },
  { name: 'Vercel',     icon: 'https://cdn.simpleicons.org/vercel/e6e8ec',                             desc: 'Deployments' },
  { name: 'Claude',     icon: 'https://cdn.simpleicons.org/claude',                                    desc: 'AI pair programming' },
  { name: 'Rust',       icon: 'https://cdn.simpleicons.org/rust/e6e8ec',                               desc: 'Native & Tauri' },
  // Simple Icons' recolouring CDN has dropped the OpenAI mark, so this is the
  // raw package SVG — which ships with no fill and renders black. `invert`
  // flips it to white for the dark ground.
  { name: 'Codex',      icon: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/openai.svg',     desc: 'AI code agent', invert: true },
]

const ticker = ['Flutter', 'React', 'TypeScript', 'Java', 'Firebase', 'Python', 'AWS', 'Dart', 'Convex', 'Vercel', 'Claude', 'Codex', 'Rust', 'Computer Vision', 'Telegram Bots']

type Project = {
  meta: string
  name: string
  icon: string
  desc: string
  tech: string[]
  github: string
  accent: string
  award?: string
}

// Accents rebalanced for a dark ground — the paper-tone versions went muddy
// below 20% luminance, so each one is lifted until it reads as ink-on-glass.
const INDIGO = '#7d93d8'
const TERRA  = '#e8785c'
const SAGE   = '#9db884'
const GOLD   = '#e0b357'

const hackathonProjects: Project[] = [
  {
    meta: 'DevLeague 2026 · TalentLabs · Malaysia 🇲🇾',
    name: 'ChadBuddy',
    icon: '📉',
    desc: 'Advisors don\'t lose clients to bad advice — they lose them to dropped threads. ChadBuddy reads the Telegram history an advisor already has, finds the relationships quietly going cold, and names the exact message that proves it. Every claim on screen traces back to a real quote or it never gets shown. Lives as a transparent pill floating above whatever you\'re working in.',
    tech: ['Astro', 'Convex', 'Tauri', 'Telegram'],
    github: 'https://github.com/POTATO0826/CHADBUDD',
    accent: GOLD,
    award: '🏆 Bonus Track Winner · Superteam MY',
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
  },
  {
    meta: 'KitaHack 2026 · Malaysia 🇲🇾',
    name: 'ProjekWatch',
    icon: '🏠',
    desc: 'A community-driven platform that tracks the real progress of infrastructure projects such as housing, roads, and public facilities. Users upload photos and updates to verify construction activity, helping improve transparency and accountability in public development.',
    tech: ['Flutter', 'Dart', 'Firebase'],
    github: 'https://github.com/yapzhanquan/KitahackTaygood',
    accent: INDIGO,
  },
  {
    meta: 'UMHackathon 2026 · Malaysia 🇲🇾',
    name: 'Codapac',
    icon: '🤖',
    desc: 'An AI coding agent that builds and auto-deploys websites for small and medium businesses — letting SMEs launch a professional online presence without writing a line of code or hiring developers.',
    tech: ['AI Agent', 'Next.js', 'TypeScript', 'Auto-Deploy'],
    github: 'https://github.com/LeeSF03/codapac',
    accent: TERRA,
  },
  {
    meta: 'MyHack 2026 · Malaysia 🇲🇾',
    name: 'BloomPost',
    icon: '🎬',
    desc: 'A marketing platform that generates product imagery with Google Gemini and short-form videos with Google Veo, then auto-posts them across social media and e-commerce channels — helping brands scale their content output and boost product visibility.',
    tech: ['Gemini', 'Google Veo', 'Social APIs', 'Next.js'],
    github: 'https://github.com/POTATO0826/BloomPost',
    accent: SAGE,
  },
  {
    meta: 'LotusHack 2026 · Vietnam 🇻🇳',
    name: 'SkyClaw',
    icon: '🛸',
    desc: 'A platform that creates immersive 3D interior tours for places like cafés, restaurants, and Airbnb properties. Visitors explore the inside of a venue before they arrive, helping businesses showcase their spaces and convert more bookings.',
    tech: ['Python', 'Computer Vision', 'Telegram', 'AWS'],
    github: 'https://github.com/yapzhanquan/SkyClaw',
    accent: INDIGO,
  },
]

const sideProjects: Project[] = [
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

/* ── Shared environment probes ─────────────────────────
   Read once at module scope instead of per-component, so five canvases don't
   each run their own matchMedia during mount.                               */
const mq = (q: string) => typeof window !== 'undefined' && window.matchMedia(q).matches
const IS_MOBILE = () => mq('(max-width: 768px), (pointer: coarse)')
const REDUCE_MOTION = () => mq('(prefers-reduced-motion: reduce)')

/* ── Reveal-on-scroll ──────────────────────────────────
   IntersectionObserver, unobserved after the first hit so a section animates
   once and then stops costing anything. Never reads scrollY — scroll-driven
   animation is the single biggest source of jank on phones.                 */
function useReveal<T extends HTMLElement>(delayIndex = 0) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Reduced motion: show it immediately, never observe.
    if (REDUCE_MOTION()) {
      el.classList.add('is-in')
      return
    }

    el.style.setProperty('--d', `${delayIndex * (IS_MOBILE() ? 35 : 60)}ms`)

    const io = new IntersectionObserver(
      entries => {
        for (const e of entries) {
          if (!e.isIntersecting) continue
          e.target.classList.add('is-in')
          io.unobserve(e.target)
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -6% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [delayIndex])

  return ref
}

/* ── Pause looping motion off-screen ───────────────────
   A marquee or a spinning ring keeps burning compositor work while it's
   scrolled out of view. Toggle animation-play-state from an observer instead
   of leaving them running for the whole session.                            */
function usePauseOffscreen<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const io = new IntersectionObserver(entries => {
      for (const e of entries) {
        ;(e.target as HTMLElement).style.animationPlayState = e.isIntersecting ? 'running' : 'paused'
      }
    })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return ref
}

/* ── Profile Photo ───────────────────────────────────── */
function ProfilePhoto() {
  const orbitRef = usePauseOffscreen<HTMLDivElement>()
  return (
    <div className="pfp relative">
      {/* Hairline orbit with a single travelling star. This replaces the old
          multicolour conic ring — against a starfield the warm terracotta read
          as a stray planet, and a rotating full-colour gradient competed with
          the thing moving behind it. One cool hairline and one point of light
          belongs to the same picture. Rotation is transform-only and stops
          once the hero scrolls off. */}
      <div ref={orbitRef} className="pfp-orbit absolute -inset-2 rounded-full border border-white/10">
        <span className="pfp-star absolute left-1/2 top-0 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
      </div>

      <div className="pfp-frame relative size-28 sm:size-36 rounded-full overflow-hidden border border-white/20">
        <img
          src="/PFP.jpeg"
          alt="Vince Loo"
          width={144}
          height={144}
          className="pfp-img size-full object-cover"
        />
      </div>
    </div>
  )
}

/* ── Ticker ──────────────────────────────────────────── */
function Ticker() {
  const ref = usePauseOffscreen<HTMLDivElement>()
  return (
    <div
      className="overflow-hidden whitespace-nowrap"
      style={{ maskImage: 'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)', WebkitMaskImage: 'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)' }}
    >
      <div ref={ref} className="marquee inline-flex gap-6 sm:gap-8">
        {[...ticker, ...ticker].map((t, i) => (
          <span key={i} className="text-sm font-medium text-zinc-400 shrink-0" aria-hidden={i >= ticker.length}>
            {t} <span className="text-zinc-600 mx-2">·</span>
          </span>
        ))}
      </div>
    </div>
  )
}

function Tag({ children, color = '#a1a1aa' }: { children: React.ReactNode; color?: string }) {
  return (
    <span
      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
      style={{ background: color + '1a', color, border: `1px solid ${color}40` }}
    >
      {children}
    </span>
  )
}

function GithubLink({ href, accent, project }: { href: string; accent: string; project: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      // Nine links on the page read "View on GitHub"; the label disambiguates
      // them when they're pulled out of context by a screen reader.
      aria-label={`View ${project} on GitHub`}
      // min-h-11 = 44px, the minimum comfortable touch target.
      className="github-link group/gh inline-flex min-h-11 items-center gap-2 text-sm font-medium text-zinc-300"
      style={{ ['--accent' as string]: accent }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
      View on GitHub
      <span className="gh-arrow">→</span>
    </a>
  )
}

/* ── Editorial Project Entry ──────────────────────────── */
function ProjectEntry({ project, index }: { project: Project; index: number }) {
  // Each entry reveals on its own as it scrolls in — no global stagger, which
  // would leave later cards visibly waiting on a long page.
  const ref = useReveal<HTMLElement>(0)

  return (
    <article
      ref={ref}
      className="project-entry reveal group relative border-t border-white/10 py-8 sm:py-9"
      style={{ ['--accent' as string]: project.accent }}
    >
      {/* Accent rule. On desktop it grows on hover; on touch it's drawn in on
          reveal instead, so phones aren't left with a dead affordance. */}
      <span className="accent-rule absolute -top-px left-0 h-px" style={{ background: project.accent }} />

      <div className="grid grid-cols-12 gap-x-5 gap-y-3">
        {/* index */}
        <div className="col-span-12 sm:col-span-1">
          <span className="entry-index font-mono text-sm tabular-nums text-zinc-500">
            {String(index).padStart(2, '0')}
          </span>
        </div>

        {/* title + description */}
        <div className="col-span-12 sm:col-span-7">
          <p className="text-xs font-medium text-zinc-500 mb-1.5 text-pretty">{project.meta}</p>
          <h3 className="display-serif text-3xl sm:text-4xl text-zinc-100 leading-tight mb-3 flex items-center gap-3 text-balance">
            <span className="entry-icon text-2xl">{project.icon}</span>
            <span>{project.name}</span>
          </h3>
          {project.award && (
            <div
              className="award-badge inline-flex items-center gap-1.5 mb-3 px-3 py-1 rounded-full text-xs font-semibold"
              style={{ color: '#f0cd82', background: 'rgba(224,179,87,0.12)', border: '1px solid rgba(224,179,87,0.35)' }}
            >
              {project.award}
            </div>
          )}
          <p className="text-zinc-400 text-sm sm:text-[15px] leading-relaxed max-w-xl text-pretty">{project.desc}</p>
        </div>

        {/* tech + link */}
        <div className="col-span-12 sm:col-span-4 flex flex-col gap-3 sm:gap-4 sm:items-end">
          <div className="flex flex-wrap gap-2 sm:justify-end">
            {project.tech.map(t => <Tag key={t} color={project.accent}>{t}</Tag>)}
          </div>
          <GithubLink href={project.github} accent={project.accent} project={project.name} />
        </div>
      </div>
    </article>
  )
}

/* ── Editorial Section Header ─────────────────────────── */
function SectionHeader({ title, count }: { title: string; count: string }) {
  const ref = useReveal<HTMLDivElement>(0)
  return (
    <div ref={ref} className="reveal flex items-baseline gap-4 mt-16 mb-2">
      <h2 className="display-serif-i text-3xl sm:text-4xl text-zinc-100 leading-none text-balance">{title}</h2>
      <div className="flex-1 h-px bg-white/15" />
      <span className="text-xs font-mono tabular-nums text-zinc-500 tracking-widest">{count}</span>
    </div>
  )
}

/* ── Main Design ─────────────────────────────────────── */
export default function Design5() {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    // One frame, not a timeout — the hero should start the instant paint is possible.
    const id = requestAnimationFrame(() => setLoaded(true))
    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <div
      className="min-h-dvh bg-black text-zinc-100 relative overflow-x-hidden"
      style={{ fontFamily: '"Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}
    >
      <style>{`
        /* Fonts are linked from index.html, not @import-ed here. An @import
           inside a React-injected <style> isn't discoverable by the preload
           scanner, so the browser only finds it after the bundle has parsed
           and mounted — which stalls first paint on exactly the text you most
           want to see. */

        /* ── Motion tokens ───────────────────────────────
           One vocabulary for the whole page. Durations follow the
           micro / ui / entrance ladder; a single ease-out curve is reused
           everywhere so nothing feels like it came from a different site. */
        :root {
          --dur-micro: 160ms;   /* hover, press */
          --dur-ui:    240ms;   /* state changes */
          --dur-enter: 620ms;   /* section entrances */
          --ease-out:  cubic-bezier(0.16, 1, 0.30, 1);
          --d: 0ms;             /* per-element stagger, set from JS */
        }

        .display-serif   { font-family: 'Instrument Serif', 'Times New Roman', serif; letter-spacing: -0.01em; }
        .display-serif-i { font-family: 'Instrument Serif', 'Times New Roman', serif; font-style: italic; letter-spacing: -0.005em; }

        /* ── Reveal ──────────────────────────────────────
           transform + opacity only. The transition lives on .is-in so the
           initial state never animates and nothing transitions back out. */
        .reveal { opacity: 0; transform: translate3d(0, 18px, 0); }
        .reveal.is-in {
          opacity: 1;
          transform: none;
          transition:
            opacity   var(--dur-enter) var(--ease-out) var(--d),
            transform var(--dur-enter) var(--ease-out) var(--d);
        }

        /* Hero beats — the choreography is photo → name → tagline → tags,
           each one leaning on the same curve so it reads as one movement. */
        .hero-in { opacity: 0; transform: translate3d(0, 20px, 0); }
        .is-loaded .hero-in {
          opacity: 1;
          transform: none;
          transition:
            opacity   var(--dur-enter) var(--ease-out) var(--d),
            transform var(--dur-enter) var(--ease-out) var(--d);
        }
        .is-loaded .hero-b1 { --d:  60ms; }
        .is-loaded .hero-b2 { --d: 140ms; }
        .is-loaded .hero-b3 { --d: 220ms; }
        .is-loaded .hero-b4 { --d: 300ms; }

        /* ── Marquee ─────────────────────────────────────
           translate3d keeps it on the compositor; paused off-screen via the
           parent's animation-play-state so it costs nothing when scrolled past. */
        @keyframes marquee { to { transform: translate3d(-50%, 0, 0); } }
        .marquee { animation: marquee 28s linear infinite; }

        @keyframes spin-slow { to { transform: rotate(360deg); } }
        .pfp-orbit { animation: spin-slow 18s linear infinite; }
        /* Static glows — box-shadow is a paint property, so it's set once and
           never animated. */
        .pfp-star  { box-shadow: 0 0 8px 2px rgba(200,220,255,0.75); }
        .pfp-frame { box-shadow: 0 0 44px -6px rgba(140,175,255,0.28); }

        .pfp-img { transition: transform var(--dur-ui) var(--ease-out); }

        /* Accent rule draws itself in as the entry arrives. scaleX rather than
           an animated width — width would re-layout and repaint every frame,
           scaleX stays on the compositor. Touch devices get this on reveal,
           which is what replaces the old hover-only affordance. */
        .accent-rule {
          width: 100%;
          transform: scaleX(0);
          transform-origin: left center;
          transition: transform var(--dur-enter) var(--ease-out);
        }
        .project-entry.is-in .accent-rule { transform: scaleX(1); }

        .entry-index,
        .entry-icon,
        .gh-arrow,
        .github-link { transition: color var(--dur-micro) var(--ease-out), transform var(--dur-micro) var(--ease-out); }

        /* ── Pointer-only affordances ────────────────────
           Everything below is gated behind a real hover-capable pointer.
           Without this, a tap on a phone latches the hover state and the card
           stays lit until you tap somewhere else. */
        @media (hover: hover) and (pointer: fine) {
          .pfp:hover .pfp-img          { transform: scale(1.06); }
          .project-entry:hover .entry-index { color: var(--accent); }
          .project-entry:hover .entry-icon  { transform: rotate(-6deg) scale(1.1); }
          .github-link:hover                { color: var(--accent); }
          .github-link:hover .gh-arrow      { transform: translateX(4px); }
          .contact-row:hover .contact-arrow { transform: translateX(4px); color: #fafafa; }
          .skill:hover .skill-icon          { transform: translateY(-3px) scale(1.12); }
        }

        /* Touch feedback — press states stand in for hover on a phone. */
        @media (hover: none) {
          .github-link:active,
          .contact-row:active { opacity: 0.65; }
          .skill:active .skill-icon { transform: scale(0.94); }
        }

        .contact-arrow,
        .skill-icon { transition: transform var(--dur-micro) var(--ease-out), color var(--dur-micro) var(--ease-out); }

        /* Champion badge — a slow opacity breath. Opacity is a compositor
           property; the original animated box-shadow, which repaints. */
        @keyframes award-breathe { 0%, 100% { opacity: 0.72; } 50% { opacity: 1; } }
        .award-badge { animation: award-breathe 3.2s ease-in-out infinite; }

        @keyframes status-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.35; } }
        .status-dot { animation: status-pulse 2.4s ease-in-out infinite; }

        /* ── Reduced motion ──────────────────────────────
           Content stays visible; motion becomes instant state. */
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.001ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.001ms !important;
          }
          .reveal, .hero-in { opacity: 1 !important; transform: none !important; }
          .accent-rule { transform: none; }
        }
      `}</style>

      <Starfield />

      <div
        className={`relative z-10 max-w-4xl mx-auto ${loaded ? 'is-loaded' : ''}`}
        style={{
          // Respect the notch/home-indicator on phones rather than assuming a
          // rectangular viewport.
          paddingLeft:  'max(1.25rem, env(safe-area-inset-left))',
          paddingRight: 'max(1.25rem, env(safe-area-inset-right))',
          paddingTop:   'max(3rem, env(safe-area-inset-top))',
          paddingBottom:'max(3rem, env(safe-area-inset-bottom))',
        }}
      >
        {/* ── Hero ─────────────────────────────────── */}
        <header className="flex flex-col sm:flex-row items-center sm:items-start gap-7 pb-10 border-b border-white/10">
          <div className="hero-in hero-b1 shrink-0"><ProfilePhoto /></div>
          <div className="text-center sm:text-left flex-1 min-w-0">
            <div className="hero-in hero-b1 flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-4">
              <span className="status-dot size-2 rounded-full bg-[#9db884]" />
              <span className="text-xs text-zinc-500">Available for opportunities</span>
            </div>
            <h1 className="hero-in hero-b2 display-serif text-5xl sm:text-7xl md:text-8xl mb-4 text-zinc-50 leading-none text-balance">
              Vince <span className="display-serif-i">Loo</span>
            </h1>
            <p className="hero-in hero-b3 text-zinc-400 text-sm sm:text-base max-w-lg leading-relaxed mb-5 text-pretty">
              Data Science &amp; Software Development student at Taylor's University, Malaysia.
              Building cross-platform apps and intelligent systems.
            </p>
            <div className="hero-in hero-b4 flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <Tag color={INDIGO}>Data Science</Tag>
              <Tag color={TERRA}>Software Dev</Tag>
              <Tag color={SAGE}>🎓 Taylor's University</Tag>
              <Tag color="#a1a1aa">Malaysia 🇲🇾</Tag>
            </div>
          </div>
        </header>

        {/* ── Hackathon Projects ───────────────────── */}
        <section>
          <SectionHeader title="Hackathon Projects" count={String(hackathonProjects.length).padStart(2, '0')} />
          {hackathonProjects.map((project, i) => (
            <ProjectEntry key={project.name} project={project} index={i + 1} />
          ))}
        </section>

        {/* ── Side Projects ────────────────────────── */}
        <section>
          <SectionHeader title="Side Projects" count={String(sideProjects.length).padStart(2, '0')} />
          {sideProjects.map((project, i) => (
            <ProjectEntry key={project.name} project={project} index={i + 1} />
          ))}
        </section>

        {/* ── Tech Stack ───────────────────────────── */}
        <section>
          <SectionHeader title="Tech Stack" count={String(skills.length).padStart(2, '0')} />
          <div className="mt-6 mb-8 -mx-1">
            <Ticker />
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-x-4 gap-y-7">
            {skills.map((s, i) => (
              <SkillCell key={s.name} skill={s} index={i} />
            ))}
          </div>
        </section>

        {/* ── Contact ──────────────────────────────── */}
        <section>
          <SectionHeader title="Let's build something" count="05" />
          <p className="text-zinc-500 text-sm mt-4 mb-6 text-pretty">Open to collabs, hackathons, and cool ideas.</p>
          <div className="border-t border-white/10">
            {[
              { icon: 'https://cdn.simpleicons.org/gmail',           label: 'Email',     href: 'mailto:loovincent268@gmail.com',                   val: 'loovincent268@gmail.com' },
              { icon: `${DEVICON}/linkedin/linkedin-original.svg`,   label: 'LinkedIn',  href: 'https://www.linkedin.com/in/vince-loo-82565a31b',  val: 'Vince Loo' },
              { icon: 'https://cdn.simpleicons.org/instagram',       label: 'Instagram', href: 'https://www.instagram.com/vince__loo/',            val: 'vince__loo' },
              { icon: 'https://cdn.simpleicons.org/github/e6e8ec',   label: 'GitHub',    href: 'https://github.com/POTATO0826',                    val: 'POTATO0826' },
              { icon: 'https://cdn.simpleicons.org/whatsapp',        label: 'WhatsApp',  href: 'https://wa.link/4ixpfx',                           val: 'Chat now' },
            ].map(c => (
              <a
                key={c.label}
                href={c.href}
                target="_blank"
                rel="noreferrer"
                // Stacks label over value on phones so long addresses aren't
                // truncated into uselessness; min-h-14 keeps the row tappable.
                className="contact-row flex min-h-14 items-center gap-4 py-3 border-b border-white/10"
              >
                <img src={c.icon} alt="" loading="lazy" width={20} height={20} className="size-5 object-contain shrink-0" />
                <div className="flex-1 min-w-0 sm:flex sm:items-baseline sm:gap-4">
                  <div className="sm:w-24 shrink-0 text-[11px] uppercase tracking-wider text-zinc-500">{c.label}</div>
                  <div className="text-sm font-medium text-zinc-200 truncate">{c.val}</div>
                </div>
                <span className="contact-arrow text-zinc-600 shrink-0">→</span>
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

/* ── Skill Cell ──────────────────────────────────────── */
function SkillCell({ skill, index }: { skill: { name: string; icon: string; desc: string; invert?: boolean }; index: number }) {
  // Stagger within the row only (mod 5), so the grid ripples across rather
  // than accumulating a two-second delay by the last icon.
  const ref = useReveal<HTMLDivElement>(index % 5)
  return (
    <div ref={ref} className="skill reveal flex flex-col items-center gap-2 text-center cursor-default">
      <img
        src={skill.icon}
        alt=""
        loading="lazy"
        width={32}
        height={32}
        className="skill-icon size-8 object-contain"
        style={skill.invert ? { filter: 'invert(1)' } : undefined}
      />
      <span className="font-medium text-sm text-zinc-200">{skill.name}</span>
      <span className="text-xs text-zinc-500 leading-tight text-pretty">{skill.desc}</span>
    </div>
  )
}
