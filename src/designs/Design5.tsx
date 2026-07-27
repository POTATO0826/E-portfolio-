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
    meta: 'IIMS Hackathon 2026 · Nepal 🇳🇵',
    name: 'Finchpoint',
    icon: '🐔',
    desc: 'An AI that watches your chickens so you don\'t have to. Coop cameras count the flock and flag anyone acting off, then every morning Finch drops a coop check-up straight into WhatsApp or Telegram — who to check on first, how warm they are, plus a snapshot as proof. Ask it anything about your flock and it actually knows your farm, not just chicken facts.',
    tech: ['Computer Vision', 'Convex', 'WhatsApp Bot', 'React'],
    github: 'https://github.com/POTATO0826/IIMS-Hackathon',
    accent: '#c89b3c',
    award: '🏆 Champion · Open Track',
    ...GOLD_GRAD,
  },
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
    const OCTAVES = isMobile ? 4 : 6

    const vertSrc = `
      attribute vec2 a_pos;
      void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
    `

    const fragSrc = `
      // The marble hash uses large constants — needs highp to stay color-accurate.
      // mediump made phones go yellow, so use highp wherever the GPU supports it.
      #ifdef GL_FRAGMENT_PRECISION_HIGH
      precision highp float;
      #else
      precision mediump float;
      #endif
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

/* ── Koi Pond ─────────────────────────────────────────
   Ink-wash koi drifting beneath the paper. Every fish is drawn procedurally —
   a swimming spine, a tapered body, sway-driven fins, and clipped colour
   patches — then multiplied onto the cream wash so it reads as pigment in the
   page rather than a sprite sitting on top of it.

   Three things make it feel alive rather than looped:
     · depth — each koi drifts between deep (small, faint, blurred) and surfaced
       (large, crisp), so the shoal never sits on one flat plane
     · avoidance — koi bank away from the cursor the way real fish do
     · ripples — click or tap to drop a ring; nearby koi startle and scatter,
       and surfaced koi leave their own dimples as they pass                   */

type Blob = { ds: number; dlat: number; r: number }
type Patch = { s: number; lat: number; r: number; blobs: Blob[] }
type Koi = {
  x: number; y: number; h: number
  speed: number; len: number
  z: number; zTarget: number
  phase: number; waveSpeed: number
  seed: number; startle: number
  body: string; patch: string; fin: string
  patches: Patch[]
}
type Ripple = { x: number; y: number; r0: number; max: number; age: number; life: number; w: number }
type Bubble = { x: number; y: number; r: number; vx: number; vy: number; age: number; life: number }

const TAU = Math.PI * 2

// Kohaku only — pearl-white bodies with red or orange hi. The four entries are
// the same two fish at slightly different hi shades, so a shoal never looks
// stamped from one template. Bodies sit just under the paper tone so the
// silhouette still reads after multiply blending.
const KOI_VARIETIES = [
  { body: '#ece5d6', patch: '#d4472a', fin: 'rgba(198,186,166,0.40)' },  // red & white
  { body: '#ebe4d5', patch: '#e0763a', fin: 'rgba(196,184,164,0.40)' },  // orange & white
  { body: '#e9e2d3', patch: '#c23f26', fin: 'rgba(194,182,162,0.40)' },  // deeper red & white
  { body: '#ece6d8', patch: '#e88b41', fin: 'rgba(198,188,168,0.40)' },  // lighter orange & white
]

// Blunt rounded nose, widest just behind the head, tapering to a narrow
// peduncle where the tail attaches — the top-down koi silhouette.
function bodyWidth(s: number) {
  if (s < 0.22) {
    const u = (0.22 - s) / 0.22
    return Math.sqrt(Math.max(0, 1 - u * u))
  }
  return Math.pow(1 - (s - 0.22) / 0.78, 0.9) * 0.84 + 0.16
}

function wrapAngle(a: number) {
  while (a > Math.PI) a -= TAU
  while (a < -Math.PI) a += TAU
  return a
}

function KoiPond() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const isMobile = window.matchMedia('(max-width: 768px), (pointer: coarse)').matches
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const COUNT = isMobile ? 3 : 5
    const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2)

    let W = window.innerWidth
    let H = window.innerHeight

    function resize() {
      W = window.innerWidth
      H = window.innerHeight
      canvas!.width = Math.floor(W * dpr)
      canvas!.height = Math.floor(H * dpr)
      canvas!.style.width = W + 'px'
      canvas!.style.height = H + 'px'
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()

    const rand = (a: number, b: number) => a + Math.random() * (b - a)

    function makeKoi(i: number): Koi {
      const v = KOI_VARIETIES[i % KOI_VARIETIES.length]
      const z = rand(0.15, 1)
      return {
        x: rand(0.1, 0.9) * W,
        y: rand(0.1, 0.9) * H,
        h: rand(0, TAU),
        speed: rand(11, 24),
        len: rand(95, 165) * (isMobile ? 0.72 : 1),
        z, zTarget: rand(0.15, 1),
        phase: rand(0, TAU),
        waveSpeed: rand(4.6, 6.4),
        seed: rand(0, 100),
        startle: 0,
        ...v,
        // 2–4 asymmetric markings pinned to body coordinates so they swim with the
        // fish. Each is a cluster of overlapping blobs — real koi markings have
        // ragged organic edges, never clean ellipses.
        patches: Array.from({ length: Math.round(rand(2, 4)) }, () => ({
          s: rand(0.08, 0.72),
          lat: rand(-0.4, 0.4),
          r: rand(0.07, 0.15),
          blobs: Array.from({ length: 3 }, () => ({
            ds: rand(-0.07, 0.07),
            dlat: rand(-0.55, 0.55),
            r: rand(0.6, 1.15),
          })),
        })),
      }
    }

    const koi: Koi[] = Array.from({ length: COUNT }, (_, i) => makeKoi(i))
    const ripples: Ripple[] = []
    const bubbles: Bubble[] = []

    let pointerX = -9999
    let pointerY = -9999

    function drawKoi(k: Koi) {
      const scale = 0.55 + k.z * 0.6
      const L = k.len * scale
      const maxW = L * 0.19
      const N = 18

      // Spine — a travelling sine wave that whips harder toward the tail
      const pts: number[][] = []
      for (let i = 0; i < N; i++) {
        const s = i / (N - 1)
        const wave = Math.sin(k.phase - s * 3.4) * L * 0.055 * (0.25 + s * s * 1.5)
        const bx = k.x - Math.cos(k.h) * s * L
        const by = k.y - Math.sin(k.h) * s * L
        pts.push([bx - Math.sin(k.h) * wave, by + Math.cos(k.h) * wave, s])
      }

      // Outline from per-point normals
      const left: number[][] = []
      const right: number[][] = []
      for (let i = 0; i < N; i++) {
        const a = pts[Math.max(0, i - 1)]
        const b = pts[Math.min(N - 1, i + 1)]
        let tx = b[0] - a[0]
        let ty = b[1] - a[1]
        const m = Math.hypot(tx, ty) || 1
        tx /= m; ty /= m
        const w = maxW * bodyWidth(pts[i][2])
        left.push([pts[i][0] - ty * w, pts[i][1] + tx * w])
        right.push([pts[i][0] + ty * w, pts[i][1] - tx * w])
      }

      const bodyPath = () => {
        ctx!.beginPath()
        ctx!.moveTo(left[0][0], left[0][1])
        for (let i = 1; i < N; i++) ctx!.lineTo(left[i][0], left[i][1])
        for (let i = N - 1; i >= 0; i--) ctx!.lineTo(right[i][0], right[i][1])
        ctx!.closePath()
      }

      // Sample a point on the body given position-along-spine and lateral offset
      const at = (s: number, lat: number) => {
        const q = pts[Math.min(N - 1, Math.max(0, Math.round(s * (N - 1))))]
        const w = maxW * bodyWidth(Math.min(1, Math.max(0, s)))
        return [q[0] - Math.sin(k.h) * lat * w, q[1] + Math.cos(k.h) * lat * w]
      }

      ctx!.save()

      // Cast shadow on the pond floor — the single strongest depth cue. Deep koi
      // throw a wide soft shadow far below them, surfaced koi a tight dark one.
      const shOff = (1 - k.z) * 26 + 5
      ctx!.save()
      ctx!.globalAlpha = (0.035 + k.z * 0.085)
      if (!isMobile) ctx!.filter = `blur(${(5 + (1 - k.z) * 8).toFixed(1)}px)`
      ctx!.fillStyle = '#0b1020'
      ctx!.translate(shOff * 0.5, shOff)
      bodyPath()
      ctx!.fill()
      ctx!.restore()

      ctx!.globalAlpha = 0.30 + k.z * 0.48
      // Deep koi sit out of focus; blur is desktop-only to keep phones smooth
      if (!isMobile && k.z < 0.75) ctx!.filter = `blur(${((0.75 - k.z) * 3.4).toFixed(2)}px)`

      const tail = pts[N - 1]
      const prev = pts[N - 3]
      const ta = Math.atan2(tail[1] - prev[1], tail[0] - prev[0])
      const tl = L * 0.4
      const swing = Math.sin(k.phase - 3.4) * 0.5

      ctx!.fillStyle = k.fin

      // Caudal fin — two big trailing lobes, forked at the centre and lagging
      // behind the tail beat so the whole fin trails the body like fabric
      for (const dir of [1, -1]) {
        const spread = dir * 0.46 + swing * 0.4
        const tipX = tail[0] + Math.cos(ta + spread) * tl
        const tipY = tail[1] + Math.sin(ta + spread) * tl
        // Fork: the inner edge returns only part-way, leaving a notch
        const notchX = tail[0] + Math.cos(ta + swing * 0.3) * tl * 0.5
        const notchY = tail[1] + Math.sin(ta + swing * 0.3) * tl * 0.5
        ctx!.beginPath()
        ctx!.moveTo(tail[0], tail[1])
        ctx!.quadraticCurveTo(
          tail[0] + Math.cos(ta + dir * 0.9) * tl * 0.5,
          tail[1] + Math.sin(ta + dir * 0.9) * tl * 0.5,
          tipX, tipY,
        )
        ctx!.quadraticCurveTo(
          (tipX + notchX) * 0.5 + Math.cos(ta) * tl * 0.1,
          (tipY + notchY) * 0.5 + Math.sin(ta) * tl * 0.1,
          notchX, notchY,
        )
        ctx!.closePath()
        ctx!.fill()
      }

      // Pectoral fins — sculling just behind the gills, out of phase left/right
      const flap = Math.sin(k.phase * 0.9) * 0.3
      for (const dir of [1, -1]) {
        const base = at(0.26, dir * 0.85)
        ctx!.save()
        ctx!.translate(base[0], base[1])
        ctx!.rotate(k.h + Math.PI - dir * (0.7 + flap))
        ctx!.beginPath()
        ctx!.moveTo(0, 0)
        ctx!.quadraticCurveTo(L * 0.1, dir * L * 0.055, L * 0.19, dir * L * 0.02)
        ctx!.quadraticCurveTo(L * 0.1, -dir * L * 0.01, 0, 0)
        ctx!.fill()
        ctx!.restore()
      }

      // Pelvic fins — smaller pair further back
      for (const dir of [1, -1]) {
        const base = at(0.58, dir * 0.8)
        ctx!.save()
        ctx!.translate(base[0], base[1])
        ctx!.rotate(k.h + Math.PI - dir * (0.6 - flap * 0.5))
        ctx!.beginPath()
        ctx!.ellipse(L * 0.055, 0, L * 0.07, L * 0.026, 0, 0, TAU)
        ctx!.fill()
        ctx!.restore()
      }

      // Dorsal fin — from above it reads as a translucent ridge running the spine
      ctx!.beginPath()
      const d0 = at(0.3, 0)
      ctx!.moveTo(d0[0], d0[1])
      for (let s = 0.3; s <= 0.68; s += 0.05) {
        const e = at(s, Math.sin((s - 0.3) / 0.38 * Math.PI) * 0.34)
        ctx!.lineTo(e[0], e[1])
      }
      for (let s = 0.68; s >= 0.3; s -= 0.05) {
        const e = at(s, -Math.sin((s - 0.3) / 0.38 * Math.PI) * 0.34)
        ctx!.lineTo(e[0], e[1])
      }
      ctx!.closePath()
      ctx!.fill()

      // Body
      ctx!.fillStyle = k.body
      bodyPath()
      ctx!.fill()

      // Markings, clipped so they never bleed past the silhouette
      ctx!.save()
      bodyPath()
      ctx!.clip()
      ctx!.fillStyle = k.patch
      for (const p of k.patches) {
        for (const b of p.blobs) {
          const c = at(p.s + b.ds, p.lat + b.dlat)
          const rr = L * p.r * b.r
          ctx!.beginPath()
          ctx!.ellipse(c[0], c[1], rr, rr * 0.78, k.h, 0, TAU)
          ctx!.fill()
        }
      }

      // Flank shading — the body is a cylinder, so the edges fall away into
      // shadow while the spine stays lit. Still clipped to the silhouette.
      const g = ctx!.createLinearGradient(
        ...(at(0.4, -1.1) as [number, number]),
        ...(at(0.4, 1.1) as [number, number]),
      )
      g.addColorStop(0, 'rgba(28,36,58,0.18)')
      g.addColorStop(0.42, 'rgba(28,36,58,0)')
      g.addColorStop(0.58, 'rgba(28,36,58,0)')
      g.addColorStop(1, 'rgba(28,36,58,0.18)')
      ctx!.fillStyle = g
      ctx!.fillRect(k.x - L * 1.3, k.y - L * 1.3, L * 2.6, L * 2.6)
      ctx!.restore()

      // Gill plate — a soft crease behind the head
      if (k.z > 0.45) {
        const ga = at(0.2, -0.95)
        const gb = at(0.14, 0)
        const gc = at(0.2, 0.95)
        ctx!.strokeStyle = 'rgba(20,26,45,0.22)'
        ctx!.lineWidth = Math.max(0.5, L * 0.008)
        ctx!.beginPath()
        ctx!.moveTo(ga[0], ga[1])
        ctx!.quadraticCurveTo(gb[0], gb[1], gc[0], gc[1])
        ctx!.stroke()

        // Barbels — the two whiskers at the mouth, projecting past the nose and
        // sweeping back. Measured off the nose directly: at() collapses to zero
        // width there, so it can't place anything forward of the head.
        const nose = pts[0]
        const fx = Math.cos(k.h)
        const fy = Math.sin(k.h)
        const sx = -Math.sin(k.h)
        const sy = Math.cos(k.h)
        ctx!.lineWidth = Math.max(0.4, L * 0.006)
        ctx!.strokeStyle = 'rgba(20,26,45,0.3)'
        for (const dir of [1, -1]) {
          ctx!.beginPath()
          ctx!.moveTo(nose[0] + sx * dir * maxW * 0.3, nose[1] + sy * dir * maxW * 0.3)
          ctx!.quadraticCurveTo(
            nose[0] + fx * L * 0.05 + sx * dir * maxW * 0.95,
            nose[1] + fy * L * 0.05 + sy * dir * maxW * 0.95,
            nose[0] - fx * L * 0.02 + sx * dir * maxW * 1.35,
            nose[1] - fy * L * 0.02 + sy * dir * maxW * 1.35,
          )
          ctx!.stroke()
        }
      }

      // Eyes — set wide on the head, only legible once near the surface
      if (k.z > 0.5) {
        ctx!.fillStyle = 'rgba(12,16,30,0.72)'
        for (const dir of [1, -1]) {
          const e = at(0.1, dir * 0.72)
          ctx!.beginPath()
          ctx!.arc(e[0], e[1], Math.max(0.9, L * 0.018), 0, TAU)
          ctx!.fill()
        }
      }
      ctx!.restore()
    }

    // One clean hairline ring. A ripple decelerates as it spreads, so the radius
    // eases out while the stroke thins and fades — no hard pop at either end.
    function drawRipple(r: Ripple) {
      if (r.age < 0) return
      const p = Math.min(1, r.age / r.life)
      const rad = r.r0 + r.max * (1 - Math.pow(1 - p, 2.6))
      const a = Math.pow(1 - p, 1.7) * 0.32
      if (a < 0.004) return
      ctx!.strokeStyle = `rgba(24,32,56,${a.toFixed(3)})`
      ctx!.lineWidth = Math.max(0.35, r.w * (1 - p * 0.65))
      ctx!.beginPath()
      ctx!.arc(r.x, r.y, rad, 0, TAU)
      ctx!.stroke()
    }

    // Bubbles kicked loose by the tap — they drift up, expand slightly, and go
    function drawBubble(b: Bubble) {
      const p = b.age / b.life
      const a = Math.pow(1 - p, 1.4) * 0.34
      if (a < 0.004) return
      ctx!.strokeStyle = `rgba(24,32,56,${a.toFixed(3)})`
      ctx!.lineWidth = 0.9
      ctx!.beginPath()
      ctx!.arc(b.x, b.y, b.r * (1 + p * 0.4), 0, TAU)
      ctx!.stroke()
    }

    function render() {
      ctx!.clearRect(0, 0, W, H)
      for (const r of ripples) drawRipple(r)
      // Far fish first so surfaced koi overlap them correctly
      for (const k of [...koi].sort((a, b) => a.z - b.z)) drawKoi(k)
      for (const b of bubbles) drawBubble(b)
    }

    function step(dt: number, t: number) {
      for (const k of koi) {
        // Lazy wander — two detuned sines so the path never repeats cleanly
        k.h += Math.sin(t * 0.31 + k.seed) * 0.010 + Math.sin(t * 0.13 + k.seed * 2.1) * 0.006

        // Bank away from the cursor, harder the closer it gets
        const dx = k.x - pointerX
        const dy = k.y - pointerY
        const d = Math.hypot(dx, dy)
        if (d < 190) {
          const away = Math.atan2(dy, dx)
          k.h += wrapAngle(away - k.h) * 0.07 * (1 - d / 190)
          k.startle = Math.max(k.startle, (1 - d / 190) * 0.6)
        }

        // Soft walls — turn back toward centre before swimming off-screen
        const m = 90
        if (k.x < m || k.x > W - m || k.y < m || k.y > H - m) {
          const toCentre = Math.atan2(H / 2 - k.y, W / 2 - k.x)
          k.h += wrapAngle(toCentre - k.h) * 0.02
        }

        k.startle *= 0.97
        const v = k.speed * (1 + k.startle * 2.2)
        k.x += Math.cos(k.h) * v * dt
        k.y += Math.sin(k.h) * v * dt
        k.phase += (k.waveSpeed + k.startle * 6) * dt

        // Drift between depths, picking a new target once the current one is reached
        k.z += (k.zTarget - k.z) * 0.25 * dt
        if (Math.abs(k.z - k.zTarget) < 0.03) k.zTarget = rand(0.15, 1)

        // Surfaced koi dimple the water as they pass
        if (k.z > 0.8 && Math.random() < dt * 0.35 && ripples.length < 20) {
          ripples.push({ x: k.x, y: k.y, r0: 2, max: 34 + Math.random() * 26, age: 0, life: 2.6, w: 0.9 })
        }
      }

      for (let i = ripples.length - 1; i >= 0; i--) {
        ripples[i].age += dt
        if (ripples[i].age >= ripples[i].life) ripples.splice(i, 1)
      }

      for (let i = bubbles.length - 1; i >= 0; i--) {
        const b = bubbles[i]
        b.age += dt
        b.x += b.vx * dt
        b.y += b.vy * dt
        b.vy -= 26 * dt          // buoyancy — bubbles accelerate upward
        b.vx *= 1 - 1.4 * dt     // and lose their outward kick to drag
        if (b.age >= b.life) bubbles.splice(i, 1)
      }
    }

    // Reduced motion: one still frame, no loop, no listeners beyond resize
    if (reduceMotion) {
      const onResizeStatic = () => { resize(); render() }
      window.addEventListener('resize', onResizeStatic)
      render()
      return () => window.removeEventListener('resize', onResizeStatic)
    }

    function onPointerMove(e: PointerEvent) {
      pointerX = e.clientX
      pointerY = e.clientY
    }
    function onPointerLeave() {
      pointerX = -9999
      pointerY = -9999
    }
    // Click anywhere: three staggered rings spreading from the impact point, a
    // small burst of bubbles, and every koi nearby bolts.
    function onPointerDown(e: PointerEvent) {
      if (ripples.length > 26) return
      const x = e.clientX
      const y = e.clientY
      ripples.push({ x, y, r0: 3, max: 168, age: 0,     life: 2.4, w: 1.5 })
      ripples.push({ x, y, r0: 2, max: 118, age: -0.14, life: 2.1, w: 1.1 })
      ripples.push({ x, y, r0: 1, max: 74,  age: -0.28, life: 1.8, w: 0.8 })
      const n = isMobile ? 4 : 7
      for (let i = 0; i < n; i++) {
        const a = rand(0, TAU)
        const sp = rand(14, 46)
        bubbles.push({
          x: x + Math.cos(a) * rand(1, 9),
          y: y + Math.sin(a) * rand(1, 9),
          r: rand(1.4, 4.2),
          vx: Math.cos(a) * sp,
          vy: Math.sin(a) * sp * 0.5 - rand(6, 20),
          age: 0,
          life: rand(0.9, 1.7),
        })
      }
      for (const k of koi) {
        const d = Math.hypot(k.x - e.clientX, k.y - e.clientY)
        if (d < 280) {
          k.h += wrapAngle(Math.atan2(k.y - e.clientY, k.x - e.clientX) - k.h) * 0.55
          k.startle = Math.min(1, k.startle + (1 - d / 280))
        }
      }
    }

    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('pointerdown', onPointerDown, { passive: true })
    window.addEventListener('pointerleave', onPointerLeave)

    let animId = 0
    let paused = false
    let last = performance.now()
    const minFrameMs = 1000 / 30   // koi drift slowly — 30fps looks identical and costs half

    function frame(now: number) {
      animId = requestAnimationFrame(frame)
      const elapsed = now - last
      if (elapsed < minFrameMs) return
      last = now
      const dt = Math.min(elapsed / 1000, 0.06)   // clamp so tab-switches don't teleport the shoal
      step(dt, now / 1000)
      render()
    }
    animId = requestAnimationFrame(frame)

    function onVisibility() {
      if (document.hidden) {
        if (!paused) { cancelAnimationFrame(animId); paused = true }
      } else if (paused) {
        paused = false
        last = performance.now()
        animId = requestAnimationFrame(frame)
      }
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointerleave', onPointerLeave)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0"
      style={{ mixBlendMode: 'multiply' }}
    />
  )
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
      {/* Koi swim above the wash so they stay legible — multiply blending keeps them ink-on-paper */}
      <KoiPond />

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
