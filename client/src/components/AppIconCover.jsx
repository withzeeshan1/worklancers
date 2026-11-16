// Cover for app projects that have an icon but no screenshot: the icon sits in the centre
// on a blurred, enlarged copy of itself, so square icons are never cropped by wide cards.
export default function AppIconCover({ icon, title, size = 'md' }) {
  const box = size === 'lg' ? 'h-44 w-44 sm:h-56 sm:w-56' : 'h-32 w-32';
  return (
    <span className="absolute inset-0 grid place-items-center overflow-hidden" aria-hidden="true">
      <img src={icon} alt="" width={512} height={512} loading="lazy" className="absolute inset-0 h-full w-full scale-150 object-cover opacity-60 blur-2xl" />
      <span className="absolute inset-0 bg-black/25" />
      <img src={icon} alt={`${title} app icon`} width={512} height={512} loading="lazy"
        className={`relative ${box} rounded-[22%] shadow-2xl shadow-black/60 ring-1 ring-white/20 transition duration-500 group-hover:scale-105`} />
    </span>
  );
}
