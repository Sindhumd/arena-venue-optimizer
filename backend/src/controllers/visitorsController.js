import pool from "../db/pool.js";

export const getVisitors = async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT gate, tickets FROM events");

    let totalVisitors = 0;
    const zones = [];

    rows.forEach((r) => {
      totalVisitors += Number(r.tickets);
      zones.push({
        zone: r.gate,
        count: Number(r.tickets),
      });
    });

    res.json({
      totalVisitors,
      peakHour: rows.length ? rows[0].time : null,
      zones,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Visitors fetch failed" });
  }
};