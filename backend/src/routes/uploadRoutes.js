import express from "express";
import { uploadEvents } from "../controllers/uploadController.js";

const router = express.Router();

router.post("/", uploadEvents);

export default router;