/** @type {import('tailwindcss').Config} */

// `--background` etc. hold bare oklch channels (see src/index.css); they are
// reassembled here so opacity modifiers like `bg-muted/20` resolve. A plain
// `var(--muted)` would make those silently fail.
const ch = (name) => `oklch(var(${name}) / <alpha-value>)`

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: ch('--background'),
        foreground: ch('--foreground'),
        card: {
          DEFAULT: ch('--card'),
          foreground: ch('--card-foreground'),
        },
        popover: {
          DEFAULT: ch('--popover'),
          foreground: ch('--popover-foreground'),
        },
        muted: {
          DEFAULT: ch('--muted'),
          foreground: ch('--muted-foreground'),
        },
        ring: ch('--ring'),
        // Already translucent, so no <alpha-value> slot.
        border: 'var(--border)',
      },
      // Makes a bare `border` in ported components pick up the site hairline
      // instead of currentColor. Existing code always names its border colour
      // explicitly, so nothing already on the page changes.
      borderColor: {
        DEFAULT: 'var(--border)',
      },
      borderRadius: {
        sm: 'calc(var(--radius) - 4px)',
        md: 'calc(var(--radius) - 2px)',
        lg: 'var(--radius)',
        xl: 'calc(var(--radius) + 4px)',
        '2xl': 'calc(var(--radius) + 8px)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
        serif: ['"Instrument Serif"', '"Times New Roman"', 'serif'],
        mono: ['"Geist Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
    },
  },
  plugins: [],
}
