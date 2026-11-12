import { m } from 'framer-motion';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { Button } from './ui';
import FadeImage from './FadeImage';
import { whatsappLink } from '../utils/config';

export default function CtaBanner() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <m.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[2rem] border border-line bg-card px-6 py-20 text-center sm:px-12">
          <FadeImage src="/images/cta-code.webp" overlay="bg-black/60" />
          <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" aria-hidden="true" />
          <div className="pointer-events-none absolute left-1/2 top-full h-80 w-[700px] -translate-x-1/2 -translate-y-1/2 animate-blob rounded-full bg-violet-600/40 blur-[100px]" aria-hidden="true" />
          <div className="relative">
            <h2 className="mx-auto max-w-3xl text-4xl leading-[1.05] sm:text-6xl">Have an idea? Let's turn it into <em className="accent text-gradient">something real.</em></h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted">Tell us what you need. You'll get a clear plan and a fixed-price quote, usually within 24 hours.</p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Button to="/contact">Start a project <ArrowUpRight size={16} /></Button>
              <Button href={whatsappLink()} variant="outline"><MessageCircle size={16} className="text-[#25D366]" /> Chat on WhatsApp</Button>
            </div>
          </div>
        </m.div>
      </div>
    </section>
  );
}
