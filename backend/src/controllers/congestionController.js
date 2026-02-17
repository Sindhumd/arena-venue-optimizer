import pool from "../db/pool.js";

export const getCongestion = async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT data FROM insights ORDER BY id DESC LIMIT 1"
    );

    if (rows.length === 0) {
      return res.json({});
    }

    res.json(rows[0].data.congestion || {});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch congestion" });
  }
};