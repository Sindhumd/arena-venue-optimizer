import csv from "csv-parser";
import pool from "../db/pool.js";
import { Readable } from "stream";

export const uploadEvents = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "CSV required" });
  }

  const events = [];

  Readable.from(req.file.buffer)
    .pipe(csv())
    .on("data", (row) => {
      events.push({
        name:row.name,
        gate: row.gate,
        tickets: Number(row.tickets),
        time: row.time,
      });
    })
    .on("end", async () => {
      try {
        await pool.query("DELETE FROM events");
        await pool.query("DELETE FROM insights");

        for (const e of events) {
          await pool.query(
            "INSERT INTO events (name, gate, tickets, time) VALUES ($1,$2,$3,$4)",
            [e.name, e.gate, e.tickets, e.time]
          );
        }

        // ===== ANALYTICS (AUTO) =====
        let total = 0;
        const gateMap = {};
        const timeMap = {};

        events.forEach(e => {
          total += e.tickets;
          gateMap[e.gate] = (gateMap[e.gate] || 0) + e.tickets;
          timeMap[e.time] = (timeMap[e.time] || 0) + e.tickets;
        });

        const peakEntryTime = Object.entries(timeMap)
          .sort((a,b)=>b[1]-a[1])[0][0];

        const heatmap = Object.entries(gateMap).map(([gate, count]) => ({
          zone: gate.replace("Gate", "Zone"),
          value: Math.round((count / total) * 100),
        }));

        const alerts = heatmap
          .filter(z => z.value > 70)
          .map(z => `High congestion at ${z.zone}`);

        await pool.query(
          "INSERT INTO insights (data) VALUES ($1)",
          [{
            totalEvents: events.length,
            totalVisitors: total,
            peakEntryTime,
            heatmap,
            alerts,
            gateCongestion: gateMap
          }]
        );

        res.json({ message: "CSV uploaded & analytics generated" });
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Upload failed" });
      }
    });
};