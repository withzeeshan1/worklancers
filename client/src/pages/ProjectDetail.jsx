import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Check, ExternalLink, Gamepad2, Globe } from 'lucide-react';
import Seo from '../components/Seo';
import { breadcrumbs } from '../seo/schema';
import Reveal from '../components/Reveal';
import ProjectCard from '../components/ProjectCard';
import AppIconCover from '../components/AppIconCover';
import CtaBanner from '../components/CtaBanner';
import NotFound from './NotFound';
import { Button, PageHeader, Section, SectionHeading } from '../components/ui';
import { projects } from '../services/content';

// Which service a visitor most likely wants after viewing this kind of project.
const quoteService = (p) => (p.type === 'mobile' ? 'Mobile App Development' : p.category === 'AI Platform' ? 'AI & Automation' : 'Web Development');
const hostOf = (url) => url.replace(/^https?:\/\//, '').replace(/\/$/, '');

export default function ProjectDetail() {
  const { slug } = useParams();
  const p = projects.find((x) => x.slug === slug);
  if (!p) return <NotFound />;
  const more = projects.filter((x) => x.slug !== p.slug && x.type === p.type).slice(0, 3);
  return (
    <>
      <Seo title={`${p.title}: ${p.category} Project`} description={p.description} path={`/portfolio/${p.slug}`} image={p.image || (p.icon && !p.icon.endsWith('.svg') ? p.icon : undefined)}
        jsonLd={breadcrumbs([['Home', '/'], ['Portfolio', '/portfolio'], [p.title, `/portfolio/${p.slug}`]])} />
      <PageHeader image="/images/developers.webp" eyebrow={p.category} title={p.title} text={p.description}>
        {p.liveUrl && <Button href={p.liveUrl}>Visit {hostOf(p.liveUrl)} <ExternalLink size={16} /></Button>}
      </PageHeader>
      <Section>
        <div className="grid gap-8 lg:grid-cols-3">
          <Reveal className="lg:col-span-2">
            {p.image ? (
              <figure className="overflow-hidden rounded-xl2 border border-line bg-card shadow-2xl shadow-black/40">
                <div className="flex items-center gap-1.5 border-b border-line bg-white/[0.03] px-4 py-3" aria-hidden="true">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400" /><span className="h-2.5 w-2.5 rounded-full bg-amber-400" /><span className="h-2.5 w-2.5 rounded-full bg-green-400" />
                  <span className="ml-3 flex h-6 flex-1 items-center rounded-md bg-white/[0.04] px-3 text-[11px] text-muted">{hostOf(p.liveUrl || p.title)}</span>
                </div>
                <img src={p.image} alt={`${p.title} home page`} width={1200} height={750} className="w-full" />
              </figure>
            ) : p.icon ? (
              <div className="group relative h-72 overflow-hidden rounded-xl2 border border-line bg-card sm:h-96"><AppIconCover icon={p.icon} title={p.title} size="lg" /></div>
            ) : (
              <div className="grid h-72 place-items-center overflow-hidden rounded-xl2 bg-gradient-to-br from-violet-700 via-indigo-600 to-sky-500 sm:h-96" aria-hidden="true">
                <span className="flex flex-col items-center gap-4 text-white">
                  <span className="grid h-20 w-20 place-items-center rounded-3xl bg-white/15 ring-1 ring-white/30">{p.type === 'mobile' ? <Gamepad2 size={40} /> : <Globe size={40} />}</span>
                  <span className="font-serif text-5xl italic">{p.title}</span>
                </span>
              </div>
            )}
          </Reveal>
          <Reveal from="left" delay={0.15}>
            <aside className="spotlight h-full rounded-xl2 border border-line bg-card p-6 shadow-soft">
              <p className="text-xs font-semibold uppercase tracking-wider text-violet-300">Type</p><p className="mb-4 text-fg">{p.category}</p>
              {p.technologies.length > 0 && (
                <>
                  <p className="text-xs font-semibold uppercase tracking-wider text-violet-300">Technologies</p>
                  <div className="mb-4 mt-2 flex flex-wrap gap-2">{p.technologies.map((t) => <span key={t} className="rounded-full bg-primary-light px-3 py-1 text-xs text-violet-300">{t}</span>)}</div>
                </>
              )}
              {p.highlights.length > 0 && (
                <>
                  <p className="text-xs font-semibold uppercase tracking-wider text-violet-300">Highlights</p>
                  <ul className="mt-3 space-y-2.5">{p.highlights.map((h) => <li key={h} className="flex gap-2 text-sm text-ink"><Check size={16} className="mt-0.5 shrink-0 text-emerald-400" />{h}</li>)}</ul>
                </>
              )}
              {p.liveUrl && <Button href={p.liveUrl} className="mt-6 w-full">Visit live site <ExternalLink size={16} /></Button>}
              <div className="mt-6 border-t border-line pt-6">
                <p className="font-semibold text-fg">Want something like this?</p>
                <p className="mt-1 text-sm text-muted">We can build a product like {p.title}, tailored to your business.</p>
                <Button to="/contact" state={{ service: quoteService(p) }} variant="outline" className="mt-4 w-full">Get a Free Quote</Button>
              </div>
            </aside>
          </Reveal>
        </div>
        <Link to="/portfolio" className="group mt-8 inline-flex items-center gap-1 text-sm font-semibold text-violet-300"><ArrowLeft size={16} className="transition group-hover:-translate-x-1" /> All projects</Link>
      </Section>
      {more.length > 0 && (
        <Section className="section-alt">
          <SectionHeading eyebrow="More work" title={p.type === 'mobile' ? 'More mobile apps' : 'More projects'} />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((x, i) => <Reveal key={x.slug} delay={i * 0.08} className="h-full"><ProjectCard project={x} /></Reveal>)}
          </div>
        </Section>
      )}
      <CtaBanner />
    </>
  );
}
