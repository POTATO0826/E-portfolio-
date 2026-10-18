/* Desk stickers — die-cut objects piled above the profile photo, which is
   set into the bottom edge of the pile. Hover tilts a sticker toward the pointer, a press squashes
   it, and a click plays a short sound.

   The interaction mechanism is adapted from AdityaKodez/adityaojha
   (components/landing/profile-banner.tsx, MIT): spring-driven pointer tilt
   under perspective, whileHover/whileTap gestures, a data-driven entrance
   stagger, and a percentage-based CSS-module collage. Everything visible is
   this site's own: the four stickers are its own renders in public/stickers/,
   and the sounds are synthesised with the Web Audio API on click rather than
   shipped as mp3s — no audio assets, and sound only ever starts from a real
   user gesture.                        */

import { motion, useReducedMotion, useSpring, useTransform } from 'motion/react'
import { useRef, type PointerEvent, type ReactNode } from 'react'
import styles from './DeskStickers.module.css'

type Sound = 'pop' | 'click' | 'clink' | 'whoosh'

type Sticker = {
  id: 'keyboard' | 'backpack' | 'camera' | 'tickets'
  label: string
  tilt: number
  order: number
  sound: Sound
}

const STICKERS: Sticker[] = [
  { id: 'keyboard', label: 'Animate the keyboard sticker',       tilt: -6, order: 1, sound: 'click' },
  { id: 'backpack', label: 'Animate the hackathon backpack sticker', tilt: 5, order: 2, sound: 'clink' },
  { id: 'camera',   label: 'Animate the camera sticker',         tilt: -8, order: 3, sound: 'whoosh' },
  { id: 'tickets',  label: 'Animate the boarding passes sticker', tilt: 7, order: 4, sound: 'pop' },
]

const pointerSpring = { stiffness: 350, damping: 24, mass: 0.6 }
const gestureSpring = { type: 'spring', duration: 0.35, bounce: 0.3 } as const

/* ── Sounds ────────────────────────────────────────────
   One shared AudioContext, created lazily inside the first click handler so
   browsers' autoplay rules are satisfied. Each sound is a few oscillator
   nodes with an exponential decay — quiet, short, and over before the
   gesture spring settles.                                                   */
let audio: AudioContext | null = null

function playSound(kind: Sound) {
  try {
    audio ??= new AudioContext()
    if (audio.state === 'suspended') void audio.resume()
    const ctx = audio
    const t = ctx.currentTime
    const out = ctx.createGain()
    out.connect(ctx.destination)

    const env = (peak: number, length: number) => {
      out.gain.setValueAtTime(0.0001, t)
      out.gain.exponentialRampToValueAtTime(peak, t + 0.008)
      out.gain.exponentialRampToValueAtTime(0.0001, t + length)
    }

    if (kind === 'whoosh') {
      // Filtered noise swept upward — the only sound that isn't a tone.
      const length = 0.32
      const buffer = ctx.createBuffer(1, Math.ceil(ctx.sampleRate * length), ctx.sampleRate)
      const data = buffer.getChannelData(0)
      for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1
      const src = ctx.createBufferSource()
      src.buffer = buffer
      const bp = ctx.createBiquadFilter()
      bp.type = 'bandpass'
      bp.Q.value = 1.2
      bp.frequency.setValueAtTime(400, t)
      bp.frequency.exponentialRampToValueAtTime(1800, t + length)
      src.connect(bp).connect(out)
      env(0.12, length)
      src.start(t)
      src.stop(t + length)
      return
    }

    const osc = ctx.createOscillator()
    osc.connect(out)
    if (kind === 'pop') {
      osc.type = 'sine'
      osc.frequency.setValueAtTime(520, t)
      osc.frequency.exponentialRampToValueAtTime(180, t + 0.12)
      env(0.18, 0.16)
      osc.start(t); osc.stop(t + 0.16)
    } else if (kind === 'click') {
      osc.type = 'square'
      osc.frequency.setValueAtTime(1400, t)
      env(0.07, 0.035)
      osc.start(t); osc.stop(t + 0.035)
    } else {
      // clink
      osc.type = 'triangle'
      osc.frequency.setValueAtTime(2200, t)
      env(0.12, 0.28)
      osc.start(t); osc.stop(t + 0.28)
    }
  } catch {
    // No AudioContext (very old browser, or blocked) — the sticker still animates.
  }
}

