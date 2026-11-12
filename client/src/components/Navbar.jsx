import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AnimatePresence, m } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { Button } from './ui';
import Logo from './Logo';

const links = [['/', 'Home'], ['/services', 'Services'], ['/custom-software', 'Software'], ['/portfolio', 'Work'], ['/about', 'About'], ['/blog', 'Blog'], ['/contact', 'Contact']];

export { default as Logo } from './Logo';

// Floating glass "pill" navbar.
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-40 px-3 pt-3 sm:px-6">
      <nav aria-label="Main"
        className={`mx-auto flex h-16 max-w-6xl items-center justify-between rounded-full border px-3 pl-5 transition-all duration-500 ${scrolled || open ? 'border-white/10 bg-[#0B0B12]/85 shadow-lg shadow-black/40 backdrop-blur-xl' : 'border-white/10 bg-black/40 backdrop-blur-md'}`}>
        <Link to="/" aria-label="Worklancers home"><Logo /></Link>
        <div className="hidden items-center gap-1 lg:flex">
          {links.map(([to, label]) => (
            <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => `relative rounded-full px-3.5 py-1.5 text-sm font-medium transition ${isActive ? 'text-white' : 'text-slate-300 hover:text-white'}`}>
              {({ isActive }) => (
                <>
                  {isActive && <m.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-white/[0.12] ring-1 ring-white/15" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
                  <span className="relative">{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Button to="/contact" className="hidden !px-4 !py-2 sm:inline-flex">Start a project <ArrowUpRight size={15} className="transition group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" /></Button>
          <button className="grid h-10 w-10 place-items-center rounded-full text-fg hover:bg-white/5 lg:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <m.div initial={{ opacity: 0, y: -10, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10, scale: 0.98 }}
            className="mx-auto mt-2 max-w-6xl rounded-3xl border border-line bg-surface/90 p-4 shadow-soft backdrop-blur-xl lg:hidden">
            <div className="flex flex-col">
              {links.map(([to, label], i) => (
                <m.div key={to} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}>
                  <NavLink to={to} end={to === '/'} onClick={() => setOpen(false)}
                    className={({ isActive }) => `block rounded-xl px-4 py-3 text-base font-medium ${isActive ? 'bg-white/[0.08] text-white' : 'text-slate-300'}`}>{label}</NavLink>
                </m.div>
              ))}
              <Button to="/contact" onClick={() => setOpen(false)} className="mt-3">Start a project</Button>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
