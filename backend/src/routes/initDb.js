import express from "express";
import pool from "../db/pool.js";

const router = express.Router();

router.get("/init-db", async (req, res) => {
  try {
    // Create table if not exists
    await pool.query(`
      CREATE TABLE IF NOT EXISTS events (
        id SERIAL PRIMARY KEY,
        name TEXT,
        gate TEXT,
        tickets INTEGER,
        time TEXT
      )
    `);

    // 🔴 THIS IS THE IMPORTANT LINE
    // Clear old events so app starts EMPTY
    await pool.query("DELETE FROM events");

    res.send("DB initialized and events cleared");
  } catch (err) {
    console.error(err);
    res.status(500).send("DB init failed");
  }
});

export default router;