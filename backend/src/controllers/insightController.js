import pool from "../db/pool.js";

export const getInsights = async (req, res) => {
  const r = await pool.query(
    "SELECT data FROM insights ORDER BY created_at DESC LIMIT 1"
  );

  if (!r.rows.length) {
    return res.json({
      congestion: 0,
      peakTime: null,
      highRiskZones: 0,
      heatmap: [],
      alerts: []
    });
  }

  const d = r.rows[0].data;

  res.json({
    congestion: d.totalVisitors,
    peakTime: d.peakEntryTime,
    highRiskZones: d.alerts.length,
    heatmap: d.heatmap,
    alerts: d.alerts
  });
};

export const generateInsights = async (req, res) => {
  // simply reuse existing data
  return res.json({ message: "Insights already generated on CSV upload" });
};