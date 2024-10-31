// src/routes/event.js
import express from "express";
import { getEvents, getEvent, addEvent, deleteEvent, updateEvent } from "../controllers/eventC.js";

const router = express.Router();

router.get("/", getEvents);
router.get("/:id", getEvent);
router.post("/", addEvent);
router.delete("/:id", deleteEvent);
router.put("/:id", updateEvent);

export default router;
