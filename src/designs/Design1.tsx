import { useEffect, useRef, useState } from 'react'

// Design 1: Gradient Mesh / Aurora Light
// White background, flowing animated gradient blobs, vibrant color, organic layout.
// Completely different from the editorial (D2) and dark bento (D5) aesthetics.

const EMAIL = 'loovincent268@gmail.com'

const projects = [
  {
    icon: '⌚',
    name: 'ProjekWatch',
    event: 'KitaHack — Malaysia',
    desc: 'Cross-platform Flutter productivity app — Android, iOS, Web, and Desktop from one codebase. Built for Malaysia\'s premier student hackathon.',
    tags: ['Flutter', 'Dart', 'Firebase'],
    link: 'https://github.com/yapzhanquan/KitahackTaygood',
    from: '#6366f1',
    to: '#8b5cf6',
  },
  {
    icon: '🚁',
    name: 'SkyClaw',
    event: 'LotusHack — Vietnam',
    desc: 'Drone surveillance system fusing computer vision, a live dashboard, and a Telegram bot on AWS VPS for real-time alerts.',
    tags: ['Python', 'Computer Vision', 'Telegram', 'AWS'],
    link: 'https://github.com/yapzhanquan/SkyClaw',
    from: '#06b6d4',
    to: '#10b981',
  },
]

const pills = ['Flutter', 'Dart', 'React', 'TypeScript', 'Java', 'Firebase', 'Python', 'AWS']
const pillColors = [
  { bg: '#ede9fe', text: '#6d28d9' },
  { bg: '#dbeafe', text: '#1d4ed8' },
  { bg: '#cffafe', text: '#0e7490' },
  { bg: '#d1fae5', text: '#065f46' },
  { bg: '#fef3c7', text: '#92400e' },
  { bg: '#fee2e2', text: '#991b1b' },
  { bg: '#fce7f3', text: '#9d174d' },
  { bg: '#e0f2fe', text: '#075985' },
]

// Blob that slowly drifts
function Blob({ color, size, x, y, delay }: { color: string; size: number; x: number; y: number; delay: number }) {
  return (
    <div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        left: `${x}%`,
        top: `${y}%`,
        background: color,
        filter: 'blur(80px)',
        opacity: 0.55,
        animation: `drift${delay % 3} ${14 + delay}s ease-in-out infinite`,
        transform: 'translate(-50%, -50%)',
      }}
    />
  )
}

function useMouseGlow() {
  const [pos, setPos] = useState({ x: 60, y: 30 })
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      setPos({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 })
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])
  return { ref, pos }
}

