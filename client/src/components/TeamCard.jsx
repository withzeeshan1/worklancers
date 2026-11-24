// One person on the Team page: portrait photo (or initials when there's no photo yet), name and role.
const initials = (name) => name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase();

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

export default function TeamCard({ person, large = false }) {
  const { name, role, photo, linkedin } = person;
  return (
    <article className="spotlight group overflow-hidden rounded-[1.5rem] border border-line bg-card shadow-soft transition duration-500 hover:-translate-y-1.5 hover:border-violet-500/40 hover:shadow-[0_20px_60px_-20px_rgb(139_92_246/0.45)]">
      <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-b from-white/[0.09] via-white/[0.04] to-transparent">
        {photo ? (
          <img src={photo} alt={`${name}, ${role} at Worklancers`} width="600" height="750" loading="lazy" decoding="async"
            className="h-full w-full object-cover object-top transition duration-700 ease-out group-hover:scale-[1.04]" />
        ) : (
          <div className="grid h-full place-items-center" aria-hidden="true">
            <span className={`grid place-items-center rounded-full bg-gradient-to-br from-violet-500/30 to-sky-400/20 font-semibold tracking-tight text-white/80 ring-1 ring-white/10 ${large ? 'h-32 w-32 text-4xl' : 'h-24 w-24 text-3xl'}`}>
              {initials(name)}
            </span>
          </div>
        )}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-card to-transparent" aria-hidden="true" />
        {linkedin && (
          <a href={linkedin} target="_blank" rel="noreferrer" aria-label={`${name} on LinkedIn`}
            className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-black/55 text-white/90 ring-1 ring-white/15 backdrop-blur transition hover:bg-[#0A66C2] hover:text-white">
            <LinkedInIcon />
          </a>
        )}
      </div>
      <div className={large ? 'px-6 pb-7 pt-2 sm:px-8' : 'px-5 pb-6 pt-1'}>
        <h3 className={large ? 'text-2xl' : 'text-lg sm:text-xl'}>{name}</h3>
        <p className={`mt-1 text-violet-300 ${large ? 'text-base' : 'text-sm'}`}>{role}</p>
      </div>
    </article>
  );
}
