import pool from "../db/pool.js";

export const getVisitors = async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT gate, tickets, time FROM events"
    );
    res.json(rows); // ✅ frontend expects array
  } catch (err) {
    console.error(err);
    res.status(500).json([]);
  }
};