# Arena Venue Optimizer – Architecture

## Overview
Arena Venue Optimizer is a full-stack web application designed to analyze
venue event data and provide operational insights such as congestion levels,
crowd density heatmaps, peak times, high-risk zones, and alerts.

The system follows a **client–server architecture** with clear separation
between frontend, backend, and analysis logic.

---

## High-Level Architecture

Frontend (React + Vite)
        |
        | REST API (HTTP)
        v
Backend (Node.js + Express)
        |
        | Analysis Logic
        v
In-Memory Data Store (CSV-based)

---

## Components Description

### 1. Frontend (Presentation Layer)

**Technology**
- React
- Vite
- Tailwind CSS

**Responsibilities**
- Upload event CSV files
- Display dashboard KPIs
- Visualize congestion charts
- Render heatmap and venue zone map
- Show alerts and insights

**Pages**
- Login Page
- Event Upload Page
- Dashboard Page
- Insights Page
- Alerts Page

---

### 2. Backend (Application Layer)

**Technology**
- Node.js
- Express.js

**Responsibilities**
- Accept CSV uploads
- Parse event data
- Trigger event analysis
- Provide analytics via REST APIs

**Key Endpoints**
- `/api/events/upload`
- `/api/dashboard`
- `/api/heatmap`
- `/api/insights`

---

### 3. Analysis Service (Business Logic)

**Purpose**
Convert raw event data into meaningful operational insights.

**Processing Includes**
- Aggregating tickets by gate
- Calculating congestion percentage
- Determining peak entry times
- Identifying high-risk zones
- Generating alerts

**Output**
- Structured analytics object used by dashboard and insights

---

### 4. Data Storage

**Type**
- In-memory datastore (JavaScript object)

**Reason**
- Lightweight
- Fast access
- No external database dependency (assignment-focused)

**Stored Data**
- Uploaded events
- Latest analysis results
- Heatmap values

---

### 5. Deployment (Containerization)

**Technology**
- Docker
- Docker Compose

**Services**
- Frontend container
- Backend container

**Benefits**
- Easy local deployment
- Environment consistency
- Reproducible builds

---

## Data Flow

1. User uploads event CSV from frontend
2. Backend parses and stores event data
3. Analysis service processes event data
4. Insights are generated and stored
5. Frontend fetches analyzed data via APIs
6. Dashboard and visualizations are rendered

---

## Design Principles
- Separation of concerns
- Stateless APIs
- Modular analysis logic
- Scalable architecture

---

## Summary
The architecture is simple, scalable, and aligned with the assignment
requirements. All analytics are derived from uploaded event data and
visualized through a responsive frontend dashboard.