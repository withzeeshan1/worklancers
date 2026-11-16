import { useCallback, useEffect, useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { adminApi, errMsg } from '../services/adminApi';
import ImageField from './ImageField';
import { PageTitle, Spinner, ErrorBox, Badge, Modal, inputCls, btnPrimary, btnGhost } from './ui';

const toForm = (item, fields) => Object.fromEntries(fields.map((f) => [f.name, f.type === 'list' ? (item[f.name] || []).join('\n') : (item[f.name] ?? (f.type === 'bool' ? false : ''))]));
const toPayload = (form, fields) => Object.fromEntries(fields.map((f) => [f.name,
  f.type === 'list' ? form[f.name].split('\n').map((s) => s.trim()).filter(Boolean) : f.type === 'number' ? Number(form[f.name]) || 0 : form[f.name]]));

export default function ResourceManager({ title, noun, endpoint, fields, defaults, subtitle }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(null); // { id, form }
  const [formError, setFormError] = useState('');
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true); setError('');
    try { setItems((await adminApi.get(`/${endpoint}?all=true`)).data.data); } catch (e) { setError(errMsg(e)); } finally { setLoading(false); }
  }, [endpoint]);
  useEffect(() => { load(); }, [load]);

  const openNew = () => { setFormError(''); setEditing({ id: null, form: toForm(defaults, fields) }); };
  const openEdit = (item) => { setFormError(''); setEditing({ id: item._id, form: toForm(item, fields) }); };
  const setField = (name, value) => setEditing((e) => ({ ...e, form: { ...e.form, [name]: value } }));

  const save = async (ev) => {
    ev.preventDefault(); setSaving(true); setFormError('');
    try {
      const payload = toPayload(editing.form, fields);
      if (editing.id) await adminApi.put(`/${endpoint}/${editing.id}`, payload); else await adminApi.post(`/${endpoint}`, payload);
      setEditing(null); load();
    } catch (e) { setFormError(errMsg(e)); } finally { setSaving(false); }
  };
  const togglePublish = async (item) => { try { await adminApi.put(`/${endpoint}/${item._id}`, { isPublished: !item.isPublished }); load(); } catch (e) { setError(errMsg(e)); } };
  const remove = async (item) => {
    if (!window.confirm(`Delete "${item.title}"? This cannot be undone.`)) return;
    try { await adminApi.delete(`/${endpoint}/${item._id}`); load(); } catch (e) { setError(errMsg(e)); }
  };

  return (
    <>
      <PageTitle title={title}><button className={btnPrimary} onClick={openNew}><Plus size={16} />Add {noun}</button></PageTitle>
      {subtitle && <p className="-mt-3 mb-5 text-sm text-muted">{subtitle}</p>}
      <ErrorBox msg={error} />
      {loading ? <Spinner /> : items.length === 0 ? <p className="rounded-xl2 border border-dashed border-slate-300 bg-white p-10 text-center text-muted">No {noun}s yet. Click “Add {noun}” to create one.</p> : (
        <div className="overflow-x-auto rounded-xl2 border border-slate-200 bg-white shadow-soft">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-muted"><tr><th className="px-4 py-3">Title</th><th className="px-4 py-3">Slug</th><th className="px-4 py-3">Status</th><th /></tr></thead>
            <tbody className="divide-y divide-slate-100">
              {items.map((i) => (
                <tr key={i._id}>
                  <td className="px-4 py-3 font-medium text-navy">{i.title}{i.category && <span className="ml-2 text-xs font-normal text-muted">{i.category}</span>}</td>
                  <td className="px-4 py-3 text-muted">{i.slug}</td>
                  <td className="px-4 py-3"><button onClick={() => togglePublish(i)} aria-label={`${i.isPublished ? 'Unpublish' : 'Publish'} ${i.title}`}><Badge tone={i.isPublished ? 'green' : 'amber'}>{i.isPublished ? 'Published' : 'Draft'}</Badge></button></td>
                  <td className="px-4 py-3 text-right whitespace-nowrap"><button onClick={() => openEdit(i)} aria-label={`Edit ${i.title}`} className="p-2 text-primary"><Pencil size={18} /></button><button onClick={() => remove(i)} aria-label={`Delete ${i.title}`} className="p-2 text-red-600"><Trash2 size={18} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {editing && (
        <Modal title={`${editing.id ? 'Edit' : 'Add'} ${noun}`} onClose={() => setEditing(null)}>
          <form onSubmit={save} className="space-y-4">
            {fields.map((f) => (
              <label key={f.name} className={`block text-sm font-medium text-navy ${f.type === 'bool' ? 'flex items-center gap-2' : ''}`}>
                {f.type === 'bool' && <input type="checkbox" checked={!!editing.form[f.name]} onChange={(e) => setField(f.name, e.target.checked)} />}
                {f.label}{f.hint && <span className="ml-1 font-normal text-muted">({f.hint})</span>}
                {f.type === 'text' && <input className={inputCls} required={f.required} value={editing.form[f.name]} onChange={(e) => setField(f.name, e.target.value)} />}
                {f.type === 'number' && <input type="number" className={inputCls} value={editing.form[f.name]} onChange={(e) => setField(f.name, e.target.value)} />}
                {(f.type === 'textarea' || f.type === 'list') && <textarea rows={f.rows || 3} className={inputCls} required={f.required} value={editing.form[f.name]} onChange={(e) => setField(f.name, e.target.value)} />}
                {f.type === 'image' && <ImageField value={editing.form[f.name]} onChange={(v) => setField(f.name, v)} />}
              </label>
            ))}
            <ErrorBox msg={formError} />
            <div className="flex justify-end gap-2"><button type="button" className={btnGhost} onClick={() => setEditing(null)}>Cancel</button><button className={btnPrimary} disabled={saving}>{saving ? 'Saving...' : 'Save'}</button></div>
          </form>
        </Modal>
      )}
    </>
  );
}
