import pool from "../config/db.js";

export const getCongestion = async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT time, tickets FROM events");

    const result = rows.map(r => ({
      time: r.time,
      percentage: Math.min(100, Math.round((r.tickets / 1000) * 100))
    }));

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Congestion failed" });
  }
};