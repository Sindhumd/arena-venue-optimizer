# Arena Venue Optimizer Architecture

------------------------------------------------------------

# System Overview

Arena Venue Optimizer follows a client server architecture.

The frontend communicates with the backend using REST APIs.
The backend processes uploaded event data and generates analytics insights.

------------------------------------------------------------

# Architecture Components

1. Frontend

- Built using React
- Uses Axios to call backend APIs
- Displays congestion chart
- Displays zone heatmap
- Displays alerts and visitor analytics
- Applies color rules based on percentage values

2. Backend

- Built using Node.js and Express
- Handles CSV upload using Multer
- Stores event data in memory
- Provides REST APIs
- Contains analysis service for analytics computation

3. Analysis Service

Core module responsible for:

- Aggregating event ticket data
- Identifying peak hour
- Calculating gate congestion percentage
- Mapping gates to zones
- Calculating zone density percentage
- Identifying high risk zones
- Generating alerts

------------------------------------------------------------

# Data Flow

1. User uploads CSV file via frontend
2. Backend parses and stores event records
3. User triggers insights generation
4. Analysis service calculates metrics
5. Dashboard endpoint returns structured analytics
6. Frontend renders congestion, heatmap and alerts

------------------------------------------------------------

# Logical Flow

Event Data
   ↓
Peak Time Detection
   ↓
Gate Congestion Calculation
   ↓
Zone Density Calculation
   ↓
High Risk Evaluation
   ↓
Alert Generation
   ↓
Dashboard Response

------------------------------------------------------------

# Deployment Architecture

Frontend deployed separately
Backend deployed separately
Communication via HTTP REST APIs

------------------------------------------------------------

# Future Improvements

- Replace in memory storage with database
- Add real time monitoring using WebSockets
- Integrate external prediction service
- Add historical analytics tracking