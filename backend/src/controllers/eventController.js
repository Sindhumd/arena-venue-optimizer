import datastore from "../dataStore.js";

export function getEvents(req, res) {
  const events = datastore.loadEvents();
  res.json(events);
}