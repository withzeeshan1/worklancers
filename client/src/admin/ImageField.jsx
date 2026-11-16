import { useState } from 'react';
import { Upload, Loader2 } from 'lucide-react';
import { adminApi, errMsg } from '../services/adminApi';
import { inputCls, btnGhost } from './ui';

// URL input plus optional upload. If uploads are not configured on the server, the real error is shown.
export default function ImageField({ value, onChange }) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const upload = async (file) => {
    if (!file) return;
    setBusy(true); setErr('');
    try { const fd = new FormData(); fd.append('image', file); const { data } = await adminApi.post('/upload', fd); onChange(data.url); }
    catch (e) { setErr(errMsg(e)); } finally { setBusy(false); }
  };
  return (
    <div>
      <div className="flex gap-2">
        <input className={inputCls} placeholder="https://... (or upload)" value={value || ''} onChange={(e) => onChange(e.target.value)} />
        <label className={`${btnGhost} mt-1 cursor-pointer`}>{busy ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}Upload<input type="file" accept="image/*" hidden onChange={(e) => upload(e.target.files[0])} /></label>
      </div>
      {err && <p className="mt-1 text-xs text-red-600">{err}</p>}
      {value && <img src={value} alt="" className="mt-2 h-20 rounded-lg object-cover" />}
    </div>
  );
}
