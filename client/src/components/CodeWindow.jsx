import { m } from 'framer-motion';

// Decorative editor window whose lines "type" in one after another.
const lines = [
  [['const ', 'text-pink-400'], ['project', 'text-sky-300'], [' = ', 'text-slate-400'], ['await ', 'text-pink-400'], ['worklancers', 'text-emerald-300'], ['.build({', 'text-slate-300']],
  [['  idea: ', 'text-slate-400'], ["'your-next-big-thing'", 'text-amber-300'], [',', 'text-slate-400']],
  [['  stack: ', 'text-slate-400'], ["['React', 'Node', 'MongoDB']", 'text-amber-300'], [',', 'text-slate-400']],
  [['  deadline: ', 'text-slate-400'], ["'on time'", 'text-amber-300'], [',', 'text-slate-400']],
  [['  quality: ', 'text-slate-400'], ['true', 'text-pink-400'], [',', 'text-slate-400']],
  [['});', 'text-slate-300']],
  [[''], ['']],
  [['project', 'text-sky-300'], ['.launch();', 'text-slate-300'], ['  // 🚀 live', 'text-slate-500']],
];

export default function CodeWindow() {
  return (
    <m.div aria-hidden="true" initial={{ opacity: 0, y: 30, rotate: 2 }} animate={{ opacity: 1, y: 0, rotate: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
      className="relative mx-auto w-full max-w-lg overflow-hidden rounded-2xl bg-[#0B1220] shadow-2xl shadow-primary/30 ring-1 ring-white/10">
      <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400" /><span className="h-2.5 w-2.5 rounded-full bg-amber-400" /><span className="h-2.5 w-2.5 rounded-full bg-green-400" />
        <span className="ml-3 text-xs text-slate-500">app.js</span>
      </div>
      <pre className="overflow-hidden p-5 font-mono text-[13px] leading-7">
        {lines.map((parts, i) => (
          <m.div key={i} className="flex overflow-hidden whitespace-pre" initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 0.6, delay: 0.8 + i * 0.45, ease: 'linear' }}>
            <span className="mr-4 inline-block w-4 select-none text-right text-slate-600">{i + 1}</span>
            {parts.map(([t, c], j) => <span key={j} className={c}>{t}</span>)}
          </m.div>
        ))}
        <m.span initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0] }} transition={{ delay: 4.5, duration: 1, repeat: Infinity }} className="ml-8 inline-block h-4 w-2 translate-y-0.5 bg-sky-400" />
      </pre>
      <m.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 4.6 }}
        className="flex items-center gap-2 border-t border-white/10 bg-emerald-500/10 px-5 py-3 font-mono text-xs text-emerald-300">
        <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" /> Build successful · deployed to production
      </m.div>
    </m.div>
  );
}
