import { m } from 'framer-motion';
import { Check } from 'lucide-react';
import Reveal from './Reveal';
import AuditForm from './AuditForm';
import { Eyebrow } from './ui';
import FadeImage from './FadeImage';

const checks = ['Speed & mobile experience', 'Google visibility (SEO basics)', 'Design, trust & clear call-to-action', 'Quick wins you can apply yourself'];

// Glass card with the free-audit pitch and form. Reused on several pages.
export default function AuditSection({ title = "Find out why your website isn't bringing you customers" }) {
  return (
    <section id="audit" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative grid items-center gap-12 overflow-hidden rounded-[2rem] border border-line bg-card p-6 sm:p-12 lg:grid-cols-2">
          <FadeImage src="/images/dev-team.webp" overlay="bg-gradient-to-r from-card via-card/85 to-card/30" />
          <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_left,black,transparent_70%)]" aria-hidden="true" />
          <div className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 animate-blob rounded-full bg-violet-600/30 blur-[100px]" aria-hidden="true" />
          <div className="pointer-events-none absolute -bottom-24 -right-20 h-80 w-80 animate-blob rounded-full bg-sky-500/15 blur-[100px] [animation-delay:6s]" aria-hidden="true" />
          <Reveal from="right" className="relative">
            <Eyebrow>Free, no strings attached</Eyebrow>
            <h2 className="text-3xl sm:text-5xl">{title}</h2>
            <p className="mt-4 leading-relaxed text-muted">Send us your link. Within 24 hours you will get a short, plain-language report on what's holding your site back and how to fix it, even if you never hire us.</p>
            <ul className="mt-6 space-y-3 text-ink">
              {checks.map((t, i) => (
                <m.li key={t} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.1 }} className="flex items-center gap-3">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-violet-500/20 ring-1 ring-violet-400/30"><Check size={13} className="text-violet-300" /></span>{t}
                </m.li>
              ))}
            </ul>
          </Reveal>
          <Reveal from="left" delay={0.15} className="relative"><AuditForm dark /></Reveal>
        </div>
      </div>
    </section>
  );
}
