import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import { uploadEvents } from "../controllers/uploadController.js";

const router = express.Router();

router.post(
  "/upload",
  upload.single("file"),   // ✅ THIS WAS MISSING
  uploadEvents             // ✅ must be a function
);

export default router;