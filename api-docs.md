# Arena Venue Optimizer – API Documentation

Base URL:
http://localhost:4000/api

------------------------------------------------

POST /events/upload
Description:
Uploads event CSV data for analysis.

CSV Columns:
eventName, date, time, gate, tickets

Response:
{
  "message": "Events uploaded successfully",
  "recordsProcessed": 120
}

------------------------------------------------

GET /dashboard
Description:
Returns complete analytics derived from uploaded event data.

Response:
{
  "totalEvents": 120,
  "peakTime": "18:00",
  "highRiskZones": 2,
  "congestion": {
    "Gate A": 85,
    "Gate B": 60,
    "Gate C": 30
  },
  "heatmap": {
    "Gate A": 85,
    "Gate B": 60,
    "Gate C": 30
  },
  "alerts": [
    "High congestion expected at Gate A"
  ]
}

------------------------------------------------

POST /insights/generate
Description:
Triggers analytics generation from uploaded events.

Response:
{
  "message": "Insights generated successfully"
}

------------------------------------------------

GET /insights
Description:
Returns generated insights.

Response:
{
  "peakTime": "18:00",
  "highRiskZones": 2,
  "heatmap": {
    "Gate A": 85,
    "Gate B": 60,
    "Gate C": 30
  },
  "alerts": [
    "High crowd density at Gate A"
  ]
}

------------------------------------------------

GET /alerts
Description:
Returns system alerts.

------------------------------------------------

GET /visitors
Description:
Returns visitor analytics based on ticket data.