export const getVisitors = (req, res) => {
  res.json({
    totalVisitors: 12450,
    peakHour: "7:45 PM",
    zones: [
      { zone: "North Stand", count: 3200 },
      { zone: "South Entry", count: 5100 },
      { zone: "Gate B", count: 4150 }
    ]
  });
};