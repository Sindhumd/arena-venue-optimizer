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
        await pool.query("DELETE FROM events");

        for (const e of events) {
  let gate = e.gate;
  let name = e.name;

  // FIX: extract gate from name if gate column is empty
  if ((!gate || gate.trim() === "") && name.includes("Gate")) {
    const parts = name.split("Gate");
    name = parts[0].trim();
    gate = "Gate " + parts[1].trim();
  }

  await pool.query(
    `INSERT INTO events (name, gate, tickets)
     VALUES ($1, $2, $3)`,
    [name, gate, Number(e.tickets)]
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