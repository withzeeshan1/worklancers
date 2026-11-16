// Spam trap: a field real visitors never see or reach, but form-filling bots do.
// If it comes back filled, submitLead() silently drops the submission (see services/api.js).
export default function Honeypot({ register }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute -left-[9999px] top-0 h-px w-px overflow-hidden opacity-0">
      <label>
        Leave this field empty
        <input type="text" tabIndex={-1} autoComplete="off" {...register('botcheck')} />
      </label>
    </div>
  );
}
