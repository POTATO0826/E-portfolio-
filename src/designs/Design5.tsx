import { useState, useEffect, useRef } from 'react'
import Starfield from '../components/Starfield'
import { InfiniteSlider } from '../components/InfiniteSlider'
import { PixelDissolve } from '../components/PixelDissolve'
import { GithubHeatmap } from '../components/GithubHeatmap'
import { DeskStickers } from '../components/DeskStickers'
import { skills, ticker } from '../data/skills'
import { profile, contacts } from '../data/profile'
import {
  hackathonProjects,
  sideProjects,
  type Project,
} from '../data/projects'

// Dark editorial portfolio on a plain black ground.
//
// Page order is deliberate: who → proof of work (the contribution graph) →
// what he builds with → the projects themselves. Contact lives in the header
// as icons, the way a profile page does it. Projects sit low because the
// heatmap already establishes credibility above the fold; the long list is
// for the reader who is already interested.
//
// Motion system (per animation-systems + fixing-motion-performance):
//   · tokens live in CSS custom properties (--dur-*, --ease-*) so every surface
//     shares one vocabulary instead of ad-hoc durations
//   · reveals are IntersectionObserver-driven and fire ONCE — never scroll-polled
//   · only transform + opacity are animated; no layout or paint properties
//   · every hover effect is behind @media (hover: hover) so phones don't get
//     stuck in a hover state after a tap
//   · prefers-reduced-motion collapses everything to instant

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
   A spinning ring keeps burning compositor work while it's scrolled out of
   view. Toggle animation-play-state from an observer instead of leaving it
   running for the whole session.                                            */
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
      {/* Hairline orbit with a single travelling star. Against a starfield one
          cool hairline and one point of light belongs to the same picture.
          Rotation is transform-only and stops once the hero scrolls off. */}
      <div ref={orbitRef} className="pfp-orbit absolute -inset-2 rounded-full border border-white/10">
        <span className="pfp-star absolute left-1/2 top-0 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
      </div>

      <div className="pfp-frame relative size-24 sm:size-36 rounded-full overflow-hidden border border-white/20">
        <img
          src="/PFP.jpeg"
          alt={profile.name}
          width={144}
          height={144}
          sizes="(min-width: 640px) 144px, 96px"
          draggable={false}
          className="pfp-img size-full object-cover select-none"
        />
      </div>
    </div>
  )
}

/* ── Ticker ──────────────────────────────────────────────
   InfiniteSlider duplicates its children itself and gates on useInView, so
   there's no manual clone and no off-screen hook here. The mask fade is kept:
   upstream has no edge treatment and the raw cut looked wrong against the
   starfield.

   The whole strip is aria-hidden. It's decoration that repeats what the Tech
   Stack grid below already lists properly, and InfiniteSlider's internal clone
   can't be labelled, so hiding it beats announcing every skill twice.        */
function Ticker() {
  return (
    <div
      aria-hidden="true"
      className="overflow-hidden"
      style={{ maskImage: 'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)', WebkitMaskImage: 'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)' }}
    >
      <InfiniteSlider gap={28} speed={40} speedOnHover={12}>
        {ticker.map(t => (
          <span key={t} className="text-sm font-medium text-zinc-400 whitespace-nowrap">
            {t} <span className="text-zinc-600 mx-2">·</span>
          </span>
        ))}
      </InfiniteSlider>
    </div>
  )
}

/* Hero chip — dashed hairline, mono caps, no fill. The hover lift is gated
   to real pointers like everything else on the page. */
function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="hero-chip inline-flex items-center rounded-full border border-dashed border-white/20 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-300">
      {children}
    </span>
  )
}

/* Tech chip — same dashed-hairline, mono-caps language as the hero chips. Rests
   in grey; on row hover it brightens to white with the rest of the entry. */
function TechChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="tech-chip inline-flex items-center rounded-full border border-dashed border-white/15 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-zinc-400">
      {children}
    </span>
  )
}

/* ── Notebook list ─────────────────────────────────────────
   Projects as lines on a ruled page, written in as they scroll into view —
   number first, then title, date line, chips, arrow, each a beat behind the
   last, the way a hand fills a ledger. A solid margin rule runs down the left
   with the entry numbers sitting in the margin, every entry rests on its own
   faint rule, and the sheet itself reads as paper: a plain near-black stock
   with a faint grain, ruled lines running the full height, a grey margin
   rule, three punch holes, two strips of tape, and a hair of rotation so it
   sits on the page rather than in the grid. Deliberately monochrome. Solid
   rules here, dashed everywhere else — paper is a different surface from the
   page chrome.                                                             */
