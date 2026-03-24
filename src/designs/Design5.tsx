import { useState, useEffect } from 'react'

// Bento grid modern design with organic shapes and soft gradients

const skills = [
  { name: 'Flutter', icon: '🦋', desc: 'Cross-platform UI' },
  { name: 'React', icon: '⚛️', desc: 'Web interfaces' },
  { name: 'Java', icon: '☕', desc: 'Backend systems' },
  { name: 'Firebase', icon: '🔥', desc: 'Cloud services' },
  { name: 'Dart', icon: '🎯', desc: 'Mobile-first' },
  { name: 'TypeScript', icon: '🔷', desc: 'Type-safe JS' },
  { name: 'Python', icon: '🐍', desc: 'Data & scripts' },
  { name: 'AWS', icon: '☁️', desc: 'Cloud infra' },
]

const ticker = ['Flutter', 'React', 'TypeScript', 'Java', 'Firebase', 'Python', 'AWS', 'Dart', 'Computer Vision', 'Telegram Bots']

function Ticker() {
  return (
    <div className="overflow-hidden whitespace-nowrap" style={{ maskImage: 'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)' }}>
      <div className="inline-flex gap-6 sm:gap-8 animate-marquee">
        {[...ticker, ...ticker].map((t, i) => (
          <span key={i} className="text-sm font-medium text-zinc-500 shrink-0">
            {t} <span className="text-zinc-700 mx-2">·</span>
          </span>
        ))}
      </div>
    </div>
  )
}

function BentoCard({ children, className = '', style = {} }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={`rounded-[1.75rem] p-5 sm:p-6 relative overflow-hidden ${className}`}
      style={{ border: '1px solid rgba(255,255,255,0.06)', ...style }}
    >
      {children}
    </div>
  )
}

function Tag({ children, color = '#fff' }: { children: React.ReactNode; color?: string }) {
  return (
    <span
      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
      style={{ background: color + '22', color, border: `1px solid ${color}33` }}
    >
      {children}
    </span>
  )
}

