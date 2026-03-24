import { useEffect, useState, useRef } from 'react'

// Design 4: Dark Swiss / Architectural — hairline grid on black, amber accent, sharp edges.
// Merges Design 2 (editorial grid structure, typographic hierarchy) with Design 5 (dark tone).

const EMAIL = 'loovincent268@gmail.com'

const projects = [
  {
    num: '01',
    name: 'ProjekWatch',
    event: 'KitaHack — Malaysia',
    desc: 'Cross-platform Flutter productivity app. Single codebase targeting Android, iOS, Web, and Desktop. Built at KitaHack, Malaysia\'s national student hackathon.',
    tags: ['Flutter', 'Dart', 'Firebase'],
    link: 'https://github.com/yapzhanquan/KitahackTaygood',
  },
  {
    num: '02',
    name: 'SkyClaw',
    event: 'LotusHack — Vietnam',
    desc: 'Drone surveillance system combining computer vision, a live web dashboard, and a Telegram bot. Deployed on AWS VPS for real-time remote monitoring and alerts.',
    tags: ['Python', 'Computer Vision', 'Telegram', 'AWS'],
    link: 'https://github.com/yapzhanquan/SkyClaw',
  },
]

const stack = [
  'Flutter', 'Dart', 'React', 'TypeScript', 'Java', 'Firebase', 'Python', 'AWS',
]

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } }, { threshold })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, visible } = useInView()
  return (
    <div
      ref={ref}
      className={className}
      style={{
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(20px)',
      }}
    >
      {children}
    </div>
  )
}

