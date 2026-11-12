import { useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import Seo from '../components/Seo';
import { breadcrumbs } from '../seo/schema';
import ProjectCard from '../components/ProjectCard';
import CtaBanner from '../components/CtaBanner';
import { PageHeader, Section } from '../components/ui';
import { projects } from '../services/content';

export default function Portfolio() {
  const categories = ['All', ...new Set(projects.map((p) => p.category))];
  const [active, setActive] = useState('All');
  const shown = active === 'All' ? projects : projects.filter((p) => p.category === active);
  return (
    <>
      <Seo title="Portfolio: Websites, Apps & Software" path="/portfolio" image="/images/developers.webp" description="Real projects by Worklancers: SaaS platforms, AI web apps, directories and mobile games including LoomySend, Loomy360, VenuesVegas and Drytis AI Studio." jsonLd={breadcrumbs([['Home', '/'], ['Portfolio', '/portfolio']])} />
      <PageHeader image="/images/developers.webp" eyebrow="Our work" title="See what we can build for you" text="SaaS platforms, AI web apps, directories and mobile games we have designed and built. Open any project to see it live." />
      <Section>
        <div className="mb-10 flex flex-wrap gap-2" role="tablist" aria-label="Project categories">
          {categories.map((c) => (
            <button key={c} onClick={() => setActive(c)} role="tab" aria-selected={active === c}
              className={`relative rounded-full px-5 py-2 text-sm font-medium transition ${active === c ? 'text-white' : 'border border-line bg-card text-ink hover:border-primary'}`}>
              {active === c && <m.span layoutId="portfolio-pill" className="absolute inset-0 rounded-full bg-primary" transition={{ type: 'spring', stiffness: 400, damping: 30 }} />}
              <span className="relative">{c}</span>
            </button>
          ))}
        </div>
        <m.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {shown.map((p, i) => (
              <m.div key={p.slug} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.35, delay: i * 0.05 }} className="h-full">
                <ProjectCard project={p} />
              </m.div>
            ))}
          </AnimatePresence>
        </m.div>
      </Section>
      <CtaBanner />
    </>
  );
}
