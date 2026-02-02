import fs from "fs";
import csv from "csv-parser";
import pool from "../db.js";
import dataStore from "../dataStore.js";

export const uploadEvents = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No CSV file uploaded" });
  }

  const filePath = req.file.path;

  let totalVisitors = 0;
  let peakEntryTime = "";
  let peakEntryGate = "";
  let maxTickets = 0;

  const zoneWiseDistribution = {};
  const heatmap = [];
  const alerts = [];

  const events = [];

  fs.createReadStream(filePath)
    .pipe(csv())
    .on("data", (row) => {
      const eventName = row.name;
      const gate = row.gate;
      const tickets = parseInt(row.tickets);
      const time = row.time;

      if (!eventName || !gate || isNaN(tickets) || !time) return;

      events.push({ eventName, gate, tickets, time });

      totalVisitors += tickets;

      if (tickets > maxTickets) {
        maxTickets = tickets;
        peakEntryTime = time;
        peakEntryGate = gate;
      }

      // Zone distribution
      zoneWiseDistribution[gate] =
        (zoneWiseDistribution[gate] || 0) + tickets;

      // Heatmap
      heatmap.push({
        zone: gate,
        density: tickets,
      });

      // Alerts
      if (tickets > 1000) {
        alerts.push({
          message: `High congestion detected at Gate ${gate}`,
          level: "High",
        });
      }
    })
    .on("end", async () => {
      try {
        // Clear old events
        await pool.query("DELETE FROM events");

        // Insert events
        for (const e of events) {
          await pool.query(
            "INSERT INTO events (name, gate, tickets, time) VALUES ($1, $2, $3, $4)",
            [e.eventName, e.gate, e.tickets, e.time]
          );
        }

        // Insert insights (DB)
        await pool.query("DELETE FROM insights");

        await pool.query(
          `INSERT INTO insights 
          (total_visitors, peak_entry_time, peak_entry_gate, zone_distribution) 
          VALUES ($1, $2, $3, $4)`,
          [
            totalVisitors,
            peakEntryTime || "N/A",
            peakEntryGate || "N/A",
            JSON.stringify(zoneWiseDistribution),
          ]
        );

        // ✅✅✅ THIS IS THE MISSING PART (MAIN FIX)
        dataStore.analysis = {
          totalVisitors,
          peakEntryTime: peakEntryTime || "N/A",
          peakEntryGate: peakEntryGate || "N/A",
          zoneWiseDistribution,
          heatmap,
          congestion: totalVisitors,
          alerts,
        };

        fs.unlinkSync(filePath);

        res.json({
          message: "CSV uploaded and data analyzed successfully",
        });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to process CSV" });
      }
    });
};