export default function Design5() {
  const [loaded, setLoaded] = useState(false)
  const [hovered, setHovered] = useState<string | null>(null)

  useEffect(() => { setTimeout(() => setLoaded(true), 100) }, [])

  return (
    <div className="min-h-screen bg-[#0d0d0f] text-white" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
      <style>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { animation: marquee 25s linear infinite; }
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-8px); } }
        .animate-float { animation: float 4s ease-in-out infinite; }
        @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
      `}</style>

      <div className="max-w-5xl mx-auto px-4 sm:px-5 py-8 sm:py-12">
        {/* Nav */}
        <nav className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8 sm:mb-12">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm"
              style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
              VL
            </div>
            <span className="font-semibold text-sm">Vince Loo</span>
          </div>
          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
            <a href="https://github.com/POTATO0826" target="_blank" rel="noreferrer"
              className="px-4 py-2 rounded-full text-center text-xs font-medium text-zinc-400 hover:text-white transition-colors"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
              GitHub ↗
            </a>
            <a href="mailto:loovincent268@gmail.com"
              className="px-4 py-2 rounded-full text-center text-xs font-medium text-white transition-colors"
              style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
              Contact
            </a>
          </div>
        </nav>

        {/* Bento Grid */}
        <div
          className={`grid gap-4 transition-all duration-700 ${loaded ? 'opacity-100' : 'opacity-0 translate-y-4'}`}
          style={{
            gridTemplateColumns: 'repeat(12, 1fr)',
            gridTemplateRows: 'auto',
          }}
        >
          {/* Hero card — large */}
          <BentoCard
            className="col-span-12 md:col-span-8"
            style={{ background: 'linear-gradient(135deg, #1a1033 0%, #0d1a2e 100%)' }}
          >
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-20"
                style={{ background: 'radial-gradient(circle, #6366f1, transparent)' }} />
              <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full opacity-15"
                style={{ background: 'radial-gradient(circle, #8b5cf6, transparent)' }} />
            </div>
            <div className="relative z-10">
              <div className="flex flex-wrap items-center gap-2 mb-5 sm:mb-6">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs text-zinc-500">Available for opportunities</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-3 leading-[0.95] sm:leading-tight">
                Vince<br />
                <span style={{ background: 'linear-gradient(135deg, #6366f1 0%, #a78bfa 50%, #ec4899 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Loo
                </span>
              </h1>
              <p className="text-zinc-400 text-sm sm:text-[15px] max-w-md leading-relaxed mb-6">
                Data Science & Software Development student at Taylor's University.
                Building cross-platform apps and intelligent systems.
              </p>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <Tag color="#6366f1">Data Science</Tag>
                <Tag color="#8b5cf6">Software Dev</Tag>
                <Tag color="#ec4899">Malaysia 🇲🇾</Tag>
              </div>
            </div>
          </BentoCard>

          {/* Status card */}
          <BentoCard
            className="col-span-12 md:col-span-4 flex flex-col justify-between"
            style={{ background: 'linear-gradient(135deg, #0f1f0f, #0a1a1a)' }}
          >
            <div>
              <div className="text-3xl mb-4 animate-float">🎓</div>
              <h3 className="font-bold text-lg mb-2">Taylor's University</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Malaysia · Data Science & Software Engineering
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/5">
              <div className="flex items-center justify-between text-xs text-zinc-600">
                <span>2 Hackathons</span>
                <span className="text-green-400">Active</span>
              </div>
            </div>
          </BentoCard>

          {/* Project 1 */}
          <a
            href="https://github.com/yapzhanquan/KitahackTaygood"
            target="_blank"
            rel="noreferrer"
            className="col-span-12 md:col-span-6 block group"
            onMouseEnter={() => setHovered('p1')}
            onMouseLeave={() => setHovered(null)}
          >
            <BentoCard
              className="h-full transition-all duration-300 group-hover:scale-[1.01]"
              style={{
                background: hovered === 'p1'
                  ? 'linear-gradient(135deg, #1e1040, #0e1f40)'
                  : 'linear-gradient(135deg, #16112e, #0c1830)',
                gridColumn: 'span 6',
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-lg"
                    style={{ background: 'rgba(99,102,241,0.2)' }}>
                    ⌚
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 font-medium">KitaHack · Malaysia 🇲🇾</p>
                    <h3 className="font-bold text-base">ProjekWatch</h3>
                  </div>
                </div>
                <span className="text-zinc-600 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-lg">↗</span>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                Cross-platform Flutter productivity app. Runs natively on Android, iOS, Web, and Desktop — all from a single codebase.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Flutter', 'Dart', 'Firebase'].map(t => (
                  <Tag key={t} color="#6366f1">{t}</Tag>
                ))}
              </div>
            </BentoCard>
          </a>

          {/* Project 2 */}
          <a
            href="https://github.com/yapzhanquan/SkyClaw"
            target="_blank"
            rel="noreferrer"
            className="col-span-12 md:col-span-6 block group"
            onMouseEnter={() => setHovered('p2')}
            onMouseLeave={() => setHovered(null)}
          >
            <BentoCard
              className="h-full transition-all duration-300 group-hover:scale-[1.01]"
              style={{
                background: hovered === 'p2'
                  ? 'linear-gradient(135deg, #1a1010, #0d1a10)'
                  : 'linear-gradient(135deg, #160e0e, #0b160d)',
                gridColumn: 'span 6',
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-lg"
                    style={{ background: 'rgba(16,185,129,0.15)' }}>
                    🚁
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 font-medium">LotusHack · Vietnam 🇻🇳</p>
                    <h3 className="font-bold text-base">SkyClaw</h3>
                  </div>
                </div>
                <span className="text-zinc-600 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-lg">↗</span>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                Drone surveillance system integrating computer vision, live web dashboard, and a Telegram bot for remote alerts — hosted on AWS VPS.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Python', 'Computer Vision', 'Telegram', 'AWS'].map(t => (
                  <Tag key={t} color="#10b981">{t}</Tag>
                ))}
              </div>
            </BentoCard>
          </a>

          {/* Skills ticker */}
          <BentoCard
            className="col-span-12 py-4"
            style={{ background: 'rgba(255,255,255,0.02)', padding: '16px 0' }}
          >
            <Ticker />
          </BentoCard>

          {/* Skills grid */}
          <BentoCard
            className="col-span-12 md:col-span-8"
            style={{ background: '#111113' }}
          >
            <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest mb-5">Tech Stack</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {skills.map((s, i) => (
                <div
                  key={i}
                  className="group flex flex-col items-center gap-2 p-3 rounded-2xl cursor-default transition-all hover:bg-white/5"
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform">{s.icon}</span>
                  <span className="font-medium text-sm">{s.name}</span>
                  <span className="text-xs text-zinc-600">{s.desc}</span>
                </div>
              ))}
            </div>
          </BentoCard>

          {/* Contact card */}
          <BentoCard
            className="col-span-12 md:col-span-4 flex flex-col justify-between"
            style={{ background: 'linear-gradient(135deg, #1a0e33, #0e0e1a)' }}
          >
            <div>
              <h3 className="font-bold text-lg mb-2">Let's build something</h3>
              <p className="text-zinc-500 text-sm mb-6">Open to collabs, hackathons, and cool ideas.</p>
            </div>
            <div className="space-y-3">
              {[
                { icon: '✉️', label: 'Email', href: 'mailto:loovincent268@gmail.com', val: 'Send a mail' },
                { icon: '🐙', label: 'GitHub', href: 'https://github.com/POTATO0826', val: 'POTATO0826' },
                { icon: '💬', label: 'WhatsApp', href: 'https://wa.link/4ixpfx', val: 'Chat now' },
              ].map(c => (
                <a
                  key={c.label}
                  href={c.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 py-2 group hover:opacity-80 transition-opacity"
                >
                  <span className="text-lg">{c.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-zinc-600">{c.label}</div>
                    <div className="text-sm font-medium truncate">{c.val}</div>
                  </div>
                  <span className="text-zinc-700 group-hover:text-white transition-colors">→</span>
                </a>
              ))}
            </div>
          </BentoCard>
        </div>

      </div>
    </div>
  )
}
