import { motion } from 'framer-motion';
import { ArrowRight, Check, MessageCircle, Rocket, Layers, LayoutDashboard, Wrench, Smartphone, Bot, Briefcase, Users, Handshake, Clock, ShieldCheck, Globe2, BadgeDollarSign } from 'lucide-react';
import Seo from '../components/Seo';
import { breadcrumbs, faqPage, serviceSchema } from '../seo/schema';
import Reveal from '../components/Reveal';
import CodeWindow from '../components/CodeWindow';
import FadeImage from '../components/FadeImage';
import EstimateForm from '../components/EstimateForm';
import Faq from '../components/Faq';
import CtaBanner from '../components/CtaBanner';
import { Button, Section, SectionHeading } from '../components/ui';
import { whatsappLink } from '../utils/config';

const builds = [
  { icon: Rocket, title: 'MVPs for startups', text: 'Launch a working first version fast, test it with real users, then grow it.' },
  { icon: Layers, title: 'SaaS platforms', text: 'Multi-user products with subscriptions, roles, billing and dashboards.' },
  { icon: LayoutDashboard, title: 'Web apps & portals', text: 'Customer portals, booking systems, marketplaces and member areas.' },
  { icon: Wrench, title: 'Internal tools & ERPs', text: 'Replace spreadsheets with tools built around how your team actually works.' },
  { icon: Smartphone, title: 'Mobile apps', text: 'Android and iOS apps from one React Native codebase.' },
  { icon: Bot, title: 'AI & API integrations', text: 'Chatbots, AI agents, payment gateways and connections to the tools you use.' },
];

const models = [
  { icon: Briefcase, title: 'Fixed-price project', for: 'Best when the scope is clear', points: ['Agreed scope, price and timeline', 'Milestone-based payments', 'Ideal for MVPs and websites'] },
  { icon: Users, title: 'Dedicated developer or team', for: 'Best for ongoing product work', points: ['Developers who work as part of your team', 'Monthly billing, scale up or down', 'Your tools, your processes'], highlight: true },
  { icon: Handshake, title: 'White-label for agencies', for: 'Best for agencies & freelancers', points: ['We build, you deliver under your brand', 'NDA and no client contact', 'Extra capacity without hiring'] },
];

const reasons = [
  { icon: BadgeDollarSign, title: 'Cost-effective', text: 'Senior-quality work at rates that make sense for growing businesses.' },
  { icon: Globe2, title: 'Works across time zones', text: 'Working hours that overlap with the UK, Europe, the Gulf and the US.' },
  { icon: ShieldCheck, title: 'You own everything', text: 'Full source code, designs and IP are yours. NDA on request.' },
  { icon: Clock, title: 'Clear communication', text: 'Regular demos and progress updates in plain language.' },
];

const stack = {
  Frontend: ['React', 'Next.js', 'Tailwind CSS', 'TypeScript'],
  Backend: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL'],
  Mobile: ['React Native', 'Expo'],
  'Cloud & AI': ['AWS', 'Vercel', 'Docker', 'OpenAI / LLM APIs'],
};

const steps = [
  ['Free consultation', 'We discuss your idea, users and goals. No cost, no commitment.'],
  ['Estimate & plan', 'You get a written scope, timeline and price.'],
  ['Build in sprints', 'We build in short cycles and show you working software regularly.'],
  ['Launch & support', 'We deploy, hand over everything and stay on for support.'],
];

const faqs = [
  { q: 'Will you sign an NDA?', a: 'Yes. We are happy to sign an NDA before you share any details about your idea.' },
  { q: 'Who owns the code?', a: 'You do. On completion you receive the full source code, designs and all related assets.' },
  { q: 'Can you work on my existing codebase?', a: 'Yes. We start with a short code review, then fix, extend or modernize it.' },
  { q: 'How do you estimate cost?', a: 'We break your project into features and estimate each one. You get a fixed price for a clear scope, or a monthly rate for ongoing work.' },
  { q: 'Do you work with agencies?', a: 'Yes. We offer white-label development, so agencies can deliver more projects under their own brand.' },
];

