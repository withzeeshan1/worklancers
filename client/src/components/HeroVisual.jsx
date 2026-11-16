import { m } from 'framer-motion';
import { TrendingUp, Zap, MessageSquare, Users } from 'lucide-react';

const ease = [0.22, 1, 0.36, 1];

// Photo card used for the tilted office shots behind the main dashboard.
function PhotoCard({ src, className, from, rotate, delay }) {
  return (
    <m.div initial={{ opacity: 0, x: from, rotate: 0, scale: 0.9 }} animate={{ opacity: 1, x: 0, rotate, scale: 1 }} transition={{ duration: 1, delay, ease }}
      className={`absolute overflow-hidden rounded-2xl border border-white/10 bg-card p-1.5 shadow-2xl shadow-black/60 ${className}`}>
      <img src={src} alt="" width={1000} height={667} loading="eager" className="h-full w-full rounded-xl object-cover" />
      <span className="pointer-events-none absolute inset-1.5 rounded-xl bg-gradient-to-t from-black/20 via-transparent to-transparent" />
    </m.div>
  );
}

function Chip({ icon: Icon, tone, label, value, className, delay }) {
  return (
    <m.div initial={{ opacity: 0, y: 20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay, duration: 0.6, ease }}
      className={`absolute z-20 hidden items-center gap-3 rounded-xl border border-white/10 bg-card/80 px-4 py-3 shadow-soft backdrop-blur-xl sm:flex ${className}`}>
      <span className={`grid h-9 w-9 place-items-center rounded-lg ${tone}`}><Icon size={18} /></span>
      <div className="text-left"><p className="text-xs text-muted">{label}</p><p className="text-sm font-semibold text-fg">{value}</p></div>
    </m.div>
  );
}

// Hero collage: a live dashboard in a browser window, with office photos fanned out behind it.
// Decorative only, so it is hidden from screen readers.
export default function HeroVisual() {
  return (
    <div className="relative mx-auto h-[300px] w-full max-w-5xl sm:h-[440px] lg:h-[500px]" aria-hidden="true">
      {/* office photos fanned out behind */}
      <PhotoCard src="/images/hero-office.webp" from={140} rotate={-7} delay={0.9}
        className="left-0 top-10 hidden h-[260px] w-[34%] md:block lg:h-[300px]" />
      <PhotoCard src="/images/hero-team.webp" from={-140} rotate={6} delay={1}
        className="right-0 top-6 hidden h-[260px] w-[34%] md:block lg:h-[300px]" />

      {/* main dashboard window */}
      <m.div initial={{ opacity: 0, y: 40, rotateX: 14 }} animate={{ opacity: 1, y: 0, rotateX: 0 }} transition={{ duration: 1, delay: 0.5, ease }} style={{ transformPerspective: 1200 }}
        className="absolute inset-x-0 top-0 z-10 mx-auto w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-card shadow-2xl shadow-violet-900/40 md:w-[62%]">
        <div className="flex items-center gap-1.5 border-b border-line bg-white/[0.03] px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400" /><span className="h-2.5 w-2.5 rounded-full bg-amber-400" /><span className="h-2.5 w-2.5 rounded-full bg-green-400" />
          <span className="ml-3 flex h-6 flex-1 items-center rounded-md bg-white/[0.04] px-3 text-[11px] text-slate-400">app.yourbusiness.com/dashboard</span>
        </div>
        <div className="relative aspect-[16/10] overflow-hidden">
          <img src="/images/hero-dashboard.webp" alt="" width={1200} height={750} loading="eager" className="h-full w-full animate-kenburns object-cover" />
          <span className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-card/80 to-transparent" />
          {/* scanning highlight line */}
          <m.span initial={{ top: '0%' }} animate={{ top: ['0%', '100%', '0%'] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
            className="pointer-events-none absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-violet-400/80 to-transparent shadow-[0_0_12px_rgb(167_139_250)]" />
        </div>
      </m.div>

      {/* small wireframes card */}
      <m.div initial={{ opacity: 0, y: 40, rotate: 0 }} animate={{ opacity: 1, y: 0, rotate: -4 }} transition={{ duration: 0.9, delay: 1.3, ease }}
        className="absolute bottom-0 left-[8%] z-20 hidden w-[22%] overflow-hidden rounded-xl border border-white/10 bg-card p-1 shadow-2xl shadow-black/60 lg:block">
        <img src="/images/hero-wireframes.webp" alt="" width={1000} height={750} loading="lazy" className="aspect-[4/3] w-full rounded-lg object-cover" />
        <p className="px-2 py-1.5 text-left text-[11px] text-slate-400">UX wireframes · <span className="text-violet-300">in review</span></p>
      </m.div>

      {/* floating stat chips */}
      <Chip icon={TrendingUp} tone="bg-emerald-500/15 text-emerald-400" label="New inquiries" value="Coming in daily" className="left-[2%] top-[58%] animate-float md:left-[18%]" delay={1.6} />
      <Chip icon={Zap} tone="bg-amber-500/15 text-amber-300" label="Page speed" value="Fast on mobile" className="right-[2%] top-[4%] animate-float [animation-delay:1.5s] md:right-[16%]" delay={1.8} />
      <Chip icon={MessageSquare} tone="bg-violet-500/15 text-violet-300" label="AI chatbot" value="Answers 24/7" className="bottom-[2%] right-[6%] animate-float [animation-delay:3s] md:right-[20%]" delay={2} />
      <Chip icon={Users} tone="bg-sky-500/15 text-sky-300" label="Your team" value="One partner" className="right-[2%] top-[62%] animate-float [animation-delay:4s] sm:!hidden lg:!flex" delay={2.2} />
    </div>
  );
}
