export function analyzeEvents(events) {

  const peakHour = {};

  // --------------------------
  // GATE CAPACITY (5 Gates)
  // --------------------------
  const gateCapacity = {
    "Gate A": 20000,
    "Gate B": 15000,
    "Gate C": 10000,
    "Gate D": 12000,
    "Gate E": 8000
  };

  // --------------------------
  // ZONE CAPACITY (5 Zones)
  // --------------------------
  const zoneCapacity = {
    "Zone A": 15000,
    "Zone B": 13000,
    "Zone C": 10000,
    "Zone D": 8000,
    "Zone E": 5000
  };

  // --------------------------
  // STEP 1: Total Visitors
  // --------------------------
  const totalVisitors = events.reduce((sum, e) => {
    return sum + Number(e.tickets);
  }, 0);

  // --------------------------
  // STEP 2: Find Peak Hour
  // --------------------------
  events.forEach(e => {
    const hour = e.time.split(":")[0];
    peakHour[hour] = (peakHour[hour] || 0) + Number(e.tickets);
  });

  let peakTime = "N/A";
  let max = 0;

  Object.keys(peakHour).forEach(h => {
    if (peakHour[h] > max) {
      max = peakHour[h];
      peakTime = `${h}:00`;
    }
  });

  const peakHourOnly = peakTime !== "N/A" ? peakTime.split(":")[0] : null;

  // --------------------------
  // STEP 3: Peak Hour Traffic
  // --------------------------
  const peakGateTraffic = {
    "Gate A": 0,
    "Gate B": 0,
    "Gate C": 0,
    "Gate D": 0,
    "Gate E": 0
  };

  const peakZoneTraffic = {
    "Zone A": 0,
    "Zone B": 0,
    "Zone C": 0,
    "Zone D": 0,
    "Zone E": 0
  };

  events.forEach(e => {
    if (peakHourOnly && e.time.startsWith(peakHourOnly)) {

      if (peakGateTraffic[e.gate] !== undefined) {
        peakGateTraffic[e.gate] += Number(e.tickets);
      }

      // Map gates to zones
      if (e.gate === "Gate A") peakZoneTraffic["Zone A"] += Number(e.tickets);
      if (e.gate === "Gate B") peakZoneTraffic["Zone B"] += Number(e.tickets);
      if (e.gate === "Gate C") peakZoneTraffic["Zone C"] += Number(e.tickets);
      if (e.gate === "Gate D") peakZoneTraffic["Zone D"] += Number(e.tickets);
      if (e.gate === "Gate E") peakZoneTraffic["Zone E"] += Number(e.tickets);
    }
  });

  // --------------------------
  // STEP 4: Gate Congestion %
  // --------------------------
  const congestion = {};

  Object.keys(peakGateTraffic).forEach(gate => {
    congestion[gate] = Math.round(
      (peakGateTraffic[gate] / gateCapacity[gate]) * 100
    );
  });

  // --------------------------
  // STEP 5: Zone Heatmap %
  // --------------------------
  const heatmap = [];
  const alerts = [];
  let highRiskZones = 0;

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
    totalVisitors,
    congestion,
    heatmap,
    alerts,
    highRiskZones,
    peakTime
  };
}