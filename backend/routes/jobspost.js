// src/routes/jobposts.js
import express from "express";
import { getJobs, getJob, addJob, deleteJob, updateJob } from "../controllers/jobspostC.js";

const router = express.Router();

router.get("/", getJobs);
router.get("/:id", getJob);
router.post("/", addJob);
router.delete("/:id", deleteJob);
router.put("/:id", updateJob);

export default router;
