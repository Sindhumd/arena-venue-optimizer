import pool from "../db/pool.js";

export const getEvents = async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM events");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Failed to fetch events" });
  }
};