export default function Design4() {
  const [loaded, setLoaded] = useState(false)
  const [hov, setHov] = useState<string | null>(null)

  useEffect(() => { setTimeout(() => setLoaded(true), 100) }, [])

  return (
    <div
      className="min-h-screen bg-[#080808] text-white"
      style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
    >
      {/* Hairline grid overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#080808]/90 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-6 h-6 bg-[#f59e0b]" />
            <span className="font-black text-xs tracking-[0.2em] uppercase">VL</span>
          </div>
          <div className="flex items-center gap-8 text-[11px] tracking-[0.2em] uppercase text-white/30">
            <a href="#work" className="hover:text-white transition-colors">Work</a>
            <a href="#stack" className="hover:text-white transition-colors">Stack</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      <div className="relative z-10 max-w-6xl mx-auto px-8">

        {/* Hero */}
        <section className="pt-28 pb-20 border-b border-white/5">
          <div
            className="transition-all duration-700"
            style={{ opacity: loaded ? 1 : 0, transform: loaded ? 'none' : 'translateY(24px)' }}
          >
            <div className="flex items-center gap-4 mb-10">
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-[10px] tracking-[0.35em] uppercase text-white/30">Portfolio 2024</span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            <div className="grid grid-cols-12 gap-6 items-end">
              <div className="col-span-12 md:col-span-9">
                <h1
                  className="font-black leading-none tracking-tighter uppercase"
                  style={{ fontSize: 'clamp(3.5rem, 13vw, 11rem)', color: 'rgba(255,255,255,0.92)' }}
                >
                  Vince<br />
                  <span style={{ color: '#f59e0b' }}>Loo</span>
                </h1>
              </div>
              <div className="col-span-12 md:col-span-3 pb-2 md:border-l border-white/5 md:pl-6">
                <p className="text-white/40 text-sm leading-relaxed">
                  Data Science & Software Development student at Taylor's University, Malaysia.
                </p>
                <div className="flex items-center gap-2 mt-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#f59e0b] animate-pulse" />
                  <span className="text-[10px] tracking-widest text-[#f59e0b]/70 uppercase">Available</span>
                </div>
              </div>
            </div>

            {/* Metrics row */}
            <div className="grid grid-cols-3 border border-white/5 mt-12 divide-x divide-white/5">
              {[
                { val: '2', label: 'International Hackathons' },
                { val: '8+', label: 'Technologies' },
                { val: '5+', label: 'Deployment Platforms' },
              ].map((s, i) => (
                <div key={i} className="p-6 group hover:bg-white/[0.02] transition-colors">
                  <div className="font-black text-3xl md:text-4xl text-[#f59e0b] mb-1">{s.val}</div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-white/25">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Work */}
        <section id="work" className="py-20 border-b border-white/5">
          <FadeIn>
            <div className="flex items-baseline justify-between mb-0 pb-3 border-b border-white/5">
              <span className="text-[10px] tracking-[0.3em] uppercase text-white/25">Selected Work</span>
              <span className="text-[10px] text-white/15">Hackathon Projects</span>
            </div>
          </FadeIn>

          {projects.map((p, i) => (
            <FadeIn key={i} delay={i * 80}>
              <a
                href={p.link}
                target="_blank"
                rel="noreferrer"
                className="group grid grid-cols-12 gap-6 items-start py-10 border-b border-white/5 transition-all duration-300"
                style={{ background: hov === p.num ? 'rgba(245,158,11,0.03)' : 'transparent' }}
                onMouseEnter={() => setHov(p.num)}
                onMouseLeave={() => setHov(null)}
              >
                {/* Num */}
                <div className="col-span-1">
                  <span className="font-black text-white/10 group-hover:text-[#f59e0b]/30 transition-colors" style={{ fontSize: '2.5rem', lineHeight: 1 }}>
                    {p.num}
                  </span>
                </div>
                {/* Title */}
                <div className="col-span-11 md:col-span-4">
                  <h3 className="font-black text-2xl md:text-3xl uppercase tracking-tight text-white/85 group-hover:text-white transition-colors leading-none mb-2">
                    {p.name}
                  </h3>
                  <p className="text-[10px] tracking-[0.25em] uppercase text-white/25 group-hover:text-[#f59e0b]/60 transition-colors">
                    {p.event}
                  </p>
                </div>
                {/* Desc */}
                <div className="col-span-12 md:col-span-5">
                  <p className="text-sm text-white/40 group-hover:text-white/60 leading-relaxed mb-4 transition-colors">{p.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {p.tags.map(t => (
                      <span
                        key={t}
                        className="text-[10px] px-2 py-0.5 uppercase tracking-widest border transition-colors"
                        style={{
                          borderColor: hov === p.num ? 'rgba(245,158,11,0.3)' : 'rgba(255,255,255,0.08)',
                          color: hov === p.num ? 'rgba(245,158,11,0.8)' : 'rgba(255,255,255,0.25)',
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                {/* Arrow */}
                <div className="col-span-12 md:col-span-2 flex md:justify-end">
                  <span className="text-white/15 group-hover:text-[#f59e0b] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all text-2xl">↗</span>
                </div>
              </a>
            </FadeIn>
          ))}
        </section>

        {/* Stack */}
        <section id="stack" className="py-20 border-b border-white/5">
          <FadeIn>
            <span className="text-[10px] tracking-[0.3em] uppercase text-white/25 block mb-8">Tech Stack</span>
            <div className="grid grid-cols-4 md:grid-cols-8 border border-white/5 divide-x divide-y divide-white/5">
              {stack.map((s) => (
                <div
                  key={s}
                  className="py-5 px-3 text-center cursor-default hover:bg-[#f59e0b] group transition-all duration-300"
                >
                  <span className="text-xs font-semibold uppercase tracking-wider text-white/40 group-hover:text-[#080808] transition-colors">{s}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </section>

        {/* Contact */}
        <section id="contact" className="py-20">
          <FadeIn>
            <span className="text-[10px] tracking-[0.3em] uppercase text-white/25 block mb-8">Contact</span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-white/5 divide-y md:divide-y-0 md:divide-x divide-white/5">
              {[
                { label: 'Email', val: EMAIL, href: `mailto:${EMAIL}` },
                { label: 'GitHub', val: 'POTATO0826', href: 'https://github.com/POTATO0826' },
                { label: 'WhatsApp', val: 'wa.link/4ixpfx', href: 'https://wa.link/4ixpfx' },
              ].map(c => (
                <a
                  key={c.label}
                  href={c.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group p-8 hover:bg-[#f59e0b] transition-all duration-300"
                >
                  <div className="text-[10px] tracking-[0.3em] uppercase text-white/25 group-hover:text-[#080808]/50 mb-3 transition-colors">{c.label}</div>
                  <div className="font-semibold text-sm text-white/70 group-hover:text-[#080808] transition-colors flex items-center gap-2 break-all">
                    {c.val}
                    <span className="shrink-0 group-hover:translate-x-0.5 transition-transform">↗</span>
                  </div>
                </a>
              ))}
            </div>
          </FadeIn>
        </section>
      </div>

      {/* Footer */}
      <div className="relative z-10 border-t border-white/5 py-5 text-center">
        <a href="/" className="text-[11px] tracking-[0.25em] uppercase text-white/20 hover:text-white/50 transition-colors">← Back to Selector</a>
      </div>
    </div>
  )
}
