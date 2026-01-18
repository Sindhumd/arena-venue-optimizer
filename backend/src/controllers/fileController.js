import fs from "fs";
import csv from "csv-parser";
import { addEvents } from "../models/eventModel.js";

export const uploadEventFile = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const events = [];

  fs.createReadStream(req.file.path)
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
      await addEvents(events);
      fs.unlinkSync(req.file.path);

      res.json({
        success: true,
        message: "Events uploaded and stored",
        count: events.length,
      });
    });
};