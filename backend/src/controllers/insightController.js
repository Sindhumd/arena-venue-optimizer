import pool from "../db/pool.js";

export const getInsights = async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT time, tickets FROM events"
    );

    if (rows.length === 0) {
      return res.json({
        heatmap: [],
        congestion: 0,
        alerts: [],
        peakTime: null,
        highRiskZones: 0
      });
    }

    let peak = rows.reduce((a, b) =>
      Number(a.tickets) > Number(b.tickets) ? a : b
    );

    res.json({
      heatmap: rows,
      congestion: peak.tickets,
      alerts: peak.tickets > 1500 ? ["High congestion"] : [],
      peakTime: peak.time,
      highRiskZones: peak.tickets > 1500 ? 1 : 0
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Insights failed" });
  }
};