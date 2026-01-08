const datastore = {
  events: [],        // uploaded CSV events
  heatmap: [],
  alerts: [],
  congestion: null,
  dashboard: {
    peakTime: "N/A",
    highRiskZones: 0
  }
};

export default datastore;