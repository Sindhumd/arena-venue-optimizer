import pool from "../db/pool.js";

export const getVisitors = async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT gate AS zone, SUM(tickets) AS count FROM events GROUP BY gate"
    );

    const totalVisitors = rows.reduce(
      (sum, r) => sum + Number(r.count),
      0
    );

    res.json({
      totalVisitors,
      peakHour: null,
      zones: rows
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Visitors fetch failed" });
  }
};