export default function CustomSoftware() {
  return (
    <>
      <Seo title="Custom Software Development Company" path="/custom-software" image="/images/software-code.jpg" description="Custom software development: MVPs, SaaS platforms, web apps, mobile apps and AI integrations. Fixed-price projects, dedicated developers and white-label work."
        jsonLd={[serviceSchema({ name: 'Custom Software Development', description: 'MVPs, SaaS platforms, web apps, internal tools, mobile apps and AI/API integrations.', path: '/custom-software', offers: builds.map((b) => b.title) }), faqPage(faqs), breadcrumbs([['Home', '/'], ['Custom Software', '/custom-software']])]} />
      {/* HERO */}
      <section className="relative -mt-20 overflow-hidden bg-panel pt-20">
        <FadeImage priority src="/images/software-code.jpg" overlay="bg-gradient-to-r from-panel via-panel/80 to-panel/10" />
        <div className="pointer-events-none absolute -left-32 top-0 h-[28rem] w-[28rem] animate-blob rounded-full bg-primary/40 blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 animate-blob rounded-full bg-sky-500/20 blur-3xl [animation-delay:5s]" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:48px_48px]" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-28">
          <div>
            <motion.p initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="mb-5 inline-block rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold text-sky-300 ring-1 ring-white/20">Software house · Pakistan → worldwide</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="text-4xl leading-tight !text-white sm:text-5xl lg:text-6xl">
              Custom software, <span className="text-gradient">built right</span> and delivered on time.
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">
              From startup MVPs to SaaS platforms and internal tools: tell us your idea and get a clear plan, timeline and fixed-price estimate within 24 hours.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-8 flex flex-wrap gap-4">
              <Button href="#estimate" target="_self" className="shadow-lg shadow-primary/40">Get a Free Estimate <ArrowRight size={16} /></Button>
              <Button href={whatsappLink('Hello Worklancers, I would like to discuss a software project.')} variant="light"><MessageCircle size={16} className="text-[#25D366]" /> Talk on WhatsApp</Button>
            </motion.div>
            <motion.ul initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-300">
              {['NDA on request', 'You own the code', 'Fixed-price or monthly'].map((t) => <li key={t} className="flex items-center gap-1.5"><Check size={16} className="text-emerald-400" />{t}</li>)}
            </motion.ul>
          </div>
          <CodeWindow />
        </div>
      </section>

      {/* WHAT WE BUILD */}
      <Section>
        <SectionHeading eyebrow="What we build" title="Software that solves real business problems" text="If it runs in a browser or on a phone, we can build it." />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {builds.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={(i % 3) * 0.1} className="h-full">
              <div className="spotlight group relative h-full overflow-hidden rounded-xl2 border border-line bg-card p-6 shadow-soft transition duration-300 hover:-translate-y-2 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10">
                <span className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/10 opacity-0 blur-2xl transition duration-500 group-hover:opacity-100" aria-hidden="true" />
                <span className="mb-5 grid h-12 w-12 place-items-center rounded-xl bg-primary-light text-violet-300 transition duration-300 group-hover:rotate-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white"><Icon size={24} aria-hidden="true" /></span>
                <h3 className="text-xl">{title}</h3><p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ENGAGEMENT MODELS */}
      <Section className="section-alt">
        <SectionHeading eyebrow="How we work with you" title="Pick the model that fits" text="Whether you have one project or a long-term product, there's a simple way to start." />
        <div className="grid items-stretch gap-6 lg:grid-cols-3">
          {models.map(({ icon: Icon, title, for: who, points, highlight }, i) => (
            <Reveal key={title} delay={i * 0.12} className="h-full">
              <div className={`relative flex h-full flex-col rounded-xl2 p-7 transition duration-300 hover:-translate-y-2 ${highlight ? 'bg-panel text-slate-300 shadow-2xl shadow-primary/20 ring-2 ring-primary' : 'border border-line bg-card shadow-soft hover:shadow-xl'}`}>
                {highlight && <span className="absolute -top-3 left-7 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">Most flexible</span>}
                <span className={`grid h-12 w-12 place-items-center rounded-xl ${highlight ? 'bg-primary text-white' : 'bg-primary-light text-violet-300'}`}><Icon size={24} aria-hidden="true" /></span>
                <h3 className={`mt-5 text-xl ${highlight ? '!text-white' : ''}`}>{title}</h3>
                <p className={`mt-1 text-sm ${highlight ? 'text-sky-300' : 'text-violet-300'}`}>{who}</p>
                <ul className="mt-5 flex-1 space-y-3 text-sm">
                  {points.map((p) => <li key={p} className="flex gap-2"><Check size={18} className={`mt-0.5 shrink-0 ${highlight ? 'text-emerald-400' : 'text-violet-300'}`} />{p}</li>)}
                </ul>
                <Button href="#estimate" target="_self" variant={highlight ? 'primary' : 'outline'} className="mt-7 w-full">Get an estimate</Button>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* WHY US */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal from="right">
            <SectionHeading center={false} eyebrow="Why Worklancers" title="The quality you expect, at a price that makes sense" text="We combine solid engineering practices with honest communication, so you always know where your project stands." />
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2">
            {reasons.map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} from="left" delay={i * 0.08} className="h-full">
                <div className="spotlight group h-full rounded-xl2 border border-line bg-card p-5 shadow-soft transition duration-300 hover:-translate-y-1 hover:border-primary/40">
                  <Icon className="text-violet-300 transition duration-300 group-hover:scale-110" aria-hidden="true" />
                  <h3 className="mt-3 text-lg">{title}</h3><p className="mt-1 text-sm text-muted">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* TECH STACK */}
      <Section className="section-alt">
        <SectionHeading eyebrow="Tech stack" title="Modern, proven technology" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Object.entries(stack).map(([group, items], i) => (
            <Reveal key={group} delay={i * 0.08} className="h-full">
              <div className="h-full rounded-xl2 bg-surface p-6 ring-1 ring-line">
                <p className="text-sm font-semibold uppercase tracking-wider text-violet-300">{group}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {items.map((t, j) => (
                    <motion.span key={t} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 + j * 0.06 }}
                      className="rounded-full border border-line bg-card px-3 py-1.5 text-sm text-fg transition hover:border-primary hover:text-violet-300">{t}</motion.span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* PROCESS */}
      <Section>
        <SectionHeading eyebrow="Process" title="From idea to launch in four steps" />
        <ol className="relative mx-auto max-w-3xl space-y-8 border-l-2 border-primary/20 pl-8">
          {steps.map(([title, text], i) => (
            <Reveal as="li" key={title} delay={i * 0.12} from="left" className="relative">
              <motion.span initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ type: 'spring', delay: 0.2 + i * 0.12 }}
                className="absolute -left-[3.19rem] top-0 grid h-9 w-9 place-items-center rounded-full bg-primary text-sm font-bold text-white shadow-lg shadow-primary/30 ring-4 ring-surface">{i + 1}</motion.span>
              <h3 className="text-xl">{title}</h3><p className="mt-1 text-muted">{text}</p>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* ESTIMATE FORM */}
      <section id="estimate" className="scroll-mt-20 bg-gradient-to-b from-surface to-violet-950/40 py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-5 lg:px-8">
          <Reveal from="right" className="lg:col-span-2">
            <p className="text-sm font-semibold uppercase tracking-wider text-violet-300">Free estimate</p>
            <h2 className="mt-3 text-3xl sm:text-4xl">Tell us about your project</h2>
            <p className="mt-4 leading-relaxed text-muted">Share a few details and we'll reply within 24 hours with questions, a rough plan and a price range. No commitment.</p>
            <ul className="mt-6 space-y-3 text-sm text-fg">
              {['Takes about 2 minutes', 'Reply within 24 hours', 'NDA available before details'].map((t) => <li key={t} className="flex items-center gap-2"><Check size={18} className="text-emerald-400" />{t}</li>)}
            </ul>
          </Reveal>
          <Reveal from="left" delay={0.1} className="lg:col-span-3"><EstimateForm projectTypes={builds.map((b) => b.title)} /></Reveal>
        </div>
      </section>

      <Section className="section-alt">
        <SectionHeading eyebrow="FAQ" title="Questions before you start" />
        <Faq items={faqs} />
      </Section>

      <CtaBanner />
    </>
  );
}
