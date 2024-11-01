import express from "express";
import { getUserByUsername, followUser, unfollowUser } from "../controllers/userC.js";

const router = express.Router();

router.get("/:username", getUserByUsername);
router.post("/follow", followUser);
router.post("/unfollow", unfollowUser);

export default router;