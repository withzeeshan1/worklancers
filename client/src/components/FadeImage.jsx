// Full-colour background photo for a section (parent needs `relative overflow-hidden`).
// The photo itself is shown clearly; `overlay` adds a shade only where text needs contrast.
// `fade` (optional) softens one edge into the page background.
const masks = {
  none: '',
  bottom: '[mask-image:linear-gradient(to_bottom,black_70%,transparent)]',
  top: '[mask-image:linear-gradient(to_top,black_70%,transparent)]',
};

// `priority` = the main image at the top of a page: load it immediately (helps Google's LCP speed score).
export default function FadeImage({ src, overlay = 'bg-black/50', fade = 'none', position = 'center', zoom = true, priority = false, className = '' }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${masks[fade] ?? ''} ${className}`}>
      <img src={src} alt="" loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : undefined} decoding="async" style={{ objectPosition: position }}
        className={`h-full w-full object-cover ${zoom ? 'animate-kenburns' : ''}`} />
      {overlay && <div className={`absolute inset-0 ${overlay}`} />}
    </div>
  );
}
