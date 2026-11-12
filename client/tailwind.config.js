/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Dark & premium palette
        primary: { DEFAULT: '#8B5CF6', dark: '#7C3AED', light: 'rgb(139 92 246 / 0.12)' },
        surface: '#06060A', // page background
        card: '#0E0E16', // raised cards
        panel: '#0A0A12', // dark feature bands
        line: 'rgb(255 255 255 / 0.08)', // hairline borders
        fg: '#F5F5F7', // headings
        ink: '#B9BBC6', // body text
        muted: '#7E8090', // secondary text
      },
      fontFamily: {
        sans: ['"Geist Variable"', 'Geist', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', 'ui-serif', 'Georgia', 'serif'],
        mono: ['"Geist Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      boxShadow: {
        soft: '0 1px 0 0 rgb(255 255 255 / 0.04) inset, 0 20px 50px -24px rgb(0 0 0 / 0.8)',
        glow: '0 0 0 1px rgb(139 92 246 / 0.4), 0 8px 40px -8px rgb(139 92 246 / 0.6)',
      },
      borderRadius: { xl2: '1.25rem' },
      keyframes: {
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        blob: { '0%,100%': { transform: 'translate(0,0) scale(1)' }, '33%': { transform: 'translate(30px,-40px) scale(1.1)' }, '66%': { transform: 'translate(-20px,20px) scale(0.95)' } },
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
        shine: { from: { backgroundPosition: '200% center' }, to: { backgroundPosition: '-200% center' } },
        kenburns: { from: { transform: 'scale(1)' }, to: { transform: 'scale(1.12)' } },
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
        blob: 'blob 14s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
        shine: 'shine 6s linear infinite',
        kenburns: 'kenburns 24s ease-in-out infinite alternate',
      },
    },
  },
  plugins: [],
};
