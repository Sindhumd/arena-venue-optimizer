import pool from "../config/db.js";

export const getHeatmap = async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT gate, SUM(tickets) as value FROM events GROUP BY gate"
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Heatmap failed" });
  }
};