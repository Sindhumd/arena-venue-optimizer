import axios from "axios";

const API_BASE = `${import.meta.env.VITE_API_BASE_URL}/api/analysis`;

export async function fetchInsights() {
  const res = await axios.get(API_BASE);
  return res.data;
}

export async function postGenerateInsights() {
  const res = await axios.post(`${API_BASE}/generate`);
  return res.data;
}