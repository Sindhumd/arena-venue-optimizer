import datastore from "../dataStore.js";

export const getEvents = (req, res) => {
  res.json(datastore.events);
};