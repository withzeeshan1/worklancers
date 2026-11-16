import { Link, useParams } from 'react-router-dom';
import { m } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, MessageCircle } from 'lucide-react';
import Seo from '../components/Seo';
import { breadcrumbs, faqPage, serviceSchema } from '../seo/schema';
import Faq from '../components/Faq';
import Reveal from '../components/Reveal';
import ServiceCard from '../components/ServiceCard';
import CtaBanner from '../components/CtaBanner';
import NotFound from './NotFound';
import { Button, PageHeader, Section, SectionHeading } from '../components/ui';
import { serviceIcons } from '../utils/icons';
import { services, serviceSeo, serviceDetails } from '../services/content';
import { whatsappLink } from '../utils/config';

function List({ title, items }) {
  return (
    <div className="spotlight h-full rounded-xl2 border border-line bg-card p-6 shadow-soft transition duration-300 hover:-translate-y-1 hover:border-primary/40">
      <h2 className="text-xl">{title}</h2>
      <ul className="mt-4 space-y-3">
        {items.map((item, i) => (
          <m.li key={item} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 + i * 0.07 }} className="flex gap-2 text-sm text-ink">
            <Check size={18} className="mt-0.5 shrink-0 text-violet-300" />{item}
          </m.li>
        ))}
      </ul>
    </div>
  );
}

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = services.find((s) => s.slug === slug);
  if (!service) return <NotFound />;
  const Icon = serviceIcons[service.icon];
  const related = services.filter((s) => s.slug !== slug).slice(0, 3);
  const details = serviceDetails[service.slug];
  return (
    <>
      <Seo title={serviceSeo[service.slug]?.title || service.title} description={serviceSeo[service.slug]?.description || service.description} path={`/services/${service.slug}`} image={service.image}
        jsonLd={[serviceSchema({ name: service.title, description: service.description, path: `/services/${service.slug}`, offers: service.subs }), breadcrumbs([['Home', '/'], ['Services', '/services'], [service.title, `/services/${service.slug}`]]), ...(details ? [faqPage(details.faqs)] : [])]} />
      <PageHeader image={service.image} eyebrow="Service" title={service.title} text={service.description}>
        <div className="flex flex-wrap items-center gap-4">
          <m.span initial={{ rotate: -20, scale: 0 }} animate={{ rotate: 0, scale: 1 }} transition={{ type: 'spring', delay: 0.4 }}
            className="grid h-14 w-14 place-items-center rounded-2xl bg-primary text-white shadow-lg shadow-primary/30"><Icon size={26} aria-hidden="true" /></m.span>
          <Button to="/contact" state={{ service: service.title }}>Get a Free Quote <ArrowRight size={16} /></Button>
          <Button href={whatsappLink(`Hello Worklancers, I'm interested in ${service.title}.`)} variant="outline"><MessageCircle size={16} className="text-[#25D366]" /> Ask on WhatsApp</Button>
        </div>
      </PageHeader>
      {details && (
        <Section className="!pb-0">
          <div className="grid gap-10 lg:grid-cols-5">
            <Reveal className="lg:col-span-3">
              <h2 className="text-3xl sm:text-4xl">{service.title} built around your goals</h2>
              {details.intro.map((para) => <p key={para.slice(0, 24)} className="mt-5 text-lg leading-relaxed text-ink">{para}</p>)}
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-2">
              <div className="h-full rounded-xl2 border border-line bg-card p-7 shadow-soft">
                <h2 className="text-xl">Who it’s for</h2>
                <ul className="mt-5 space-y-4">
                  {details.idealFor.map((item) => <li key={item} className="flex gap-3 text-ink"><Check size={18} className="mt-1 shrink-0 text-emerald-400" />{item}</li>)}
                </ul>
              </div>
            </Reveal>
          </div>
        </Section>
      )}
      <Section>
        <div className="grid gap-6 lg:grid-cols-3">
          <Reveal className="h-full"><List title="What we offer" items={service.subs} /></Reveal>
          <Reveal delay={0.1} className="h-full"><List title="Features" items={service.features} /></Reveal>
          <Reveal delay={0.2} className="h-full"><List title="What you get" items={service.benefits} /></Reveal>
        </div>
        <Reveal>
          <div className="mt-10 flex flex-wrap items-center gap-4 rounded-xl2 bg-gradient-to-r from-primary to-sky-500 p-6 text-white sm:p-8">
            <p className="min-w-[200px] flex-1 text-lg font-semibold">Ready to get started with {service.title}? Get a clear plan and price, free.</p>
            <Button to="/contact" state={{ service: service.title }} variant="light">Get a Free Quote</Button>
          </div>
        </Reveal>
        <Link to="/services" className="group mt-8 inline-flex items-center gap-1 text-sm font-semibold text-violet-300"><ArrowLeft size={16} className="transition group-hover:-translate-x-1" /> All services</Link>
      </Section>
      {details && (
        <>
          <Section className="section-alt">
            <SectionHeading eyebrow="Process" title={`How we deliver ${service.title.toLowerCase()}`} text="A clear, step-by-step process so you always know what happens next." />
            <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {details.process.map(([title, text], i) => (
                <Reveal as="li" key={title} delay={i * 0.08} className="h-full">
                  <div className="spotlight h-full rounded-xl2 border border-line bg-card p-6">
                    <span className="font-mono text-sm text-violet-300">0{i + 1}</span>
                    <h3 className="mt-3 text-lg">{title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </Section>
          <Section>
            <SectionHeading eyebrow="FAQ" title={`${service.title} questions`} />
            <Faq items={details.faqs} />
          </Section>
        </>
      )}
      <Section className="section-alt">
        <SectionHeading eyebrow="Also from Worklancers" title="Services that pair well" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((s, i) => <Reveal key={s.slug} delay={i * 0.1} className="h-full"><ServiceCard service={s} /></Reveal>)}
        </div>
      </Section>
      <CtaBanner />
    </>
  );
}
