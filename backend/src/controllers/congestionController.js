import datastore from "../dataStore.js";

export const getCongestion = (req, res) => {
  const result = datastore.events.map(e => ({
    time: e.time,
    percentage: congestionPercentage(e.tickets)
  }));

  res.json(result);
};