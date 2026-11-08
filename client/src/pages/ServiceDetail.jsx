import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, MessageCircle } from 'lucide-react';
import Seo from '../components/Seo';
import Reveal from '../components/Reveal';
import ServiceCard from '../components/ServiceCard';
import CtaBanner from '../components/CtaBanner';
import NotFound from './NotFound';
import { Button, PageHeader, Section, SectionHeading } from '../components/ui';
import { serviceIcons } from '../utils/icons';
import { services } from '../services/content';
import { whatsappLink } from '../utils/config';

function List({ title, items }) {
  return (
    <div className="spotlight h-full rounded-xl2 border border-line bg-card p-6 shadow-soft transition duration-300 hover:-translate-y-1 hover:border-primary/40">
      <h2 className="text-xl">{title}</h2>
      <ul className="mt-4 space-y-3">
        {items.map((item, i) => (
          <motion.li key={item} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 + i * 0.07 }} className="flex gap-2 text-sm text-ink">
            <Check size={18} className="mt-0.5 shrink-0 text-violet-300" />{item}
          </motion.li>
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
  return (
    <>
      <Seo title={service.title} description={service.description} path={`/services/${service.slug}`} />
      <PageHeader image={service.image} eyebrow="Service" title={service.title} text={service.description}>
        <div className="flex flex-wrap items-center gap-4">
          <motion.span initial={{ rotate: -20, scale: 0 }} animate={{ rotate: 0, scale: 1 }} transition={{ type: 'spring', delay: 0.4 }}
            className="grid h-14 w-14 place-items-center rounded-2xl bg-primary text-white shadow-lg shadow-primary/30"><Icon size={26} aria-hidden="true" /></motion.span>
          <Button to="/contact" state={{ service: service.title }}>Get a Free Quote <ArrowRight size={16} /></Button>
          <Button href={whatsappLink(`Hello Worklancers, I'm interested in ${service.title}.`)} variant="outline"><MessageCircle size={16} className="text-[#25D366]" /> Ask on WhatsApp</Button>
        </div>
      </PageHeader>
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
