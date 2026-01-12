import fs from "fs";
import csv from "csv-parser";
import pool from "../db/pool.js";

export const uploadEvents = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No CSV file uploaded" });
  }

  const events = [];

  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on("data", (row) => {
      events.push(row);
    })
    .on("end", async () => {
      try {
        await pool.query("DELETE FROM events");

        for (const e of events) {
          await pool.query(
            `INSERT INTO events (name, gate, tickets)
             VALUES ($1, $2, $3)`,
            [e.name, e.gate, Number(e.tickets)]
          );
        }

        fs.unlinkSync(req.file.path);

        res.json({
          message: "CSV uploaded & saved in database",
          rows: events.length
        });
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Database error" });
      }
    });
};