// Skill data, lifted out of designs/Design5.tsx. Consumed by the Tech Stack
// grid, the ticker, and the physics skill cloud.

export type Skill = {
  name: string
  icon: string
  desc: string
  /** Marks a mark that ships with no fill and renders black on the dark ground. */
  invert?: boolean
}

const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons'

export const skills: Skill[] = [
  { name: 'Flutter',    icon: `${DEVICON}/flutter/flutter-original.svg`,                              desc: 'Cross-platform UI' },
  { name: 'React',      icon: `${DEVICON}/react/react-original.svg`,                                  desc: 'Web interfaces' },
  { name: 'Java',       icon: `${DEVICON}/java/java-original.svg`,                                    desc: 'Backend systems' },
  { name: 'Firebase',   icon: `${DEVICON}/firebase/firebase-plain.svg`,                               desc: 'Cloud services' },
  { name: 'Dart',       icon: `${DEVICON}/dart/dart-original.svg`,                                    desc: 'Mobile-first' },
  { name: 'TypeScript', icon: `${DEVICON}/typescript/typescript-original.svg`,                        desc: 'Type-safe JS' },
  { name: 'Python',     icon: `${DEVICON}/python/python-original.svg`,                                desc: 'Data & scripts' },
  // The devicon "original" AWS wordmark is near-black type and disappears on a
  // black ground; the "plain" variant is solid #f90. Rust's devicon is likewise
  // black, so it comes from Simple Icons with an explicit light fill instead.
  { name: 'AWS',        icon: `${DEVICON}/amazonwebservices/amazonwebservices-plain-wordmark.svg`,    desc: 'Cloud infra' },
  { name: 'Git',        icon: `${DEVICON}/git/git-original.svg`,                                      desc: 'Version control' },
  { name: 'Convex',     icon: 'https://cdn.simpleicons.org/convex/8ea0c4',                             desc: 'Realtime backend' },
  { name: 'Vercel',     icon: 'https://cdn.simpleicons.org/vercel/e6e8ec',                             desc: 'Deployments' },
  { name: 'Claude',     icon: 'https://cdn.simpleicons.org/claude',                                    desc: 'AI pair programming' },
  { name: 'Rust',       icon: 'https://cdn.simpleicons.org/rust/e6e8ec',                               desc: 'Native & Tauri' },
  // Simple Icons' recolouring CDN has dropped the OpenAI mark, so this is the
  // raw package SVG — which ships with no fill and renders black. `invert`
  // flips it to white for the dark ground.
  { name: 'Codex',      icon: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/openai.svg',     desc: 'AI code agent', invert: true },
]

export const ticker = ['Flutter', 'React', 'TypeScript', 'Java', 'Firebase', 'Python', 'AWS', 'Dart', 'Convex', 'Vercel', 'Claude', 'Codex', 'Rust', 'Computer Vision', 'Telegram Bots']

export { DEVICON }
