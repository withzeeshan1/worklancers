import { X, Loader2, AlertCircle } from 'lucide-react';

export const inputCls = 'mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20';
export const btn = 'inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition disabled:opacity-60';
export const btnPrimary = `${btn} bg-primary text-white hover:bg-primary-dark`;
export const btnGhost = `${btn} border border-slate-300 bg-white text-navy hover:border-primary`;

export const PageTitle = ({ title, children }) => <div className="mb-6 flex flex-wrap items-center justify-between gap-3"><h1 className="text-2xl">{title}</h1><div className="flex gap-2">{children}</div></div>;
export const Spinner = () => <div className="grid place-items-center py-16"><Loader2 className="animate-spin text-primary" /></div>;
export const ErrorBox = ({ msg }) => msg ? <p role="alert" className="mb-4 flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700"><AlertCircle size={16} />{msg}</p> : null;
export const Badge = ({ children, tone = 'slate' }) => <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${{ slate: 'bg-slate-100 text-slate-700', green: 'bg-green-100 text-green-800', blue: 'bg-blue-100 text-blue-800', amber: 'bg-amber-100 text-amber-800', red: 'bg-red-100 text-red-700' }[tone]}`}>{children}</span>;

export function Modal({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4" role="dialog" aria-modal="true" aria-label={title}>
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl2 bg-white p-6 shadow-soft">
        <div className="mb-4 flex items-center justify-between"><h2 className="text-xl">{title}</h2><button onClick={onClose} aria-label="Close"><X /></button></div>
        {children}
      </div>
    </div>
  );
}
