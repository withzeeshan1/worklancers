import { Target, Eye, Shield, Users, Layers, Sparkles, Check } from 'lucide-react';
import Seo from '../components/Seo';
import Reveal from '../components/Reveal';
import CtaBanner from '../components/CtaBanner';
import { PageHeader, Section, SectionHeading } from '../components/ui';
import { whyChoose } from '../services/content';

const values = [['Reliability', Shield, 'We deliver what we promise, on time.'], ['Collaboration', Users, 'We work with you, not just for you.'], ['Quality', Layers, 'Clean, maintainable work in every project.'], ['Innovation', Sparkles, 'We adopt modern tools where they add value.']];
const expertise = ['Web & MERN development', 'Custom software & SaaS', 'Mobile apps with React Native', 'UI/UX and brand design', 'SEO and digital marketing', 'Shopify and WooCommerce', 'AI chatbots and automation', 'APIs & integrations'];

export default function About() {
  return (
    <>
      <Seo title="About Us" description="Learn about Worklancers, a software house and digital agency: our mission, vision and values." path="/about" />
      <PageHeader image="/images/dev-team.jpg" eyebrow="About us" title="A software house that builds like a partner, not a vendor" text="We help businesses build, design and grow online with one accountable team." />
      <Section>
        <div className="grid gap-10 lg:grid-cols-2">
          <Reveal from="right"><h2 className="text-2xl sm:text-3xl">Our story</h2>
            <p className="mt-4 leading-relaxed text-muted">Worklancers was created to give businesses a single, dependable partner for their digital needs. Instead of juggling separate developers, designers and marketers, clients get one coordinated team that understands the whole picture.</p>
            <p className="mt-4 leading-relaxed text-muted">We work with startups, small and medium businesses, e-commerce brands and international clients, with a strong focus on the needs of Pakistani businesses going digital.</p></Reveal>
          <div className="grid gap-6 sm:grid-cols-2">
            {[['Mission', Target, 'To help businesses grow through well-built, well-designed and well-marketed digital products.'], ['Vision', Eye, 'To be a trusted international software and creative agency known for quality and honesty.']].map(([t, Icon, d], i) => (
              <Reveal key={t} from="left" delay={i * 0.12} className="h-full">
                <div className="spotlight group h-full rounded-xl2 border border-line bg-card p-6 shadow-soft transition duration-300 hover:-translate-y-1 hover:border-primary/40">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary-light text-violet-300 transition duration-300 group-hover:rotate-6 group-hover:bg-primary group-hover:text-white"><Icon size={22} /></span>
                  <h3 className="mt-4 text-xl">{t}</h3><p className="mt-2 text-sm text-muted">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>
      <Section className="section-alt">
        <SectionHeading eyebrow="Core values" title="What guides our work" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map(([t, Icon, d], i) => (
            <Reveal key={t} delay={i * 0.08} className="h-full">
              <div className="group h-full rounded-xl2 bg-primary-light p-6 transition duration-300 hover:-translate-y-1 hover:shadow-soft">
                <Icon className="text-violet-300 transition duration-300 group-hover:scale-125" /><h3 className="mt-3 text-lg">{t}</h3><p className="mt-1 text-sm text-muted">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
      <Section>
        <div className="grid gap-10 lg:grid-cols-2">
          <Reveal from="right"><SectionHeading center={false} title="Our expertise" />
            <ul className="grid gap-3 sm:grid-cols-2">{expertise.map((e) => <li key={e} className="flex items-center gap-2 rounded-xl border border-line bg-card px-4 py-3 text-sm text-fg transition hover:border-primary hover:text-violet-300"><Check size={16} className="shrink-0 text-violet-300" />{e}</li>)}</ul></Reveal>
          <Reveal from="left" delay={0.1}><SectionHeading center={false} title="Why work with us" />
            <ul className="space-y-5">{whyChoose.map((w) => <li key={w.title} className="border-l-2 border-primary pl-4"><p className="font-semibold text-fg">{w.title}</p><p className="text-sm text-muted">{w.text}</p></li>)}</ul></Reveal>
        </div>
      </Section>
      <CtaBanner />
    </>
  );
}
