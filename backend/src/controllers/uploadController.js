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
        // 🔴 CLEAR OLD DATA
        await pool.query("DELETE FROM events");
        await pool.query("DELETE FROM insights");

        // 🟢 INSERT EVENTS
        for (const e of events) {
          await pool.query(
            "INSERT INTO events (name, gate, tickets, time) VALUES ($1,$2,$3,$4)",
            [e.name, e.gate, e.tickets, e.time]
          );
        }

        // 🟢 CALCULATE DASHBOARD + ALERTS + VISITORS + INSIGHTS
        const { rows } = await pool.query("SELECT * FROM events");

        let totalTickets = 0;
        const gateMap = {};

        rows.forEach((r) => {
          totalTickets += Number(r.tickets);
          gateMap[r.gate] = (gateMap[r.gate] || 0) + Number(r.tickets);
        });

        const insightsData = {
          totalEvents: rows.length,
          totalTickets,
          gates: Object.entries(gateMap).map(([gate, tickets]) => ({
            gate,
            tickets,
          })),
          alerts:
            totalTickets > 10000 ? ["High crowd expected"] : [],
          peakTime: rows.length ? rows[0].time : null,
          heatmap: Object.entries(gateMap).map(([gate, tickets]) => ({
            gate,
            value: tickets,
          })),
        };

        // 🟢 SAVE INSIGHTS
        await pool.query("INSERT INTO insights (data) VALUES ($1)", [
          insightsData,
        ]);

        res.json({
          message: "CSV uploaded and ALL pages data refreshed",
          inserted: rows.length,
        });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Processing failed" });
      }
    });
};