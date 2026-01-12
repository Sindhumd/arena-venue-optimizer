import express from "express";
import pool from "../config/db.js";

const router = express.Router();

router.get("/init-db", async (req, res) => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS events (
      id SERIAL PRIMARY KEY,
      name TEXT,
      gate TEXT,
      tickets INTEGER
    )
  `);

  res.send("DB READY");
});

export default router;