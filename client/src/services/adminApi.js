import axios from 'axios';

export const TOKEN_KEY = 'wl_admin_token';
export const getToken = () => { try { return localStorage.getItem(TOKEN_KEY); } catch { return null; } };
export const setToken = (t) => { try { t ? localStorage.setItem(TOKEN_KEY, t) : localStorage.removeItem(TOKEN_KEY); } catch { /* storage unavailable */ } };

export const adminApi = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api', timeout: 20000 });
adminApi.interceptors.request.use((config) => { const t = getToken(); if (t) config.headers.Authorization = `Bearer ${t}`; return config; });

export const errMsg = (e) => e.response?.data?.message || (e.request ? 'Cannot reach the server.' : e.message);
