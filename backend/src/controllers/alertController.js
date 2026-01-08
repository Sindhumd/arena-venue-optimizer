import dataStore from "../dataStore.js";

export const getAlerts = (req, res) => {
  if (!dataStore.analysis.hasAlerts) {
    return res.json([]);
  }

  res.json(dataStore.alerts);
};