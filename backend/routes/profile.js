import express from "express";
import { getProfile, updateProfile } from "../controllers/profileC.js";

const router = express.Router();

router.get("/:id", getProfile);
router.post("/update", updateProfile);

export default router;