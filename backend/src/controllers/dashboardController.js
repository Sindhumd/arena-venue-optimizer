import datastore from "../dataStore.js";
import { analyzeEvents } from "../services/analysisService.js";

export const getDashboardData = (req, res) => {
  const events = datastore.loadEvents();

  if (!events.length) {
    return res.json({
      totalEvents: 0,
      congestion: {},
      heatmap: [],
      alerts: [],
      highRiskZones: 0,
      peakTime: "N/A"
    });
  }

  const analysis = analyzeEvents(events);
  res.json(analysis);
};