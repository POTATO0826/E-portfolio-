import { useState, useEffect, useRef } from 'react'

// Modern Bento design with space-themed animated background

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

const hackathonProjects = [
  {
    hackathon: 'KitaHack 2025',
    location: 'Malaysia 🇲🇾',
    name: 'ProjekWatch',
    icon: '🏠',
    desc: 'A community-driven platform that tracks the real progress of infrastructure projects such as housing, roads, and public facilities. Users can upload photos and updates to verify construction activity, helping improve transparency and accountability in development projects.',
    tech: ['Flutter', 'Dart', 'Firebase'],
    github: 'https://github.com/yapzhanquan/KitahackTaygood',
    accent: '#818cf8',
    gradient: 'linear-gradient(135deg, rgba(99,102,241,0.12), rgba(139,92,246,0.08))',
    hoverGradient: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(139,92,246,0.14))',
  },
  {
    hackathon: 'LotusHack 2025',
    location: 'Vietnam 🇻🇳',
    name: 'SkyClaw',
    icon: '🛸',
    desc: 'A platform that creates immersive 3D interior tours for places like cafés, restaurants, and Airbnb properties. It allows users to explore the inside of buildings before visiting, helping businesses showcase their spaces and attract more customers.',
    tech: ['Python', 'Computer Vision', 'Telegram', 'AWS'],
    github: 'https://github.com/yapzhanquan/SkyClaw',
    accent: '#38bdf8',
    gradient: 'linear-gradient(135deg, rgba(56,189,248,0.1), rgba(129,140,248,0.06))',
    hoverGradient: 'linear-gradient(135deg, rgba(56,189,248,0.18), rgba(129,140,248,0.12))',
  },
]

