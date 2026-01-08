import dataStore from "../dataStore.js";

export const getHeatmap = (req, res) => {
  if (!dataStore.analysis || !dataStore.analysis.hasHeatmap) {
    return res.json([]);
  }

  res.json(dataStore.heatmap);
};