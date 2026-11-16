import { useCallback, useEffect, useState } from 'react';
import { Search, Eye, Trash2 } from 'lucide-react';
import { adminApi, errMsg } from '../services/adminApi';
import { services } from '../services/content';
import { PageTitle, Spinner, ErrorBox, Badge, Modal, inputCls, btnGhost } from './ui';

const STATUSES = ['new', 'contacted', 'in-progress', 'won', 'lost'];
const tone = { new: 'blue', contacted: 'amber', 'in-progress': 'amber', won: 'green', lost: 'red' };

export default function Leads() {
  const [data, setData] = useState({ data: [], total: 0, pages: 1 });
  const [filters, setFilters] = useState({ search: '', service: '', status: '', page: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState(null);

  const load = useCallback(async () => {
    setLoading(true); setError('');
    try { const { data: r } = await adminApi.get('/leads', { params: Object.fromEntries(Object.entries(filters).filter(([, v]) => v)) }); setData(r); }
    catch (e) { setError(errMsg(e)); } finally { setLoading(false); }
  }, [filters]);
  useEffect(() => { const t = setTimeout(load, 250); return () => clearTimeout(t); }, [load]);

  const setStatus = async (lead, status) => {
    try { const { data: r } = await adminApi.put(`/leads/${lead._id}`, { status }); setData((d) => ({ ...d, data: d.data.map((l) => (l._id === lead._id ? r.data : l)) })); setSelected((s) => (s && s._id === lead._id ? r.data : s)); }
    catch (e) { setError(errMsg(e)); }
  };
  const remove = async (lead) => {
    if (!window.confirm(`Delete the inquiry from ${lead.fullName}? This cannot be undone.`)) return;
    try { await adminApi.delete(`/leads/${lead._id}`); setSelected(null); load(); } catch (e) { setError(errMsg(e)); }
  };
  const set = (patch) => setFilters((f) => ({ ...f, page: 1, ...patch }));

  return (
    <>
      <PageTitle title={`Leads (${data.total})`} />
      <div className="mb-4 grid gap-3 sm:grid-cols-3">
        <label className="relative sm:col-span-1"><Search size={16} className="absolute left-3 top-3.5 text-muted" /><input aria-label="Search inquiries" placeholder="Search name, email, company" className={`${inputCls} !mt-0 pl-9`} value={filters.search} onChange={(e) => set({ search: e.target.value })} /></label>
        <select aria-label="Filter by service" className={`${inputCls} !mt-0`} value={filters.service} onChange={(e) => set({ service: e.target.value })}><option value="">All services</option><option>Free Website Audit</option><option>Custom Software Development</option>{services.map((s) => <option key={s.slug}>{s.title}</option>)}<option>Other</option></select>
        <select aria-label="Filter by status" className={`${inputCls} !mt-0`} value={filters.status} onChange={(e) => set({ status: e.target.value })}><option value="">All statuses</option>{STATUSES.map((s) => <option key={s}>{s}</option>)}</select>
      </div>
      <ErrorBox msg={error} />
      {loading ? <Spinner /> : data.data.length === 0 ? <p className="rounded-xl2 border border-dashed border-slate-300 bg-white p-10 text-center text-muted">No inquiries found.</p> : (
        <div className="overflow-x-auto rounded-xl2 border border-slate-200 bg-white shadow-soft">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-muted"><tr>{['Name', 'Service', 'Budget', 'Date', 'Status', ''].map((h) => <th key={h} className="px-4 py-3 font-semibold">{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-slate-100">
              {data.data.map((l) => (
                <tr key={l._id}>
                  <td className="px-4 py-3"><p className="font-medium text-navy">{l.fullName}</p><p className="text-xs text-muted">{l.email}</p></td>
                  <td className="px-4 py-3">{l.service}</td><td className="px-4 py-3">{l.budget}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{new Date(l.createdAt).toLocaleDateString('en-GB')}</td>
                  <td className="px-4 py-3"><select aria-label={`Status for ${l.fullName}`} value={l.status} onChange={(e) => setStatus(l, e.target.value)} className="rounded-lg border border-slate-300 px-2 py-1 text-xs">{STATUSES.map((s) => <option key={s}>{s}</option>)}</select></td>
                  <td className="px-4 py-3 text-right whitespace-nowrap"><button onClick={() => setSelected(l)} aria-label={`View ${l.fullName}`} className="p-2 text-primary"><Eye size={18} /></button><button onClick={() => remove(l)} aria-label={`Delete ${l.fullName}`} className="p-2 text-red-600"><Trash2 size={18} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {data.pages > 1 && (
        <div className="mt-4 flex items-center justify-center gap-3 text-sm">
          <button className={btnGhost} disabled={filters.page <= 1} onClick={() => setFilters({ ...filters, page: filters.page - 1 })}>Previous</button>
          <span>Page {filters.page} of {data.pages}</span>
          <button className={btnGhost} disabled={filters.page >= data.pages} onClick={() => setFilters({ ...filters, page: filters.page + 1 })}>Next</button>
        </div>
      )}
      {selected && (
        <Modal title="Inquiry details" onClose={() => setSelected(null)}>
          <dl className="grid gap-3 text-sm sm:grid-cols-2">
            {[['Name', selected.fullName], ['Email', selected.email], ['Phone', selected.phone], ['Company', selected.companyName || '-'], ['Service', selected.service], ['Budget', selected.budget], ['Received', new Date(selected.createdAt).toLocaleString('en-GB')]].map(([k, v]) => <div key={k}><dt className="text-xs uppercase text-muted">{k}</dt><dd className="text-navy break-words">{v}</dd></div>)}
            <div><dt className="text-xs uppercase text-muted">Status</dt><dd><Badge tone={tone[selected.status]}>{selected.status}</Badge></dd></div>
          </dl>
          <p className="mt-4 text-xs uppercase text-muted">Project description</p>
          <p className="mt-1 whitespace-pre-wrap rounded-xl bg-slate-50 p-4 text-sm">{selected.description}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            <a className={btnGhost} href={`mailto:${selected.email}`}>Email</a>
            <a className={btnGhost} href={`https://wa.me/${selected.phone.replace(/\D/g, '')}`} target="_blank" rel="noreferrer">WhatsApp</a>
            <button className={`${btnGhost} !text-red-600`} onClick={() => remove(selected)}>Delete</button>
          </div>
        </Modal>
      )}
    </>
  );
}
