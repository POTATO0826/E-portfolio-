import { useState, useEffect, useRef } from 'react'

// Modern Bento design with paperflow water-shader background

const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons'
const skills = [
  { name: 'Flutter',    icon: `${DEVICON}/flutter/flutter-original.svg`,                              desc: 'Cross-platform UI' },
  { name: 'React',      icon: `${DEVICON}/react/react-original.svg`,                                  desc: 'Web interfaces' },
  { name: 'Java',       icon: `${DEVICON}/java/java-original.svg`,                                    desc: 'Backend systems' },
  { name: 'Firebase',   icon: `${DEVICON}/firebase/firebase-plain.svg`,                               desc: 'Cloud services' },
  { name: 'Dart',       icon: `${DEVICON}/dart/dart-original.svg`,                                    desc: 'Mobile-first' },
  { name: 'TypeScript', icon: `${DEVICON}/typescript/typescript-original.svg`,                        desc: 'Type-safe JS' },
  { name: 'Python',     icon: `${DEVICON}/python/python-original.svg`,                                desc: 'Data & scripts' },
  { name: 'AWS',        icon: `${DEVICON}/amazonwebservices/amazonwebservices-original-wordmark.svg`, desc: 'Cloud infra' },
  { name: 'Git',        icon: `${DEVICON}/git/git-original.svg`,                                      desc: 'Version control' },
  { name: 'Convex',     icon: 'https://cdn.simpleicons.org/convex',                                   desc: 'Realtime backend' },
  { name: 'Vercel',     icon: `${DEVICON}/vercel/vercel-original.svg`,                                desc: 'Deployments' },
  { name: 'Claude',     icon: 'https://cdn.simpleicons.org/claude',                                   desc: 'AI pair programming' },
  { name: 'Codex',      icon: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/openai.svg',   desc: 'AI code agent' },
]

const ticker = ['Flutter', 'React', 'TypeScript', 'Java', 'Firebase', 'Python', 'AWS', 'Dart', 'Convex', 'Vercel', 'Claude', 'Codex', 'Computer Vision', 'Telegram Bots']

type Project = {
  meta: string
  name: string
  icon: string
  desc: string
  tech: string[]
  github: string
  accent: string
  gradient: string
  hoverGradient: string
}

const INDIGO_GRAD = {
  gradient: 'linear-gradient(135deg, rgba(31,42,74,0.10), rgba(10,10,20,0.06))',
  hoverGradient: 'linear-gradient(135deg, rgba(31,42,74,0.18), rgba(10,10,20,0.12))',
}
const TERRA_GRAD = {
  gradient: 'linear-gradient(135deg, rgba(200,74,59,0.10), rgba(31,42,74,0.06))',
  hoverGradient: 'linear-gradient(135deg, rgba(200,74,59,0.18), rgba(31,42,74,0.10))',
}
const SAGE_GRAD = {
  gradient: 'linear-gradient(135deg, rgba(90,107,74,0.10), rgba(31,42,74,0.06))',
  hoverGradient: 'linear-gradient(135deg, rgba(90,107,74,0.18), rgba(31,42,74,0.10))',
}

const hackathonProjects: Project[] = [
  {
    meta: 'KitaHack 2025 · Malaysia 🇲🇾',
    name: 'ProjekWatch',
    icon: '🏠',
    desc: 'A community-driven platform that tracks the real progress of infrastructure projects such as housing, roads, and public facilities. Users upload photos and updates to verify construction activity, helping improve transparency and accountability in public development.',
    tech: ['Flutter', 'Dart', 'Firebase'],
    github: 'https://github.com/yapzhanquan/KitahackTaygood',
    accent: '#1f2a4a',
    ...INDIGO_GRAD,
  },
  {
    meta: 'UMHackathon 2026 · Malaysia 🇲🇾',
    name: 'Codapac',
    icon: '🤖',
    desc: 'An AI coding agent that builds and auto-deploys websites for small and medium businesses — letting SMEs launch a professional online presence without writing a line of code or hiring developers.',
    tech: ['AI Agent', 'Next.js', 'TypeScript', 'Auto-Deploy'],
    github: 'https://github.com/LeeSF03/codapac',
    accent: '#c84a3b',
    ...TERRA_GRAD,
  },
  {
    meta: 'MyHack 2026 · Malaysia 🇲🇾',
    name: 'BloomPost',
    icon: '🌸',
    desc: 'A marketing platform that generates product imagery with Google Gemini and short-form videos with Google Veo, then auto-posts them across social media and e-commerce channels — helping brands scale their content output and boost product visibility.',
    tech: ['Gemini', 'Google Veo', 'Social APIs', 'Next.js'],
    github: 'https://github.com/POTATO0826/BloomPost',
    accent: '#5a6b4a',
    ...SAGE_GRAD,
  },
  {
    meta: 'LotusHack 2026 · Vietnam 🇻🇳',
    name: 'SkyClaw',
    icon: '🛸',
    desc: 'A platform that creates immersive 3D interior tours for places like cafés, restaurants, and Airbnb properties. Visitors explore the inside of a venue before they arrive, helping businesses showcase their spaces and convert more bookings.',
    tech: ['Python', 'Computer Vision', 'Telegram', 'AWS'],
    github: 'https://github.com/yapzhanquan/SkyClaw',
    accent: '#1f2a4a',
    ...INDIGO_GRAD,
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
    accent: '#1f2a4a',
    ...INDIGO_GRAD,
  },
  {
    meta: 'Side Project · In Progress',
    name: 'ROJAKGOV',
    icon: '🏛️',
    desc: 'A unified app concept that bundles Malaysian government services into one interface — making everyday public-sector tasks easier to find and complete. Still in active development.',
    tech: ['Flutter', 'Dart'],
    github: 'https://github.com/POTATO0826/ROJAKGOV',
    accent: '#c84a3b',
    ...TERRA_GRAD,
  },
]

/* PaperFlow Water Shader Background */
function PaperFlowBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const gl = (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null
    if (!gl) return

    const vertSrc = `
      attribute vec2 a_pos;
      void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
    `

    const fragSrc = `
      precision highp float;
      uniform vec2  u_res;
      uniform float u_time;

      float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }
      float noise(vec2 p){
        vec2 i = floor(p);
        vec2 f = fract(p);
        float a = hash(i);
        float b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
      }
      float fbm(vec2 p){
        float v = 0.0;
        float a = 0.5;
        mat2 rot = mat2(0.8, -0.6, 0.6, 0.8);
        for (int i = 0; i < 6; i++){
          v += a * noise(p);
          p = rot * p * 2.05;
          a *= 0.5;
        }
        return v;
      }

      void main(){
        vec2 uv = (gl_FragCoord.xy - 0.5 * u_res.xy) / min(u_res.x, u_res.y);
        uv *= 1.6;
        float t = u_time * 0.10;

        // Domain warping — fluid water flow
        vec2 q = vec2(fbm(uv + vec2(0.0, t)), fbm(uv + vec2(5.2, -t * 0.9)));
        vec2 r = vec2(
          fbm(uv + 2.0 * q + vec2(1.7 + t * 0.5, 9.2)),
          fbm(uv + 2.0 * q + vec2(8.3 - t * 0.4, 2.8))
        );
        float f = fbm(uv + 2.4 * r);

        float bands = sin(f * 7.5 + t * 1.4 + r.x * 3.0) * 0.5 + 0.5;
        float ink   = smoothstep(0.32, 0.85, f);

        // Suminagashi palette — warm cream paper with indigo + charcoal ink
        vec3 cPaper     = vec3(0.957, 0.929, 0.878);  // warm cream  #f4ede0
        vec3 cPaperShade= vec3(0.890, 0.855, 0.795);  // shadowed cream
        vec3 cIndigo    = vec3(0.180, 0.220, 0.380);  // muted indigo
        vec3 cInkDeep   = vec3(0.075, 0.090, 0.180);  // deep indigo/ink
        vec3 cCharcoal  = vec3(0.040, 0.040, 0.050);  // near-black charcoal
        vec3 cTerracotta= vec3(0.785, 0.290, 0.230);  // rare terracotta wisp

        vec3 col = cPaper;
        // Cream shadows where ink starts to gather
        col = mix(col, cPaperShade, smoothstep(0.25, 0.45, f) * 0.7);
        // Indigo ink
        col = mix(col, cIndigo,     smoothstep(0.40, 0.70, f));
        // Deep ink in the core swirls
        col = mix(col, cInkDeep,    smoothstep(0.62, 0.85, f));
        // Charcoal in the densest folds
        col = mix(col, cCharcoal,   smoothstep(0.80, 0.96, f) * 0.85);
        // Sparse terracotta wisps along band edges
        col = mix(col, cTerracotta, smoothstep(0.48, 0.62, f) * bands * 0.18);

        // Soft vignette toward shaded cream so edges feel like paper edges
        float d = length(uv);
        col = mix(col, cPaperShade, smoothstep(0.85, 1.75, d) * 0.30);

        // Paper grain (subtle on cream)
        float grain = (hash(gl_FragCoord.xy + t) - 0.5) * 0.020;
        col += grain;

        // Gentle bloom on the brightest cream highlights
        col += pow(1.0 - ink, 4.0) * 0.04;

        gl_FragColor = vec4(col, 1.0);
      }
    `

    function compile(type: number, src: string): WebGLShader | null {
      const s = gl!.createShader(type)
      if (!s) return null
      gl!.shaderSource(s, src)
      gl!.compileShader(s)
      if (!gl!.getShaderParameter(s, gl!.COMPILE_STATUS)) {
        console.warn('shader compile error', gl!.getShaderInfoLog(s))
        gl!.deleteShader(s)
        return null
      }
      return s
    }

    const vs = compile(gl.VERTEX_SHADER, vertSrc)
    const fs = compile(gl.FRAGMENT_SHADER, fragSrc)
    if (!vs || !fs) return

    const prog = gl.createProgram()
    if (!prog) return
    gl.attachShader(prog, vs)
    gl.attachShader(prog, fs)
    gl.linkProgram(prog)
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.warn('program link error', gl.getProgramInfoLog(prog))
      return
    }
    gl.useProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    )
    const posLoc = gl.getAttribLocation(prog, 'a_pos')
    gl.enableVertexAttribArray(posLoc)
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0)

    const uRes  = gl.getUniformLocation(prog, 'u_res')
    const uTime = gl.getUniformLocation(prog, 'u_time')

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    function resize() {
      const w = window.innerWidth
      const h = window.innerHeight
      canvas!.width  = Math.floor(w * dpr)
      canvas!.height = Math.floor(h * dpr)
      canvas!.style.width  = w + 'px'
      canvas!.style.height = h + 'px'
      gl!.viewport(0, 0, canvas!.width, canvas!.height)
    }
    resize()
    window.addEventListener('resize', resize)

    let animId = 0
    const start = performance.now()
    function frame() {
      const t = (performance.now() - start) / 1000
      gl!.uniform2f(uRes, canvas!.width, canvas!.height)
      gl!.uniform1f(uTime, t)
      gl!.drawArrays(gl!.TRIANGLES, 0, 6)
      animId = requestAnimationFrame(frame)
    }
    animId = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
}

