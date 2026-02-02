import pool from "../db/pool.js";

/**
 * GET /api/insights
 * Fetch latest generated insights
 */
export const getInsights = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT data FROM insights ORDER BY created_at DESC LIMIT 1"
    );

    // If no insights yet
    if (result.rows.length === 0) {
      return res.json({
        heatmap: [],
        congestion: 0,
        alerts: [],
        peakTime: null,
        highRiskZones: 0,
      });
    }

    const data = result.rows[0].data;

    // 🔴 KEY MAPPING FIX (THIS IS THE REAL ISSUE)
    res.json({
      congestion: data.congestion || 0,
      peakTime: data.peakEntryTime || null,
      highRiskZones: data.alerts ? data.alerts.length : 0,
      heatmap: data.heatmap || [],
      alerts: data.alerts || [],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch insights" });
  }
};

/**
 * POST /api/insights/generate
 * (Insights are already generated during CSV upload)
 */
export const generateInsights = async (req, res) => {
  return res.json({
    message: "Insights are generated during CSV upload",
  });
};