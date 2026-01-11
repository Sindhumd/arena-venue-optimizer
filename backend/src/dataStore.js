import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data.json");

function loadEvents() {
  if (!fs.existsSync(DATA_FILE)) {
    return [];
  }
  return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
}

function saveEvents(events) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(events, null, 2));
}

export default {
  loadEvents,
  saveEvents
};