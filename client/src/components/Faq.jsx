import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';

export default function Faq({ items }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="mx-auto max-w-3xl space-y-3">
      {items.map((f, i) => (
        <div key={f.q} className={`rounded-2xl border transition duration-300 ${open === i ? 'border-violet-500/30 bg-white/[0.04]' : 'border-line bg-card hover:border-white/15'}`}>
          <button onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}
            className={`flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-medium transition text-fg`}>
            {f.q}<span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border border-line transition duration-300 ${open === i ? 'rotate-45 bg-violet-500 text-white' : 'text-muted'}`}><Plus size={14} /></span>
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: 'easeInOut' }} className="overflow-hidden">
                <p className="px-6 pb-5 text-muted leading-relaxed">{f.a}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
