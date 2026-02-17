# Arena Venue Optimizer API Documentation

## Base URL

http://localhost:4000/api

------------------------------------------------------------

# 1. Upload Events

Endpoint:
POST /events/upload

Description:
Uploads event CSV data for analytics processing.

Required CSV Columns:
eventName,,gate,tickets,time

Example CSV:

Mega Fest,Gate A,4000,15:00
Mega Fest,Gate B,9000,15:00
Mega Fest,Gate C,9000,15:00

Success Response:

{
  "message": "Events uploaded successfully",
  "recordsProcessed": 3
}

------------------------------------------------------------

# 2. Generate Insights

Endpoint:
POST /insights/generate

Description:
Triggers analytics generation from uploaded event data.
Calculates peak time, congestion, heatmap, high risk zones, and alerts.

Success Response:

{
  "message": "Insights generated successfully"
}

------------------------------------------------------------

# 3. Dashboard Analytics

Endpoint:
GET /dashboard

Description:
Returns complete analytics derived from uploaded event data.

Response Structure:

{
  "totalEvents": 3,
  "peakTime": "15:00",
  "highRiskZones": 1,
  "congestion": {
    "Gate A": 20,
    "Gate B": 60,
    "Gate C": 90
  },
  "heatmap": {
    "Zone A": 27,
    "Zone B": 75,
    "Zone C": 112
  },
  "alerts": [
    "High congestion expected at Gate C",
    "High crowd density in Zone C"
  ]
}

------------------------------------------------------------

# 4. Insights Summary

Endpoint:
GET /insights

Description:
Returns generated insights summary including peak time, high risk zones, heatmap and alerts.

Response:

{
  "peakTime": "15:00",
  "highRiskZones": 1,
  "heatmap": {
    "Zone A": 27,
    "Zone B": 75,
    "Zone C": 112
  },
  "alerts": [
    "High crowd density in Zone C"
  ]
}

------------------------------------------------------------

# 5. Alerts

Endpoint:
GET /alerts

Description:
Returns active system alerts.

Response:

[
  "High congestion expected at Gate C",
  "High crowd density in Zone C"
]

------------------------------------------------------------

# 6. Visitor Analytics

Endpoint:
GET /visitors

Description:
Returns visitor analytics based on uploaded ticket data.

Response:

{
  "totalVisitors": 22000,
  "peakEntryTime": "15:00",
  "peakGate": "Gate C",
  "zoneDistribution": {
    "Zone A": 4000,
    "Zone B": 9000,
    "Zone C": 9000
  }
}

------------------------------------------------------------

# Calculation Logic

Gate Congestion Percentage:
(tickets at peak hour / gate capacity) × 100

Zone Density Percentage:
(zone traffic at peak hour / zone capacity) × 100

High Risk Zone Condition:
Zone density >= configured threshold

Frontend Color Rules:
0 – 30  -> Green
31 – 79 -> Yellow
80+     -> Red