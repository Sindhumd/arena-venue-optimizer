import { parseCSV } from "../services/fileParser.js";
import { analyzeEvents } from "../services/analysisService.js";
import pool from "../config/pool.js";

export async function uploadEvents(req, res) {
  try {
    const events = await parseCSV(req.file.path);

    const analysis = analyzeEvents(events);

    await pool.query(
      "INSERT INTO insights (data) VALUES ($1)",
      [analysis]
    );

    res.json({
      message: "CSV uploaded successfully",
      analysis
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Upload failed" });
  }
}