import pool from "../db/pool.js";
import { analyzeEvents } from "../services/analysisService.js";


// GET latest stored insights
export const getInsights = async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT data FROM insights ORDER BY id DESC LIMIT 1"
    );

    if (rows.length === 0) {
      return res.json({});
    }

    res.json(rows[0].data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch insights" });
  }
};


// GENERATE insights from events
export const generateInsights = async (req, res) => {
  try {
    // fetch all uploaded events
    const { rows } = await pool.query("SELECT * FROM events");

    const result = analyzeEvents(rows);

    await pool.query(
      "INSERT INTO insights (data) VALUES ($1)",
      [result]
    );

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to generate insights" });
  }
};