const pool = require("../db/pool");

const saveAlert = async (eventId, type, message, severity) => {
  const result = await pool.query(
    `INSERT INTO alerts (event_id, alert_type, message, severity)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [eventId, type, message, severity]
  );

  return result.rows[0];
};

const getAlertsByEvent = async (eventId) => {
  const result = await pool.query(
    `SELECT * FROM alerts WHERE event_id = $1 ORDER BY created_at DESC`,
    [eventId]
  );

  return result.rows;
};

module.exports = {
  saveAlert,
  getAlertsByEvent
};
