import pool from "../db/pool.js";

export const getDashboard = async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM events");

    if (rows.length === 0) {
      return res.json({
        totalEvents: 0,
        totalTickets: 0,
        gateCongestion: [],
        heatmap: [],
      });
    }

    let totalTickets = 0;
    const gateMap = {};

    rows.forEach((r) => {
      const tickets = Number(r.tickets);
      totalTickets += tickets;
      gateMap[r.gate] = (gateMap[r.gate] || 0) + tickets;
    });

    // ✅ Gate-wise congestion (Dashboard chart)
    const gateCongestion = Object.entries(gateMap).map(
      ([gate, tickets]) => ({
        gate,
        tickets,
      })
    );

    // ✅ Heatmap (Dashboard + Insights UI)
    const heatmap = Object.entries(gateMap).map(
      ([gate, tickets]) => ({
        zone: gate.replace("Gate", "Zone"),
        density: tickets,
      })
    );

    return res.json({
      totalEvents: rows.length,
      totalTickets,
      gateCongestion,
      heatmap,
    });
  } catch (err) {
    console.error("DASHBOARD ERROR:", err);
    return res.status(500).json({ message: "Dashboard failed" });
  }
};