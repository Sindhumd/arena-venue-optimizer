export const getLatestPrediction = async (req, res) => {
  res.json({
    gate_congestion: "Moderate",
    hotspots: "North Stand, Gate B",
    queue_time: 12,
    transport: "Metro delay near Central Station",

    density_score: 72,
    risk_zones: 2,
    peak_time: "7:45 PM",
    heatmap: [12, 18, 30, 42, 55],
    timeline: [
      { time: "7:00 PM", value: 45 },
      { time: "7:15 PM", value: 55 },
      { time: "7:30 PM", value: 72 }
    ],
    density_score: Math.floor(Math.random() * 100),
    
  });
};