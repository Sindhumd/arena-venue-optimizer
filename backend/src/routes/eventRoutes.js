import express from "express";
import { getAllEvents } from "../models/eventModel.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const events = await getAllEvents();
  res.json(events);
});

export default router;