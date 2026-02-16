import pool from "../db/pool.js";
import { analyzeEvents } from "../services/analysisService.js";

export const getDashboard = async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM events");

    if (rows.length === 0) {
      return res.json({
        totalEvents: 0,
        congestion: {},
        heatmap: [],
        alerts: [],
        highRiskZones: 0,
        peakTime: "N/A"
      });
    }

    const analysisResult = analyzeEvents(rows);

    res.json(analysisResult);

  } catch (err) {
    console.error("Dashboard error:", err);
    res.status(500).json({ message: "Dashboard failed" });
  }
};