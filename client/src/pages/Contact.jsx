import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import { m } from 'framer-motion';
import { Mail, MessageCircle, AlertCircle, Loader2, Clock } from 'lucide-react';
import FormSuccess from '../components/FormSuccess';
import Seo from '../components/Seo';
import { breadcrumbs } from '../seo/schema';
import { Button, PageHeader, Section } from '../components/ui';
import { services, budgets } from '../services/content';
import { submitLead } from '../services/api';
import { SITE, whatsappLink } from '../utils/config';

function Err({ e }) {
  return e ? <p className="mt-1 text-xs text-red-300" role="alert">{e.message}</p> : null;
}

const field = 'mt-1 w-full rounded-xl border border-line bg-white/[0.03] px-4 py-3 text-sm text-fg placeholder:text-muted/70 transition focus:border-violet-500/60 focus:bg-white/[0.05] focus:outline-none focus:ring-4 focus:ring-violet-500/10';

export default function Contact() {
  const { state } = useLocation();
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({ defaultValues: { service: state?.service || '' } });
  const [status, setStatus] = useState(null);

  const onSubmit = async (values) => {
    setStatus(null);
    try {
      const result = await submitLead(values);
      setStatus({ ok: true, result });
      reset();
    } catch (e) {
      setStatus({ ok: false, msg: e.message });
    }
  };

  return (
    <>
      <Seo title="Contact Us: Get a Free Quote" path="/contact" image="/images/planning.webp" description="Tell us about your website, app or software project and get a clear plan and fixed-price quote within 24 hours. Contact Worklancers by form, email or WhatsApp." jsonLd={breadcrumbs([['Home', '/'], ['Contact', '/contact']])} />
      <PageHeader image="/images/planning.webp" eyebrow="Free quote, no obligation" title="Let's Talk About Your Project" text="Tell us what you need. We reply within 24 hours with a clear plan and a fixed-price quote." />
      <Section>
        <div className="grid gap-10 lg:grid-cols-3">
          <m.form initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }} onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5 rounded-xl2 border border-line bg-card p-6 shadow-soft sm:p-8 lg:col-span-2">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="text-sm font-medium text-fg">Full Name
                <input className={field} {...register('fullName', { required: 'Full name is required', minLength: { value: 2, message: 'Name is too short' } })} /><Err e={errors.fullName} /></label>
              <label className="text-sm font-medium text-fg">Email
                <input type="email" className={field} {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' } })} /><Err e={errors.email} /></label>
              <label className="text-sm font-medium text-fg">Phone / WhatsApp <span className="text-muted font-normal">(optional)</span>
                <input type="tel" className={field} {...register('phone', { pattern: { value: /^[+\d][\d\s()-]{6,18}$/, message: 'Enter a valid phone number' } })} /><Err e={errors.phone} /></label>
              <label className="text-sm font-medium text-fg">Company Name <span className="text-muted font-normal">(optional)</span>
                <input className={field} {...register('companyName')} /></label>
              <label className="text-sm font-medium text-fg">Required Service
                <select className={field} {...register('service', { required: 'Please choose a service' })}>
                  <option value="">Select a service</option>{services.map((s) => <option key={s.slug}>{s.title}</option>)}<option>Custom Software Development</option><option>Other</option>
                </select><Err e={errors.service} /></label>
              <label className="text-sm font-medium text-fg">Estimated Budget <span className="text-muted font-normal">(optional)</span>
                <select className={field} {...register('budget')}>
                  <option value="">Not sure yet</option>{budgets.map((b) => <option key={b}>{b}</option>)}
                </select></label>
            </div>
            <label className="block text-sm font-medium text-fg">Project Description
              <textarea rows={5} placeholder="What do you need, and what should it achieve? e.g. 'A website for my clinic so patients can book online.'" className={field} {...register('description', { required: 'Please describe your project', minLength: { value: 20, message: 'A sentence or two is enough (20+ characters)' } })} /><Err e={errors.description} /></label>
            <Button type="submit" disabled={isSubmitting}>{isSubmitting ? <><Loader2 size={16} className="animate-spin" /> Sending...</> : 'Send Request'}</Button>
            {status?.ok && <FormSuccess result={status.result} whatsappText="Hi Worklancers, I just sent a project request through your website." />}
            {status && !status.ok && (
              <p role="alert" className="flex items-start gap-2 rounded-xl bg-red-500/10 ring-1 ring-red-500/20 px-4 py-3 text-sm text-red-300"><AlertCircle size={18} className="shrink-0" />{status.msg}</p>
            )}
          </m.form>
          <m.aside initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35, duration: 0.5 }} className="space-y-4">
            <a href={whatsappLink()} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-xl2 border border-line bg-card p-5 shadow-soft transition duration-300 hover:-translate-y-1 hover:border-primary">
              <MessageCircle className="text-violet-300" /><div><p className="font-semibold text-fg">WhatsApp</p><p className="text-sm text-muted">Chat with us directly</p></div></a>
            <a href={`mailto:${SITE.email}`} className="flex items-center gap-3 rounded-xl2 border border-line bg-card p-5 shadow-soft transition duration-300 hover:-translate-y-1 hover:border-primary">
              <Mail className="text-violet-300" /><div><p className="font-semibold text-fg">Email</p><p className="text-sm text-muted break-all">{SITE.email}</p></div></a>
            <div className="rounded-xl2 bg-panel p-6 text-slate-300">
              <p className="flex items-center gap-2 font-semibold text-white"><Clock size={18} className="text-sky-400" /> What happens next</p>
              <ol className="mt-4 space-y-4 text-sm">
                {['We read your request and reply within 24 hours.', 'A short call to understand your goals (optional).', 'You get a clear plan, timeline and fixed price.'].map((t, i) => (
                  <li key={t} className="flex gap-3"><span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary text-xs font-bold text-white">{i + 1}</span>{t}</li>
                ))}
              </ol>
            </div>
          </m.aside>
        </div>
      </Section>
    </>
  );
}
