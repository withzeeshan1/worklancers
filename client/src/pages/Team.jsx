import { ArrowRight, Sparkle } from 'lucide-react';
import Seo from '../components/Seo';
import { breadcrumbs, teamPage } from '../seo/schema';
import Reveal from '../components/Reveal';
import CtaBanner from '../components/CtaBanner';
import TeamCard from '../components/TeamCard';
import { Button, Eyebrow, PageHeader, Section } from '../components/ui';
import { team } from '../services/content';
import { responsive } from '../utils/responsiveImage';

const everyone = [...team.founders, ...team.members];
const marqueeWords = ['Your Growth', 'Our Expertise'];

export default function Team() {
  const half = Math.ceil(everyone.length / 2);
  return (
    <>
      <Seo title="Our Team: The People Behind Worklancer" path="/team" image="/images/hero-team.webp"
        description="Meet the Worklancer team: the founders, developers, designers and marketers who build websites, custom software, mobile apps and marketing for our clients."
        jsonLd={[breadcrumbs([['Home', '/'], ['Our Team', '/team']]), teamPage(everyone)]} />
      <PageHeader image="/images/hero-team.webp" overlay="bg-gradient-to-r from-surface via-surface/85 to-surface/50 sm:via-surface/75 sm:to-transparent" eyebrow="Our team" title="The People Behind Worklancer" text="Developers, designers and marketers working as one team for your business." />

      {/* Intro */}
      <Section>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal from="right">
            <div className="relative overflow-hidden rounded-[1.75rem] border border-line shadow-soft">
              <img {...responsive('/images/hero-office.webp', '(min-width: 1280px) 600px, (min-width: 1024px) 50vw, 100vw')} alt="The Worklancer team at work in the office" width="1000" height="667" loading="lazy" decoding="async" className="aspect-[4/3] w-full object-cover" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-violet-900/30 via-transparent to-transparent" aria-hidden="true" />
            </div>
          </Reveal>
          <Reveal from="left" delay={0.1}>
            <Eyebrow>One team, one goal</Eyebrow>
            <h2 className="text-4xl leading-[1.05] sm:text-6xl">One partner, <span className="accent text-gradient">one team.</span></h2>
            <p className="mt-6 text-lg leading-relaxed text-muted">We're a software house and digital agency. The same people plan, design, build and market your product, so nothing gets lost between vendors.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button to="/services">Our services <ArrowRight size={16} /></Button>
              <Button to="/contact" variant="outline">Start a project</Button>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Founders (only when there are any) */}
      {team.founders.length > 0 && (
        <Section className="!pt-0">
          <Reveal><h2 className="mb-12 text-4xl sm:text-6xl">Our Founders</h2></Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:max-w-4xl">
            {team.founders.map((p, i) => (
              <Reveal key={`${p.name}-${i}`} delay={i * 0.1} className={i % 2 ? 'sm:mt-16' : ''}>
                <TeamCard person={p} large />
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      {/* Team */}
      <Section className="!pt-0">
        <Reveal><h2 className="mb-12 text-4xl sm:text-6xl">Our Team</h2></Reveal>
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {team.members.map((p, i) => (
            <Reveal key={`${p.name}-${p.role}-${i}`} delay={(i % 4) * 0.08} className={i % 2 ? 'mt-10 lg:mt-16' : ''}>
              <TeamCard person={p} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Marquee */}
      <section className="overflow-hidden border-y border-line py-10 sm:py-14" aria-label="Your growth, our expertise">
        <div className="pause-on-hover flex w-max animate-marquee items-center gap-10 sm:gap-14">
          {Array.from({ length: 4 }, () => marqueeWords).flat().map((w, i) => (
            <span key={i} aria-hidden="true" className="flex items-center gap-10 sm:gap-14">
              <span className={`whitespace-nowrap text-5xl font-semibold tracking-tight sm:text-8xl ${i % 2 ? 'text-transparent [-webkit-text-stroke:1.5px_rgb(255_255_255/0.35)]' : 'text-gradient'}`}>{w}</span>
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-sky-400 text-white shadow-[0_0_30px_rgb(139_92_246/0.5)] sm:h-20 sm:w-20">
                <Sparkle className="h-5 w-5 sm:h-8 sm:w-8" fill="currentColor" />
              </span>
            </span>
          ))}
        </div>
      </section>

      {/* Statement + roster */}
      <Section>
        <div className="grid gap-10 border-b border-line pb-14 lg:grid-cols-2">
          <Reveal><p className="text-xl font-medium text-fg sm:text-2xl">({everyone.length} people, one team)</p></Reveal>
          <Reveal delay={0.1}>
            <p className="border-l-2 border-violet-500 pl-6 text-xl leading-relaxed text-ink sm:text-2xl">
              Websites, custom software, mobile apps, UI/UX design, SEO, digital marketing and AI automation, all delivered by one coordinated team.
            </p>
          </Reveal>
        </div>
        <div className="mt-14 grid gap-x-16 lg:grid-cols-2">
          {[everyone.slice(0, half), everyone.slice(half)].map((col, c) => (
            <Reveal key={c} delay={c * 0.1}>
              <dl className={c ? 'max-lg:-mt-px' : ''}>
                <div className={`grid grid-cols-2 gap-4 border-b border-line pb-3 text-xs font-medium uppercase tracking-[0.2em] text-muted ${c ? 'max-lg:hidden' : ''}`}><dt>Name</dt><dd>Role</dd></div>
                {col.map((p, i) => (
                  <div key={`${p.name}-${p.role}-${i}`} className="grid grid-cols-2 gap-4 border-b border-line py-4 transition hover:bg-white/[0.02]">
                    <dt className="font-medium text-fg">{p.name}</dt>
                    <dd className="text-muted">{p.role}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBanner />
    </>
  );
}
