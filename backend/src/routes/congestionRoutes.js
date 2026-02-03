import express from "express";
import pool from "../db/pool.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT data FROM insights ORDER BY id DESC LIMIT 1"
    );

    if (result.rows.length === 0) {
      return res.json({});
    }

    res.json({
      peakEntryTime: result.rows[0].data.peakEntryTime || null,
      gateCongestion: result.rows[0].data.gateCongestion || {},
    });
  } catch (err) {
    console.error("Congestion error:", err);
    res.status(500).json({});
  }
});

export default router;