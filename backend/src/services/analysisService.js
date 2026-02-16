export function analyzeEvents(events) {

  const gateCapacity = {
    "Gate A": 20000,
    "Gate B": 15000,
    "Gate C": 10000
  };

  const zoneCapacity = {
    "Zone A": 15000,
    "Zone B": 12000,
    "Zone C": 8000
  };

  const peakHour = {};
  const gateTotals = {
    "Gate A": 0,
    "Gate B": 0,
    "Gate C": 0
  };

  const zoneTotals = {
    "Zone A": 0,
    "Zone B": 0,
    "Zone C": 0
  };

  let totalVisitors = 0;

  // STEP 1: Calculate totals
  events.forEach(e => {

    const tickets = Number(e.tickets) || 0;
    totalVisitors += tickets;

    gateTotals[e.gate] += tickets;

    if (e.gate === "Gate A") zoneTotals["Zone A"] += tickets;
    if (e.gate === "Gate B") zoneTotals["Zone B"] += tickets;
    if (e.gate === "Gate C") zoneTotals["Zone C"] += tickets;

    const hour = e.time.split(":")[0];
    peakHour[hour] = (peakHour[hour] || 0) + tickets;
  });

  // STEP 2: Find peak time
  let peakTime = "N/A";
  let max = 0;

  Object.keys(peakHour).forEach(h => {
    if (peakHour[h] > max) {
      max = peakHour[h];
      peakTime = `${h}:00`;
    }
  });

  // STEP 3: Gate congestion (TOTAL not peak-only)
  const congestion = {};

  Object.keys(gateTotals).forEach(gate => {
    congestion[gate] = Math.round(
      (gateTotals[gate] / gateCapacity[gate]) * 100
    );
  });

  // STEP 4: Heatmap
  const heatmap = [];
  const alerts = [];
  let highRiskZones = 0;

  Object.keys(zoneTotals).forEach(zone => {

    const percent = Math.round(
      (zoneTotals[zone] / zoneCapacity[zone]) * 100
    );

    heatmap.push({
      zone,
      value: percent
    });

    if (percent >= 80) {
      highRiskZones++;
      alerts.push(`High crowd density detected in ${zone}`);
    }
  });

  alerts.push(`Expected peak crowd at ${peakTime}`);

  return {
    totalEvents: events.length,
    totalVisitors,
    congestion,
    heatmap,
    alerts,
    highRiskZones,
    peakTime
  };
}