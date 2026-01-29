import express from "express";
import pool from "../config/db.js";

const router = express.Router();

router.get("/init-db", async (req, res) => {
  try {
    // 1️⃣ Create table with ALL required columns
    await pool.query(`
      CREATE TABLE IF NOT EXISTS events (
        id SERIAL PRIMARY KEY,
        name TEXT,
        gate TEXT,
        tickets INTEGER,
        time TEXT
      )
    `);

    // 2️⃣ CLEAR old data (THIS IS THE FIX YOU NEED)
    await pool.query("DELETE FROM events");

    res.json({ message: "DB initialized and events cleared" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "DB init failed" });
  }
});

export default router;