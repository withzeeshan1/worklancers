import { Navigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { admin, loading } = useAuth();
  if (loading) return <div className="grid min-h-screen place-items-center"><Loader2 className="animate-spin text-primary" /></div>;
  return admin ? children : <Navigate to="/admin/login" replace />;
}
