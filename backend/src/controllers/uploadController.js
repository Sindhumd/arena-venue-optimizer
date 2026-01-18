import fs from "fs";
import csv from "csv-parser";
import pool from "../config/db.js";

export const uploadEvents = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const events = [];

  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on("data", (row) => {
      events.push({
        name: row.name,
        gate: row.gate,
        tickets: Number(row.tickets),
        time: row.time,
      });
    })
    .on("end", async () => {
      try {
        for (const e of events) {
          await pool.query(
            "INSERT INTO events (name, gate, tickets, time) VALUES ($1, $2, $3, $4)",
            [e.name, e.gate, e.tickets, e.time]
          );
        }

        res.json({
          message: "CSV uploaded and events saved",
          inserted: events.length,
        });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database insert failed" });
      }
    });
};