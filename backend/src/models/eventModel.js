import pool from "../db/pool.js";

export const addEvents = async (events) => {
  const query = `
    INSERT INTO events (name, gate, tickets, time)
    VALUES ($1, $2, $3, $4)
  `;

  for (const event of events) {
    await pool.query(query, [
      event.name,     // ✅ from CSV
      event.gate,     // ✅ from CSV
      event.tickets,  // ✅ from CSV
      event.time      // ✅ from CSV
    ]);
  }
};

export const getAllEvents = async () => {
  const result = await pool.query("SELECT * FROM events");
  return result.rows;
};