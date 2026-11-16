import { useEffect, useState } from 'react';
import { AnimatePresence, m, useReducedMotion } from 'framer-motion';

const WORDS = ['Web Apps', 'Mobile Apps', 'SaaS Products', 'AI Agents', 'Online Stores'];
const ease = [0.22, 1, 0.36, 1];

// Splits text into letters that rise in one after another.
function Letters({ text, delay = 0, className = '' }) {
  return (
    <span className={`inline-block whitespace-nowrap ${className}`}>
      {[...text].map((ch, i) => (
        <m.span key={i} className="inline-block" initial={{ opacity: 0, y: '0.5em', filter: 'blur(8px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.5, delay: delay + i * 0.03, ease }}>
          {ch === ' ' ? ' ' : ch}
        </m.span>
      ))}
    </span>
  );
}

// Word that swaps every few seconds: letters rise in, then the word lifts away blurred.
function RotatingWord() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce) return undefined;
    const id = setInterval(() => setIndex((i) => (i + 1) % WORDS.length), 2600);
    return () => clearInterval(id);
  }, [reduce]);

  const word = WORDS[index];
  return (
    <span className="relative inline-flex justify-center px-[0.08em] align-bottom">
      <AnimatePresence mode="wait" initial={false}>
        <m.span key={word} className="accent text-gradient inline-block whitespace-nowrap pb-[0.26em] pr-[0.06em] [text-shadow:none]"
          exit={{ opacity: 0, y: '-0.4em', filter: 'blur(10px)', transition: { duration: 0.35, ease } }}>
          {[...word].map((ch, i) => (
            <m.span key={i} className="inline-block" initial={{ opacity: 0, y: '0.6em', rotateX: -80, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' }} transition={{ duration: 0.5, delay: 0.9 * (index === 0 ? 1 : 0) + i * 0.035, ease }}>
              {ch === ' ' ? ' ' : ch}
            </m.span>
          ))}
        </m.span>
      </AnimatePresence>
      {/* glowing underline that redraws for every new word */}
      <m.span key={`line-${word}`} aria-hidden="true" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.7, delay: 0.25 + (index === 0 ? 0.9 : 0), ease }}
        className="absolute inset-x-[4%] bottom-[0.02em] h-[3px] origin-left rounded-full bg-gradient-to-r from-violet-400 via-fuchsia-300 to-sky-400 shadow-[0_0_16px_rgb(167_139_250/0.9)]" />
    </span>
  );
}

export default function HeroTitle() {
  return (
    <h1 className="mx-auto max-w-5xl text-5xl leading-[1.05] [text-shadow:0_4px_40px_rgb(0_0_0/0.55)] sm:text-7xl lg:text-[5.5rem]" style={{ perspective: 800 }}
      aria-label={`We Develop ${WORDS.join(', ')} That Grow Your Business.`}>
      <span aria-hidden="true">
        <Letters text="We Develop" />
        <span className="block"><RotatingWord /></span>
        <Letters text="That Grow Your" delay={0.45} />{' '}
        <Letters text="Business." delay={0.8} />
      </span>
    </h1>
  );
}