/* ── Artwork ───────────────────────────────────────────
   Four die-cut sticker renders from public/stickers/, trimmed and exported
   as WebP with alpha (see the processing note in CREDITS.md). The drop
   shadow comes from the CSS module so it isn't repainted on every frame of
   the tilt. decoding=async keeps the hero's first paint from waiting on the
   image decode.                                                             */
function Art({ id }: { id: Sticker['id'] }) {
  return (
    <img
      src={`/stickers/${id}.webp`}
      alt=""
      draggable={false}
      decoding="async"
      className="pointer-events-none size-full select-none object-contain"
    />
  )
}

/* ── Interactive sticker ───────────────────────────────
   Pointer position inside the sticker drives two springs, which feed rotateX
   and rotateY under a CSS perspective — so the card seems to lean toward the
   cursor. Only mouse pointers do this; on touch the gesture is a plain tap. */
function InteractiveSticker({
  label,
  tilt,
  sound,
  children,
}: {
  label: string
  tilt: number
  sound?: Sound
  children: ReactNode
}) {
  const reduceMotion = useReducedMotion()
  const bounds = useRef<DOMRect | null>(null)
  const x = useSpring(0, pointerSpring)
  const y = useSpring(0, pointerSpring)
  const rotateX = useTransform(y, [-14, 14], [7, -7])
  const rotateY = useTransform(x, [-8, 8], [-8, 8])

  const reset = () => {
    x.set(0)
    y.set(0)
    bounds.current = null
  }

  const follow = (e: PointerEvent<HTMLButtonElement>) => {
    if (reduceMotion || e.pointerType !== 'mouse' || !bounds.current) return
    const r = bounds.current
    const h = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width - 0.5) * 2))
    const v = Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height - 0.5) * 2))
    x.set(h * 6)
    y.set(v * 5 - 7)
  }

  return (
    <motion.button
      type="button"
      aria-label={label}
      className={`${styles.button} relative block size-full rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-black`}
      initial={false}
      style={reduceMotion ? undefined : { x, y, rotateX, rotateY }}
      whileHover={reduceMotion ? { opacity: 0.8 } : { scale: 1.075, rotate: tilt }}
      whileTap={reduceMotion ? { opacity: 0.65 } : { scale: 0.94, rotate: -tilt * 0.6 }}
      transition={gestureSpring}
      onClick={sound ? () => playSound(sound) : undefined}
      onPointerEnter={e => {
        bounds.current = e.currentTarget.parentElement?.getBoundingClientRect() ?? null
      }}
      onPointerMove={follow}
      onPointerLeave={reset}
      onPointerCancel={reset}
      onBlur={reset}
    >
      {children}
    </motion.button>
  )
}

/** The collage. Pass the profile photo as children — it sits centred under
    the pile, overlapping its bottom edge, and gets the same tilt treatment. */
export function DeskStickers({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion()

  return (
    <div>
      <div className={styles.composition} role="group" aria-label="A few things from my desk">
        {STICKERS.map(sticker => {
          return (
            <motion.div
              key={sticker.id}
              className={`${styles.sticker} ${styles[sticker.id]}`}
              initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.9, rotate: -sticker.tilt }}
              animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
              transition={{
                type: 'spring',
                duration: 0.6,
                bounce: 0.38,
                delay: reduceMotion ? 0 : (sticker.order - 1) * 0.1,
              }}
            >
              <div className={styles.bob}>
                <InteractiveSticker label={sticker.label} tilt={sticker.tilt} sound={sticker.sound}>
                  <Art id={sticker.id} />
                </InteractiveSticker>
              </div>
            </motion.div>
          )
        })}

        <div className={styles.profile}>
          <InteractiveSticker label="Animate my profile photo" tilt={-5} sound="pop">
            {children}
          </InteractiveSticker>
        </div>
      </div>
    </div>
  )
}
