import express from "express";
import dataStore from "../datastore.js";

const router = express.Router();

router.get("/", (req, res) => {
  try {
    // ✅ If analysis not generated yet
    if (!dataStore.analysis) {
      return res.json([]);
    }

    // ✅ If alerts not present
    if (!dataStore.analysis.alerts) {
      return res.json([]);
    }

    res.json(dataStore.analysis.alerts);
  } catch (err) {
    console.error("Alerts route error:", err);
    res.status(500).json([]);
  }
});

export default router;