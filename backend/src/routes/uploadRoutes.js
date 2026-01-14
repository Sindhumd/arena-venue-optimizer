import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import { uploadEvents } from "../controllers/uploadController.js";

const router = express.Router();

// IMPORTANT: upload middleware must be before controller
router.post("/", upload, uploadEvents);

export default router;