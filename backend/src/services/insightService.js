// frontend/src/services/insightsService.js
const API_BASE = "http://localhost:4000/api/insights";

export async function fetchInsights() {
  const res = await fetch(`${API_BASE}`);
  if (!res.ok) throw new Error("Failed to fetch insights");
  return res.json();
}

export async function postGenerateInsights(payload) {
  const res = await fetch(`${API_BASE}/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to generate insights");
  return res.json();
}