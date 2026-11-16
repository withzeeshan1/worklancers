import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { LayoutDashboard, Inbox, Briefcase, FolderKanban, FileText, Settings, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const nav = [['/admin', 'Overview', LayoutDashboard, true], ['/admin/leads', 'Leads', Inbox], ['/admin/services', 'Services', Briefcase], ['/admin/projects', 'Portfolio', FolderKanban], ['/admin/blogs', 'Blog', FileText], ['/admin/settings', 'Settings', Settings]];

export default function AdminLayout() {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const link = ({ isActive }) => `flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition ${isActive ? 'bg-primary text-white' : 'text-slate-300 hover:bg-white/10'}`;
  const sidebar = (
    <div className="flex h-full flex-col bg-navy p-4">
      <p className="mb-6 px-2 text-xl font-bold text-white">WORK<span className="text-blue-400">LANCERS</span></p>
      <nav className="flex-1 space-y-1" aria-label="Admin">
        {nav.map(([to, label, Icon, end]) => <NavLink key={to} to={to} end={end} className={link} onClick={() => setOpen(false)}><Icon size={18} />{label}</NavLink>)}
      </nav>
      <p className="mb-2 truncate px-2 text-xs text-slate-400">{admin?.email}</p>
      <button onClick={() => { logout(); navigate('/admin/login'); }} className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm text-slate-300 hover:bg-white/10"><LogOut size={18} />Log out</button>
    </div>
  );
  return (
    <div className="min-h-screen bg-surface">
      <Helmet><title>Admin | WORKLANCERS</title><meta name="robots" content="noindex" /></Helmet>
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-60 md:block">{sidebar}</aside>
      {open && <div className="fixed inset-0 z-40 md:hidden"><div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} /><div className="absolute inset-y-0 left-0 w-60">{sidebar}</div></div>}
      <div className="md:pl-60">
        <header className="flex h-14 items-center border-b border-slate-200 bg-white px-4 md:hidden">
          <button onClick={() => setOpen(!open)} aria-label="Toggle menu">{open ? <X /> : <Menu />}</button><span className="ml-3 font-semibold text-navy">Admin</span>
        </header>
        <main className="p-4 sm:p-8"><Outlet /></main>
      </div>
    </div>
  );
}
