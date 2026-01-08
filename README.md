# Arena Venue Optimizer

## Overview
Arena Venue Optimizer is a full-stack web application that analyzes
event data to predict crowd congestion, heatmap density, peak times,
high-risk zones, and operational alerts for large venues.

## Tech Stack
- Frontend: React, Vite, Tailwind CSS
- Backend: Node.js, Express
- Charts: Chart.js
- Containerization: Docker, Docker Compose

## Features
- Upload event CSV data
- Gate-wise congestion analysis
- Crowd density heatmap
- Peak time detection
- High-risk zone alerts
- Venue zone visualization
- Role-based UI access
- Dockerized deployment

## How It Works
1. Upload event CSV file
2. Backend processes event data
3. Analytics engine generates insights
4. Dashboard visualizes results

## Run Using Docker
```bash
docker compose up --build

## Application Screenshots

### Login Page
![Login](Screenshots/01-login.png)

### Dashboard
![Dashboard](Screenshots/02-dashboard.png)

### Venue Zone Map
![Venue Zone Map](Screenshots/03-venue-zone-map.png)

### Event Upload
![Event Upload](Screenshots/04-events-upload.png)

### Visitor Analytics
![Visitors](Screenshots/05-visitors.png)

### Insights
![Insights](Screenshots/06-insights.png)

### Alerts
![Alerts](Screenshots/07-alerts.png)