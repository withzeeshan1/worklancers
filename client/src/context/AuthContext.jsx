import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { adminApi, getToken, setToken } from '../services/adminApi';

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(Boolean(getToken()));

  const logout = useCallback(() => { setToken(null); setAdmin(null); }, []);

  useEffect(() => {
    const id = adminApi.interceptors.response.use((r) => r, (err) => {
      if (err.response?.status === 401 && !err.config.url.includes('/auth/login')) logout();
      return Promise.reject(err);
    });
    return () => adminApi.interceptors.response.eject(id);
  }, [logout]);

  useEffect(() => {
    if (!getToken()) return;
    adminApi.get('/auth/me').then((r) => setAdmin(r.data.admin)).catch(() => setToken(null)).finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    const { data } = await adminApi.post('/auth/login', { email, password });
    setToken(data.token); setAdmin(data.admin);
  };

  return <AuthContext.Provider value={{ admin, loading, login, logout }}>{children}</AuthContext.Provider>;
}
