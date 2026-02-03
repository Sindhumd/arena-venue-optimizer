import express from "express";
import pool from "../db/pool.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    // Get latest insights row
    const result = await pool.query(
      "SELECT data FROM insights ORDER BY id DESC LIMIT 1"
    );

    // If no insights yet
    if (result.rows.length === 0) {
      return res.json([]);
    }

    // Extract alerts safely
    const alerts = result.rows[0].data?.alerts || [];

    return res.json(alerts);
  } catch (err) {
    console.error("Alerts route error:", err);
    return res.status(500).json([]);
  }
});

export default router;