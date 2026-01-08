import express from "express";
import dataStore from "../dataStore.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json(dataStore.analysis.heatmap || []);
});

export default router;