import datastore from "../dataStore.js";
import { analyzeEvents } from "../services/analysisService.js";

export const getDashboardData = (req, res) => {
  if (!datastore.events.length) {
    return res.json({
      totalEvents: 0,
      congestion: {},
      heatmap: {},
      alerts: [],
      highRiskZones: 0,
      peakTime: "N/A"
    });
  }

  const analysis = analyzeEvents(datastore.events);
  res.json(analysis);
};