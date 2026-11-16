import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Inbox, Sparkles, FolderKanban, Briefcase, FileText } from 'lucide-react';
import { adminApi, errMsg } from '../services/adminApi';
import { PageTitle, Spinner, ErrorBox } from './ui';

const cards = [['totalLeads', 'Total inquiries', Inbox, '/admin/leads'], ['newLeads', 'New inquiries', Sparkles, '/admin/leads'], ['projects', 'Total projects', FolderKanban, '/admin/projects'], ['services', 'Total services', Briefcase, '/admin/services'], ['blogs', 'Blog posts', FileText, '/admin/blogs']];

export default function Overview() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');
  useEffect(() => { adminApi.get('/stats').then((r) => setStats(r.data.data)).catch((e) => setError(errMsg(e))); }, []);
  return (
    <>
      <PageTitle title="Dashboard" />
      <ErrorBox msg={error} />
      {!stats && !error ? <Spinner /> : stats && (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-5">
          {cards.map(([key, label, Icon, to]) => (
            <Link key={key} to={to} className="rounded-xl2 border border-slate-200 bg-white p-5 shadow-soft transition hover:border-primary">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary-light text-primary"><Icon size={20} /></span>
              <p className="mt-4 text-3xl font-bold text-navy">{stats[key]}</p><p className="text-sm text-muted">{label}</p>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
