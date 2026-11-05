import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import Seo from '../components/Seo';
import Reveal from '../components/Reveal';
import CtaBanner from '../components/CtaBanner';
import NotFound from './NotFound';
import { Button, PageHeader, Section } from '../components/ui';
import { projects, services } from '../services/content';

export default function ProjectDetail() {
  const { slug } = useParams();
  const p = projects.find((x) => x.slug === slug);
  if (!p) return <NotFound />;
  const service = services.find((s) => s.title.startsWith(p.category.split(' ')[0]))?.title;
  return (
    <>
      <Seo title={p.title} description={p.description} path={`/portfolio/${p.slug}`} />
      <PageHeader image={p.image} eyebrow={p.category} title={p.title} text={p.description} />
      <Section>
        <div className="grid gap-8 lg:grid-cols-3">
          <Reveal className="lg:col-span-2">
            <div className="group relative grid h-72 place-items-center overflow-hidden rounded-xl2 bg-gradient-to-br from-panel to-primary sm:h-96" aria-hidden="true">
              <span className="absolute inset-0 animate-blob bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.5),transparent_60%)]" />
              <motion.span initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 0.2 }} transition={{ delay: 0.3, type: 'spring' }} className="relative text-8xl font-bold text-white">{p.title.charAt(0)}</motion.span>
            </div>
          </Reveal>
          <Reveal from="left" delay={0.15}>
            <aside className="spotlight h-full rounded-xl2 border border-line bg-card p-6 shadow-soft">
              {p.isDemo && <p className="mb-4 rounded-xl bg-primary-light px-4 py-3 text-sm text-fg">This is a demo project, not completed client work.</p>}
              <p className="text-xs font-semibold uppercase tracking-wider text-violet-300">Category</p><p className="mb-4 text-fg">{p.category}</p>
              <p className="text-xs font-semibold uppercase tracking-wider text-violet-300">Technologies</p>
              <div className="mt-2 flex flex-wrap gap-2">{p.technologies.map((t) => <span key={t} className="rounded-full bg-primary-light px-3 py-1 text-xs text-violet-300">{t}</span>)}</div>
              {p.liveUrl ? <Button href={p.liveUrl} className="mt-6 w-full">View Live <ExternalLink size={16} /></Button>
                : <p className="mt-6 text-sm text-muted">No live link is available for this demo.</p>}
              <div className="mt-6 border-t border-line pt-6">
                <p className="font-semibold text-fg">Want something like this?</p>
                <p className="mt-1 text-sm text-muted">We can build a version tailored to your business.</p>
                <Button to="/contact" state={{ service }} className="mt-4 w-full">Get a Free Quote</Button>
              </div>
            </aside>
          </Reveal>
        </div>
        <Link to="/portfolio" className="group mt-8 inline-flex items-center gap-1 text-sm font-semibold text-violet-300"><ArrowLeft size={16} className="transition group-hover:-translate-x-1" /> All projects</Link>
      </Section>
      <CtaBanner />
    </>
  );
}
