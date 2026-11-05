import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Seo from '../components/Seo';
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
      <Seo title="Portfolio" description="Demo projects showing the kind of work Worklancers can build." path="/portfolio" />
      <PageHeader image="/images/developers.jpg" eyebrow="Our work" title="See what we can build for you" text="Demo projects created to show our capabilities. They are not completed client work. Ask us for a live walkthrough on a call." />
      <Section>
        <div className="mb-10 flex flex-wrap gap-2" role="tablist" aria-label="Project categories">
          {categories.map((c) => (
            <button key={c} onClick={() => setActive(c)} role="tab" aria-selected={active === c}
              className={`relative rounded-full px-5 py-2 text-sm font-medium transition ${active === c ? 'text-white' : 'border border-line bg-card text-ink hover:border-primary'}`}>
              {active === c && <motion.span layoutId="portfolio-pill" className="absolute inset-0 rounded-full bg-primary" transition={{ type: 'spring', stiffness: 400, damping: 30 }} />}
              <span className="relative">{c}</span>
            </button>
          ))}
        </div>
        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {shown.map((p, i) => (
              <motion.div key={p.slug} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.35, delay: i * 0.05 }} className="h-full">
                <ProjectCard project={p} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </Section>
      <CtaBanner />
    </>
  );
}
