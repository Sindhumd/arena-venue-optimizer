-- USERS TABLE
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(120) UNIQUE NOT NULL,
    password VARCHAR(200) NOT NULL,
    role VARCHAR(50) DEFAULT 'user',
    created_at TIMESTAMP DEFAULT NOW()
);

-- EVENTS TABLE
CREATE TABLE IF NOT EXISTS events (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    event_date DATE,
    file_path TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- INSIGHTS (PREDICTIONS)
CREATE TABLE IF NOT EXISTS insights (
    id SERIAL PRIMARY KEY,
    event_id INTEGER REFERENCES events(id) ON DELETE CASCADE,
    gate VARCHAR(50),
    congestion_level INTEGER,
    density_score INTEGER,
    peak_time VARCHAR(50),
    created_at TIMESTAMP DEFAULT NOW()
);

-- ALERTS TABLE
CREATE TABLE IF NOT EXISTS alerts (
    id SERIAL PRIMARY KEY,
    event_id INTEGER REFERENCES events(id) ON DELETE CASCADE,
    alert_type VARCHAR(100),
    message TEXT,
    severity VARCHAR(50),
    created_at TIMESTAMP DEFAULT NOW()
);

-- UPLOADED RAW DATA TABLE
CREATE TABLE IF NOT EXISTS uploaded_files (
    id SERIAL PRIMARY KEY,
    event_id INTEGER REFERENCES events(id) ON DELETE CASCADE,
    original_name VARCHAR(255),
    stored_name VARCHAR(255),
    file_type VARCHAR(50),
    uploaded_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS predictions (
  id SERIAL PRIMARY KEY,
  event_id INTEGER,
  gate_congestion VARCHAR(50),
  hotspots TEXT,
  queue_time INTEGER,
  transport TEXT,
  density_score INTEGER,
  risk_zones INTEGER,
  peak_time VARCHAR(20),
  created_at TIMESTAMP DEFAULT NOW()
);

DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role VARCHAR(20) DEFAULT 'admin',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (name, email, password, role)
VALUES (
  'Admin',
  'admin@arena.com',
  '$2b$10$8Q2gZ2yJwZqkKz8Qn4zUQe6nUj7j6XH9XJpC0JkJZ6Y0E6ZqZx9yS',
  'admin'
);