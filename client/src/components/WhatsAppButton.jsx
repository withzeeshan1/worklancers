import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { whatsappLink } from '../utils/config';

// Floating "chat now" button shown on every public page.
export default function WhatsAppButton() {
  return (
    <motion.a href={whatsappLink()} target="_blank" rel="noreferrer" aria-label="Chat with us on WhatsApp"
      initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 1.5, type: 'spring', stiffness: 260, damping: 18 }}
      whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}
      className="group fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-[#25D366] p-4 text-white shadow-xl shadow-green-600/30">
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366] opacity-30" aria-hidden="true" />
      <MessageCircle size={24} aria-hidden="true" />
      <span className="hidden max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold transition-all duration-300 group-hover:max-w-40 sm:inline">Chat with us</span>
    </motion.a>
  );
}
