import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { serviceIcons } from '../utils/icons';

// `featured` cards are wide in the home-page bento grid and show their sub-services as chips.
export default function ServiceCard({ service, featured = false }) {
  const Icon = serviceIcons[service.icon];
  return (
    <Link to={`/services/${service.slug}`} className="spotlight group relative flex h-full min-h-[220px] flex-col overflow-hidden rounded-xl2 border border-line bg-card p-7 transition duration-300 hover:-translate-y-1">
      {service.image && (
        <>
          <img src={service.image} alt="" aria-hidden="true" loading="lazy"
            className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
          {/* photo stays clear at the top; text area below gets a solid shade */}
          <span aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-t from-card via-card/85 to-card/20 transition duration-500 group-hover:to-card/0" />
        </>
      )}
      <div className="flex items-start justify-between">
        <span className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-white/[0.04] text-violet-300 transition duration-300 group-hover:border-violet-400/40 group-hover:bg-violet-500/15 group-hover:text-white group-hover:shadow-[0_0_24px_rgb(139_92_246/0.5)]">
          <Icon size={20} aria-hidden="true" />
        </span>
        <ArrowUpRight size={20} className="text-muted transition duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-fg" aria-hidden="true" />
      </div>
      <h3 className="mt-auto pt-10 text-xl">{service.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{service.description}</p>
      {featured && (
        <div className="mt-5 flex flex-wrap gap-2">
          {service.subs.map((s) => <span key={s} className="rounded-full border border-line bg-white/[0.03] px-3 py-1 text-xs text-ink">{s}</span>)}
        </div>
      )}
    </Link>
  );
}
