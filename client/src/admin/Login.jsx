import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Loader2, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { errMsg } from '../services/adminApi';

export default function Login() {
  const { admin, login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  if (admin) return <Navigate to="/admin" replace />;

  const submit = async (e) => {
    e.preventDefault(); setError(''); setBusy(true);
    try { await login(form.email, form.password); navigate('/admin'); } catch (err) { setError(errMsg(err)); } finally { setBusy(false); }
  };
  const input = 'mt-1 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20';
  return (
    <div className="grid min-h-screen place-items-center bg-primary-light px-4">
      <Helmet><title>Admin Login | WORKLANCERS</title><meta name="robots" content="noindex" /></Helmet>
      <form onSubmit={submit} className="w-full max-w-sm rounded-xl2 bg-white p-8 shadow-soft">
        <p className="text-center text-2xl font-bold text-navy">WORK<span className="text-primary">LANCERS</span></p>
        <h1 className="mt-1 mb-6 text-center text-sm font-normal text-muted">Admin sign in</h1>
        <label className="block text-sm font-medium text-navy">Email<input type="email" required autoComplete="username" className={input} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></label>
        <label className="mt-4 block text-sm font-medium text-navy">Password<input type="password" required autoComplete="current-password" className={input} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /></label>
        {error && <p role="alert" className="mt-4 flex items-center gap-2 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700"><AlertCircle size={16} />{error}</p>}
        <button disabled={busy} className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-white hover:bg-primary-dark disabled:opacity-60">{busy && <Loader2 size={16} className="animate-spin" />}Sign in</button>
      </form>
    </div>
  );
}