/* ── Profile Photo ───────────────────────────────────── */
function ProfilePhoto() {
  return (
    <div className="relative group">
      <div className="absolute -inset-1 rounded-full opacity-70 group-hover:opacity-100 transition-opacity duration-500 animate-spin-slow"
        style={{ background: 'conic-gradient(from 0deg, #1f2a4a, #c84a3b, #0a0a14, #1f2a4a)', padding: '3px' }}>
        <div className="w-full h-full rounded-full bg-[#f4ede0]" />
      </div>
      <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden"
        style={{ border: '2px solid rgba(31,42,74,0.4)' }}>
        <img src="/PFP.jpeg" alt="Vince Loo"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
      </div>
      <div className="absolute inset-0 rounded-full blur-2xl opacity-25 -z-10"
        style={{ background: 'radial-gradient(circle, #1f2a4a, transparent)' }} />
    </div>
  )
}

/* ── Ticker ──────────────────────────────────────────── */
function Ticker() {
  return (
    <div className="overflow-hidden whitespace-nowrap" style={{ maskImage: 'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)' }}>
      <div className="inline-flex gap-6 sm:gap-8 animate-marquee">
        {[...ticker, ...ticker].map((t, i) => (
          <span key={i} className="text-sm font-medium text-zinc-700 shrink-0">
            {t} <span className="text-zinc-500 mx-2">·</span>
          </span>
        ))}
      </div>
    </div>
  )
}

