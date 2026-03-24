import { useEffect, useRef, useState } from 'react'

const skills = ['Flutter', 'Dart', 'React', 'TypeScript', 'Java', 'Firebase', 'Python', 'AWS']

const projects = [
  {
    num: '01',
    name: 'ProjekWatch',
    event: 'KitaHack — Malaysia',
    desc: 'Cross-platform productivity app built in Flutter/Dart. Deployed across Android, iOS, Web and Desktop from a single codebase.',
    tags: ['Flutter', 'Dart', 'Firebase'],
    link: 'https://github.com/yapzhanquan/KitahackTaygood',
  },
  {
    num: '02',
    name: 'SkyClaw',
    event: 'LotusHack — Vietnam',
    desc: 'Drone surveillance system fusing computer vision, a live web dashboard, and a Telegram bot running on AWS VPS for real-time alerts.',
    tags: ['Python', 'CV', 'Telegram', 'AWS'],
    link: 'https://github.com/yapzhanquan/SkyClaw',
  },
]

function Counter({ from = 0, to, suffix = '' }: { from?: number; to: number; suffix?: string }) {
  const [val, setVal] = useState(from)
  const ref = useRef(false)
  useEffect(() => {
    if (ref.current) return
    ref.current = true
    let start: number | null = null
    const duration = 1200
    const step = (ts: number) => {
      if (!start) start = ts
      const progress = Math.min((ts - start) / duration, 1)
      setVal(Math.floor(from + (to - from) * progress))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [from, to])
  return <>{val}{suffix}</>
}

export default function Design2() {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => { setTimeout(() => setLoaded(true), 100) }, [])

  return (
    <div className="min-h-screen bg-[#F5F2ED] text-[#1a1a1a]" style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}>

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 bg-[#F5F2ED]/90 backdrop-blur-sm border-b border-[#1a1a1a]/10">
        <span className="font-black text-sm tracking-widest uppercase">VL</span>
        <div className="flex items-center gap-8 text-xs tracking-widest uppercase font-medium text-[#666]">
          <a href="#work" className="hover:text-black transition-colors">Work</a>
          <a href="#skills" className="hover:text-black transition-colors">Skills</a>
          <a href="#contact" className="hover:text-black transition-colors">Contact</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-24 px-8 pb-0 max-w-6xl mx-auto">
        <div className={`transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="border-b border-[#1a1a1a]/20 pb-2 mb-8">
            <span className="text-xs tracking-widest uppercase text-[#999]">Portfolio — 2024</span>
          </div>
          <div className="grid grid-cols-12 gap-4 items-end">
            <div className="col-span-12 md:col-span-8">
              <h1 className="text-[clamp(3rem,10vw,8rem)] font-black leading-none tracking-tighter uppercase">
                Vince<br />Loo
              </h1>
            </div>
            <div className="col-span-12 md:col-span-4 pb-2">
              <p className="text-sm text-[#666] leading-relaxed max-w-xs">
                Data Science & Software Development student at Taylor's University, Malaysia.
                Building cross-platform apps and intelligent systems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="px-8 py-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-3 border border-[#1a1a1a]/20 divide-x divide-[#1a1a1a]/20">
          {[
            { label: 'Hackathons', val: 2, suffix: '' },
            { label: 'Tech Stack', val: 8, suffix: '+' },
            { label: 'Platforms', val: 5, suffix: '+' },
          ].map((s, i) => (
            <div key={i} className="p-6 text-center">
              <div className="text-4xl font-black mb-1">
                {loaded ? <Counter to={s.val} suffix={s.suffix} /> : 0}
              </div>
              <div className="text-xs uppercase tracking-widest text-[#999]">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Work */}
      <section id="work" className="px-8 pb-16 max-w-6xl mx-auto">
        <div className="flex items-baseline justify-between mb-8 border-b border-[#1a1a1a]/20 pb-3">
          <h2 className="font-black uppercase tracking-widest text-xs text-[#999]">Selected Work</h2>
          <span className="text-xs text-[#ccc]">Hackathon Projects</span>
        </div>
        <div className="space-y-0">
          {projects.map((p, i) => (
            <a
              key={i}
              href={p.link}
              target="_blank"
              rel="noreferrer"
              className="group grid grid-cols-12 gap-4 py-8 border-b border-[#1a1a1a]/10 hover:bg-[#1a1a1a] hover:text-white transition-all duration-300 px-4 -mx-4 rounded"
            >
              <div className="col-span-1">
                <span className="font-black text-[#ccc] group-hover:text-[#666] text-sm">{p.num}</span>
              </div>
              <div className="col-span-5 md:col-span-4">
                <h3 className="font-black text-2xl md:text-3xl uppercase tracking-tight">{p.name}</h3>
                <p className="text-xs text-[#999] group-hover:text-[#666] mt-1 tracking-widest uppercase">{p.event}</p>
              </div>
              <div className="col-span-6 md:col-span-5">
                <p className="text-sm text-[#666] group-hover:text-[#aaa] leading-relaxed">{p.desc}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {p.tags.map(t => (
                    <span key={t} className="text-xs border border-current px-2 py-0.5 rounded-full opacity-60">{t}</span>
                  ))}
                </div>
              </div>
              <div className="col-span-12 md:col-span-2 flex items-start justify-end">
                <span className="text-2xl group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform inline-block">↗</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="px-8 py-16 bg-[#1a1a1a] text-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-black uppercase tracking-widest text-xs text-[#666] mb-8">Tech Stack</h2>
          <div className="flex flex-wrap gap-3">
            {skills.map((s, i) => (
              <span
                key={s}
                className="border border-white/20 px-5 py-2 text-sm font-medium rounded-full hover:bg-white hover:text-black transition-all cursor-default"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="px-8 py-16 max-w-6xl mx-auto">
        <div className="border-b border-[#1a1a1a]/20 pb-3 mb-10">
          <h2 className="font-black uppercase tracking-widest text-xs text-[#999]">Get In Touch</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'Email', val: 'loovincent268@gmail.com', href: 'mailto:loovincent268@gmail.com' },
            { label: 'GitHub', val: 'POTATO0826', href: 'https://github.com/POTATO0826' },
            { label: 'WhatsApp', val: 'wa.link/4ixpfx', href: 'https://wa.link/4ixpfx' },
          ].map(c => (
            <a
              key={c.label}
              href={c.href}
              target="_blank"
              rel="noreferrer"
              className="group border border-[#1a1a1a]/20 p-6 hover:bg-[#1a1a1a] hover:text-white transition-all duration-300 rounded"
            >
              <div className="text-xs uppercase tracking-widest text-[#999] group-hover:text-[#666] mb-2">{c.label}</div>
              <div className="font-semibold text-sm flex items-center gap-2">
                {c.val} <span className="group-hover:translate-x-0.5 transition-transform inline-block">↗</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <div className="text-center py-6 border-t border-[#1a1a1a]/10 text-xs text-[#999]">
        <a href="/" className="hover:text-black transition-colors">← back to selector</a>
      </div>
    </div>
  )
}
