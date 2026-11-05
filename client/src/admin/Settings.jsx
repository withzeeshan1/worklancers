import { useEffect, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { adminApi, errMsg } from '../services/adminApi';
import ImageField from './ImageField';
import { PageTitle, Spinner, ErrorBox, inputCls, btnPrimary } from './ui';

const text = [['agencyName', 'Agency name'], ['agencyEmail', 'Agency email'], ['whatsappNumber', 'WhatsApp number (with country code, digits only)'], ['phone', 'Phone'], ['address', 'Address']];
const social = ['facebook', 'instagram', 'linkedin', 'twitter', 'github'];

export default function Settings() {
  const [form, setForm] = useState(null);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  useEffect(() => { adminApi.get('/settings').then((r) => setForm({ ...r.data.data, social: r.data.data.social || {} })).catch((e) => setError(errMsg(e))); }, []);

  const save = async (e) => {
    e.preventDefault(); setSaving(true); setSaved(false); setError('');
    try { await adminApi.put('/settings', form); setSaved(true); } catch (err) { setError(errMsg(err)); } finally { setSaving(false); }
  };
  if (!form) return <><PageTitle title="Settings" /><ErrorBox msg={error} />{!error && <Spinner />}</>;
  return (
    <>
      <PageTitle title="Settings" />
      <form onSubmit={save} className="max-w-2xl space-y-4 rounded-xl2 border border-slate-200 bg-white p-6 shadow-soft">
        {text.map(([k, label]) => <label key={k} className="block text-sm font-medium text-navy">{label}<input className={inputCls} value={form[k] || ''} onChange={(e) => setForm({ ...form, [k]: e.target.value })} /></label>)}
        <div className="text-sm font-medium text-navy">Logo<ImageField value={form.logo} onChange={(v) => setForm({ ...form, logo: v })} /></div>
        <p className="pt-2 text-sm font-semibold text-navy">Social media links</p>
        {social.map((k) => <label key={k} className="block text-sm capitalize text-navy">{k}<input className={inputCls} placeholder="https://..." value={form.social[k] || ''} onChange={(e) => setForm({ ...form, social: { ...form.social, [k]: e.target.value } })} /></label>)}
        <ErrorBox msg={error} />
        {saved && <p role="status" className="flex items-center gap-2 text-sm text-green-700"><CheckCircle2 size={16} />Settings saved.</p>}
        <button className={btnPrimary} disabled={saving}>{saving ? 'Saving...' : 'Save settings'}</button>
      </form>
    </>
  );
}
