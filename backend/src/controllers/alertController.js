import pool from "../config/db.js";

export const getAlerts = async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT gate, tickets FROM events WHERE tickets > 1000"
    );

    const alerts = rows.map(r => ({
      message: `High congestion at ${r.gate}`
    }));

    res.json(alerts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Alerts failed" });
  }
};