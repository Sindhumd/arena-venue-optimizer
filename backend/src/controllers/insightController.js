import pool from "../config/db.js";

/**
 * GET /api/insights
 * Fetch latest generated insights
 */
export const getInsights = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT data FROM insights ORDER BY created_at DESC LIMIT 1"
    );

    if (result.rows.length === 0) {
      return res.json({
        heatmap: [],
        congestion: 0,
        alerts: [],
        peakTime: null,
        highRiskZones: 0
      });
    }

    res.json(result.rows[0].data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch insights" });
  }
};

/**
 * POST /api/insights/generate
 * OPTIONAL — insights already generated on upload
 */
export const generateInsights = async (req, res) => {
  return res.json({
    message: "Insights are generated during CSV upload"
  });
};