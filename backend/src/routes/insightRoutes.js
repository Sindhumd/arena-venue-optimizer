import express from "express";
import { generateInsights, getInsights } from "../controllers/insightController.js";

const router = express.Router();

router.post("/generate", generateInsights);
router.get("/", getInsights);

export default router;