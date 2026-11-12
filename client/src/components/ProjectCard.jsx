import { Link } from 'react-router-dom';
import { ArrowUpRight, Gamepad2, Globe } from 'lucide-react';

// Each project gets a distinct gradient "cover" until real screenshots are added.
const covers = ['from-violet-600 via-fuchsia-500 to-orange-400', 'from-sky-500 via-indigo-500 to-violet-600', 'from-emerald-400 via-teal-500 to-sky-600', 'from-pink-500 via-rose-500 to-amber-400', 'from-indigo-600 via-violet-500 to-sky-400', 'from-cyan-400 via-sky-500 to-indigo-600'];

function coverFor(slug) {
  let h = 0;
  for (const c of slug) h = (h * 31 + c.charCodeAt(0)) % 997;
  return covers[h % covers.length];
}

export default function ProjectCard({ project }) {
  return (
    <Link to={`/portfolio/${project.slug}`} className="spotlight group block h-full overflow-hidden rounded-xl2 border border-line bg-card p-2 transition duration-300 hover:-translate-y-1">
      <div className={`relative grid h-52 place-items-center overflow-hidden rounded-[1rem] bg-gradient-to-br ${coverFor(project.slug)}`}>
        {project.image
          ? <img src={project.image} alt="" aria-hidden="true" width={1000} height={667} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110" />
          : (
            <span className="relative flex flex-col items-center gap-3 text-white" aria-hidden="true">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white/15 ring-1 ring-white/30 backdrop-blur">
                {project.type === 'mobile' ? <Gamepad2 size={28} /> : <Globe size={28} />}
              </span>
              <span className="font-serif text-4xl italic drop-shadow-lg">{project.title}</span>
            </span>
          )}
        {project.liveUrl && <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-black/55 px-3 py-1 text-xs font-medium text-white backdrop-blur"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />Live site</span>}
        {project.type === 'mobile' && <span className="absolute left-3 top-3 rounded-full bg-black/55 px-3 py-1 text-xs font-medium text-white backdrop-blur">Mobile app</span>}
        <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white text-black opacity-0 transition duration-300 group-hover:opacity-100" aria-hidden="true"><ArrowUpRight size={16} /></span>
      </div>
      <div className="p-5">
        <p className="font-mono text-xs uppercase tracking-wider text-violet-300">{project.category}</p>
        <h3 className="mt-2 text-lg">{project.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-muted">{project.description}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.technologies.map((t) => <span key={t} className="rounded-full border border-line px-2.5 py-0.5 text-xs text-ink">{t}</span>)}
        </div>
      </div>
    </Link>
  );
}
