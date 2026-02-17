import express from "express";
import { generateInsights, getInsights } from "../controllers/insightController.js";

const router = express.Router();
router.get("/", getInsights);
router.post("/generate", generateInsights);

export default router;