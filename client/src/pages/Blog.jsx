import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, m } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Seo from '../components/Seo';
import { breadcrumbs } from '../seo/schema';
import { PageHeader, Section } from '../components/ui';
import { posts } from '../services/content';
import { formatDate } from '../utils/format';

export default function Blog() {
  const categories = ['All', ...new Set(posts.map((p) => p.category))];
  const [active, setActive] = useState('All');
  const shown = active === 'All' ? posts : posts.filter((p) => p.category === active);
  return (
    <>
      <Seo title="Blog: Web Development, SEO & AI Tips" path="/blog" image="/images/code-closeup.webp" description="Practical guides on choosing a web development agency, SEO for new websites and using AI automation in your business, from the Worklancers team." jsonLd={breadcrumbs([['Home', '/'], ['Blog', '/blog']])} />
      <PageHeader image="/images/code-closeup.webp" eyebrow="Insights" title="Blog" text="Practical tips on building and growing your digital presence." />
      <Section>
        <div className="mb-10 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button key={c} onClick={() => setActive(c)} aria-pressed={active === c}
              className={`relative rounded-full px-5 py-2 text-sm font-medium transition ${active === c ? 'text-white' : 'border border-line bg-card hover:border-primary'}`}>
              {active === c && <m.span layoutId="blog-pill" className="absolute inset-0 rounded-full bg-primary" transition={{ type: 'spring', stiffness: 400, damping: 30 }} />}
              <span className="relative">{c}</span>
            </button>
          ))}
        </div>
        <m.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {shown.map((p, i) => (
              <m.article key={p.slug} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.35, delay: i * 0.06 }}
                className="spotlight group overflow-hidden rounded-xl2 border border-line bg-card shadow-soft transition-shadow duration-300 hover:shadow-xl hover:shadow-primary/10">
                <Link to={`/blog/${p.slug}`} className="block">
                  <div className="relative grid h-40 place-items-center overflow-hidden bg-gradient-to-br from-primary/25 to-sky-500/10 text-sm font-semibold text-violet-300">
                    <span className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10 transition duration-700 group-hover:scale-[3]" aria-hidden="true" />
                    <span className="relative">{p.category}</span>
                  </div>
                  <div className="p-6"><h2 className="text-lg transition group-hover:text-violet-300">{p.title}</h2><p className="mt-2 text-sm text-muted">{p.excerpt}</p>
                    <p className="mt-4 flex items-center justify-between text-xs text-muted">{p.author} · {formatDate(p.publishedAt)}<ArrowRight size={16} className="text-violet-300 transition group-hover:translate-x-1" /></p></div>
                </Link>
              </m.article>
            ))}
          </AnimatePresence>
        </m.div>
      </Section>
    </>
  );
}
