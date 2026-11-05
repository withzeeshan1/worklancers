import { Link } from 'react-router-dom';
import { ArrowUpRight, Mail, MessageCircle } from 'lucide-react';
import { SITE, whatsappLink } from '../utils/config';
import { services } from '../services/content';
import { Logo } from './Navbar';

const year = new Date().getFullYear();
const company = [['/about', 'About'], ['/#audit', 'Free Website Audit'], ['/portfolio', 'Work'], ['/blog', 'Blog'], ['/contact', 'Contact']];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line">
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-64 w-[900px] -translate-x-1/2 translate-y-1/2 rounded-full bg-violet-600/20 blur-[120px]" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 pb-10 pt-16 sm:px-6 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-5">
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">A software house and digital agency. Web, software, mobile, design, marketing and AI automation from one accountable team.</p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <a href={`mailto:${SITE.email}`} className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-ink transition hover:border-white/20 hover:text-fg"><Mail size={15} /> {SITE.email}</a>
            <a href={whatsappLink()} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-ink transition hover:border-white/20 hover:text-fg"><MessageCircle size={15} /> WhatsApp</a>
          </div>
        </div>
        <div className="lg:col-span-4">
          <h3 className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-muted">Services</h3>
          <ul className="space-y-2.5 text-sm">
            {services.map((s) => <li key={s.slug}><Link to={`/services/${s.slug}`} className="text-ink transition hover:text-fg">{s.title}</Link></li>)}
            <li><Link to="/custom-software" className="text-ink transition hover:text-fg">Custom Software</Link></li>
          </ul>
        </div>
        <div className="lg:col-span-3">
          <h3 className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-muted">Company</h3>
          <ul className="space-y-2.5 text-sm">
            {company.map(([to, l]) => <li key={to}><Link to={to} className="group inline-flex items-center gap-1 text-ink transition hover:text-fg">{l}<ArrowUpRight size={13} className="opacity-0 transition group-hover:opacity-100" /></Link></li>)}
          </ul>
        </div>
      </div>
      <p aria-hidden="true" className="pointer-events-none relative select-none bg-gradient-to-b from-white/[0.09] to-transparent bg-clip-text text-center text-[19vw] font-semibold leading-[0.8] tracking-tighter text-transparent">worklancers</p>
      <div className="relative border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-6 text-xs text-muted sm:px-6 lg:px-8">
          <p>© {year} {SITE.name}. All rights reserved.</p>
          <p>{SITE.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
