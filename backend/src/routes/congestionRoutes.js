import express from "express";
import { getCongestion } from "../controllers/congestionController.js";

const router = express.Router();

router.get("/", getCongestion);

export default router;