import express from "express";
import pool from "../db/pool.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const result = await pool.query(
    "SELECT data FROM insights ORDER BY id DESC LIMIT 1"
  );
  res.json(result.rows[0]?.data || {});
});

export default router;