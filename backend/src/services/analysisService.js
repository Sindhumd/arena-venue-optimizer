export function analyzeEvents(events) {

  const peakHour = {};

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

  // STEP 1: Find peak hour
  events.forEach(e => {
    const hour = e.time.split(":")[0];
    peakHour[hour] = (peakHour[hour] || 0) + e.tickets;
  });

  let peakTime = "N/A";
  let max = 0;

  Object.keys(peakHour).forEach(h => {
    if (peakHour[h] > max) {
      max = peakHour[h];
      peakTime = `${h}:00`;
    }
  });

  const peakHourOnly = peakTime.split(":")[0];

  // STEP 2: Calculate traffic only for peak hour
  const peakGateTraffic = {
    "Gate A": 0,
    "Gate B": 0,
    "Gate C": 0
  };

  const peakZoneTraffic = {
    "Zone A": 0,
    "Zone B": 0,
    "Zone C": 0
  };

  events.forEach(e => {
    if (e.time.startsWith(peakHourOnly)) {

      peakGateTraffic[e.gate] += e.tickets;

      if (e.gate === "Gate A") peakZoneTraffic["Zone A"] += e.tickets;
      if (e.gate === "Gate B") peakZoneTraffic["Zone B"] += e.tickets;
      if (e.gate === "Gate C") peakZoneTraffic["Zone C"] += e.tickets;
    }
  });

  const congestion = {};
  const heatmap = [];
  const alerts = [];
  let highRiskZones = 0;

  // STEP 3: Gate congestion at peak
  Object.keys(peakGateTraffic).forEach(gate => {
    congestion[gate] = Math.round(
      (peakGateTraffic[gate] / gateCapacity[gate]) * 100
    );
  });

  // STEP 4: Zone heatmap at peak
  Object.keys(peakZoneTraffic).forEach(zone => {

    const percent = Math.round(
      (peakZoneTraffic[zone] / zoneCapacity[zone]) * 100
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
    congestion,
    heatmap,
    alerts,
    highRiskZones,
    peakTime
  };
}