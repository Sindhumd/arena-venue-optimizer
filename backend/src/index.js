import express from "express";
import cors from "cors";
import dotenv from "dotenv"

import authRoutes from "./routes/authRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import predictionRoutes from "./routes/predictionRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import alertRoutes from "./routes/alertRoutes.js";
import insightRoutes from "./routes/insightRoutes.js";
import heatmapRoutes from "./routes/heatmapRoutes.js";
import visitorRoutes from "./routes/visitorRoutes.js";
import congestionRoutes from "./routes/congestionRoutes.js";
import analysisRoutes from "./routes/analysisRoutes.js";
import initDbRoute from "./routes/initDb.js";


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/predictions", predictionRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/alerts", alertRoutes);
app.use("/api/insights", insightRoutes);
app.use("/api/heatmap", heatmapRoutes);
app.use("/api/visitors", visitorRoutes);
app.use("/api/congestion", congestionRoutes);
app.use("/api/analysis", analysisRoutes);
app.use("/api", initDbRoute);


app.get("/", (req, res) => {
  res.send("Backend running");
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log("Backend running on port" +PORT );
});