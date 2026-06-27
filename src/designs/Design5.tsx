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
  award?: string
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
const GOLD_GRAD = {
  gradient: 'linear-gradient(135deg, rgba(200,155,60,0.14), rgba(31,42,74,0.06))',
  hoverGradient: 'linear-gradient(135deg, rgba(200,155,60,0.22), rgba(31,42,74,0.10))',
}

const hackathonProjects: Project[] = [
  {
    meta: 'ImagineHack 2026 · Malaysia 🇲🇾',
    name: 'MEETU',
    icon: '🤝',
    desc: 'An AI-powered CRM built for independent financial advisors. It ingests WhatsApp conversations and news, then automatically extracts the signals that matter — life events, follow-ups, and per-client talking points — and surfaces them in a calm, editorial workspace. The goal: advisors stop losing clients simply because a thread slipped through the cracks.',
    tech: ['Next.js', 'React', 'Convex', 'AI SDK'],
    github: 'https://github.com/POTATO0826/MEETU',
    accent: '#c89b3c',
    award: '🏆 Champion · Track 1 (AAG × ASG)',
    ...GOLD_GRAD,
  },
  {
    meta: 'KitaHack 2026 · Malaysia 🇲🇾',
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
    icon: '🎬',
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
    meta: 'Side Project · 3D Web',
    name: 'Sakura',
    icon: '🌸',
    desc: 'An interactive 3D web experience — and installable PWA — where a cherry blossom blooms in a moonlit garden. Snow and petals fall, a glowing seed descends, a branch grows and unfurls, and five petals open into a luminous flower. Drag to orbit the camera or tap the blossom for a burst of heart particles, all set to an optional lofi soundtrack. Every visual is procedurally generated — no pre-made models or images.',
    tech: ['Three.js', 'TypeScript', 'GSAP', 'PWA'],
    github: 'https://github.com/POTATO0826/Flower-',
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

    // Device-aware quality. Phones get a lighter shader (mediump precision, fewer noise
    // octaves) so the full-screen background doesn't fight with scrolling.
    const isMobile = window.matchMedia('(max-width: 768px), (pointer: coarse)').matches
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const PRECISION = isMobile ? 'mediump' : 'highp'
    const OCTAVES = isMobile ? 4 : 6

    const vertSrc = `
      attribute vec2 a_pos;
      void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
    `

    const fragSrc = `
      precision ${PRECISION} float;
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
        for (int i = 0; i < ${OCTAVES}; i++){
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

        // Low-frequency field that slowly drifts warm <-> cool zones across the paper
        float warm = smoothstep(0.35, 0.65, fbm(uv * 0.6 + r * 0.6 + vec2(t * 0.25, -t * 0.15)));

        // Suminagashi palette — warm cream paper marbled with teal, terracotta & gold (no purple)
        vec3 cPaper     = vec3(0.957, 0.929, 0.878);  // warm cream  #f4ede0
        vec3 cPaperShade= vec3(0.890, 0.855, 0.795);  // shadowed cream
        vec3 cTeal      = vec3(0.090, 0.300, 0.300);  // deep teal
        vec3 cBlue      = vec3(0.070, 0.210, 0.350);  // deep ocean blue
        vec3 cTerracotta= vec3(0.620, 0.250, 0.150);  // deep terracotta
        vec3 cGold      = vec3(0.720, 0.510, 0.190);  // burnished gold
        vec3 cInkCool   = vec3(0.030, 0.090, 0.120);  // very deep teal ink
        vec3 cInkWarm   = vec3(0.120, 0.050, 0.035);  // very deep warm-brown ink
        vec3 cCharcoal  = vec3(0.025, 0.025, 0.030);  // near-black charcoal

        vec3 col = cPaper;
        // Cream shadows where ink starts to gather
        col = mix(col, cPaperShade, smoothstep(0.25, 0.45, f) * 0.7);
        // Mid tones — cool (teal/blue) or warm (terracotta/gold) depending on the warm field
        vec3 midCool = mix(cTeal, cBlue, bands);
        vec3 midWarm = mix(cTerracotta, cGold, bands);
        vec3 mid     = mix(midCool, midWarm, warm);
        col = mix(col, mid, smoothstep(0.40, 0.70, f) * 0.92);
        // Deep ink in the core swirls (matches the zone's temperature)
        vec3 deep = mix(cInkCool, cInkWarm, warm);
        col = mix(col, deep, smoothstep(0.62, 0.86, f));
        // Charcoal in the densest folds
        col = mix(col, cCharcoal,   smoothstep(0.82, 0.96, f) * 0.75);
        // Sparse gold wisps catching the light along warm band edges
        col = mix(col, cGold,       smoothstep(0.48, 0.60, f) * bands * warm * 0.20);

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

    // Mobile: render the shader at a much lower internal resolution to keep scroll smooth.
    // The browser upscales the canvas via CSS — the marbled flow hides the low-res sampling.
    const dpr = isMobile ? 0.5 : Math.min(window.devicePixelRatio || 1, 1.5)
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

    function drawAt(t: number) {
      gl!.uniform2f(uRes, canvas!.width, canvas!.height)
      gl!.uniform1f(uTime, t)
      gl!.drawArrays(gl!.TRIANGLES, 0, 6)
    }

    // Reduced-motion: paint one still frame and skip the animation loop entirely.
    if (reduceMotion) {
      window.removeEventListener('resize', resize)
      const onResizeStatic = () => { resize(); drawAt(0) }
      window.addEventListener('resize', onResizeStatic)
      drawAt(0)
      return () => window.removeEventListener('resize', onResizeStatic)
    }

    let animId = 0
    let paused = false
    const start = performance.now()
    // Cap to ~24fps on mobile, full rAF on desktop.
    const minFrameMs = isMobile ? 1000 / 24 : 0
    let lastFrame = 0
    function frame(now: number) {
      animId = requestAnimationFrame(frame)
      if (now - lastFrame < minFrameMs) return
      lastFrame = now
      drawAt((now - start) / 1000)
    }
    animId = requestAnimationFrame(frame)

    // Stop rendering while the tab/app is backgrounded — saves battery and CPU on phones.
    function onVisibility() {
      if (document.hidden) {
        if (!paused) { cancelAnimationFrame(animId); paused = true }
      } else if (paused) {
        paused = false
        lastFrame = 0
        animId = requestAnimationFrame(frame)
      }
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVisibility)
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

function Tag({ children, color = '#3f3f46' }: { children: React.ReactNode; color?: string }) {
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
      style={{ background: color + '22', color, border: `1px solid ${color}55` }}>
      {children}
    </span>
  )
}

function GithubLink({ href, accent }: { href: string; accent: string }) {
  return (
    <a href={href} target="_blank" rel="noreferrer"
      className="github-link group/gh inline-flex items-center gap-2 text-sm font-medium text-zinc-700 transition-colors duration-300"
      style={{ ['--accent' as string]: accent }}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
      View on GitHub
      <span className="transition-transform duration-300 group-hover/gh:translate-x-1">→</span>
    </a>
  )
}

/* ── Editorial Project Entry ──────────────────────────── */
function ProjectEntry({ project, index }: { project: Project; index: number }) {
  return (
    <article
      className="project-entry group relative border-t border-zinc-900/15 py-8 sm:py-9"
      style={{ ['--accent' as string]: project.accent }}
    >
      {/* accent rule that grows on hover */}
      <span className="absolute -top-px left-0 h-px w-0 group-hover:w-full transition-all duration-500"
        style={{ background: project.accent }} />

      <div className="grid grid-cols-12 gap-x-5 gap-y-3">
        {/* index */}
        <div className="col-span-12 sm:col-span-1">
          <span className="font-mono text-sm text-zinc-500 group-hover:text-[var(--accent)] transition-colors duration-300">
            {String(index).padStart(2, '0')}
          </span>
        </div>

        {/* title + description */}
        <div className="col-span-12 sm:col-span-7">
          <p className="text-xs font-medium text-zinc-500 mb-1.5">{project.meta}</p>
          <h3 className="display-serif text-3xl sm:text-4xl text-zinc-900 leading-tight mb-3 flex items-center gap-3">
            <span className="text-2xl transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">{project.icon}</span>
            <span>{project.name}</span>
          </h3>
          {project.award && (
            <div className="award-badge inline-flex items-center gap-1.5 mb-3 px-3 py-1 rounded-full text-xs font-semibold"
              style={{ color: '#7a5c1e', background: 'rgba(200,155,60,0.16)', border: '1px solid rgba(200,155,60,0.5)' }}>
              {project.award}
            </div>
          )}
          <p className="text-zinc-700 text-sm sm:text-[15px] leading-relaxed max-w-xl">{project.desc}</p>
        </div>

        {/* tech + link */}
        <div className="col-span-12 sm:col-span-4 flex flex-col gap-4 sm:items-end">
          <div className="flex flex-wrap gap-2 sm:justify-end">
            {project.tech.map(t => <Tag key={t} color={project.accent}>{t}</Tag>)}
          </div>
          <GithubLink href={project.github} accent={project.accent} />
        </div>
      </div>
    </article>
  )
}

/* ── Editorial Section Header ─────────────────────────── */
function SectionHeader({ title, count }: { title: string; count: string }) {
  return (
    <div className="flex items-baseline gap-4 mt-16 mb-2">
      <h2 className="display-serif-i text-3xl sm:text-4xl text-zinc-900 leading-none">{title}</h2>
      <div className="flex-1 h-px bg-zinc-900/25" />
      <span className="text-xs font-mono text-zinc-600 tracking-widest">{count}</span>
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
          will-change: transform;
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
        /* Mobile: much lighter blur and no hover-lift to keep scrolling smooth */
        @media (max-width: 768px) {
          .grad-card {
            backdrop-filter: blur(12px) saturate(120%);
            -webkit-backdrop-filter: blur(12px) saturate(120%);
            box-shadow:
              0 1px 0 rgba(255,255,255,0.8) inset,
              0 10px 24px -14px rgba(31,42,74,0.30);
            transition: none;
          }
          .grad-card:hover { transform: none; }
        }
        /* Respect users who prefer reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .grad-card, .grad-card:hover { transition: none; transform: none; }
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

        /* Editorial GitHub link — picks up the project accent on hover */
        .github-link:hover { color: var(--accent); }
        .project-entry:hover { background: linear-gradient(90deg, rgba(255,255,255,0.18), transparent 70%); }

        /* Champion badge — soft golden glow pulse */
        @keyframes award-glow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(200,155,60,0.0); }
          50%      { box-shadow: 0 0 14px 1px rgba(200,155,60,0.45); }
        }
        .award-badge { animation: award-glow 2.8s ease-in-out infinite; }
      `}</style>

      <PaperFlowBackground />
      {/* Cream wash — mutes the water shader into a quiet paper texture so dark text stays readable everywhere */}
      <div className="fixed inset-0 z-0 pointer-events-none" style={{ background: 'rgba(244,237,224,0.55)' }} />

      <div className={`relative z-10 max-w-4xl mx-auto px-5 sm:px-8 py-12 sm:py-16 transition-all duration-700 ${loaded ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>

        {/* ── Hero ─────────────────────────────────── */}
        <header className="fade-in-up-d1 flex flex-col sm:flex-row items-center sm:items-start gap-7 pb-10 border-b border-zinc-900/15">
          <div className="shrink-0"><ProfilePhoto /></div>
          <div className="text-center sm:text-left flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-[#5a6b4a] animate-pulse" />
              <span className="text-xs text-zinc-500">Available for opportunities</span>
            </div>
            <h1 className="display-serif text-6xl sm:text-7xl md:text-8xl mb-4 text-zinc-900 leading-none">
              Vince <span className="display-serif-i">Loo</span>
            </h1>
            <p className="text-zinc-700 text-sm sm:text-base max-w-lg leading-relaxed mb-5">
              Data Science & Software Development student at Taylor's University, Malaysia.
              Building cross-platform apps and intelligent systems.
            </p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-3">
              <Tag color="#1f2a4a">Data Science</Tag>
              <Tag color="#c84a3b">Software Dev</Tag>
              <Tag color="#5a6b4a">🎓 Taylor's University</Tag>
              <Tag color="#0a0a14">Malaysia 🇲🇾</Tag>
            </div>
          </div>
        </header>

        {/* ── Hackathon Projects ───────────────────── */}
        <section className="fade-in-up-d2">
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
          <SectionHeader title="Tech Stack" count="13" />
          <div className="mt-6 mb-8 -mx-1">
            <Ticker />
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-x-4 gap-y-6">
            {skills.map((s, i) => (
              <div key={i}
                className="group flex flex-col items-center gap-2 text-center cursor-default">
                <img
                  src={s.icon}
                  alt={s.name}
                  loading="lazy"
                  className="w-8 h-8 object-contain transition-transform duration-300 group-hover:scale-125 group-hover:-translate-y-1"
                />
                <span className="font-medium text-sm text-zinc-900">{s.name}</span>
                <span className="text-xs text-zinc-500 leading-tight">{s.desc}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Contact ──────────────────────────────── */}
        <section>
          <SectionHeader title="Let's build something" count="05" />
          <p className="text-zinc-500 text-sm mt-4 mb-6">Open to collabs, hackathons, and cool ideas.</p>
          <div className="border-t border-zinc-900/15">
            {[
              { icon: 'https://cdn.simpleicons.org/gmail',     label: 'Email',     href: 'mailto:loovincent268@gmail.com',                   val: 'loovincent268@gmail.com' },
              { icon: `${DEVICON}/linkedin/linkedin-original.svg`, label: 'LinkedIn', href: 'https://www.linkedin.com/in/vince-loo-82565a31b', val: 'Vince Loo' },
              { icon: 'https://cdn.simpleicons.org/instagram', label: 'Instagram', href: 'https://www.instagram.com/vince__loo/',            val: 'vince__loo' },
              { icon: 'https://cdn.simpleicons.org/github/1f2a4a', label: 'GitHub', href: 'https://github.com/POTATO0826',                   val: 'POTATO0826' },
              { icon: 'https://cdn.simpleicons.org/whatsapp',  label: 'WhatsApp',  href: 'https://wa.link/4ixpfx',                           val: 'Chat now' },
            ].map(c => (
              <a key={c.label} href={c.href} target="_blank" rel="noreferrer"
                className="flex items-center gap-4 py-4 border-b border-zinc-900/15 group transition-all duration-300 hover:px-2">
                <img src={c.icon} alt={c.label} loading="lazy" className="w-5 h-5 object-contain shrink-0" />
                <div className="w-24 shrink-0 text-xs uppercase tracking-wider text-zinc-500">{c.label}</div>
                <div className="flex-1 min-w-0 text-sm font-medium text-zinc-900 truncate">{c.val}</div>
                <span className="text-zinc-400 group-hover:text-zinc-900 group-hover:translate-x-1 transition-all">→</span>
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
