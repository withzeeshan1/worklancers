import worklancerLogo from '../assets/worklancer-logo.png';

// Logo mark: small square version for favicon-like uses.
export function LogoMark({ size = 32, className = '' }) {
  return (
    <img
      src={worklancerLogo}
      alt="Worklancer logo"
      width={size}
      height={size}
      className={`object-contain ${className}`}
    />
  );
}

// Full logo: the Worklancer wordmark image, sized for navbar / footer.
// Use variant="navbar" (default) for the top bar, "footer" for the footer.
export default function Logo({ variant = 'navbar', className = '' }) {
  const heightClass = variant === 'footer' ? 'h-8 sm:h-9' : 'h-6 sm:h-7';

  return (
    <span className={`group inline-flex items-center ${className}`}>
      <img
        src={worklancerLogo}
        alt="Worklancer"
        className={`${heightClass} w-auto object-contain transition duration-300 group-hover:opacity-90`}
      />
    </span>
  );
}
