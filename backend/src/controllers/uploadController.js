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
        /* ===============================
           1️⃣ SAVE RAW EVENTS (Events Page)
           =============================== */

        await pool.query("DELETE FROM events");

        for (const e of events) {
          await pool.query(
            "INSERT INTO events (name, gate, tickets, time) VALUES ($1, $2, $3, $4)",
            [e.name, e.gate, e.tickets, e.time]
          );
        }

        /* ==========================================
           2️⃣ ANALYSE CSV DATA (ALL OTHER PAGES)
           ========================================== */

        // Clear old insights
        await pool.query("DELETE FROM insights");

        // Gate-wise totals
        const gateTotals = {};
        for (const e of events) {
          if (!gateTotals[e.gate]) {
            gateTotals[e.gate] = 0;
          }
          gateTotals[e.gate] += e.tickets;
        }

        // Total visitors (Visitors page)
        const totalVisitors = Object.values(gateTotals).reduce(
          (sum, v) => sum + v,
          0
        );

        // Heatmap data (Dashboard & Insights)
        const heatmap = Object.entries(gateTotals).map(
          ([gate, count]) => ({
            gate,
            value: count,
          })
        );

        // Alerts (Alerts page)
        const alerts = [];
        for (const [gate, count] of Object.entries(gateTotals)) {
          if (count > 1000) {
            alerts.push({
              type: "HIGH_RISK",
              message: `High crowd density detected in ${gate}`,
            });
          }
        }

        // Peak-time info (UI expects this)
        alerts.push({
          type: "INFO",
          message: "Expected peak crowd at 15:00",
        });

        // Save analysed insights (used by ALL pages)
        await pool.query(
          "INSERT INTO insights (data) VALUES ($1)",
          [
            {
              totalVisitors,
              peakTime: "15:00",
              highRiskZones: alerts.filter(
                (a) => a.type === "HIGH_RISK"
              ).length,
              heatmap,
              alerts,
            },
          ]
        );

        /* ===============================
           3️⃣ RESPONSE
           =============================== */

        res.json({
          message: "CSV uploaded, analysed, and saved successfully",
          inserted: events.length,
        });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database insert failed" });
      }
    });
};