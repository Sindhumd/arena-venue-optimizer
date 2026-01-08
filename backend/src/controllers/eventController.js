import dataStore from "../dataStore.js";

export function getEvents(req, res) {
  res.json(dataStore.events);
}