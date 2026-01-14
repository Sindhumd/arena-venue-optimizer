import fs from "fs";
import csv from "csv-parser";
import pool from "../config/db.js";

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
        // clear old data
        await pool.query("DELETE FROM events");

        for (const e of events) {
          let name = e.name?.trim();
          let gate = e.gate?.trim();
          let tickets = Number(e.tickets);
          let time = e.time?.trim();

          // auto extract gate if missing
          if ((!gate || gate === "") && name?.includes("Gate")) {
            const parts = name.split("Gate");
            name = parts[0].trim();
            gate = "Gate " + parts[1].trim();
          }

          await pool.query(
            "INSERT INTO events (name, gate, tickets, time) VALUES ($1, $2, $3, $4)",
            [name, gate, tickets, time]
          );
        }

        fs.unlinkSync(req.file.path);

        return res.json({
          message: "CSV uploaded successfully",
          rowsInserted: events.length,
        });
      } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Database error" });
      }
    });
};