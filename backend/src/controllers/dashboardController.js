import pool from "../db/pool.js";

export const getDashboard = async (req, res) => {
  try {
    // 1️⃣ Fetch all events
    const { rows } = await pool.query("SELECT * FROM events");

    // 2️⃣ If no data, return empty dashboard (frontend-safe)
    if (rows.length === 0) {
      return res.json({
        totalEvents: 0,
        totalTickets: 0,
        gates: [],
      });
    }

    // 3️⃣ Calculate totals
    let totalTickets = 0;
    const gateMap = {};

    rows.forEach((r) => {
      const tickets = Number(r.tickets);

      totalTickets += tickets;

      if (!gateMap[r.gate]) {
        gateMap[r.gate] = 0;
      }
      gateMap[r.gate] += tickets;
    });

    // 4️⃣ IMPORTANT FIX (frontend expects percentage, NOT tickets)
    const gates = Object.entries(gateMap).map(([gate, tickets]) => ({
      gate,
      percentage: Math.round((tickets / totalTickets) * 100),
    }));

    // 5️⃣ Final response (matches frontend exactly)
    return res.json({
      totalEvents: rows.length,
      totalTickets,
      gates,
    });
  } catch (err) {
    console.error("DASHBOARD ERROR:", err);
    return res.status(500).json({
      message: "Dashboard failed",
    });
  }
};