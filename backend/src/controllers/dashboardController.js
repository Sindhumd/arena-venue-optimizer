import pool from "../db/pool.js";

export const getDashboard = async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM events");

    if (rows.length === 0) {
      return res.json({
        totalEvents: 0,
        totalTickets: 0,
        gates: [],
      });
    }

    let totalTickets = 0;
    const gateMap = {};

    rows.forEach(r => {
      const t = Number(r.tickets);
      totalTickets += t;
      gateMap[r.gate] = (gateMap[r.gate] || 0) + t;
    });

    const gates = Object.entries(gateMap).map(([gate, tickets]) => ({
      gate,
      percentage: Math.round((tickets / totalTickets) * 100),
    }));

    res.json({
      totalEvents: rows.length,
      totalTickets,
      gates,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Dashboard failed" });
  }
};