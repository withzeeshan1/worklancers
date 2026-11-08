import { motion } from 'framer-motion';
import { CheckCircle2, MessageCircle } from 'lucide-react';
import { whatsappLink } from '../utils/config';

// Shown after a form submit. `result` comes from submitLead():
// sent=true -> the email went out; sent=false -> no form service configured, so the visitor finishes on WhatsApp.
export default function FormSuccess({ result, sentText = 'We will reply within 24 hours.', whatsappText }) {
  if (!result.sent) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} role="status" className="rounded-xl bg-emerald-500/10 ring-1 ring-emerald-500/20 p-5 text-center text-sm text-emerald-200">
        <p className="font-semibold">One last step: send it to us on WhatsApp</p>
        <p className="mt-1 text-emerald-200">Your details are already filled in. Just tap send.</p>
        <motion.a whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} href={result.whatsappUrl} target="_blank" rel="noreferrer"
          className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-6 py-3 font-semibold text-white shadow-lg shadow-green-600/30">
          <MessageCircle size={18} /> Send on WhatsApp
        </motion.a>
      </motion.div>
    );
  }
  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} role="status" className="rounded-xl bg-emerald-500/10 ring-1 ring-emerald-500/20 p-5 text-sm text-emerald-200">
      <p className="flex items-center gap-2 font-semibold"><CheckCircle2 size={18} aria-hidden="true" /> Thank you! Your request has been sent.</p>
      <p className="mt-1">{sentText}{whatsappText && <> Want a faster reply?{' '}
        <a href={whatsappLink(whatsappText)} target="_blank" rel="noreferrer" className="font-semibold underline">Message us on WhatsApp</a>.</>}</p>
    </motion.div>
  );
}
