import { Link } from 'react-router-dom'

const designs = [
  { id: 1, name: 'Terminal Hacker', desc: 'Dark cyberpunk terminal aesthetic with glitch effects' },
  { id: 2, name: 'Swiss Minimal', desc: 'Clean editorial grid with bold Swiss typography' },
  { id: 3, name: 'Glassmorphism', desc: 'Frosted glass cards floating in gradient space' },
  { id: 4, name: 'Retro Pixel', desc: 'Nostalgic pixel art meets modern portfolio' },
  { id: 5, name: 'Bento Modern', desc: 'Contemporary bento grid with organic shapes' },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-2">Vince Loo</h1>
      <p className="text-zinc-400 mb-12 text-lg">Choose a portfolio design</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl w-full">
        {designs.map(d => (
          <Link
            key={d.id}
            to={`/${d.id}`}
            className="group border border-zinc-800 rounded-xl p-6 hover:border-zinc-500 hover:bg-zinc-900 transition-all duration-200"
          >
            <div className="text-3xl font-black text-zinc-600 group-hover:text-white transition-colors mb-2">
              0{d.id}
            </div>
            <div className="font-semibold text-white mb-1">{d.name}</div>
            <div className="text-zinc-500 text-sm">{d.desc}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}
