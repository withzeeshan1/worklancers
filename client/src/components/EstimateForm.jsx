import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AnimatePresence, m } from 'framer-motion';
import { ArrowRight, AlertCircle, Loader2 } from 'lucide-react';
import FormSuccess from './FormSuccess';
import { submitLead } from '../services/api';
import { budgets } from '../services/content';

export const SOFTWARE_SERVICE = 'Custom Software Development';

const field = 'mt-1 w-full rounded-xl border border-line bg-white/[0.03] px-4 py-3 text-sm text-fg placeholder:text-muted/70 transition focus:border-violet-500/60 focus:bg-white/[0.05] focus:outline-none focus:ring-4 focus:ring-violet-500/10';

function Err({ e }) {
  return e ? <p className="mt-1 text-xs text-red-300" role="alert">{e.message}</p> : null;
}

// Project-estimate form for the custom software landing page. Saved as a normal lead.
export default function EstimateForm({ projectTypes }) {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();
  const [status, setStatus] = useState(null);

  const onSubmit = async ({ fullName, email, companyName, projectType, budget, details }) => {
    setStatus(null);
    try {
      const result = await submitLead({ fullName, email, companyName, budget, service: SOFTWARE_SERVICE, description: `Project type: ${projectType}\n\n${details}` });
      setStatus({ ok: true, result });
      reset();
    } catch (e) {
      setStatus({ ok: false, msg: e.message });
    }
  };

  return (
    <div className="rounded-[1.5rem] border border-line bg-card p-6 shadow-soft sm:p-8">
      <AnimatePresence mode="wait">
        {status?.ok ? (
          <m.div key="done" className="py-6">
            <h3 className="mb-4 text-center text-xl">Thanks! We've got your project details.</h3>
            <FormSuccess result={status.result} sentText="Expect a reply with next steps within 24 hours." whatsappText="Hi Worklancers, I just sent a custom software estimate request." />
          </m.div>
        ) : (
          <m.form key="form" exit={{ opacity: 0 }} onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-medium text-fg">Your name
                <input className={field} {...register('fullName', { required: 'Please enter your name', minLength: { value: 2, message: 'Name is too short' } })} /><Err e={errors.fullName} /></label>
              <label className="text-sm font-medium text-fg">Work email
                <input type="email" className={field} {...register('email', { required: 'Please enter your email', pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' } })} /><Err e={errors.email} /></label>
              <label className="text-sm font-medium text-fg">Company <span className="font-normal text-muted">(optional)</span>
                <input className={field} {...register('companyName', { maxLength: { value: 120, message: 'Too long' } })} /><Err e={errors.companyName} /></label>
              <label className="text-sm font-medium text-fg">What do you need?
                <select className={field} {...register('projectType', { required: 'Please choose one' })}>
                  <option value="">Select a project type</option>
                  {projectTypes.map((t) => <option key={t}>{t}</option>)}
                  <option>Something else</option>
                </select><Err e={errors.projectType} /></label>
            </div>
            <label className="block text-sm font-medium text-fg">Budget <span className="font-normal text-muted">(optional)</span>
              <select className={field} {...register('budget')}><option value="">Not sure yet</option>{budgets.filter((b) => b !== 'Not sure yet').map((b) => <option key={b}>{b}</option>)}</select></label>
            <label className="block text-sm font-medium text-fg">Tell us about the project
              <textarea rows={4} placeholder="What should the software do, who will use it, and is there a deadline?" className={field}
                {...register('details', { required: 'Please describe the project', minLength: { value: 20, message: 'A sentence or two is enough (20+ characters)' }, maxLength: { value: 3800, message: 'Please keep it under 3,800 characters' } })} /><Err e={errors.details} /></label>
            <m.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={isSubmitting}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-b from-violet-500 to-violet-700 px-6 py-3.5 text-sm font-medium text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.25),0_8px_30px_-6px_rgb(139_92_246/0.6)] transition hover:brightness-110 disabled:opacity-60">
              {isSubmitting ? <><Loader2 size={16} className="animate-spin" /> Sending…</> : <>Get my free estimate <ArrowRight size={16} /></>}
            </m.button>
            <p className="text-center text-xs text-muted">We're happy to sign an NDA before you share details.</p>
            {status && !status.ok && <p role="alert" className="flex items-start gap-2 rounded-xl bg-red-500/10 ring-1 ring-red-500/20 px-4 py-3 text-sm text-red-300"><AlertCircle size={18} className="shrink-0" />{status.msg}</p>}
          </m.form>
        )}
      </AnimatePresence>
    </div>
  );
}
