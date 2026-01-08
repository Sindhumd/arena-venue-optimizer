const { saveAlert } = require("../models/alertModel");

const alertTypes = [
  "Security Alert",
  "Transport Delay",
  "Crowd Density Warning",
  "Emergency Exit Blocked",
  "VIP Movement",
  "Weather Alert"
];

const alertMessages = [
  "Unusual activity detected at Gate B",
  "Public transport delayed near East Road",
  "High crowd density in Zone 3",
  "Emergency exit temporarily blocked",
  "VIP movement happening now",
  "Heavy rain expected in 15 minutes"
];

const severityLevels = ["low", "medium", "high"];

const generateRandomAlert = async (eventId) => {
  const randomIndex = Math.floor(Math.random() * alertTypes.length);

  const result = await saveAlert(
    eventId,
    alertTypes[randomIndex],
    alertMessages[randomIndex],
    severityLevels[Math.floor(Math.random() * severityLevels.length)]
  );

  return result;
};

module.exports = {
  generateRandomAlert
};