/* ── Gradient Card ───────────────────────────────────── */
function GradCard({ children, className = '', gradient, hoverGradient, accentColor }: {
  children: React.ReactNode; className?: string
  gradient?: string; hoverGradient?: string; accentColor?: string
}) {
  const [hovered, setHovered] = useState(false)
  const tint = hovered && hoverGradient ? hoverGradient : gradient
  // Soft cloud: light translucent white base that picks up the marble colors through blur.
  const cloudBase = 'rgba(255,255,255,0.32)'
  return (
    <div
      className={`grad-card rounded-[28px] p-5 sm:p-6 relative overflow-hidden ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: tint ? `${tint}, ${cloudBase}` : cloudBase,
        borderColor: hovered && accentColor ? accentColor + '70' : undefined,
      }}
    >
      {children}
    </div>
  )
}

function Tag({ children, color = '#3f3f46' }: { children: React.ReactNode; color?: string }) {
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
      style={{ background: color + '22', color, border: `1px solid ${color}55` }}>
      {children}
    </span>
  )
}

function GithubButton({ href }: { href: string }) {
  return (
    <a href={href} target="_blank" rel="noreferrer"
      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold text-zinc-900 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-zinc-900/20"
      style={{ background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(0,0,0,0.12)' }}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
      View on GitHub
    </a>
  )
}

/* ── Project Card ────────────────────────────────────── */
function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="col-span-12 md:col-span-6 group">
      <GradCard
        className="h-full transition-all duration-500 group-hover:scale-[1.02]"
        gradient={project.gradient}
        hoverGradient={project.hoverGradient}
        accentColor={project.accent}
      >
        {/* Corner glow */}
        <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `radial-gradient(circle, ${project.accent}20, transparent)` }} />

        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center text-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                style={{ background: `${project.accent}15`, border: `1px solid ${project.accent}25` }}>
                {project.icon}
              </div>
              <div>
                <p className="text-xs text-zinc-500 font-medium">{project.meta}</p>
                <h3 className="display-serif text-2xl text-zinc-900 leading-tight">{project.name}</h3>
              </div>
            </div>
          </div>
          <p className="text-zinc-700 text-sm leading-relaxed mb-5">{project.desc}</p>
          <div className="flex flex-wrap gap-2 mb-5">
            {project.tech.map(t => <Tag key={t} color={project.accent}>{t}</Tag>)}
          </div>
          <GithubButton href={project.github} />
        </div>
      </GradCard>
    </div>
  )
}

/* ── Main Design ─────────────────────────────────────── */
export default function Design5() {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => { setTimeout(() => setLoaded(true), 100) }, [])

  return (
    <div className="min-h-screen bg-[#f4ede0] text-zinc-900 relative" style={{ fontFamily: '"Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700;800;900&display=swap');
        .display-serif { font-family: 'Instrument Serif', 'Times New Roman', serif; letter-spacing: -0.01em; }
        .display-serif-i { font-family: 'Instrument Serif', 'Times New Roman', serif; font-style: italic; letter-spacing: -0.005em; }

        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { animation: marquee 25s linear infinite; }
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-8px); } }
        .animate-float { animation: float 4s ease-in-out infinite; }
        @keyframes spin-slow { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }

        /* Soft glass cloud card */
        .grad-card {
          border: 1px solid rgba(255,255,255,0.55);
          backdrop-filter: blur(30px) saturate(150%);
          -webkit-backdrop-filter: blur(30px) saturate(150%);
          box-shadow:
            0 1px 0 rgba(255,255,255,0.9) inset,
            0 -1px 0 rgba(255,255,255,0.25) inset,
            0 24px 60px -28px rgba(31,42,74,0.35),
            0 6px 24px -10px rgba(255,255,255,0.30);
          transition: all 0.45s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .grad-card:hover {
          border-color: rgba(255,255,255,0.85);
          box-shadow:
            0 1px 0 rgba(255,255,255,1) inset,
            0 -1px 0 rgba(255,255,255,0.35) inset,
            0 32px 75px -25px rgba(31,42,74,0.45),
            0 8px 30px -10px rgba(255,255,255,0.40);
          transform: translateY(-2px);
        }

@keyframes fadeInUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        .fade-in-up { animation: fadeInUp 0.7s ease-out forwards; }
        .fade-in-up-d1 { animation: fadeInUp 0.7s ease-out 0.1s forwards; opacity: 0; }
        .fade-in-up-d2 { animation: fadeInUp 0.7s ease-out 0.2s forwards; opacity: 0; }
        .fade-in-up-d3 { animation: fadeInUp 0.7s ease-out 0.3s forwards; opacity: 0; }

        @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
        .shimmer-text { background-size: 200% auto; animation: shimmer 4s linear infinite; }

        @keyframes pulse-ring {
          0% { box-shadow: 0 0 0 0 rgba(31,42,74,0.45); }
          70% { box-shadow: 0 0 0 6px rgba(31,42,74,0); }
          100% { box-shadow: 0 0 0 0 rgba(31,42,74,0); }
        }
        .pulse-ring { animation: pulse-ring 2s ease-out infinite; }
      `}</style>

      <PaperFlowBackground />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-5 py-8 sm:py-12">
        {/* Spacer */}
        <div className="mb-8 sm:mb-12" />

        {/* Bento Grid */}
        <div className={`grid gap-4 transition-all duration-700 ${loaded ? 'opacity-100' : 'opacity-0 translate-y-4'}`}
          style={{ gridTemplateColumns: 'repeat(12, 1fr)' }}>

          {/* Hero card */}
          <GradCard className="col-span-12 md:col-span-8 fade-in-up-d1"
            gradient="linear-gradient(135deg, rgba(31,42,74,0.10), rgba(200,74,59,0.06), rgba(10,10,20,0.04))">
            <div className="absolute top-0 left-8 right-8 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(31,42,74,0.5), rgba(200,74,59,0.3), transparent)' }} />
            <div className="absolute -top-20 -right-20 w-52 h-52 rounded-full opacity-20"
              style={{ background: 'radial-gradient(circle, #1f2a4a, transparent)' }} />
            <div className="absolute -bottom-16 -left-16 w-44 h-44 rounded-full opacity-15"
              style={{ background: 'radial-gradient(circle, #c84a3b, transparent)' }} />

            <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <div className="shrink-0"><ProfilePhoto /></div>
              <div className="text-center sm:text-left flex-1">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-4">
                  <span className="w-2 h-2 rounded-full bg-[#5a6b4a] animate-pulse" />
                  <span className="text-xs text-zinc-500">Available for opportunities</span>
                </div>
                <h1 className="display-serif text-5xl sm:text-6xl md:text-7xl mb-3 text-zinc-900 leading-none">
                  Vince <span className="display-serif-i">Loo</span>
                </h1>
                <p className="text-zinc-700 text-sm sm:text-[15px] max-w-md leading-relaxed mb-5">
                  Data Science & Software Development student at Taylor's University.
                  Building cross-platform apps and intelligent systems.
                </p>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-3">
                  <Tag color="#1f2a4a">Data Science</Tag>
                  <Tag color="#c84a3b">Software Dev</Tag>
                  <Tag color="#0a0a14">Malaysia 🇲🇾</Tag>
                </div>
              </div>
            </div>
          </GradCard>

          {/* University card */}
          <GradCard className="col-span-12 md:col-span-4 flex flex-col justify-between fade-in-up-d2"
            gradient="linear-gradient(135deg, rgba(90,107,74,0.10), rgba(31,42,74,0.06))">
            <div className="absolute top-0 left-6 right-6 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(90,107,74,0.55), transparent)' }} />
            <div>
              <div className="text-3xl mb-4 animate-float">🎓</div>
              <h3 className="display-serif text-2xl text-zinc-900 mb-2 leading-tight">Taylor's University</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">Malaysia · Data Science & Software Engineering</p>
            </div>
            <div className="mt-6 pt-4 border-t border-zinc-900/10">
              <div className="flex items-center justify-between text-xs text-zinc-500">
                <span>2 Hackathons</span>
                <span className="text-[#5a6b4a] font-medium">Active</span>
              </div>
            </div>
          </GradCard>

          {/* Section label */}
          <div className="col-span-12 mt-4 fade-in-up-d3">
            <div className="flex items-baseline gap-4">
              <h2 className="display-serif-i text-3xl sm:text-4xl text-zinc-900 leading-none">Hackathon Projects</h2>
              <div className="flex-1 h-px bg-zinc-900/25" />
              <span className="text-xs font-mono text-zinc-600 tracking-widest">04</span>
            </div>
          </div>

          {/* Project cards */}
          {hackathonProjects.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}

          {/* Side Projects label */}
          <div className="col-span-12 mt-6">
            <div className="flex items-baseline gap-4">
              <h2 className="display-serif-i text-3xl sm:text-4xl text-zinc-900 leading-none">Side Projects</h2>
              <div className="flex-1 h-px bg-zinc-900/25" />
              <span className="text-xs font-mono text-zinc-600 tracking-widest">02</span>
            </div>
          </div>

          {/* Side project cards */}
          {sideProjects.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}

          {/* Skills ticker */}
          <GradCard className="col-span-12 !p-4"
            gradient="linear-gradient(90deg, rgba(31,42,74,0.06), rgba(200,74,59,0.05), rgba(10,10,20,0.05))">
            <Ticker />
          </GradCard>

          {/* Skills grid */}
          <GradCard className="col-span-12 md:col-span-8"
            gradient="linear-gradient(135deg, rgba(31,42,74,0.08), rgba(200,74,59,0.05), rgba(10,10,20,0.04))">
            <div className="absolute top-0 left-6 right-6 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(31,42,74,0.45), rgba(200,74,59,0.3), transparent)' }} />
            <div className="flex items-baseline gap-3 mb-5">
              <h3 className="display-serif-i text-2xl sm:text-3xl text-zinc-900 leading-none">Tech Stack</h3>
              <div className="flex-1 h-px bg-zinc-900/20" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {skills.map((s, i) => (
                <div key={i}
                  className="group flex flex-col items-center gap-2 p-3 rounded-xl cursor-default transition-all duration-300 hover:bg-white/40 hover:scale-105">
                  <img
                    src={s.icon}
                    alt={s.name}
                    loading="lazy"
                    className="w-8 h-8 object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                  <span className="font-medium text-sm">{s.name}</span>
                  <span className="text-xs text-zinc-500">{s.desc}</span>
                </div>
              ))}
            </div>
          </GradCard>

          {/* Contact card */}
          <GradCard className="col-span-12 md:col-span-4"
            gradient="linear-gradient(135deg, rgba(200,74,59,0.10), rgba(31,42,74,0.06))">
            <div className="absolute top-0 left-6 right-6 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(200,74,59,0.5), rgba(31,42,74,0.3), transparent)' }} />
            <div className="mb-5">
              <h3 className="display-serif-i text-3xl text-zinc-900 mb-3 leading-none">Let's build something</h3>
              <p className="text-zinc-500 text-sm mb-6">Open to collabs, hackathons, and cool ideas.</p>
            </div>
            <div className="space-y-3">
              {[
                { icon: 'https://cdn.simpleicons.org/gmail',     label: 'Email',     href: 'mailto:loovincent268@gmail.com',                       val: 'Send a mail' },
                { icon: `${DEVICON}/linkedin/linkedin-original.svg`,  label: 'LinkedIn',  href: 'https://www.linkedin.com/in/vince-loo-82565a31b',     val: 'Vince Loo' },
                { icon: 'https://cdn.simpleicons.org/instagram', label: 'Instagram', href: 'https://www.instagram.com/vince__loo/',                val: 'vince__loo' },
                { icon: 'https://cdn.simpleicons.org/github/1f2a4a', label: 'GitHub', href: 'https://github.com/POTATO0826',                       val: 'POTATO0826' },
                { icon: 'https://cdn.simpleicons.org/whatsapp',  label: 'WhatsApp',  href: 'https://wa.link/4ixpfx',                               val: 'Chat now' },
              ].map(c => (
                <a key={c.label} href={c.href} target="_blank" rel="noreferrer"
                  className="flex items-center gap-3 py-2 group transition-all duration-300 hover:translate-x-1">
                  <img src={c.icon} alt={c.label} loading="lazy" className="w-5 h-5 object-contain shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-zinc-500">{c.label}</div>
                    <div className="text-sm font-medium truncate">{c.val}</div>
                  </div>
                  <span className="text-zinc-500 group-hover:text-zinc-900 transition-colors">→</span>
                </a>
              ))}
            </div>
          </GradCard>
        </div>
      </div>
    </div>
  )
}
