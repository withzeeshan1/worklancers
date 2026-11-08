import { motion } from 'framer-motion';

const offsets = { up: { y: 24 }, down: { y: -24 }, left: { x: 32 }, right: { x: -32 }, none: {} };

// Fades children in when they scroll into view. `from` sets the direction they slide in from.
export default function Reveal({ children, delay = 0, className = '', from = 'up', as = 'div' }) {
  const Tag = motion[as];
  return (
    <Tag className={className} initial={{ opacity: 0, ...offsets[from] }} whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </Tag>
  );
}
