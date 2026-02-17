import pool from "../db/pool.js";

export const getDashboard = async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT data FROM insights ORDER BY id DESC LIMIT 1"
    );

    if (rows.length === 0) {
      return res.json({
        totalVisitors: 0,
        peakEntryTime: null,
        gateCongestion: {},
        heatmap: [],
        highRiskZones: [],
        alerts: []
      });
    }

    res.json(rows[0].data);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Dashboard failed" });
  }
};