/* ── Space Animated Background ───────────────────────── */
function SpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let w = 0
    let h = 0

    // Stars
    const stars: { x: number; y: number; r: number; baseO: number; speed: number }[] = []
    const STAR_COUNT = 220

    // Satellites (Starlink streaks)
    const satellites: {
      x: number; y: number; speed: number; angle: number
      length: number; brightness: number; size: number
    }[] = []
    const SAT_COUNT = 10

    // Shooting stars
    const shootingStars: {
      x: number; y: number; vx: number; vy: number
      life: number; maxLife: number; size: number
    }[] = []

    // Floating space objects (rockets, UFOs, satellites)
    type SpaceObj = {
      x: number; y: number; vx: number; vy: number
      type: 'rocket' | 'ufo' | 'satellite' | 'saturn' | 'jupiter' | 'neptune' | 'mars' | 'earth'
      size: number; rotation: number; rotSpeed: number; bobPhase: number
    }
    const spaceObjects: SpaceObj[] = []
    const SPACE_OBJ_COUNT = 12

    function resize() {
      w = canvas!.width = window.innerWidth
      h = canvas!.height = Math.max(window.innerHeight, document.documentElement.scrollHeight)
    }

    function init() {
      stars.length = 0
      for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 1.2 + 0.3,
          baseO: Math.random() * 0.7 + 0.3,
          speed: Math.random() * 2 + 1,
        })
      }

      satellites.length = 0
      for (let i = 0; i < SAT_COUNT; i++) spawnSatellite()

      spaceObjects.length = 0
      const types: SpaceObj['type'][] = ['rocket', 'ufo', 'satellite', 'saturn', 'jupiter', 'neptune', 'mars', 'earth', 'rocket', 'ufo', 'satellite', 'saturn']
      for (let i = 0; i < SPACE_OBJ_COUNT; i++) {
        const isPlanet = ['saturn', 'jupiter', 'neptune', 'mars', 'earth'].includes(types[i])
        spaceObjects.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * (isPlanet ? 0.15 : 0.3),
          vy: (Math.random() - 0.5) * (isPlanet ? 0.08 : 0.15),
          type: types[i],
          size: isPlanet ? Math.random() * 12 + 18 : Math.random() * 10 + 14,
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * (isPlanet ? 0.003 : 0.01),
          bobPhase: Math.random() * Math.PI * 2,
        })
      }
    }

    function spawnSatellite() {
      const angle = (Math.random() * 40 - 20) * (Math.PI / 180)
      const goRight = Math.random() > 0.5
      satellites.push({
        x: goRight ? -100 : w + 100,
        y: Math.random() * h * 0.7,
        speed: Math.random() * 1.5 + 0.5,
        angle: goRight ? angle : Math.PI + angle,
        length: Math.random() * 60 + 40,
        brightness: Math.random() * 0.6 + 0.4,
        size: Math.random() * 1.5 + 0.5,
      })
    }

    function maybeSpawnShootingStar() {
      if (Math.random() < 0.003 && shootingStars.length < 3) {
        shootingStars.push({
          x: Math.random() * w,
          y: 0,
          vx: (Math.random() - 0.3) * 8,
          vy: Math.random() * 6 + 4,
          life: 0,
          maxLife: Math.random() * 40 + 30,
          size: Math.random() * 2 + 1,
        })
      }
    }

    // Draw a rocket shape
    function drawRocket(x: number, y: number, size: number, rotation: number, alpha: number) {
      ctx!.save()
      ctx!.translate(x, y)
      ctx!.rotate(rotation)
      ctx!.globalAlpha = alpha

      // Body
      ctx!.fillStyle = '#c4b5fd'
      ctx!.beginPath()
      ctx!.ellipse(0, 0, size * 0.3, size * 0.6, 0, 0, Math.PI * 2)
      ctx!.fill()

      // Nose
      ctx!.fillStyle = '#f472b6'
      ctx!.beginPath()
      ctx!.moveTo(-size * 0.2, -size * 0.55)
      ctx!.lineTo(0, -size * 0.9)
      ctx!.lineTo(size * 0.2, -size * 0.55)
      ctx!.fill()

      // Window
      ctx!.fillStyle = '#38bdf8'
      ctx!.beginPath()
      ctx!.arc(0, -size * 0.15, size * 0.12, 0, Math.PI * 2)
      ctx!.fill()

      // Fins
      ctx!.fillStyle = '#818cf8'
      ctx!.beginPath()
      ctx!.moveTo(-size * 0.28, size * 0.35)
      ctx!.lineTo(-size * 0.5, size * 0.65)
      ctx!.lineTo(-size * 0.15, size * 0.5)
      ctx!.fill()
      ctx!.beginPath()
      ctx!.moveTo(size * 0.28, size * 0.35)
      ctx!.lineTo(size * 0.5, size * 0.65)
      ctx!.lineTo(size * 0.15, size * 0.5)
      ctx!.fill()

      // Flame
      const flicker = 0.7 + Math.random() * 0.3
      ctx!.fillStyle = `rgba(251,191,36,${0.8 * flicker})`
      ctx!.beginPath()
      ctx!.moveTo(-size * 0.15, size * 0.55)
      ctx!.lineTo(0, size * 0.55 + size * 0.4 * flicker)
      ctx!.lineTo(size * 0.15, size * 0.55)
      ctx!.fill()
      ctx!.fillStyle = `rgba(239,68,68,${0.5 * flicker})`
      ctx!.beginPath()
      ctx!.moveTo(-size * 0.08, size * 0.55)
      ctx!.lineTo(0, size * 0.55 + size * 0.55 * flicker)
      ctx!.lineTo(size * 0.08, size * 0.55)
      ctx!.fill()

      ctx!.restore()
    }

    // Draw a UFO shape
    function drawUFO(x: number, y: number, size: number, _rotation: number, alpha: number, t: number) {
      ctx!.save()
      ctx!.translate(x, y)
      ctx!.globalAlpha = alpha

      // Bottom beam (subtle)
      const beamAlpha = 0.05 + 0.03 * Math.sin(t * 0.003)
      ctx!.fillStyle = `rgba(56,189,248,${beamAlpha})`
      ctx!.beginPath()
      ctx!.moveTo(-size * 0.3, size * 0.1)
      ctx!.lineTo(-size * 0.8, size * 2)
      ctx!.lineTo(size * 0.8, size * 2)
      ctx!.lineTo(size * 0.3, size * 0.1)
      ctx!.fill()

      // Saucer body
      ctx!.fillStyle = '#64748b'
      ctx!.beginPath()
      ctx!.ellipse(0, 0, size * 0.7, size * 0.2, 0, 0, Math.PI * 2)
      ctx!.fill()

      // Dome
      ctx!.fillStyle = '#94a3b8'
      ctx!.beginPath()
      ctx!.ellipse(0, -size * 0.08, size * 0.35, size * 0.28, 0, Math.PI, 0)
      ctx!.fill()

      // Dome glass
      ctx!.fillStyle = `rgba(56,189,248,${0.4 + 0.2 * Math.sin(t * 0.004)})`
      ctx!.beginPath()
      ctx!.ellipse(0, -size * 0.1, size * 0.2, size * 0.18, 0, Math.PI, 0)
      ctx!.fill()

      // Lights
      const lightCount = 5
      for (let i = 0; i < lightCount; i++) {
        const angle = (i / lightCount) * Math.PI - Math.PI * 0.0
        const lx = Math.cos(angle) * size * 0.55
        const ly = Math.sin(angle) * size * 0.12 + size * 0.04
        const pulse = 0.5 + 0.5 * Math.sin(t * 0.005 + i * 1.2)
        ctx!.fillStyle = i % 2 === 0
          ? `rgba(251,191,36,${pulse * 0.8})`
          : `rgba(248,113,113,${pulse * 0.8})`
        ctx!.beginPath()
        ctx!.arc(lx, ly, size * 0.04, 0, Math.PI * 2)
        ctx!.fill()
      }

      ctx!.restore()
    }

    // Draw a small satellite
    function drawSatObj(x: number, y: number, size: number, rotation: number, alpha: number) {
      ctx!.save()
      ctx!.translate(x, y)
      ctx!.rotate(rotation)
      ctx!.globalAlpha = alpha

      // Body
      ctx!.fillStyle = '#94a3b8'
      ctx!.fillRect(-size * 0.15, -size * 0.15, size * 0.3, size * 0.3)

      // Solar panels
      ctx!.fillStyle = '#3b82f6'
      ctx!.fillRect(-size * 0.7, -size * 0.1, size * 0.45, size * 0.2)
      ctx!.fillRect(size * 0.25, -size * 0.1, size * 0.45, size * 0.2)

      // Panel lines
      ctx!.strokeStyle = 'rgba(255,255,255,0.3)'
      ctx!.lineWidth = 0.5
      for (let i = 1; i < 4; i++) {
        const px = -size * 0.7 + i * size * 0.11
        ctx!.beginPath(); ctx!.moveTo(px, -size * 0.1); ctx!.lineTo(px, size * 0.1); ctx!.stroke()
        const px2 = size * 0.25 + i * size * 0.11
        ctx!.beginPath(); ctx!.moveTo(px2, -size * 0.1); ctx!.lineTo(px2, size * 0.1); ctx!.stroke()
      }

      // Antenna
      ctx!.strokeStyle = '#cbd5e1'
      ctx!.lineWidth = 1
      ctx!.beginPath(); ctx!.moveTo(0, -size * 0.15); ctx!.lineTo(0, -size * 0.4); ctx!.stroke()
      ctx!.fillStyle = '#f87171'
      ctx!.beginPath(); ctx!.arc(0, -size * 0.4, size * 0.04, 0, Math.PI * 2); ctx!.fill()

      ctx!.restore()
    }

    // Saturn — ringed purple planet
    function drawSaturn(x: number, y: number, size: number, _rotation: number, alpha: number, t: number) {
      ctx!.save()
      ctx!.translate(x, y)
      ctx!.globalAlpha = alpha

      // Back ring half
      ctx!.strokeStyle = `rgba(196,181,253,${0.25 + 0.1 * Math.sin(t * 0.002)})`
      ctx!.lineWidth = 2.5
      ctx!.beginPath()
      ctx!.ellipse(0, 0, size * 0.75, size * 0.16, -0.2, Math.PI, Math.PI * 2)
      ctx!.stroke()

      // Planet body
      const grad = ctx!.createRadialGradient(-size * 0.1, -size * 0.1, size * 0.05, 0, 0, size * 0.4)
      grad.addColorStop(0, '#c4b5fd')
      grad.addColorStop(0.5, '#8b5cf6')
      grad.addColorStop(1, '#4c1d95')
      ctx!.fillStyle = grad
      ctx!.beginPath()
      ctx!.arc(0, 0, size * 0.38, 0, Math.PI * 2)
      ctx!.fill()

      // Band stripes
      ctx!.globalAlpha = alpha * 0.15
      ctx!.fillStyle = '#e9d5ff'
      ctx!.fillRect(-size * 0.36, -size * 0.06, size * 0.72, size * 0.04)
      ctx!.fillRect(-size * 0.34, size * 0.1, size * 0.68, size * 0.03)
      ctx!.globalAlpha = alpha

      // Front ring half
      ctx!.strokeStyle = `rgba(196,181,253,${0.35 + 0.1 * Math.sin(t * 0.002)})`
      ctx!.lineWidth = 2.5
      ctx!.beginPath()
      ctx!.ellipse(0, 0, size * 0.75, size * 0.16, -0.2, 0, Math.PI)
      ctx!.stroke()
      // Second ring
      ctx!.strokeStyle = `rgba(167,139,250,${0.15 + 0.05 * Math.sin(t * 0.003)})`
      ctx!.lineWidth = 1.5
      ctx!.beginPath()
      ctx!.ellipse(0, 0, size * 0.85, size * 0.2, -0.2, 0, Math.PI * 2)
      ctx!.stroke()

      ctx!.restore()
    }

    // Jupiter — big gas giant with bands
    function drawJupiter(x: number, y: number, size: number, _rotation: number, alpha: number, t: number) {
      ctx!.save()
      ctx!.translate(x, y)
      ctx!.globalAlpha = alpha

      // Body
      const grad = ctx!.createRadialGradient(-size * 0.1, -size * 0.1, size * 0.05, 0, 0, size * 0.45)
      grad.addColorStop(0, '#fbbf75')
      grad.addColorStop(0.4, '#d97706')
      grad.addColorStop(0.7, '#b45309')
      grad.addColorStop(1, '#78350f')
      ctx!.fillStyle = grad
      ctx!.beginPath()
      ctx!.arc(0, 0, size * 0.45, 0, Math.PI * 2)
      ctx!.fill()

      // Clip for bands
      ctx!.save()
      ctx!.beginPath()
      ctx!.arc(0, 0, size * 0.44, 0, Math.PI * 2)
      ctx!.clip()

      // Horizontal bands
      ctx!.globalAlpha = alpha * 0.25
      const bands = [
        { y: -size * 0.28, h: size * 0.06, c: '#fef3c7' },
        { y: -size * 0.12, h: size * 0.07, c: '#92400e' },
        { y: size * 0.02, h: size * 0.05, c: '#fde68a' },
        { y: size * 0.15, h: size * 0.08, c: '#78350f' },
        { y: size * 0.28, h: size * 0.05, c: '#fef3c7' },
      ]
      for (const b of bands) {
        ctx!.fillStyle = b.c
        ctx!.fillRect(-size * 0.5, b.y, size, b.h)
      }

      // Great Red Spot
      ctx!.globalAlpha = alpha * 0.4
      const spotX = size * 0.12 + Math.sin(t * 0.0005) * size * 0.03
      ctx!.fillStyle = '#dc2626'
      ctx!.beginPath()
      ctx!.ellipse(spotX, size * 0.08, size * 0.1, size * 0.06, 0.1, 0, Math.PI * 2)
      ctx!.fill()

      ctx!.restore()
      ctx!.restore()
    }

    // Neptune — icy blue planet
    function drawNeptune(x: number, y: number, size: number, _rotation: number, alpha: number, t: number) {
      ctx!.save()
      ctx!.translate(x, y)
      ctx!.globalAlpha = alpha

      const grad = ctx!.createRadialGradient(-size * 0.1, -size * 0.12, size * 0.05, 0, 0, size * 0.4)
      grad.addColorStop(0, '#7dd3fc')
      grad.addColorStop(0.4, '#0284c7')
      grad.addColorStop(0.8, '#0c4a6e')
      grad.addColorStop(1, '#082f49')
      ctx!.fillStyle = grad
      ctx!.beginPath()
      ctx!.arc(0, 0, size * 0.38, 0, Math.PI * 2)
      ctx!.fill()

      // Atmosphere glow
      ctx!.globalAlpha = alpha * 0.15
      ctx!.strokeStyle = '#38bdf8'
      ctx!.lineWidth = 3
      ctx!.beginPath()
      ctx!.arc(0, 0, size * 0.42, 0, Math.PI * 2)
      ctx!.stroke()
      ctx!.globalAlpha = alpha

      // Dark storm bands
      ctx!.save()
      ctx!.beginPath()
      ctx!.arc(0, 0, size * 0.37, 0, Math.PI * 2)
      ctx!.clip()
      ctx!.globalAlpha = alpha * 0.2
      ctx!.fillStyle = '#0369a1'
      ctx!.fillRect(-size * 0.4, -size * 0.05, size * 0.8, size * 0.04)
      ctx!.fillStyle = '#075985'
      ctx!.fillRect(-size * 0.4, size * 0.12, size * 0.8, size * 0.05)
      // Great Dark Spot
      ctx!.globalAlpha = alpha * 0.3
      ctx!.fillStyle = '#1e3a5f'
      const spotX = -size * 0.08 + Math.sin(t * 0.0006) * size * 0.02
      ctx!.beginPath()
      ctx!.ellipse(spotX, -size * 0.02, size * 0.09, size * 0.05, -0.2, 0, Math.PI * 2)
      ctx!.fill()
      ctx!.restore()

      ctx!.restore()
    }

    // Mars — small red planet
    function drawMars(x: number, y: number, size: number, _rotation: number, alpha: number, _t: number) {
      ctx!.save()
      ctx!.translate(x, y)
      ctx!.globalAlpha = alpha

      const grad = ctx!.createRadialGradient(-size * 0.08, -size * 0.1, size * 0.03, 0, 0, size * 0.32)
      grad.addColorStop(0, '#fca5a5')
      grad.addColorStop(0.4, '#dc2626')
      grad.addColorStop(0.8, '#991b1b')
      grad.addColorStop(1, '#450a0a')
      ctx!.fillStyle = grad
      ctx!.beginPath()
      ctx!.arc(0, 0, size * 0.3, 0, Math.PI * 2)
      ctx!.fill()

      // Polar ice cap
      ctx!.save()
      ctx!.beginPath()
      ctx!.arc(0, 0, size * 0.29, 0, Math.PI * 2)
      ctx!.clip()
      ctx!.globalAlpha = alpha * 0.35
      ctx!.fillStyle = '#fef2f2'
      ctx!.beginPath()
      ctx!.ellipse(0, -size * 0.24, size * 0.14, size * 0.06, 0, 0, Math.PI * 2)
      ctx!.fill()
      // Surface features
      ctx!.globalAlpha = alpha * 0.15
      ctx!.fillStyle = '#7f1d1d'
      ctx!.beginPath()
      ctx!.ellipse(size * 0.06, size * 0.05, size * 0.1, size * 0.06, 0.5, 0, Math.PI * 2)
      ctx!.fill()
      ctx!.restore()

      ctx!.restore()
    }

    // Earth with moon
    function drawEarth(x: number, y: number, size: number, _rotation: number, alpha: number, t: number) {
      ctx!.save()
      ctx!.translate(x, y)
      ctx!.globalAlpha = alpha

      // Earth body
      const grad = ctx!.createRadialGradient(-size * 0.08, -size * 0.1, size * 0.03, 0, 0, size * 0.35)
      grad.addColorStop(0, '#60a5fa')
      grad.addColorStop(0.3, '#2563eb')
      grad.addColorStop(0.7, '#1e40af')
      grad.addColorStop(1, '#1e3a5f')
      ctx!.fillStyle = grad
      ctx!.beginPath()
      ctx!.arc(0, 0, size * 0.35, 0, Math.PI * 2)
      ctx!.fill()

      // Continents
      ctx!.save()
      ctx!.beginPath()
      ctx!.arc(0, 0, size * 0.34, 0, Math.PI * 2)
      ctx!.clip()
      ctx!.globalAlpha = alpha * 0.3
      ctx!.fillStyle = '#22c55e'
      // Landmass blobs
      ctx!.beginPath()
      ctx!.ellipse(-size * 0.08, -size * 0.08, size * 0.12, size * 0.1, 0.3, 0, Math.PI * 2)
      ctx!.fill()
      ctx!.beginPath()
      ctx!.ellipse(size * 0.12, size * 0.05, size * 0.08, size * 0.12, -0.4, 0, Math.PI * 2)
      ctx!.fill()
      ctx!.beginPath()
      ctx!.ellipse(-size * 0.05, size * 0.18, size * 0.06, size * 0.04, 0.2, 0, Math.PI * 2)
      ctx!.fill()
      // Clouds
      ctx!.globalAlpha = alpha * 0.15
      ctx!.fillStyle = '#ffffff'
      ctx!.beginPath()
      ctx!.ellipse(size * 0.05, -size * 0.15, size * 0.15, size * 0.03, -0.3, 0, Math.PI * 2)
      ctx!.fill()
      ctx!.beginPath()
      ctx!.ellipse(-size * 0.1, size * 0.1, size * 0.12, size * 0.025, 0.2, 0, Math.PI * 2)
      ctx!.fill()
      ctx!.restore()

      // Atmosphere glow
      ctx!.globalAlpha = alpha * 0.1
      ctx!.strokeStyle = '#60a5fa'
      ctx!.lineWidth = 2.5
      ctx!.beginPath()
      ctx!.arc(0, 0, size * 0.38, 0, Math.PI * 2)
      ctx!.stroke()
      ctx!.globalAlpha = alpha

      // Orbiting moon
      const moonAngle = t * 0.0008
      const moonDist = size * 0.55
      const moonX = Math.cos(moonAngle) * moonDist
      const moonY = Math.sin(moonAngle) * moonDist * 0.4
      const moonGrad = ctx!.createRadialGradient(moonX - 1, moonY - 1, 0.5, moonX, moonY, size * 0.08)
      moonGrad.addColorStop(0, '#e2e8f0')
      moonGrad.addColorStop(0.7, '#94a3b8')
      moonGrad.addColorStop(1, '#64748b')
      ctx!.fillStyle = moonGrad
      ctx!.beginPath()
      ctx!.arc(moonX, moonY, size * 0.08, 0, Math.PI * 2)
      ctx!.fill()
      // Moon craters
      ctx!.globalAlpha = alpha * 0.2
      ctx!.fillStyle = '#475569'
      ctx!.beginPath()
      ctx!.arc(moonX - size * 0.02, moonY - size * 0.01, size * 0.02, 0, Math.PI * 2)
      ctx!.fill()
      ctx!.beginPath()
      ctx!.arc(moonX + size * 0.03, moonY + size * 0.02, size * 0.015, 0, Math.PI * 2)
      ctx!.fill()

      ctx!.restore()
    }

    function draw(t: number) {
      ctx!.clearRect(0, 0, w, h)

      // Stars
      for (const s of stars) {
        const twinkle = s.baseO * (0.5 + 0.5 * Math.sin(t * 0.002 * s.speed + s.x))
        ctx!.beginPath()
        ctx!.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(200,210,255,${twinkle})`
        ctx!.fill()
      }

      // Satellites with trails
      for (let i = satellites.length - 1; i >= 0; i--) {
        const sat = satellites[i]
        sat.x += Math.cos(sat.angle) * sat.speed
        sat.y += Math.sin(sat.angle) * sat.speed
        const tailX = sat.x - Math.cos(sat.angle) * sat.length
        const tailY = sat.y - Math.sin(sat.angle) * sat.length
        const grad = ctx!.createLinearGradient(tailX, tailY, sat.x, sat.y)
        grad.addColorStop(0, 'rgba(180,190,255,0)')
        grad.addColorStop(1, `rgba(200,210,255,${sat.brightness})`)
        ctx!.beginPath(); ctx!.moveTo(tailX, tailY); ctx!.lineTo(sat.x, sat.y)
        ctx!.strokeStyle = grad; ctx!.lineWidth = sat.size; ctx!.stroke()
        ctx!.beginPath(); ctx!.arc(sat.x, sat.y, sat.size + 0.5, 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(220,225,255,${sat.brightness})`; ctx!.fill()
        if (sat.x < -200 || sat.x > w + 200 || sat.y < -200 || sat.y > h + 200) {
          satellites.splice(i, 1); spawnSatellite()
        }
      }

      // Shooting stars
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const ss = shootingStars[i]
        ss.x += ss.vx; ss.y += ss.vy; ss.life++
        const progress = ss.life / ss.maxLife
        const alpha = progress < 0.3 ? progress / 0.3 : 1 - (progress - 0.3) / 0.7
        const grad = ctx!.createLinearGradient(
          ss.x - ss.vx * 9, ss.y - ss.vy * 9, ss.x, ss.y)
        grad.addColorStop(0, 'rgba(180,160,255,0)')
        grad.addColorStop(1, `rgba(255,255,255,${alpha * 0.9})`)
        ctx!.beginPath(); ctx!.moveTo(ss.x - ss.vx * 9, ss.y - ss.vy * 9); ctx!.lineTo(ss.x, ss.y)
        ctx!.strokeStyle = grad; ctx!.lineWidth = ss.size; ctx!.stroke()
        ctx!.beginPath(); ctx!.arc(ss.x, ss.y, ss.size * 1.5, 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(255,255,255,${alpha * 0.8})`; ctx!.fill()
        if (ss.life >= ss.maxLife) shootingStars.splice(i, 1)
      }

      // Space objects (rockets, UFOs, satellites, planets)
      for (const obj of spaceObjects) {
        obj.x += obj.vx
        obj.y += obj.vy + Math.sin(t * 0.001 + obj.bobPhase) * 0.15
        obj.rotation += obj.rotSpeed

        // Wrap around
        if (obj.x < -50) obj.x = w + 50
        if (obj.x > w + 50) obj.x = -50
        if (obj.y < -50) obj.y = h + 50
        if (obj.y > h + 50) obj.y = -50

        const alpha = 0.35 + 0.1 * Math.sin(t * 0.001 + obj.bobPhase)

        switch (obj.type) {
          case 'rocket':
            drawRocket(obj.x, obj.y, obj.size, obj.rotation, alpha)
            break
          case 'ufo':
            drawUFO(obj.x, obj.y, obj.size, obj.rotation, alpha, t)
            break
          case 'satellite':
            drawSatObj(obj.x, obj.y, obj.size, obj.rotation, alpha)
            break
          case 'saturn':
            drawSaturn(obj.x, obj.y, obj.size, obj.rotation, alpha, t)
            break
          case 'jupiter':
            drawJupiter(obj.x, obj.y, obj.size, obj.rotation, alpha, t)
            break
          case 'neptune':
            drawNeptune(obj.x, obj.y, obj.size, obj.rotation, alpha, t)
            break
          case 'mars':
            drawMars(obj.x, obj.y, obj.size, obj.rotation, alpha, t)
            break
          case 'earth':
            drawEarth(obj.x, obj.y, obj.size, obj.rotation, alpha, t)
            break
        }
      }

      maybeSpawnShootingStar()
    }

    function animate(t: number) {
      draw(t)
      animId = requestAnimationFrame(animate)
    }

    resize()
    init()
    animId = requestAnimationFrame(animate)

    const handleResize = () => { resize(); init() }
    window.addEventListener('resize', handleResize)
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
}

/* ── Ambient Glow ────────────────────────────────────── */
function AmbientGlow() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div className="glow glow-1" />
      <div className="glow glow-2" />
      <div className="glow glow-3" />
    </div>
  )
}

/* ── Profile Photo ───────────────────────────────────── */
function ProfilePhoto() {
  return (
    <div className="relative group">
      <div className="absolute -inset-1 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-500 animate-spin-slow"
        style={{ background: 'conic-gradient(from 0deg, #38bdf8, #818cf8, #f472b6, #fb923c, #38bdf8)', padding: '3px' }}>
        <div className="w-full h-full rounded-full bg-[#08080a]" />
      </div>
      <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden"
        style={{ border: '2px solid rgba(129,140,248,0.3)' }}>
        <img src="/PFP.jpeg" alt="Vince Loo"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
      </div>
      <div className="absolute inset-0 rounded-full blur-2xl opacity-20 -z-10"
        style={{ background: 'radial-gradient(circle, #818cf8, transparent)' }} />
    </div>
  )
}

/* ── Ticker ──────────────────────────────────────────── */
function Ticker() {
  return (
    <div className="overflow-hidden whitespace-nowrap" style={{ maskImage: 'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)' }}>
      <div className="inline-flex gap-6 sm:gap-8 animate-marquee">
        {[...ticker, ...ticker].map((t, i) => (
          <span key={i} className="text-sm font-medium text-zinc-400 shrink-0">
            {t} <span className="text-zinc-600 mx-2">·</span>
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
  return (
    <div
      className={`grad-card rounded-2xl p-5 sm:p-6 relative overflow-hidden ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered && hoverGradient ? hoverGradient : gradient,
        borderColor: hovered && accentColor ? accentColor + '35' : undefined,
      }}
    >
      {children}
    </div>
  )
}

