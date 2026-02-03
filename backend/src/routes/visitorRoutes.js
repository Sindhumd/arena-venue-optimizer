import express from "express";
import pool from "../db/pool.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT data FROM insights ORDER BY id DESC LIMIT 1"
    );

    if (result.rows.length === 0) {
      return res.json({ totalVisitors: 0 });
    }

    res.json({
      totalVisitors: result.rows[0].data.totalVisitors || 0,
    });
  } catch (err) {
    console.error("Visitors error:", err);
    res.status(500).json({ totalVisitors: 0 });
  }
});

export default router;