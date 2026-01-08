import datastore from "../dataStore.js";
import { analyzeEvents } from "../services/analysisService.js";

export const getDashboardData = (req, res) => {
  if (!datastore.events.length) {
    return res.json({
      totalEvents: 0,
      congestion: {},
      heatmap: {
        "Zone A": 0,
        "Zone B": 0,
        "Zone C": 0,
      },
      alerts: [],
      highRiskZones: 0,
      peakTime: "N/A",
    });
  }

  const analysis = analyzeEvents(datastore.events);

  datastore.analysis = analysis;

  res.json(analysis);
};