function Tag({ children, color = '#fff' }: { children: React.ReactNode; color?: string }) {
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
      style={{ background: color + '18', color, border: `1px solid ${color}30` }}>
      {children}
    </span>
  )
}

function GithubButton({ href }: { href: string }) {
  return (
    <a href={href} target="_blank" rel="noreferrer"
      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/25"
      style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))', border: '1px solid rgba(255,255,255,0.12)' }}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
      View on GitHub
    </a>
  )
}

/* ── Project Card ────────────────────────────────────── */
function ProjectCard({ project }: { project: typeof hackathonProjects[0] }) {
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
                <p className="text-xs text-zinc-500 font-medium">{project.hackathon} · {project.location}</p>
                <h3 className="font-bold text-base">{project.name}</h3>
              </div>
            </div>
          </div>
          <p className="text-zinc-400 text-sm leading-relaxed mb-5">{project.desc}</p>
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
    <div className="min-h-screen bg-[#06060a] text-white relative" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
      <style>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { animation: marquee 25s linear infinite; }
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-8px); } }
        .animate-float { animation: float 4s ease-in-out infinite; }
        @keyframes spin-slow { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }

        /* Card base */
        .grad-card {
          border: 1px solid rgba(255,255,255,0.07);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .grad-card:hover {
          border-color: rgba(255,255,255,0.14);
          box-shadow: 0 8px 40px -12px rgba(129,140,248,0.15);
        }

        /* Ambient glow */
        @keyframes glowDrift1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(80px, -60px) scale(1.2); }
          66% { transform: translate(-50px, 50px) scale(0.9); }
        }
        @keyframes glowDrift2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-70px, -50px) scale(1.3); }
        }
        @keyframes glowDrift3 {
          0%, 100% { transform: translate(0, 0) scale(0.9); }
          50% { transform: translate(60px, 50px) scale(1.15); }
        }
        .glow { position: absolute; border-radius: 50%; filter: blur(120px); }
        .glow-1 { width: 550px; height: 550px; top: -8%; left: 5%; background: rgba(99,102,241,0.25); animation: glowDrift1 20s ease-in-out infinite; }
        .glow-2 { width: 500px; height: 500px; top: 45%; right: 0%; background: rgba(244,114,182,0.18); animation: glowDrift2 25s ease-in-out infinite; }
        .glow-3 { width: 450px; height: 450px; bottom: 5%; left: 25%; background: rgba(56,189,248,0.15); animation: glowDrift3 18s ease-in-out infinite; }

        @keyframes fadeInUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        .fade-in-up { animation: fadeInUp 0.7s ease-out forwards; }
        .fade-in-up-d1 { animation: fadeInUp 0.7s ease-out 0.1s forwards; opacity: 0; }
        .fade-in-up-d2 { animation: fadeInUp 0.7s ease-out 0.2s forwards; opacity: 0; }
        .fade-in-up-d3 { animation: fadeInUp 0.7s ease-out 0.3s forwards; opacity: 0; }

        @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
        .shimmer-text { background-size: 200% auto; animation: shimmer 4s linear infinite; }

        @keyframes pulse-ring {
          0% { box-shadow: 0 0 0 0 rgba(129,140,248,0.4); }
          70% { box-shadow: 0 0 0 6px rgba(129,140,248,0); }
          100% { box-shadow: 0 0 0 0 rgba(129,140,248,0); }
        }
        .pulse-ring { animation: pulse-ring 2s ease-out infinite; }
      `}</style>

      <AmbientGlow />
      <SpaceBackground />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-5 py-8 sm:py-12">
        {/* Nav */}
        <nav className={`flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8 sm:mb-12 ${loaded ? 'fade-in-up' : 'opacity-0'}`}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm pulse-ring"
              style={{ background: 'linear-gradient(135deg, #38bdf8, #818cf8)' }}>
              VL
            </div>
            <span className="font-semibold text-sm">Vince Loo</span>
          </div>
          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
            <a href="https://www.linkedin.com/in/vince-loo-82565a31b" target="_blank" rel="noreferrer"
              className="px-4 py-2 rounded-xl text-center text-xs font-medium text-zinc-400 hover:text-white transition-all duration-300 grad-card">
              LinkedIn ↗
            </a>
            <a href="https://github.com/POTATO0826" target="_blank" rel="noreferrer"
              className="px-4 py-2 rounded-xl text-center text-xs font-medium text-zinc-400 hover:text-white transition-all duration-300 grad-card">
              GitHub ↗
            </a>
            <a href="mailto:loovincent268@gmail.com"
              className="px-4 py-2 rounded-xl text-center text-xs font-medium text-white transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/25 hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #38bdf8, #818cf8)' }}>
              Contact
            </a>
          </div>
        </nav>

        {/* Bento Grid */}
        <div className={`grid gap-4 transition-all duration-700 ${loaded ? 'opacity-100' : 'opacity-0 translate-y-4'}`}
          style={{ gridTemplateColumns: 'repeat(12, 1fr)' }}>

          {/* Hero card */}
          <GradCard className="col-span-12 md:col-span-8 fade-in-up-d1"
            gradient="linear-gradient(135deg, rgba(56,189,248,0.08), rgba(129,140,248,0.06), rgba(251,146,60,0.04))">
            <div className="absolute top-0 left-8 right-8 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(56,189,248,0.5), rgba(251,146,60,0.3), transparent)' }} />
            <div className="absolute -top-20 -right-20 w-52 h-52 rounded-full opacity-20"
              style={{ background: 'radial-gradient(circle, #38bdf8, transparent)' }} />
            <div className="absolute -bottom-16 -left-16 w-44 h-44 rounded-full opacity-15"
              style={{ background: 'radial-gradient(circle, #fb923c, transparent)' }} />

            <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <div className="shrink-0"><ProfilePhoto /></div>
              <div className="text-center sm:text-left flex-1">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-4">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs text-zinc-500">Available for opportunities</span>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-3">
                  <span className="shimmer-text" style={{
                    background: 'linear-gradient(90deg, #38bdf8 0%, #818cf8 25%, #f472b6 50%, #fb923c 75%, #38bdf8 100%)',
                    backgroundSize: '200% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                  }}>Vince Loo</span>
                </h1>
                <p className="text-zinc-400 text-sm sm:text-[15px] max-w-md leading-relaxed mb-5">
                  Data Science & Software Development student at Taylor's University.
                  Building cross-platform apps and intelligent systems.
                </p>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-3">
                  <Tag color="#38bdf8">Data Science</Tag>
                  <Tag color="#818cf8">Software Dev</Tag>
                  <Tag color="#fb923c">Malaysia 🇲🇾</Tag>
                </div>
              </div>
            </div>
          </GradCard>

          {/* University card */}
          <GradCard className="col-span-12 md:col-span-4 flex flex-col justify-between fade-in-up-d2"
            gradient="linear-gradient(135deg, rgba(52,211,153,0.1), rgba(56,189,248,0.06))">
            <div className="absolute top-0 left-6 right-6 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(52,211,153,0.5), transparent)' }} />
            <div>
              <div className="text-3xl mb-4 animate-float">🎓</div>
              <h3 className="font-bold text-lg mb-2">Taylor's University</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">Malaysia · Data Science & Software Engineering</p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/5">
              <div className="flex items-center justify-between text-xs text-zinc-600">
                <span>2 Hackathons</span>
                <span className="text-emerald-400">Active</span>
              </div>
            </div>
          </GradCard>

          {/* Section label */}
          <div className="col-span-12 mt-2 fade-in-up-d3">
            <h2 className="text-xs font-semibold text-zinc-600 uppercase tracking-[0.2em]">Hackathon Projects</h2>
          </div>

          {/* Project cards */}
          {hackathonProjects.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}

          {/* Skills ticker */}
          <GradCard className="col-span-12 !p-4"
            gradient="linear-gradient(90deg, rgba(99,102,241,0.05), rgba(244,114,182,0.04), rgba(56,189,248,0.05))">
            <Ticker />
          </GradCard>

          {/* Skills grid */}
          <GradCard className="col-span-12 md:col-span-8"
            gradient="linear-gradient(135deg, rgba(99,102,241,0.08), rgba(139,92,246,0.05), rgba(56,189,248,0.04))">
            <div className="absolute top-0 left-6 right-6 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(129,140,248,0.4), rgba(56,189,248,0.3), transparent)' }} />
            <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest mb-5">Tech Stack</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {skills.map((s, i) => (
                <div key={i}
                  className="group flex flex-col items-center gap-2 p-3 rounded-xl cursor-default transition-all duration-300 hover:bg-white/5 hover:scale-105">
                  <span className="text-2xl group-hover:scale-110 transition-transform duration-300">{s.icon}</span>
                  <span className="font-medium text-sm">{s.name}</span>
                  <span className="text-xs text-zinc-600">{s.desc}</span>
                </div>
              ))}
            </div>
          </GradCard>

          {/* Contact card */}
          <GradCard className="col-span-12 md:col-span-4 flex flex-col justify-between"
            gradient="linear-gradient(135deg, rgba(167,139,250,0.1), rgba(244,114,182,0.06))">
            <div className="absolute top-0 left-6 right-6 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(167,139,250,0.5), rgba(244,114,182,0.3), transparent)' }} />
            <div>
              <h3 className="font-bold text-lg mb-2">Let's build something</h3>
              <p className="text-zinc-500 text-sm mb-6">Open to collabs, hackathons, and cool ideas.</p>
            </div>
            <div className="space-y-3">
              {[
                { icon: '✉️', label: 'Email', href: 'mailto:loovincent268@gmail.com', val: 'Send a mail' },
                { icon: '💼', label: 'LinkedIn', href: 'https://www.linkedin.com/in/vince-loo-82565a31b', val: 'Vince Loo' },
                { icon: '🐙', label: 'GitHub', href: 'https://github.com/POTATO0826', val: 'POTATO0826' },
                { icon: '💬', label: 'WhatsApp', href: 'https://wa.link/4ixpfx', val: 'Chat now' },
              ].map(c => (
                <a key={c.label} href={c.href} target="_blank" rel="noreferrer"
                  className="flex items-center gap-3 py-2 group transition-all duration-300 hover:translate-x-1">
                  <span className="text-lg">{c.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-zinc-600">{c.label}</div>
                    <div className="text-sm font-medium truncate">{c.val}</div>
                  </div>
                  <span className="text-zinc-700 group-hover:text-white transition-colors">→</span>
                </a>
              ))}
            </div>
          </GradCard>
        </div>
      </div>
    </div>
  )
}
