import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000/api";

export const getProfile = (id) => axios.get(`${API_BASE}/profile/${id}`).then(r => r.data);
export const getTransactions = (id) => axios.get(`${API_BASE}/transactions/${id}`).then(r => r.data);
export const detectConflicts = (id) => axios.post(`${API_BASE}/detect/${id}`).then(r => r.data);
