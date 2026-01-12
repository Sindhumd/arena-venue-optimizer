import pool from "../config/db.js";

export const getDashboardData = async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM events");

    if (rows.length === 0) {
      return res.json({
        totalEvents: 0,
        totalTickets: 0,
        gates: []
      });
    }

    let totalTickets = 0;
    const gateMap = {};

    rows.forEach(r => {
      totalTickets += r.tickets;
      gateMap[r.gate] = (gateMap[r.gate] || 0) + r.tickets;
    });

    const gates = Object.entries(gateMap).map(([gate, tickets]) => ({
      gate,
      tickets
    }));

    res.json({
      totalEvents: rows.length,
      totalTickets,
      gates
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Dashboard failed" });
  }
};