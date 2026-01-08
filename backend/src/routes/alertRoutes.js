import express from "express";
import dataStore from "../dataStore.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json(dataStore.analysis.alerts || []);
});

export default router;