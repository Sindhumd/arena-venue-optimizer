import axios from "axios";

const API_BASE = "http://localhost:4000/api/insights";

export async function fetchInsights() {
  const res = await axios.get(API_BASE);
  return res.data;
}

export async function postGenerateInsights() {
  const res = await axios.post(`${API_BASE}/generate`);
  return res.data;
}