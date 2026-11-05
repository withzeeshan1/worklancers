import { useId } from 'react';

// "WL" monogram: one continuous rounded stroke draws the W, then the L, on a violet→sky tile.
// The same artwork is saved as public/logo-mark.svg, public/logo.svg and public/favicon.svg.
export function LogoMark({ size = 32, className = '' }) {
  const id = useId();
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#8B5CF6" />
          <stop offset="0.55" stopColor="#6366F1" />
          <stop offset="1" stopColor="#38BDF8" />
        </linearGradient>
        <linearGradient id={`${id}-shine`} x1="24" y1="0" x2="24" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#fff" stopOpacity="0.28" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="12" fill={`url(#${id}-bg)`} />
      <rect width="48" height="48" rx="12" fill={`url(#${id}-shine)`} />
      {/* W */}
      <path d="M8.5 15 L13.5 33 L19 21.5 L24.5 33 L29.5 15" fill="none" stroke="#fff" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" />
      {/* L */}
      <path d="M34.5 15 V33 H40" fill="none" stroke="#fff" strokeOpacity="0.85" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Full logo: mark + "Worklancers" wordmark.
export default function Logo({ size = 32, showText = true, className = '' }) {
  return (
    <span className={`group flex items-center gap-2.5 ${className}`}>
      <LogoMark size={size} className="shrink-0 drop-shadow-[0_0_18px_rgb(139_92_246/0.55)] transition duration-300 group-hover:scale-105 group-hover:drop-shadow-[0_0_24px_rgb(139_92_246/0.8)]" />
      {showText && (
        <span className="leading-none">
          <span className="block text-[17px] font-semibold tracking-tight text-white">Worklancers</span>
          <span className="mt-0.5 block text-[9.5px] font-medium uppercase tracking-[0.28em] text-violet-300/90">Software House</span>
        </span>
      )}
    </span>
  );
}
