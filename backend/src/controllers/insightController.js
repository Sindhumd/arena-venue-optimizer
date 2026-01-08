import datastore from "../dataStore.js";

// POST /api/insights/generate
export const generateInsights = async (req, res) => {
  const events = datastore.events;

  if (!events || events.length === 0) {
    return res.json({ message: "No events available to generate insights" });
  }

  let totalTickets = 0;
  let capacityIssues = 0;
  const zoneCount = {};

  events.forEach(event => {
    const tickets = Number(event.tickets || 0);
    const capacity = Number(event.capacity || 0);
    const gate = event.gate || "Unknown";

    totalTickets += tickets;

    if (tickets > capacity) {
      capacityIssues++;
    }

    zoneCount[gate] = (zoneCount[gate] || 0) + tickets;
  });

  // 🔥 Generate heatmap
  datastore.heatmap = Object.keys(zoneCount).map(zone => ({
    zone,
    value: zoneCount[zone]
  }));

  // 🔥 Alerts
  datastore.alerts = capacityIssues > 0
    ? ["Overcapacity detected"]
    : [];

  // 🔥 Dashboard insights
  datastore.dashboard = {
    peakTime: "18:00 - 20:00",
    highRiskZones: capacityIssues
  };

  datastore.congestion = totalTickets;

  res.json({ message: "Insights generated successfully" });
};

// GET /api/insights
export const getInsights = async (req, res) => {
  res.json({
    heatmap: datastore.heatmap,
    congestion: datastore.congestion,
    alerts: datastore.alerts,
    peakTime: datastore.dashboard.peakTime,
    highRiskZones: datastore.dashboard.highRiskZones
  });
};