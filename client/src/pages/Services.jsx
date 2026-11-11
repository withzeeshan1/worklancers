import { ArrowRight } from 'lucide-react';
import Seo from '../components/Seo';
import { breadcrumbs } from '../seo/schema';
import Reveal from '../components/Reveal';
import ServiceCard from '../components/ServiceCard';
import AuditSection from '../components/AuditSection';
import CtaBanner from '../components/CtaBanner';
import { Button, PageHeader, Section, SectionHeading } from '../components/ui';
import { services } from '../services/content';

export default function Services() {
  return (
    <>
      <Seo title="Web, App & Software Development Services" path="/services" description="Web development, custom software, mobile apps, UI/UX & branding, SEO, e-commerce and AI automation services. One team, fixed-price quotes, delivered on time." jsonLd={breadcrumbs([['Home', '/'], ['Services', '/services']])} />
      <PageHeader eyebrow="What we do" title="Services built around one goal: growing your business" text="Pick one service or let one team handle everything, from the first sketch to your thousandth customer.">
        <div className="flex flex-wrap gap-4">
          <Button to="/contact">Get a Free Quote <ArrowRight size={16} /></Button>
          <Button to="/custom-software" variant="outline">Need custom software?</Button>
        </div>
      </PageHeader>
      <Section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => <Reveal key={s.slug} delay={(i % 3) * 0.1} className="h-full"><ServiceCard service={s} /></Reveal>)}
        </div>
      </Section>
      <Section className="section-alt">
        <SectionHeading eyebrow="Every service includes" title="No surprises, ever" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[['Fixed-price quote', 'You know the full cost before we start.'], ['Weekly updates', 'Progress you can see, not just promises.'], ['Your code, your files', 'Everything is handed over at the end.'], ['Post-launch support', 'We stay around after go-live.']].map(([t, d], i) => (
            <Reveal key={t} delay={i * 0.08}>
              <div className="h-full rounded-xl2 bg-primary-light p-6 transition duration-300 hover:-translate-y-1 hover:shadow-soft">
                <p className="text-3xl font-bold text-white/15">0{i + 1}</p>
                <h3 className="mt-2 text-lg">{t}</h3><p className="mt-1 text-sm text-muted">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
      <AuditSection title="Not sure which service you need? Start with a free audit." />
      <CtaBanner />
    </>
  );
}
