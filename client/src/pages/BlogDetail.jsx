import { Link, useParams } from 'react-router-dom';
import { m } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Reveal from '../components/Reveal';
import Seo from '../components/Seo';
import { blogPosting, breadcrumbs } from '../seo/schema';
import NotFound from './NotFound';
import CtaBanner from '../components/CtaBanner';
import { Button, Section } from '../components/ui';
import { posts } from '../services/content';
import { formatDate } from '../utils/format';

export default function BlogDetail() {
  const { slug } = useParams();
  const p = posts.find((x) => x.slug === slug);
  if (!p) return <NotFound />;
  return (
    <>
      <Seo title={p.title} description={p.excerpt} path={`/blog/${p.slug}`} type="article" jsonLd={[blogPosting(p), breadcrumbs([['Home', '/'], ['Blog', '/blog'], [p.title, `/blog/${p.slug}`]])]} />
      <Section>
        <article className="mx-auto max-w-3xl">
          <m.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-block rounded-full bg-primary-light px-3 py-1 text-sm font-semibold text-violet-300">{p.category}</m.p>
          <m.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-3 text-3xl sm:text-4xl">{p.title}</m.h1>
          <p className="mt-3 text-sm text-muted">By {p.author} · <time dateTime={p.publishedAt}>{formatDate(p.publishedAt)}</time></p>
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink">
            {/* content blocks: "text" = paragraph, { h: '...' } = subheading, { list: [...] } = bullet list */}
            {p.content.map((block, i) => {
              if (typeof block === 'string') return <p key={i}>{block}</p>;
              if (block.h) return <h2 key={i} className="!mt-12 text-2xl sm:text-3xl">{block.h}</h2>;
              return (
                <ul key={i} className="space-y-3 pl-1">
                  {block.list.map((item) => <li key={item} className="flex gap-3"><span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400" />{item}</li>)}
                </ul>
              );
            })}
          </div>
          <Reveal>
            <div className="mt-12 rounded-xl2 bg-gradient-to-r from-primary to-sky-500 p-6 text-white sm:p-8">
              <p className="text-xl font-semibold">Want us to handle this for you?</p>
              <p className="mt-2 text-blue-100">Get a free audit of your website with practical fixes, within 24 hours.</p>
              <Button to="/#audit" variant="light" className="mt-5">Get My Free Audit</Button>
            </div>
          </Reveal>
          <Link to="/blog" className="group mt-10 inline-flex items-center gap-1 text-sm font-semibold text-violet-300"><ArrowLeft size={16} className="transition group-hover:-translate-x-1" /> All articles</Link>
        </article>
      </Section>
      <CtaBanner />
    </>
  );
}