function NotebookList({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="paper relative mt-10">
      {/* two strips of tape hold the sheet to the page */}
      <span aria-hidden="true" className="tape absolute -top-3 left-8 h-6 w-24 -rotate-3" />
      <span aria-hidden="true" className="tape absolute -top-2.5 right-10 h-6 w-20 rotate-2 hidden sm:block" />

      {/* punch holes, in the margin gutter */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 hidden w-[3.5rem] sm:block">
        {['14%', '50%', '86%'].map(top => (
          <span key={top} className="punch absolute left-2.5 size-3 -translate-y-1/2 rounded-full" style={{ top }} />
        ))}
      </div>

      {/* ledger heading: sits in the margin grid like an entry, so the rules line up */}
      <div className="grid grid-cols-[2.75rem_1fr_2rem] sm:grid-cols-[3.5rem_1fr_2.5rem]" aria-hidden="true">
        <div className="margin-rule py-3" />
        <div className="py-3 pl-3 sm:pl-5 font-mono text-[10px] uppercase leading-relaxed tracking-[0.16em] text-zinc-500 text-pretty">{label}</div>
        <div />
      </div>
      <ol className="border-t border-white/10">{children}</ol>
    </div>
  )
}

/* One ruled line of the notebook. The whole row is the link; the ↗ in the
   right gutter is the only hint until hover, when the margin number, the
   chips and the arrow brighten and the top rule draws in. */
function ProjectEntry({ project, index }: { project: Project; index: number }) {
  // Each entry reveals on its own as it scrolls in — no global stagger, which
  // would leave later rows visibly waiting on a long page.
  const ref = useReveal<HTMLLIElement>(0)

  return (
    <li ref={ref} className={`project-entry reveal relative border-b border-white/10${project.award ? ' is-winner' : ''}`}>
      {/* Top rule draws in on reveal (scaleX, compositor-only). Neutral white
          rather than the project accent — the ledger is monochrome. */}
      <span className="accent-rule absolute -top-px left-0 h-px" />

      <a
        href={project.github}
        target="_blank"
        rel="noreferrer"
        aria-label={`View ${project.name} on GitHub`}
        className="entry-link grid grid-cols-[2.75rem_1fr_2rem] sm:grid-cols-[3.5rem_1fr_2.5rem] outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
      >
        {/* margin: number sits against the margin rule */}
        <div className="margin-rule flex justify-end pr-2.5 sm:pr-3 pt-5">
          <span className="entry-index entry-beat font-mono text-xs sm:text-sm tabular-nums text-zinc-500" style={{ ['--b' as string]: '0ms' }}>№ {String(index).padStart(2, '0')}</span>
        </div>

        {/* body */}
        <div className="min-w-0 py-4 pl-3 sm:pl-5">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h3 style={{ ['--b' as string]: '90ms' }} className="entry-beat display-serif text-2xl sm:text-3xl text-zinc-100 leading-tight flex items-center gap-2.5 text-balance">
              <span className="entry-icon text-xl sm:text-2xl">{project.icon}</span>
              <span>{project.name}</span>
            </h3>
            <span className="entry-beat text-xs text-zinc-500" style={{ ['--b' as string]: '180ms' }}>{project.meta}</span>
          </div>
          <div className="entry-beat mt-2.5 flex flex-wrap items-center gap-2" style={{ ['--b' as string]: '270ms' }}>
            {project.award && (
              <span className="award-badge inline-flex items-center rounded-full px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em]"
                    style={{ color: '#f0cd82', border: '1px solid rgba(224,179,87,0.45)', background: 'rgba(224,179,87,0.08)' }}>
                {project.award}
              </span>
            )}
            {project.tech.map(t => <TechChip key={t}>{t}</TechChip>)}
          </div>
        </div>

        {/* right gutter */}
        <div className="flex items-start justify-center pt-5">
          <span className="entry-arrow entry-beat font-mono text-base leading-none text-zinc-600" aria-hidden="true" style={{ ['--b' as string]: '360ms' }}>↗</span>
        </div>
      </a>
    </li>
  )
}

/* ── Editorial Section Header ─────────────────────────── */
function SectionHeader({ title, count, id }: { title: string; count: string; id?: string }) {
  const ref = useReveal<HTMLDivElement>(0)
  return (
    // `.section-heading` draws the dashed band (see index.css). No separate
    // hairline — the band already rules the edge, and doubling them breaks
    // the one-border-per-edge rule. The negative margin bleeds the band out
    // to the column edges so it reads as a full-width rule.
    <div
      ref={ref}
      id={id}
      className="reveal section-heading flex items-baseline gap-4 mt-16 mb-2 -mx-5 px-5 py-2 scroll-mt-6"
    >
      <h2 className="display-serif-i text-3xl sm:text-4xl text-zinc-100 leading-none text-balance">{title}</h2>
      <div className="flex-1" />
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

        /* Entry beats — pieces of a notebook row arrive left-to-right in
           sequence once the row itself is in view. --b is the per-piece delay,
           set inline; transform + opacity only. */
        .entry-beat { opacity: 0; transform: translate3d(-10px, 0, 0); }
        .project-entry.is-in .entry-beat {
          opacity: 1;
          transform: none;
          transition:
            opacity   var(--dur-enter) var(--ease-out) var(--b, 0ms),
            transform var(--dur-enter) var(--ease-out) var(--b, 0ms);
        }

        /* Hero beats — the choreography is stickers → name → tagline → tags,
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

        @keyframes spin-slow { to { transform: rotate(360deg); } }
        .pfp-orbit { animation: spin-slow 18s linear infinite; }
        /* Static glows — box-shadow is a paint property, so it's set once and
           never animated. */
        .pfp-star  { box-shadow: 0 0 8px 2px rgba(200,220,255,0.75); }
        .pfp-frame { box-shadow: 0 0 44px -6px rgba(140,175,255,0.28); }

        /* Accent rule draws itself in as the entry arrives. scaleX rather than
           an animated width — width would re-layout and repaint every frame,
           scaleX stays on the compositor. Touch devices get this on reveal,
           which is what replaces the old hover-only affordance. */
        .accent-rule {
          z-index: 1;
          width: 100%;
          transform: scaleX(0);
          transform-origin: left center;
          transition: transform var(--dur-enter) var(--ease-out);
        }
        .project-entry.is-in .accent-rule { transform: scaleX(1); }
        .accent-rule { background: rgba(255,255,255,0.4); }

        /* Gold is the one colour the ledger allows, and only on rows that
           carry an award: the margin number, the top rule, and the stamp. */
        .is-winner .accent-rule  { background: #e0b357; }
        .is-winner .entry-index  { color: #e0b357; }
        .is-winner .entry-arrow  { color: rgba(224,179,87,0.6); }

        .entry-index,
        .entry-icon,
        .entry-arrow,
        .tech-chip { transition: color var(--dur-micro) var(--ease-out), border-color var(--dur-micro) var(--ease-out), transform var(--dur-micro) var(--ease-out); }

        /* ── Pointer-only affordances ────────────────────
           Everything below is gated behind a real hover-capable pointer.
           Without this, a tap on a phone latches the hover state and the card
           stays lit until you tap somewhere else. */
        @media (hover: hover) and (pointer: fine) {
          /* Row wash is a small, local surface, so a non-animated background
             change is fine; everything that moves is still transform/colour. */
          .project-entry:hover .entry-link  { background: rgba(255,255,255,0.025); }
          /* Monochrome by request: hover brightens to white. Awarded rows are the
             exception and keep their gold (rules below). */
          .project-entry:hover .entry-index { color: #fafafa; }
          .is-winner:hover .entry-index     { color: #f0cd82; }
          .is-winner:hover .entry-arrow     { color: #f0cd82; }
          .project-entry:hover .entry-icon  { transform: rotate(-6deg) scale(1.1); }
          .project-entry:hover .entry-arrow { transform: translate(3px, -3px); color: #fafafa; }
          .project-entry:hover .tech-chip   { color: #e4e4e7; border-color: rgba(255,255,255,0.4); }
          .hero-chip:hover                  { border-color: rgba(255,255,255,0.5); color: #fafafa; transform: translateY(-1px); }
          .contact-icon:hover               { border-color: rgba(255,255,255,0.45); transform: translateY(-2px); }
          .skill:hover .skill-icon          { transform: translateY(-3px) scale(1.12); }
        }

        /* Touch feedback — press states stand in for hover on a phone. */
        @media (hover: none) {
          .project-entry:active,
          .contact-icon:active { opacity: 0.65; }
          .skill:active .skill-icon { transform: scale(0.94); }
        }

        .hero-chip { transition: border-color var(--dur-micro) var(--ease-out), color var(--dur-micro) var(--ease-out), transform var(--dur-micro) var(--ease-out); }

        .skill-icon { transition: transform var(--dur-micro) var(--ease-out), color var(--dur-micro) var(--ease-out); }

        /* Champion badge — a slow opacity breath. Opacity is a compositor
           property; the original animated box-shadow, which repaints. */
        @keyframes award-breathe { 0%, 100% { opacity: 0.72; } 50% { opacity: 1; } }
        .award-badge { animation: award-breathe 3.2s ease-in-out infinite; }

        /* ── Reduced motion ──────────────────────────────
           Content stays visible; motion becomes instant state. */
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.001ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.001ms !important;
          }
          .reveal, .hero-in, .entry-beat { opacity: 1 !important; transform: none !important; }
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
          paddingTop:   'max(2rem, env(safe-area-inset-top))',
          paddingBottom:'max(3rem, env(safe-area-inset-bottom))',
        }}
      >
        {/* ── Hero ─────────────────────────────────────
            Centred stack: the sticker collage with the photo set into its
            bottom edge, then name, tagline, tags. The old photo-left /
            text-right split didn't leave the collage any room. */}
        {/* Two columns from sm up: the sticker stage with the photo at its
            centre on the left, the words on the right. Stacked and centred on
            phones. */}
        {/* X-style profile header: a full-width banner (the sticker collage)
            with the photo hanging off its bottom-left corner, then name,
            handle and bio left-aligned beneath. */}
        <header className="pb-12 border-b border-dashed border-white/10">
          <div className="hero-in hero-b1">
            <DeskStickers>
              <ProfilePhoto />
            </DeskStickers>
          </div>

          {/* Contact as icons only, right-aligned under the banner where X puts
              its action buttons. The row's min-height is what clears the photo
              overhanging the banner on the left. */}
          <div className="hero-in hero-b1 ml-[7.5rem] flex min-h-[4.75rem] flex-wrap items-start justify-end gap-1.5 pt-3 sm:ml-0 sm:min-h-[5.75rem] sm:gap-2">
            {contacts.map(c => (
              <a
                key={c.label}
                href={c.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`${c.label}: ${c.val}`}
                title={c.label}
                className="contact-icon micro-transition grid size-9 place-items-center rounded-full border border-dashed border-white/15 sm:size-10"
              >
                <img src={c.icon} alt="" width={18} height={18} loading="lazy" className="size-[18px] object-contain" />
              </a>
            ))}
          </div>

          <div className="pl-1">
            <h1 className="hero-in hero-b2 display-serif text-5xl sm:text-6xl md:text-7xl mb-2 text-zinc-50 leading-[0.95] text-balance">
              Vince <span className="display-serif-i">Loo</span>
            </h1>
            <p className="hero-in hero-b2 font-mono text-xs text-zinc-500 mb-4">
              @{profile.handle} <span className="mx-1.5 text-zinc-700">·</span> {profile.location}
            </p>
            <p className="hero-in hero-b3 text-zinc-300 text-base sm:text-lg max-w-xl leading-relaxed mb-6 text-pretty">
              {profile.headline}
            </p>
            {/* Hero chips: one quiet monochrome treatment. Dashed hairline +
                mono caps ties them to the section bands. */}
            <div className="hero-in hero-b4 flex flex-wrap items-center gap-2">
              {['Data Science', 'Software Dev', '🌙 Night Owl'].map(label => (
                <Chip key={label}>{label}</Chip>
              ))}
            </div>
          </div>
        </header>

        {/* ── GitHub Activity ──────────────────────────
            First thing after the name: a year of commits is the most honest
            "about me" there is. */}
        <section>
          <SectionHeader title="GitHub Activity" count="12 MO" id="activity" />
          <div className="mt-6">
            <GithubHeatmap />
          </div>
        </section>

        {/* ── Tech Stack ───────────────────────────── */}
        <section>
          <SectionHeader title="Tech Stack" count={String(skills.length).padStart(2, '0')} id="stack" />
          <div className="mt-6 mb-8 -mx-1">
            <Ticker />
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-x-4 gap-y-7">
            {skills.map((s, i) => (
              <SkillCell key={s.name} skill={s} index={i} />
            ))}
          </div>
        </section>

        {/* ── Hackathon Projects ───────────────────── */}
        <section>
          <SectionHeader title="Vince's Hackathon Journey" count={String(hackathonProjects.length).padStart(2, '0')} id="hackathons" />
          <NotebookList label="Field notes · eight hackathons entered, these four placed · 2026">
            {hackathonProjects.map((project, i) => (
              <ProjectEntry key={project.name} project={project} index={i + 1} />
            ))}
          </NotebookList>
        </section>

        {/* ── Side Projects ────────────────────────── */}
        <section>
          <SectionHeader title="Vince's Side Hustle" count={String(sideProjects.length).padStart(2, '0')} id="side" />
          <NotebookList label="Field notes · built for fun, shipped anyway">
            {sideProjects.map((project, i) => (
              <ProjectEntry key={project.name} project={project} index={i + 1} />
            ))}
          </NotebookList>
        </section>

      </div>

      {/* Fixed bottom band — content dissolves into pixels at the screen edge
          rather than just running out. Sits outside the padded column so it
          spans the full viewport width. */}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-20 h-10">
        <PixelDissolve />
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
