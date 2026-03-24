import { useEffect, useState } from 'react'

// Design 3: Dark Bento — Design 5 aesthetic with teal/cyan accent palette
// Asymmetric bento layout, animated gradient borders on hover, ticker strip

const EMAIL = 'loovincent268@gmail.com'

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
    <div className="overflow-hidden whitespace-nowrap py-4 px-6" style={{ maskImage: 'linear-gradient(90deg, transparent, black 8%, black 92%, transparent)' }}>
      <div className="inline-flex gap-8" style={{ animation: 'ticker 22s linear infinite' }}>
        {[...ticker, ...ticker].map((t, i) => (
          <span key={i} className="text-xs font-medium text-[#4dd9c0]/60 shrink-0 uppercase tracking-widest">
            {t} <span className="text-[#2a5c54] mx-2">◆</span>
          </span>
        ))}
      </div>
    </div>
  )
}

function Card({ children, className = '', style = {}, glow = false }: {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  glow?: boolean
}) {
  return (
    <div
      className={`rounded-2xl overflow-hidden relative ${className}`}
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.07)',
        boxShadow: glow ? '0 0 0 1px rgba(77,217,192,0.15), 0 8px 40px rgba(0,0,0,0.5)' : '0 4px 24px rgba(0,0,0,0.4)',
        ...style,
      }}
    >
      {children}
    </div>
  )
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
      style={{ background: 'rgba(77,217,192,0.1)', color: '#4dd9c0', border: '1px solid rgba(77,217,192,0.2)' }}
    >
      {children}
    </span>
  )
}

