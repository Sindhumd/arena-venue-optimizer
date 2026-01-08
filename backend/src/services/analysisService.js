export function analyzeEvents(events) {
  const gateTraffic = {
    "Gate A": 0,
    "Gate B": 0,
    "Gate C": 0
  };

  const zoneTraffic = {
    "Zone A": 0,
    "Zone B": 0,
    "Zone C": 0
  };

  const peakHour = {};
  const alerts = [];

  // Capacities decided by venue design (realistic)
  const gateCapacity = {
    "Gate A": 20000,
    "Gate B": 12000,
    "Gate C": 8000
  };

  const zoneCapacity = {
    "Zone A": 15000,
    "Zone B": 10000,
    "Zone C": 6000
  };

  events.forEach(e => {
    // Gate congestion
    if (gateTraffic[e.gate] !== undefined) {
      gateTraffic[e.gate] += e.tickets;
    }

    // Zone mapping (assignment expectation)
    if (e.gate === "Gate A") zoneTraffic["Zone A"] += e.tickets;
    if (e.gate === "Gate B") zoneTraffic["Zone B"] += e.tickets;
    if (e.gate === "Gate C") zoneTraffic["Zone C"] += e.tickets;

    // Peak hour
    const hour = e.time.split(":")[0];
    peakHour[hour] = (peakHour[hour] || 0) + e.tickets;
  });

  const congestion = {};
  const heatmap = [];
  let highRiskZones = 0;

  Object.keys(gateTraffic).forEach(gate => {
    congestion[gate] = Math.round(
      (gateTraffic[gate] / gateCapacity[gate]) * 100
    );
  });

  Object.keys(zoneTraffic).forEach(zone => {
    const percent = Math.round(
      (zoneTraffic[zone] / zoneCapacity[zone]) * 100
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

  let peakTime = "N/A";
  let max = 0;
  Object.keys(peakHour).forEach(h => {
    if (peakHour[h] > max) {
      max = peakHour[h];
      peakTime = `${h}:00`;
    }
  });

  alerts.push(`Expected peak crowd at ${peakTime}`);

  return {
    totalEvents: events.length,
    congestion,
    heatmap,
    alerts,
    highRiskZones,
    peakTime
  };
}