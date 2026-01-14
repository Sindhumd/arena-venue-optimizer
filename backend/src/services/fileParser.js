import fs from "fs";
import csv from "csv-parser";

export function parseCSV(filePath) {
  return new Promise((resolve, reject) => {
    const rows = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        rows.push({
          event_name: row.event_name,
          event_date: row.event_date,
          gate: row.gate,
          tickets: Number(row.tickets || 0),
          time: row.time
        });
      })
      .on("end", () => resolve(rows))
      .on("error", reject);
  });
}