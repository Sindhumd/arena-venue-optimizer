import axios from "axios";

const API_BASE = `${import.meta.env.VITE_API_BASE_URL}/api/insights`;

// ✅ GET insights (used by Insights page + Dashboard)
export async function fetchInsights() {
  const res = await axios.get(API_BASE);
  const data = res.data;

  // 🔥 THIS IS THE FIX: map backend → frontend expectations
  return {
    totalVisitors: data.congestion,      // dashboard / visitors
    peakEntryTime: data.peakTime,         // visitors
    highRiskZones: data.highRiskZones,    // dashboard
    heatmap: data.heatmap || [],          // heatmap
    alerts: data.alerts || []             // alerts page
  };
}

// ✅ Generate insights ONLY when button is clicked
export async function postGenerateInsights() {
  const res = await axios.post(`${API_BASE}/generate`);
  return res.data;
}