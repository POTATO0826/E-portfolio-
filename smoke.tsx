// Render-smoke test for the redesigned page. Run with `bun run smoke.tsx`.
// Server-renders Design5 and asserts on the markup — stands in for a browser
// check of structure, order, and the ported components' render paths.
import { renderToStaticMarkup } from 'react-dom/server'
import { createElement as h } from 'react'
import Design5 from './src/designs/Design5'

const count = (hay: string, needle: string) => hay.split(needle).length - 1
const html = renderToStaticMarkup(h(Design5))

const checks: [string, boolean, string][] = []
const check = (name: string, pass: boolean, detail = '') => checks.push([name, pass, detail])

// --- Section order: hero → activity → stack → hackathons → side
const ids = ['id="activity"', 'id="stack"', 'id="hackathons"', 'id="side"']
const positions = ids.map(id => html.indexOf(id))
check('all four section anchors present', positions.every(p => p > 0), JSON.stringify(positions))
check('sections are in the requested order', positions.every((p, i) => i === 0 || p > positions[i - 1]), JSON.stringify(positions))
check('heatmap comes before projects', html.indexOf('id="activity"') < html.indexOf('id="hackathons"'))
check('four section bands', count(html, 'section-heading') === 4, `found ${count(html, 'section-heading')}`)

// --- Removed things stay removed
check('no world map', !html.includes('World heatmap'))
check('no physics arena', !html.includes('data-pill') && !html.includes('cursor-grab'))
check('no glyph-card plus field', !html.includes('-rp"') && !html.includes('glyphSize'))

// --- Hero: stickers wrap the photo
check('four desk stickers + the photo are interactive', count(html, 'Animate the ') === 4 && html.includes('Animate my profile photo'), `found ${count(html, 'Animate the ')}`)
check('four sticker images from public/stickers', ['keyboard','backpack','camera','tickets'].every(n => html.includes(`/stickers/${n}.webp`)))
// React 19 hoists an image preload to the top of the markup, so match the <img> itself, not the URL.
check('profile photo inside the collage', html.indexOf('A few things from my desk') < html.indexOf('alt="Vince Loo"'))
check('hero is the status/name/tagline stack', !html.includes('Available for opportunities') && html.includes('caffeinated') && html.includes('🌙 Night Owl'))

// --- Heatmap (SSR = skeleton)
check('heatmap skeleton renders 53 columns', count(html, 'class="bg-muted" style="width:12px;height:12px') === 53 * 7, `found ${count(html, 'class="bg-muted" style="width:12px;height:12px')}`)

// --- Ask AI was removed
check('no ask-ai box', !html.includes('ask-ai-input'))

// --- Ticker / slider
check('ticker duplicated by slider (2) + 1 project tag', count(html, 'Computer Vision') === 3, `found ${count(html, 'Computer Vision')}`)

// --- Projects at the bottom as editorial rows, side projects included
check('six project entries (4 placed + 2 side), each one a link', count(html, 'class="project-entry') === 6 && count(html, 'aria-label="View ') === 6, `found ${count(html, 'class="project-entry')} entries / ${count(html, 'aria-label="View ')} links`)
check('no separate GitHub button, no descriptions', !html.includes('View on GitHub') && !html.includes('Options trading is a wall of greeks'))
check('tech chips present', count(html, 'tech-chip') >= 20, `found ${count(html, 'tech-chip')}`)
check('side projects use the same rows (Doku, Sakura)', html.includes('View Doku on GitHub') && html.includes('View Sakura on GitHub'))

// --- Contact from data
check('journey / hustle headings', html.includes('Hackathon Journey') && html.includes('Side Hustle'))
check('four awarded rows marked gold', count(html, 'border-white/10 is-winner"') === 4, `found ${count(html, 'border-white/10 is-winner"')} (style block also mentions the class)`)
check('six contact icons in the header incl. X, no contact section', count(html, 'class="contact-icon') === 6 && html.includes('https://x.com/vince1oo') && !html.includes('contact-row'), `found ${count(html, 'class="contact-icon')}`)
check('contact icons come before the name', html.indexOf('contact-icon') < html.indexOf('@POTATO0826'))

let failed = 0
for (const [name, pass, detail] of checks) {
  if (!pass) failed++
  console.log(`${pass ? 'PASS' : 'FAIL'}  ${name}${detail && !pass ? `  -> ${detail}` : ''}`)
}
console.log(`\n${checks.length - failed}/${checks.length} passed`)
if (failed) process.exit(1)
