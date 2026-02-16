import express from "express";
import pool from "../db/pool.js";
import { analyzeEvents } from "../services/analysisService.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM events");

    if (rows.length === 0) {
      return res.json({
        totalEvents: 0,
        congestion: {},
        heatmap: [],
        alerts: [],
        highRiskZones: 0,
        peakTime: "N/A"
      });
    }

    const result = analyzeEvents(rows);

    res.json(result);

  } catch (err) {
    console.error("Analysis error:", err);
    res.status(500).json({});
  }
});

export default router;