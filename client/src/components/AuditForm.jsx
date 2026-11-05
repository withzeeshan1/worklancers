import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, AlertCircle, Loader2, Gift } from 'lucide-react';
import FormSuccess from './FormSuccess';
import { submitLead } from '../services/api';

export const AUDIT_SERVICE = 'Free Website Audit';

const field = 'w-full rounded-xl border border-line bg-white/[0.03] px-4 py-3 text-sm text-fg placeholder:text-muted/70 transition focus:border-violet-500/60 focus:bg-white/[0.05] focus:outline-none focus:ring-4 focus:ring-violet-500/10';

// Low-friction first step: three fields, no budget or long description required.
export default function AuditForm({ dark = false }) {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();
  const [status, setStatus] = useState(null);

  const onSubmit = async ({ fullName, email, website }) => {
    setStatus(null);
    try {
      const result = await submitLead({
        fullName, email, service: AUDIT_SERVICE,
        description: `Free website audit request. Website: ${website?.trim() || 'No website yet (wants advice on starting one)'}`,
      });
      setStatus({ ok: true, result });
      reset();
    } catch (e) {
      setStatus({ ok: false, msg: e.message });
    }
  };

  return (
    <div className={`rounded-2xl p-6 sm:p-7 ${dark ? 'border border-line bg-surface/60 shadow-soft backdrop-blur-xl' : 'border border-line bg-card shadow-xl shadow-primary/5'}`}>
      <div className="mb-4 flex items-center gap-2">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-violet-500 to-sky-400 text-white"><Gift size={16} aria-hidden="true" /></span>
        <h2 className="text-lg">Get a free website audit</h2>
      </div>
      <p className={`mb-5 text-sm text-muted`}>We review your site and send 3–5 practical fixes to get more customers. No cost, no obligation.</p>

      <AnimatePresence mode="wait">
        {status?.ok ? (
          <motion.div key="done"><FormSuccess result={status.result} sentText="We will email your audit within 24 hours." whatsappText="Hi Worklancers, I just requested a free website audit." /></motion.div>
        ) : (
          <motion.form key="form" exit={{ opacity: 0 }} onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-3">
            <div>
              <label htmlFor="audit-name" className="sr-only">Your name</label>
              <input id="audit-name" placeholder="Your name" className={field} {...register('fullName', { required: 'Please enter your name', minLength: { value: 2, message: 'Name is too short' } })} />
              {errors.fullName && <p className="mt-1 text-xs text-red-400" role="alert">{errors.fullName.message}</p>}
            </div>
            <div>
              <label htmlFor="audit-email" className="sr-only">Email</label>
              <input id="audit-email" type="email" placeholder="Email address" className={field} {...register('email', { required: 'Please enter your email', pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' } })} />
              {errors.email && <p className="mt-1 text-xs text-red-400" role="alert">{errors.email.message}</p>}
            </div>
            <div>
              <label htmlFor="audit-site" className="sr-only">Website (optional)</label>
              <input id="audit-site" placeholder="Your website (leave blank if you don't have one)" className={field} {...register('website', { maxLength: { value: 200, message: 'That address is too long' } })} />
              {errors.website && <p className="mt-1 text-xs text-red-400" role="alert">{errors.website.message}</p>}
            </div>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={isSubmitting}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-b from-violet-500 to-violet-700 px-6 py-3.5 text-sm font-medium text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.25),0_8px_30px_-6px_rgb(139_92_246/0.6)] transition hover:brightness-110 disabled:opacity-60">
              {isSubmitting ? <><Loader2 size={16} className="animate-spin" /> Sending…</> : <>Send me my free audit <ArrowRight size={16} /></>}
            </motion.button>
            {status && !status.ok && <p role="alert" className="flex items-start gap-2 rounded-xl bg-red-500/10 ring-1 ring-red-500/20 px-4 py-3 text-sm text-red-300"><AlertCircle size={18} className="shrink-0" />{status.msg}</p>}
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
