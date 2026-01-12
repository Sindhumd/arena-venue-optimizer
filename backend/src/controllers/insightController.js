import pool from "../config/db.js";

/**
 * POST /api/insights/generate
 * (Optional trigger – calculations are DB-based)
 */
export const generateInsights = async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT gate, tickets FROM events");

    if (rows.length === 0) {
      return res.json({ message: "No events available to generate insights" });
    }

    let totalTickets = 0;
    let zoneCount = {};
    let capacityIssues = 0;

    rows.forEach(r => {
      const tickets = Number(r.tickets || 0);
      const gate = r.gate || "Unknown";

      totalTickets += tickets;
      zoneCount[gate] = (zoneCount[gate] || 0) + tickets;

      if (tickets > 1000) capacityIssues++;
    });

    res.json({
      message: "Insights generated successfully",
      totalTickets,
      peakTime: "18:00 - 20:00",
      highRiskZones: capacityIssues
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Insight generation failed" });
  }
};

/**
 * GET /api/insights
 */
export const getInsights = async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT gate, tickets FROM events");

    if (rows.length === 0) {
      return res.json({
        heatmap: [],
        congestion: 0,
        alerts: [],
        peakTime: null,
        highRiskZones: 0
      });
    }

    let totalTickets = 0;
    let heatmap = {};
    let alerts = [];
    let highRiskZones = 0;

    rows.forEach(r => {
      const tickets = Number(r.tickets || 0);
      const gate = r.gate || "Unknown";

      totalTickets += tickets;
      heatmap[gate] = (heatmap[gate] || 0) + tickets;

      if (tickets > 1000) {
        alerts.push(`High congestion at ${gate}`);
        highRiskZones++;
      }
    });

    res.json({
      heatmap: Object.entries(heatmap).map(([zone, value]) => ({
        zone,
        value
      })),
      congestion: totalTickets,
      alerts,
      peakTime: "18:00 - 20:00",
      highRiskZones
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Failed to fetch insights" });
  }
};