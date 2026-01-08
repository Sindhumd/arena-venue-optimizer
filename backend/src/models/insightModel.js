const pool = require("../db/pool");

const savePrediction = async (eventId, gate, congestion, density, peak) => {
  const result = await pool.query(
    `INSERT INTO insights (event_id, gate, congestion_level, density_score, peak_time)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [eventId, gate, congestion, density, peak]
  );

  return result.rows[0];
};

const getPredictionsByEvent = async (eventId) => {
  const result = await pool.query(
    `SELECT * FROM insights WHERE event_id = $1`,
    [eventId]
  );

  return result.rows;
};

module.exports = {
  savePrediction,
  getPredictionsByEvent
};