export default function Design3() {
  const [loaded, setLoaded] = useState(false)
  const [hov, setHov] = useState<string | null>(null)

  useEffect(() => { setTimeout(() => setLoaded(true), 100) }, [])

  return (
    <div className="min-h-screen text-white" style={{ background: '#080c0c', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <style>{`
        @keyframes ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes pulse-ring { 0%, 100% { box-shadow: 0 0 0 0 rgba(77,217,192,0.4); } 50% { box-shadow: 0 0 0 8px rgba(77,217,192,0); } }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
      `}</style>

      <div className="max-w-5xl mx-auto px-5 py-12">

        {/* Nav */}
        <nav className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm text-[#080c0c]"
              style={{ background: 'linear-gradient(135deg, #4dd9c0, #14b8a6)' }}
            >
              VL
            </div>
            <span className="font-semibold text-sm text-white/80">Vince Loo</span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="https://github.com/POTATO0826"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-full text-xs font-medium text-white/50 hover:text-white transition-colors"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              GitHub ↗
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="px-4 py-2 rounded-full text-xs font-medium text-[#080c0c] font-semibold transition-colors"
              style={{ background: 'linear-gradient(135deg, #4dd9c0, #14b8a6)' }}
            >
              Contact
            </a>
          </div>
        </nav>

        {/* Bento */}
        <div
          className={`grid gap-3 transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
          style={{ gridTemplateColumns: 'repeat(12, 1fr)' }}
        >

          {/* Hero — wide */}
          <Card
            className="p-7 col-span-12 md:col-span-7"
            style={{ background: 'linear-gradient(135deg, #091a18 0%, #050f14 100%)', gridColumn: 'span 7' }}
          >
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #4dd9c0, transparent)' }} />
              <div className="absolute -bottom-12 -left-12 w-52 h-52 rounded-full opacity-8" style={{ background: 'radial-gradient(circle, #14b8a6, transparent)' }} />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-5">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ background: '#4dd9c0', animation: 'pulse-ring 2s ease-in-out infinite' }}
                />
                <span className="text-xs text-white/40">Available for opportunities</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black leading-tight mb-3">
                Vince<br />
                <span style={{ background: 'linear-gradient(135deg, #4dd9c0, #a7f3d0, #67e8f9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Loo
                </span>
              </h1>
              <p className="text-white/50 text-sm max-w-sm leading-relaxed mb-5">
                Data Science & Software Development student at Taylor's University.
                Building cross-platform apps and intelligent systems.
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <Tag>Data Science</Tag>
                <Tag>Software Dev</Tag>
                <span
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
                  style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  Malaysia 🇲🇾
                </span>
              </div>
            </div>
          </Card>

          {/* University card */}
          <Card
            className="p-6 col-span-12 md:col-span-5 flex flex-col justify-between"
            style={{ background: 'linear-gradient(135deg, #0b1a10, #071018)', gridColumn: 'span 5' }}
          >
            <div>
              <div className="text-3xl mb-4" style={{ animation: 'float 4s ease-in-out infinite' }}>🎓</div>
              <h3 className="font-bold text-lg mb-1">Taylor's University</h3>
              <p className="text-white/40 text-sm leading-relaxed">Malaysia · Data Science & Software Engineering</p>
            </div>
            <div className="mt-5 pt-4 border-t border-white/5">
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-3 rounded-xl" style={{ background: 'rgba(77,217,192,0.06)', border: '1px solid rgba(77,217,192,0.1)' }}>
                  <div className="font-black text-xl text-[#4dd9c0]">2</div>
                  <div className="text-white/40 text-[10px] mt-0.5">Hackathons</div>
                </div>
                <div className="p-3 rounded-xl" style={{ background: 'rgba(77,217,192,0.06)', border: '1px solid rgba(77,217,192,0.1)' }}>
                  <div className="font-black text-xl text-[#4dd9c0]">8+</div>
                  <div className="text-white/40 text-[10px] mt-0.5">Technologies</div>
                </div>
              </div>
            </div>
          </Card>

          {/* Project 1 */}
          <a
            href="https://github.com/yapzhanquan/KitahackTaygood"
            target="_blank"
            rel="noreferrer"
            className="col-span-12 md:col-span-6 group"
            onMouseEnter={() => setHov('p1')}
            onMouseLeave={() => setHov(null)}
          >
            <Card
              className="p-6 h-full transition-all duration-300"
              style={{
                background: hov === 'p1' ? 'linear-gradient(135deg, #0e2020, #0a1818)' : 'linear-gradient(135deg, #0b1818, #071212)',
                transform: hov === 'p1' ? 'scale(1.01)' : 'scale(1)',
                gridColumn: 'span 6',
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-lg" style={{ background: 'rgba(77,217,192,0.12)' }}>
                    ⌚
                  </div>
                  <div>
                    <p className="text-[11px] text-white/40 font-medium uppercase tracking-wider">KitaHack · Malaysia 🇲🇾</p>
                    <h3 className="font-bold text-base">ProjekWatch</h3>
                  </div>
                </div>
                <span className="text-white/30 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-lg">↗</span>
              </div>
              <p className="text-white/50 text-sm leading-relaxed mb-4">
                Cross-platform Flutter productivity app. Runs natively on Android, iOS, Web, and Desktop from a single codebase.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Flutter', 'Dart', 'Firebase'].map(t => <Tag key={t}>{t}</Tag>)}
              </div>
            </Card>
          </a>

          {/* Project 2 */}
          <a
            href="https://github.com/yapzhanquan/SkyClaw"
            target="_blank"
            rel="noreferrer"
            className="col-span-12 md:col-span-6 group"
            onMouseEnter={() => setHov('p2')}
            onMouseLeave={() => setHov(null)}
          >
            <Card
              className="p-6 h-full transition-all duration-300"
              style={{
                background: hov === 'p2' ? 'linear-gradient(135deg, #101a0e, #0c1810)' : 'linear-gradient(135deg, #0c1510, #07100c)',
                transform: hov === 'p2' ? 'scale(1.01)' : 'scale(1)',
                gridColumn: 'span 6',
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-lg" style={{ background: 'rgba(16,185,129,0.12)' }}>
                    🚁
                  </div>
                  <div>
                    <p className="text-[11px] text-white/40 font-medium uppercase tracking-wider">LotusHack · Vietnam 🇻🇳</p>
                    <h3 className="font-bold text-base">SkyClaw</h3>
                  </div>
                </div>
                <span className="text-white/30 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-lg">↗</span>
              </div>
              <p className="text-white/50 text-sm leading-relaxed mb-4">
                Drone surveillance system integrating computer vision, live web dashboard, and a Telegram bot on AWS VPS for real-time remote alerts.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Python', 'Computer Vision', 'Telegram', 'AWS'].map(t => <Tag key={t}>{t}</Tag>)}
              </div>
            </Card>
          </a>

          {/* Ticker */}
          <Card className="col-span-12" style={{ padding: 0 }}>
            <Ticker />
          </Card>

          {/* Skills */}
          <Card className="col-span-12 md:col-span-8 p-6" style={{ gridColumn: 'span 8' }}>
            <h3 className="text-[11px] font-semibold text-white/30 uppercase tracking-[0.25em] mb-5">Tech Stack</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {skills.map((s) => (
                <div
                  key={s.name}
                  className="flex flex-col items-center gap-2 p-3 rounded-xl cursor-default transition-all hover:bg-white/5 group"
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform">{s.icon}</span>
                  <span className="font-semibold text-sm">{s.name}</span>
                  <span className="text-[10px] text-white/30">{s.desc}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Contact */}
          <Card
            className="col-span-12 md:col-span-4 p-6 flex flex-col justify-between"
            style={{ background: 'linear-gradient(135deg, #091a15, #07101a)', gridColumn: 'span 4' }}
          >
            <div>
              <h3 className="font-bold text-lg mb-2">Let's build something</h3>
              <p className="text-white/40 text-sm mb-5">Open to collabs, hackathons, and interesting ideas.</p>
            </div>
            <div className="space-y-3">
              {[
                { icon: '✉️', label: 'Email', href: `mailto:${EMAIL}`, val: 'Send a mail' },
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
                    <div className="text-[11px] text-white/30">{c.label}</div>
                    <div className="text-sm font-medium truncate">{c.val}</div>
                  </div>
                  <span className="text-white/20 group-hover:text-[#4dd9c0] transition-colors text-sm">→</span>
                </a>
              ))}
            </div>
          </Card>

        </div>

        <div className="text-center mt-10">
          <a href="/" className="text-white/20 text-sm hover:text-white/50 transition-colors">← back to selector</a>
        </div>
      </div>
    </div>
  )
}
