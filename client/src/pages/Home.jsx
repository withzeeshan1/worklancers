import { m } from 'framer-motion';
import { Check, ArrowRight, ArrowUpRight, MessageCircle, X, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { website, faqPage } from '../seo/schema';
import Reveal from '../components/Reveal';
import Counter from '../components/Counter';
import HeroVisual from '../components/HeroVisual';
import HeroTitle from '../components/HeroTitle';
import AuditSection from '../components/AuditSection';
import FadeImage from '../components/FadeImage';
import ServiceCard from '../components/ServiceCard';
import ProjectCard from '../components/ProjectCard';
import Faq from '../components/Faq';
import CtaBanner from '../components/CtaBanner';
import { Button, Eyebrow, Section, SectionHeading } from '../components/ui';
import { services, projects, faqs, processSteps, technologies, whyChoose, testimonials, painPoints, guarantees } from '../services/content';
import { whatsappLink } from '../utils/config';

// Bento layout: which service cards are wide on large screens.
const wide = [0, 3];

export default function Home() {
  const featured = projects.filter((p) => p.isFeatured);

  return (
    <>
      <Seo path="/" description="Worklancers is a software house in Pakistan building websites, custom software, mobile apps and AI automation for businesses worldwide. Free website audit." jsonLd={[website(), faqPage(faqs)]} />
      {/* HERO */}
      <section className="relative -mt-24 overflow-hidden pt-24">
        <FadeImage priority src="/images/hero-code.webp" overlay="bg-gradient-to-b from-black/70 via-black/55 to-black/70" position="center 40%" />
        {/* extra shade right behind the headline so it stays readable */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_50%_32%,rgb(0_0_0/0.5),transparent)]" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-surface to-transparent" aria-hidden="true" />
        <div className="pointer-events-none absolute right-0 top-40 h-96 w-96 animate-blob rounded-full bg-sky-500/10 blur-[100px]" aria-hidden="true" />

        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-20 text-center sm:px-6 sm:pt-28 lg:px-8">
          <m.div initial={{ y: -10 }} animate={{ y: 0 }}>
            <a href="#audit" className="group mb-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/50 py-1 pl-1 pr-4 text-sm text-slate-200 shadow-lg shadow-black/30 backdrop-blur-md transition hover:border-white/30 hover:bg-black/60">
              <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-xs font-medium text-emerald-300">
                <span className="relative flex h-1.5 w-1.5"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" /><span className="relative h-1.5 w-1.5 rounded-full bg-emerald-400" /></span>
                Available
              </span>
              <span>Taking on new projects<span className="hidden sm:inline">. Get a free audit</span></span>
              <ArrowRight size={14} className="transition group-hover:translate-x-0.5" />
            </a>
          </m.div>

          <HeroTitle />

          <m.p initial={{ y: 12 }} animate={{ y: 0 }} transition={{ delay: 1.2, duration: 0.6 }} className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-slate-200 [text-shadow:0_1px_12px_rgb(0_0_0/0.8)] sm:text-xl">
            Websites, custom software, apps and AI automation for growing businesses, built by one team obsessed with a single number: how many customers it brings you.
          </m.p>
          <m.div initial={{ y: 16 }} animate={{ y: 0 }} transition={{ delay: 1, duration: 0.6 }} className="mt-10 flex flex-wrap justify-center gap-3">
            <Button to="/contact" className="!px-8 !py-4 !text-base ring-1 ring-white/20">Start a project <ArrowUpRight size={16} className="transition group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" /></Button>
            <Button href={whatsappLink()} variant="light" className="!px-8 !py-4 !text-base font-semibold shadow-lg shadow-black/30"><MessageCircle size={18} className="text-[#1DA851]" /> Talk on WhatsApp</Button>
          </m.div>
          <m.ul initial={{ y: 8 }} animate={{ y: 0 }} transition={{ delay: 1.2 }} className="mt-8 flex flex-wrap justify-center gap-2 text-sm text-slate-200">
            {['Fixed-price quotes', 'Reply within 24h', 'You own the code'].map((t) => <li key={t} className="flex items-center gap-1.5 rounded-full border border-white/10 bg-black/40 px-3.5 py-1.5 backdrop-blur-md"><Check size={15} className="text-emerald-400" />{t}</li>)}
          </m.ul>

          <m.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 1, ease: [0.22, 1, 0.36, 1] }} className="relative mx-auto mt-20 max-w-6xl">
            <div className="pointer-events-none absolute inset-x-[20%] -top-10 h-56 rounded-full bg-violet-600/30 blur-[90px]" aria-hidden="true" />
            <HeroVisual />
          </m.div>
        </div>
      </section>

      {/* TECH MARQUEE */}
      <section className="py-12">
        <p className="mb-8 text-center text-xs font-medium uppercase tracking-[0.25em] text-muted">Built with the tools modern products run on</p>
        <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
          <div className="pause-on-hover flex w-max animate-marquee gap-12">
            {[...technologies, ...technologies].map((t, i) => (
              <span key={i} aria-hidden={i >= technologies.length} className="whitespace-nowrap text-xl font-medium tracking-tight text-white/60 transition hover:text-white">{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES BENTO */}
      <Section>
        <SectionHeading eyebrow="Services" title={<>Everything you need to <em className="accent text-gradient">grow online</em></>} text="One accountable team for design, development, marketing and automation, so you never juggle five freelancers again." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 3) * 0.08} className={`h-full ${wide.includes(i) ? 'lg:col-span-2' : ''}`}><ServiceCard service={s} featured={wide.includes(i)} /></Reveal>
          ))}
          <Reveal delay={0.16} className="h-full">
            <a href="#audit" className="spotlight group flex h-full min-h-[220px] flex-col justify-between overflow-hidden rounded-xl2 border border-violet-500/30 bg-gradient-to-br from-violet-600/20 via-card to-card p-7">
              <Sparkles className="text-violet-300" aria-hidden="true" />
              <div>
                <h3 className="text-xl">Not sure where to start?</h3>
                <p className="mt-2 text-sm text-muted">Get a free audit of your current website with practical fixes.</p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-violet-300">Get my free audit <ArrowRight size={15} className="transition group-hover:translate-x-1" /></span>
              </div>
            </a>
          </Reveal>
        </div>
      </Section>

      {/* PAIN POINTS */}
      <Section className="section-alt relative overflow-hidden">
        <FadeImage src="/images/developers.webp" overlay="bg-black/65" />
        <div className="relative">
        <SectionHeading eyebrow="Sound familiar?" title="Your business deserves more than a pretty website" text="Most small-business websites look fine and do nothing. Here is what we fix." />
        <div className="grid gap-4 md:grid-cols-3">
          {painPoints.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1} className="h-full">
              <div className="spotlight h-full overflow-hidden rounded-xl2 border border-line bg-card">
                <p className="flex items-start gap-3 p-6 text-muted"><span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-red-500/15 text-red-400"><X size={12} /></span><span className="line-through decoration-red-400/40">{p.title}</span></p>
                <p className="flex items-start gap-3 border-t border-line bg-white/[0.02] p-6 text-fg"><span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-500/15 text-emerald-400"><Check size={12} /></span>{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
        </div>
      </Section>

      {/* PROMISES BENTO */}
      <Section>
        <SectionHeading eyebrow="Why Worklancers" title={<>Built on promises <em className="accent text-gradient">we keep</em></>} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {guarantees.map((g, i) => (
            <Reveal key={g.label} delay={i * 0.08} className="h-full">
              <div className="spotlight h-full rounded-xl2 border border-line bg-card p-7">
                <p className="bg-gradient-to-b from-white to-white/40 bg-clip-text text-5xl font-semibold tracking-tighter text-transparent"><Counter to={g.value} prefix={g.prefix} suffix={g.suffix} /></p>
                <p className="mt-3 text-sm text-muted">{g.label}</p>
              </div>
            </Reveal>
          ))}
          {whyChoose.map((w, i) => (
            <Reveal key={w.title} delay={0.1 + i * 0.08} className="h-full">
              <div className="spotlight h-full rounded-xl2 border border-line bg-card p-7">
                <span className="font-mono text-xs text-violet-300">0{i + 1}</span>
                <h3 className="mt-3 text-lg">{w.title}</h3><p className="mt-2 text-sm leading-relaxed text-muted">{w.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <AuditSection />

      {/* PROCESS */}
      <Section className="relative overflow-hidden">
        <FadeImage src="/images/planning.webp" overlay="bg-black/65" />
        <div className="relative">
        <SectionHeading eyebrow="Process" title="Simple, transparent, on schedule" text="You always know what's happening and what comes next." />
        <div className="relative">
          <m.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 1.4, ease: 'easeInOut' }}
            className="absolute left-[10%] right-[10%] top-7 hidden h-px origin-left bg-gradient-to-r from-violet-500/0 via-violet-500 to-sky-400/0 lg:block" aria-hidden="true" />
          <ol className="relative grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
            {processSteps.map((s, i) => (
              <Reveal as="li" key={s.title} delay={0.2 + i * 0.15} className="text-center">
                <span className="relative mx-auto grid h-14 w-14 place-items-center rounded-2xl border border-line bg-card font-mono text-sm text-violet-300 shadow-soft">0{i + 1}</span>
                <h3 className="mt-5 text-lg">{s.title}</h3><p className="mt-1 text-sm text-muted">{s.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
        </div>
      </Section>

      {/* PORTFOLIO */}
      <Section className="section-alt">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl"><Eyebrow>Selected work</Eyebrow><h2 className="text-3xl sm:text-5xl">See what we can build</h2>
            <p className="mt-5 text-lg text-muted">SaaS platforms, AI web apps, directories and mobile games we have built for clients. Open any project to see it live.</p></div>
          <Button to="/portfolio" variant="outline">View all work <ArrowRight size={16} /></Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p, i) => <Reveal key={p.slug} delay={i * 0.1} className="h-full"><ProjectCard project={p} /></Reveal>)}
        </div>
      </Section>

      {/* TESTIMONIALS: shown only once real reviews exist */}
      {testimonials.length > 0 && (
        <Section>
          <SectionHeading eyebrow="Testimonials" title="What our clients say" />
          <div className="grid gap-4 md:grid-cols-3">{testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <figure className="spotlight h-full rounded-xl2 border border-line bg-card p-7"><blockquote className="text-fg">“{t.quote}”</blockquote><figcaption className="mt-5 text-sm text-muted">{t.name}</figcaption></figure>
            </Reveal>
          ))}</div>
        </Section>
      )}

      {/* FAQ */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="text-3xl sm:text-5xl">Questions, <em className="accent text-gradient">answered</em></h2>
            <p className="mt-5 text-muted">Can't find what you're looking for? <Link to="/contact" className="text-fg underline decoration-violet-400 underline-offset-4">Ask us directly</Link>.</p>
          </div>
          <div className="lg:col-span-3"><Faq items={faqs} /></div>
        </div>
      </Section>

      <CtaBanner />
    </>
  );
}