export default function Design1() {
  const [loaded, setLoaded] = useState(false)
  const { ref, pos } = useMouseGlow()
  useEffect(() => { setTimeout(() => setLoaded(true), 100) }, [])

  return (
    <div ref={ref} className="min-h-screen bg-white overflow-x-hidden" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <style>{`
        @keyframes drift0 { 0%,100%{transform:translate(-50%,-50%) scale(1)} 33%{transform:translate(-50%,-50%) translate(40px,-30px) scale(1.1)} 66%{transform:translate(-50%,-50%) translate(-30px,40px) scale(0.95)} }
        @keyframes drift1 { 0%,100%{transform:translate(-50%,-50%) scale(1)} 33%{transform:translate(-50%,-50%) translate(-50px,20px) scale(1.05)} 66%{transform:translate(-50%,-50%) translate(30px,-50px) scale(1.1)} }
        @keyframes drift2 { 0%,100%{transform:translate(-50%,-50%) scale(1)} 33%{transform:translate(-50%,-50%) translate(20px,50px) scale(0.9)} 66%{transform:translate(-50%,-50%) translate(-40px,-20px) scale(1.1)} }
        @keyframes fadein { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:none} }
        .card-in { animation: fadein 0.7s ease forwards; opacity: 0; }
      `}</style>

      {/* Gradient background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <Blob color="radial-gradient(circle, #c4b5fd, #818cf8)" size={700} x={10} y={5} delay={0} />
        <Blob color="radial-gradient(circle, #6ee7b7, #34d399)" size={500} x={80} y={15} delay={1} />
        <Blob color="radial-gradient(circle, #fda4af, #fb7185)" size={600} x={50} y={60} delay={2} />
        <Blob color="radial-gradient(circle, #7dd3fc, #38bdf8)" size={450} x={90} y={75} delay={0} />
        {/* Mouse-following soft glow */}
        <div
          className="absolute rounded-full pointer-events-none transition-all duration-700"
          style={{
            width: 400,
            height: 400,
            left: `${pos.x}%`,
            top: `${pos.y}%`,
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(99,102,241,0.18), transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
      </div>

      {/* Frosted glass nav */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between"
        style={{ background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(0,0,0,0.06)' }}
      >
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>VL</div>
          <span className="font-semibold text-sm text-gray-800">Vince Loo</span>
        </div>
        <div className="flex items-center gap-3">
          <a href="https://github.com/POTATO0826" target="_blank" rel="noreferrer" className="text-xs text-gray-500 hover:text-gray-900 transition-colors px-3 py-1.5 rounded-full hover:bg-black/5">GitHub ↗</a>
          <a href={`mailto:${EMAIL}`} className="text-xs text-white font-medium px-4 py-1.5 rounded-full transition-all hover:opacity-90" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>Say hi 👋</a>
        </div>
      </nav>

      <div className="relative z-10 max-w-4xl mx-auto px-6 pt-32 pb-20">

        {/* Hero */}
        <div
          className="mb-20 transition-all duration-700"
          style={{ opacity: loaded ? 1 : 0, transform: loaded ? 'none' : 'translateY(32px)' }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-xs font-medium"
            style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.15)', color: '#6366f1' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Taylor's University · Malaysia 🇲🇾
          </div>

          {/* Name — huge gradient */}
          <h1 style={{ fontSize: 'clamp(3.5rem, 12vw, 9rem)', fontWeight: 900, lineHeight: 0.9, letterSpacing: '-0.04em', marginBottom: '1.5rem' }}>
            <span style={{ background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 30%, #ec4899 60%, #f59e0b 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Vince
            </span>
            <br />
            <span style={{ color: '#111' }}>Loo</span>
          </h1>

          <p className="text-gray-500 text-lg max-w-lg leading-relaxed mb-8">
            Data Science & Software Development student — building cross-platform apps and intelligent systems.
          </p>

          <div className="flex flex-wrap gap-3">
            <a href="#projects" className="px-6 py-3 rounded-2xl text-sm font-semibold text-white transition-all hover:scale-105 active:scale-95 shadow-lg shadow-violet-200"
              style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
              View Projects ↓
            </a>
            <a href={`mailto:${EMAIL}`} className="px-6 py-3 rounded-2xl text-sm font-semibold text-gray-700 transition-all hover:scale-105 active:scale-95 bg-white shadow-md shadow-black/5 border border-black/5">
              Get In Touch
            </a>
          </div>
        </div>

        {/* Projects */}
        <section id="projects" className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">Hackathon Projects</span>
            <div className="h-px flex-1 bg-black/6" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((p, i) => (
              <a
                key={i}
                href={p.link}
                target="_blank"
                rel="noreferrer"
                className="card-in group block rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                style={{
                  animationDelay: `${300 + i * 120}ms`,
                  background: 'rgba(255,255,255,0.8)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(0,0,0,0.06)',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-inner"
                      style={{ background: `linear-gradient(135deg, ${p.from}18, ${p.to}25)` }}>
                      {p.icon}
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-medium">{p.event}</p>
                      <h3 className="font-bold text-base text-gray-900">{p.name}</h3>
                    </div>
                  </div>
                  <span className="text-gray-300 group-hover:text-gray-700 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-xl">↗</span>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{p.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="text-xs px-3 py-1 rounded-full font-medium"
                      style={{ background: `${p.from}15`, color: p.from, border: `1px solid ${p.from}25` }}>
                      {t}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">Tech Stack</span>
            <div className="h-px flex-1 bg-black/6" />
          </div>
          <div className="flex flex-wrap gap-3">
            {pills.map((p, i) => (
              <span
                key={p}
                className="card-in px-5 py-2.5 rounded-2xl text-sm font-semibold cursor-default transition-all hover:scale-105 hover:shadow-md"
                style={{
                  animationDelay: `${500 + i * 60}ms`,
                  background: pillColors[i].bg,
                  color: pillColors[i].text,
                }}
              >
                {p}
              </span>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">Contact</span>
            <div className="h-px flex-1 bg-black/6" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { emoji: '✉️', label: 'Email', val: EMAIL, href: `mailto:${EMAIL}`, color: '#6366f1' },
              { emoji: '🐙', label: 'GitHub', val: 'POTATO0826', href: 'https://github.com/POTATO0826', color: '#8b5cf6' },
              { emoji: '💬', label: 'WhatsApp', val: 'Chat now', href: 'https://wa.link/4ixpfx', color: '#10b981' },
            ].map(c => (
              <a
                key={c.label}
                href={c.href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-4 p-4 rounded-2xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                style={{ background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(20px)', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}
              >
                <span className="text-2xl">{c.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-gray-400 mb-0.5">{c.label}</div>
                  <div className="text-sm font-semibold text-gray-800 truncate">{c.val}</div>
                </div>
                <span className="text-gray-300 group-hover:translate-x-0.5 transition-transform">→</span>
              </a>
            ))}
          </div>
        </section>
      </div>

      <div className="relative z-10 text-center py-6 border-t border-black/5 text-xs text-gray-400">
        <a href="/" className="hover:text-gray-700 transition-colors">← back to selector</a>
      </div>
    </div>
  )
}
