import pool from "../db/pool.js";

export async function getLatestPrediction(eventId) {
  const result = await pool.query(
    `SELECT * FROM predictions
     WHERE event_id = $1
     ORDER BY created_at DESC
     LIMIT 1`,
    [eventId]
  );

  return result.rows[0] || null;
}

export default {
  getLatestPrediction,
};