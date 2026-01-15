import fs from "fs";
import csv from "csv-parser";
import pool from "../config/db.js";

export async function uploadEvents(req, res) {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const events = [];

  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on("data", (row) => {
      events.push(row);
    })
    .on("end", async () => {
      try {
        for (const e of events) {
          await pool.query(
            `INSERT INTO events (name, gate, tickets, time)
             VALUES ($1, $2, $3, $4)`,
            [
              e.name || "Event",
              e.gate || "Unknown",
              Number(e.tickets || 0),
              e.time || null,
            ]
          );
        }

        res.json({
          message: "CSV uploaded & events stored successfully",
          rowsInserted: events.length,
        });
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to insert events" });
      }
    });
}