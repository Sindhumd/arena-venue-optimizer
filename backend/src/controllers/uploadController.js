import csv from "csv-parser";
import pool from "../db/pool.js";
import dataStore from "../dataStore.js";
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
        /* ================================
           1️⃣ EVENTS TABLE (Events page)
        ================================= */
        await pool.query("DELETE FROM events");

        for (const e of events) {
          await pool.query(
            "INSERT INTO events (name, gate, tickets, time) VALUES ($1,$2,$3,$4)",
            [e.name, e.gate, e.tickets, e.time]
          );
        }

        /* ================================
           2️⃣ ANALYTICS (ALL OTHER PAGES)
        ================================= */
        await pool.query("DELETE FROM insights");

        let gateA = 0;
        let gateB = 0;
        let gateC = 0;

        for (const e of events) {
          if (e.gate === "Gate A") gateA += e.tickets;
          if (e.gate === "Gate B") gateB += e.tickets;
          if (e.gate === "Gate C") gateC += e.tickets;
        }

        const totalVisitors = gateA + gateB + gateC;

        const peakEntryTime = "15:00";
        const peakEntryGate =
          gateC >= gateB && gateC >= gateA
            ? "Gate C"
            : gateB >= gateA
            ? "Gate B"
            : "Gate A";

        const zoneWiseDistribution = {
          "Zone A": gateA,
          "Zone B": gateB,
          "Zone C": gateC,
        };

        const heatmap = [
          { zone: "Zone A", density: gateA },
          { zone: "Zone B", density: gateB },
          { zone: "Zone C", density: gateC },
        ];

        const alerts = [];
        if (gateC > 2000) {
          alerts.push({
            level: "HIGH",
            message: "High crowd density detected in Zone C",
          });
        }

        alerts.push({
          level: "INFO",
          message: "Expected peak crowd at 15:00",
        });

        /* ================================
           3️⃣ SAVE TO DB (Insights table)
        ================================= */
        await pool.query(
          "INSERT INTO insights (data) VALUES ($1)",
          [
            {
              totalVisitors,
              peakEntryTime,
              peakEntryGate,
              zoneWiseDistribution,
              heatmap,
              congestion: totalVisitors,
              alerts,
            },
          ]
        );

        /* ================================
           🔴 4️⃣ THIS WAS MISSING (MAIN FIX)
           Sync MEMORY for frontend pages
        ================================= */
        dataStore.analysis = {
          totalVisitors,
          peakEntryTime,
          peakEntryGate,
          zoneWiseDistribution,
          heatmap,
          congestion: totalVisitors,
          alerts,
        };

        /* ================================
           5️⃣ RESPONSE
        ================================= */
        res.json({
          message: "CSV uploaded and analytics generated successfully",
          inserted: events.length,
        });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database insert failed" });
      }
    });
};