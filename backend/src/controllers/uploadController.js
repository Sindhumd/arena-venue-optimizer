import csv from "csv-parser";
import pool from "../db/pool.js";
import { Readable } from "stream";

export const uploadEvents = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const events = [];
  const stream = Readable.from(req.file.buffer);

  stream
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
        // 1️⃣ Clear old events
        await pool.query("DELETE FROM events");

        // 2️⃣ Insert new events
        for (const e of events) {
          await pool.query(
            "INSERT INTO events (name, gate, tickets, time) VALUES ($1, $2, $3, $4)",
            [e.name, e.gate, e.tickets, e.time]
          );
        }

        // 3️⃣ 🔴 THIS WAS MISSING — INSERT INSIGHTS
        await pool.query("DELETE FROM insights");

        await pool.query(
          "INSERT INTO insights (data) VALUES ($1)",
          [
            {
              totalEvents: events.length,
              heatmap: events.map((e) => ({
                gate: e.gate,
                value: e.tickets,
              })),
              congestion: events.reduce(
                (sum, e) => sum + e.tickets,
                0
              ),
              alerts: events
                .filter((e) => e.tickets > 1000)
                .map((e) => ({
                  message: `High congestion at ${e.gate}`,
                })),
              peakTime: null,
              highRiskZones: 0,
            },
          ]
        );

        // 4️⃣ Response
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