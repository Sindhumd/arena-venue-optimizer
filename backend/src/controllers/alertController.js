import pool from "../db/pool.js";

export const getAlerts = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT data FROM insights ORDER BY created_at DESC LIMIT 1"
    );

    if (result.rows.length === 0) {
      return res.json([]);
    }

    res.json(result.rows[0].data.alerts || []);
  } catch (err) {
    console.error(err);
    res.status(500).json([]);
  }
};