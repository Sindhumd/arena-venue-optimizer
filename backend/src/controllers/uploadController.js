import dataStore from "../dataStore.js";

export const uploadEvents = (req, res) => {
  if (!Array.isArray(req.body)) {
    return res.status(400).json({ message: "Invalid data" });
  }

  dataStore.events = req.body;

  res.json({ message: "Events uploaded successfully" });
};