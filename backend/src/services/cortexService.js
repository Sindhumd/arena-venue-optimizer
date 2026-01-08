// Mock Cortex API integration

export const generateMockPredictions = async (eventId) => {
  return {
    eventId,
    congestion: [
      { gate: "Gate A", probability: 0.8, queueTime: "15 min" },
      { gate: "Gate B", probability: 0.4, queueTime: "5 min" }
    ],
    hotspots: [
      { zone: "South Hall", density: 85 },
      { zone: "Food Court", density: 70 }
    ],
    peakTime: "6:30 PM"
  };
};