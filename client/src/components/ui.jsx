import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import FadeImage from './FadeImage';

const base = 'group/btn relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface disabled:opacity-60';
const variants = {
  primary: 'bg-gradient-to-b from-violet-500 to-violet-700 text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.25),0_8px_30px_-6px_rgb(139_92_246/0.6)] hover:shadow-[inset_0_1px_0_rgb(255_255_255/0.3),0_10px_40px_-4px_rgb(139_92_246/0.8)] hover:brightness-110',
  outline: 'border border-line bg-white/[0.03] text-fg backdrop-blur hover:border-white/20 hover:bg-white/[0.07]',
  light: 'bg-white text-black hover:bg-white/90',
};

export function Button({ to, href, variant = 'primary', className = '', children, ...rest }) {
  const cls = `${base} ${variants[variant]} ${className}`;
  if (to) return <Link to={to} className={cls} {...rest}>{children}</Link>;
  if (href) return <a href={href} className={cls} target="_blank" rel="noreferrer" {...rest}>{children}</a>;
  return <button className={cls} {...rest}>{children}</button>;
}

export function Section({ children, className = '', id }) {
  return <section id={id} className={`py-20 sm:py-28 ${className}`}><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div></section>;
}

export function Eyebrow({ children, className = '' }) {
  return (
    <p className={`mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.03] px-3.5 py-1 text-xs font-medium text-ink backdrop-blur ${className}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-violet-400 to-sky-400 shadow-[0_0_8px_rgb(167_139_250)]" />{children}
    </p>
  );
}

export function SectionHeading({ eyebrow, title, text, center = true }) {
  return (
    <div className={`mb-14 max-w-2xl ${center ? 'mx-auto text-center' : ''}`}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="text-3xl sm:text-5xl">{title}</h2>
      {text && <p className="mt-5 text-lg leading-relaxed text-muted">{text}</p>}
    </div>
  );
}

export function PageHeader({ title, text, eyebrow, children, image = '/images/code-screen.jpg' }) {
  return (
    <div className="relative -mt-24 overflow-hidden pt-24">
      {image && <FadeImage src={image} overlay="bg-gradient-to-r from-surface via-surface/75 to-transparent" />}
            {image && <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-surface to-transparent" aria-hidden="true" />}
      <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" aria-hidden="true" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/25 blur-[120px]" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-20 sm:px-6 sm:pb-20 sm:pt-28 lg:px-8">
        {eyebrow && <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}><Eyebrow>{eyebrow}</Eyebrow></motion.div>}
        <motion.h1 initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl text-4xl leading-[1.05] sm:text-6xl">{title}</motion.h1>
        {text && <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }} className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{text}</motion.p>}
        {children && <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="mt-10">{children}</motion.div>}
      </div>
    </div>
  );
}
